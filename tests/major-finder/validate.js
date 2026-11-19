const { loadData, loadEngine, sourceMajors } = require("./helpers");

const data = loadData();
const engine = loadEngine(data);
const errors = [];
function bad(message) {
  errors.push(message);
}

const source = sourceMajors();
const profiles = data.profiles;
const ids = new Set();
const names = new Map();
profiles.forEach((profile) => {
  if (ids.has(profile.majorId)) bad("중복 전공 ID: " + profile.majorId);
  ids.add(profile.majorId);
  if (names.has(profile.name)) bad("중복 전공명: " + profile.name);
  names.set(profile.name, profile);
  if (!profile.coreTopics.length) bad("핵심 주제 없음: " + profile.name);
  if (!profile.coreActivity) bad("핵심 활동 없음: " + profile.name);
  if (profile.relatedActivity && profile.relatedActivity === profile.coreActivity) {
    bad("핵심·관련 활동 중복: " + profile.name);
  }
  if (!profile.studyText || !profile.reviewStatus || !profile.reviewBasis) bad("검토 정보 없음: " + profile.name);
});

source.forEach((row) => {
  const profile = names.get(row.name);
  if (!profile) bad("프로필 누락: " + row.name);
  else if (profile.track !== row.track || profile.mid !== row.mid || profile.sourceRow !== row.row) {
    bad("원본 분류와 불일치: " + row.name);
  }
});
profiles.forEach((profile) => {
  if (!source.some((row) => row.name === profile.name)) bad("원본에 없는 전공: " + profile.name);
});

const tagIds = new Set(data.tags.map((tag) => tag.id));
const usedTags = new Set();
data.questions.forEach((question) => {
  question.choices.forEach((choice) => {
    (choice.tags || []).forEach((tag) => usedTags.add(tag));
  });
  if (question.activityId) usedTags.add(question.activityId);
});
profiles.forEach((profile) => {
  profile.coreTopics.concat(profile.relatedTopics).forEach((tag) => {
    usedTags.add(tag);
    if (!tagIds.has(tag)) bad("없는 주제 태그: " + profile.name + " " + tag);
  });
  [profile.coreActivity, profile.relatedActivity].filter(Boolean).forEach((tag) => {
    usedTags.add(tag);
    if (!tagIds.has(tag)) bad("없는 활동 태그: " + profile.name + " " + tag);
  });
});
data.tags.forEach((tag) => {
  if (!usedTags.has(tag.id)) bad("연결되지 않은 태그: " + tag.id);
});

const lateIds = new Set();
const diffIds = new Set();
const coreHits = new Map();
data.lateQuestions.forEach((question) => {
  if (lateIds.has(question.id)) bad("중복 후반 문항: " + question.id);
  lateIds.add(question.id);
  if (question.maxSelect !== 1) bad("전공 비교는 하나만 고를 수 있어야 합니다: " + question.id);
  if (String(question.prompt || "").indexOf("끌리") !== -1) bad("끌리 표현: " + question.id);
  if (diffIds.has(question.diffId)) bad("중복 차이 ID: " + question.diffId);
  diffIds.add(question.diffId);
  const choiceIds = new Set();
  let special = 0;
  question.choices.forEach((choice) => {
    if (choiceIds.has(choice.id)) bad("중복 보기: " + choice.id);
    choiceIds.add(choice.id);
    if (choice.special) special += 1;
    choice.coreMajorIds.concat(choice.relatedMajorIds).forEach((id) => {
      if (!ids.has(id)) bad("없는 전공을 가리키는 보기: " + choice.id + " " + id);
    });
    choice.coreMajorIds.forEach((id) => {
      coreHits.set(id, (coreHits.get(id) || 0) + 1);
    });
  });
  if (!special) bad("특별 보기가 없는 후반 문항: " + question.id);
  question.topicTags.forEach((tag) => {
    if (!tagIds.has(tag)) bad("후반 문항의 없는 주제 태그: " + question.id + " " + tag);
  });
});
profiles.forEach((profile) => {
  if (!coreHits.get(profile.majorId)) bad("후반 핵심 보기 누락: " + profile.name);
});

data.questions.concat(data.lateQuestions).forEach((question) => {
  if (String(question.prompt || "").indexOf("끌리") !== -1) bad("끌리 표현: " + question.id);
});

const qids = new Set();
data.questions.forEach((question) => {
  if (qids.has(question.id)) bad("중복 공통 문항: " + question.id);
  qids.add(question.id);
  const choiceIds = new Set();
  question.choices.forEach((choice) => {
    if (choiceIds.has(choice.id)) bad("중복 공통 보기: " + choice.id);
    choiceIds.add(choice.id);
  });
});
["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14"].forEach((id) => {
  if (!qids.has(id)) bad("공통 문항 누락: " + id);
});

data.config.exploreMajorIds.forEach((id) => {
  if (!ids.has(id)) bad("탐색 전공 ID 없음: " + id);
});
const exploreTracks = new Set(data.config.exploreMajorIds.map((id) => engine.profileById.get(id).track));
if (exploreTracks.size !== data.config.exploreMajorIds.length) bad("탐색 전공의 대계열이 겹칩니다.");

const coreLinked = profiles.filter((profile) => coreHits.get(profile.majorId)).length;
console.log("원본 소분류 수:", source.length);
console.log("유효 프로필 수:", profiles.length);
console.log("후반 핵심 연결이 있는 전공 수:", coreLinked);
console.log("누락:", errors.filter((item) => item.startsWith("프로필 누락")).length);
console.log("중복:", errors.filter((item) => item.startsWith("중복")).length);
console.log("고아·오류:", errors.length);
if (errors.length) {
  errors.forEach((item) => console.error(" -", item));
  process.exit(1);
}
console.log("데이터 검증 통과");
