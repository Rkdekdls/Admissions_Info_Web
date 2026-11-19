const assert = require("assert");
const { loadEngine, preferenceAnswers, preferMajorLate } = require("./helpers");
const { createEngine } = require("../../js/major-finder/engine");

let failed = 0;
function check(name, fn) {
  try {
    fn();
    console.log("통과", name);
  } catch (error) {
    failed += 1;
    console.error("실패", name);
    console.error(error.stack || error.message);
  }
}

function mini() {
  const topic = (id, prompt, pairs) => ({
    id,
    kind: "topic",
    prompt,
    maxSelect: 2,
    choices: pairs.map(([key, tag]) => ({ id: id + "-" + key, label: key, tags: [tag], special: false })).concat([
      { id: id + "-none", label: "없어요", tags: [], special: true, specialKind: "none" },
      { id: id + "-unknown", label: "몰라요", tags: [], special: true, specialKind: "unknown" },
    ]),
  });
  const activity = (id, tag) => ({
    id,
    kind: "activity",
    prompt: "이 활동을 해보고 싶어요?",
    activityId: tag,
    maxSelect: 1,
    choices: [
      { id: id + "-want", label: "꼭", value: "want", special: false },
      { id: id + "-some", label: "조금", value: "some", special: false },
      { id: id + "-no", label: "별로", value: "no", special: false },
      { id: id + "-unknown", label: "몰라요", value: "unknown", special: true },
    ],
  });
  const profiles = [
    { majorId: "m1", name: "일", track: "자연과학계열", mid: "가", sortOrder: 1, coreTopics: ["t_a", "t_b"], relatedTopics: [], coreActivity: "a_obs", relatedActivity: "a_ana", studyText: "일", reviewStatus: "needs_review", reviewBasis: "b" },
    { majorId: "m2", name: "이", track: "공학계열", mid: "나", sortOrder: 2, coreTopics: ["t_a"], relatedTopics: ["t_b"], coreActivity: "a_obs", relatedActivity: null, studyText: "이", reviewStatus: "needs_review", reviewBasis: "b" },
    { majorId: "m3", name: "삼", track: "인문사회계열", mid: "다", sortOrder: 3, coreTopics: ["t_b"], relatedTopics: [], coreActivity: "a_ana", relatedActivity: null, studyText: "삼", reviewStatus: "needs_review", reviewBasis: "b" },
  ];
  return {
    version: "mini",
    tags: [
      { id: "t_a", type: "topic", label: "가나다" },
      { id: "t_b", type: "topic", label: "라마바" },
      { id: "a_obs", type: "activity", label: "관찰·실험" },
      { id: "a_ana", type: "activity", label: "자료 분석" },
    ],
    profiles,
    questions: [topic("q1", "가", [["a", "t_a"], ["b", "t_b"]]), activity("q7", "a_obs"), activity("q8", "a_ana")],
    lateQuestions: [1, 2, 3].map((n) => ({
      id: "late-" + n,
      diffId: "diff-" + n,
      prompt: "질문 " + n,
      role: "split",
      topicTags: ["t_a"],
      choices: [
        { id: "late-" + n + "-a", label: "가", coreMajorIds: ["m1"], relatedMajorIds: [], reason: n + "번에서 직접 해 보는 활동을 골랐어요.", special: false },
        { id: "late-" + n + "-b", label: "나", coreMajorIds: ["m1"], relatedMajorIds: ["m2"], reason: "다른 활동", special: false },
        { id: "late-" + n + "-c", label: "다", coreMajorIds: ["m3"], relatedMajorIds: [], reason: "셋", special: false },
        { id: "late-" + n + "-u", label: "몰라요", coreMajorIds: [], relatedMajorIds: [], reason: "", special: true, specialKind: "unknown" },
      ],
    })),
    config: {
      version: "mini",
      weights: { topicCore: 50, topicRelated: 25, activityCore: 25, activityRelated: 10, lateCore: 8, lateRelated: 4, lateCap: 15 },
      activityValues: { want: 1, some: 0.5, no: -0.5, unknown: 0 },
      candidate: { topN: 8, withinRank3: 15 },
      exploreMajorIds: ["m1", "m2", "m3"],
      exploreReason: "탐색",
    },
  };
}

check("주제 태그가 여러 개여도 핵심 점수는 한 번만", () => {
  const engine = createEngine(mini());
  const rows = engine.scoreRows([
    { questionId: "q1", choiceIds: ["q1-a", "q1-b"] },
    { questionId: "q7", choiceIds: ["q7-unknown"] },
    { questionId: "q8", choiceIds: ["q8-unknown"] },
  ]).rows;
  const first = rows.find((row) => row.majorId === "m1");
  assert.strictEqual(first.topicPoints2 / 2, 50);
});

check("모름은 0점, 비선호는 감점", () => {
  const engine = createEngine(mini());
  const unknown = engine.scoreRows([
    { questionId: "q1", choiceIds: ["q1-unknown"] },
    { questionId: "q7", choiceIds: ["q7-unknown"] },
    { questionId: "q8", choiceIds: ["q8-unknown"] },
  ]).rows.find((row) => row.majorId === "m2");
  const dislike = engine.scoreRows([
    { questionId: "q1", choiceIds: ["q1-unknown"] },
    { questionId: "q7", choiceIds: ["q7-no"] },
    { questionId: "q8", choiceIds: ["q8-unknown"] },
  ]).rows.find((row) => row.majorId === "m2");
  assert.strictEqual(unknown.activityPoints2, 0);
  assert.ok(dislike.activityPoints2 < 0);
});

check("후반 점수는 15점에서 멈추고 같은 문항의 중복 가점은 한 번", () => {
  const engine = createEngine(mini());
  const once = engine.scoreRows([
    { questionId: "q1", choiceIds: ["q1-unknown"] },
    { questionId: "q7", choiceIds: ["q7-unknown"] },
    { questionId: "q8", choiceIds: ["q8-unknown"] },
    { questionId: "late-1", choiceIds: ["late-1-a", "late-1-b"] },
  ]).rows.find((row) => row.majorId === "m1");
  assert.strictEqual(once.latePoints2 / 2, 8);
  assert.strictEqual(once.lateCoreCount, 1);
  const capped = engine.scoreRows([
    { questionId: "q1", choiceIds: ["q1-unknown"] },
    { questionId: "q7", choiceIds: ["q7-unknown"] },
    { questionId: "q8", choiceIds: ["q8-unknown"] },
    { questionId: "late-1", choiceIds: ["late-1-a"] },
    { questionId: "late-2", choiceIds: ["late-2-a"] },
    { questionId: "late-3", choiceIds: ["late-3-a"] },
  ]).rows.find((row) => row.majorId === "m1");
  assert.strictEqual(capped.latePoints2 / 2, 15);
});

check("동점 정렬은 반복해도 같다", () => {
  const engine = loadEngine();
  const major = engine.profiles.find((item) => item.name === "간호학");
  const answers = preferenceAnswers(engine, major, preferMajorLate);
  const once = engine.recommend({ version: engine.data.version, answers, scores: [1], majorIds: ["fake"] });
  const twice = engine.recommend({ version: engine.data.version, answers: JSON.parse(JSON.stringify(answers)) });
  assert.strictEqual(once.ok, true);
  assert.deepStrictEqual(once.items.map((item) => item.majorId), twice.items.map((item) => item.majorId));
  assert.strictEqual(once.items.length, 3);
  once.items.forEach((item) => assert.ok(engine.profileById.has(item.majorId)));
});

check("긍정 응답이 없으면 탐색 전공 3개", () => {
  const engine = loadEngine();
  const answers = [];
  for (let i = 0; i < 12; i += 1) {
    const question = engine.planNext(answers);
    const unknown = question.choices.find((choice) => choice.specialKind === "unknown" || choice.value === "unknown" || choice.special);
    answers.push({ questionId: question.id, choiceIds: [unknown.id] });
  }
  assert.strictEqual(answers.length, 12);
  const result = engine.recommend({ version: engine.data.version, answers, majorIds: ["not-used"] });
  assert.strictEqual(result.kind, "explore");
  assert.deepStrictEqual(result.items.map((item) => item.majorId), engine.data.config.exploreMajorIds);
  result.items.forEach((item) => assert.strictEqual(item.slotKind, "explore"));
  const byOrder = engine.profiles.slice().sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 3).map((item) => item.majorId);
  assert.notDeepStrictEqual(result.items.map((item) => item.majorId), byOrder);
});

check("문항 버전과 경로가 다르면 거절", () => {
  const engine = loadEngine();
  const bad = engine.recommend({ version: "nope", answers: [] });
  assert.strictEqual(bad.ok, false);
  const major = engine.profiles[0];
  const answers = preferenceAnswers(engine, major, preferMajorLate);
  answers[answers.length - 1] = { questionId: "lq-missing", choiceIds: ["missing"] };
  const rejected = engine.recommend({ version: engine.data.version, answers });
  assert.strictEqual(rejected.ok, false);
});

check("특별 보기와 일반 보기를 함께 고르면 거절", () => {
  const engine = loadEngine();
  const question = engine.questionById.get("q1");
  const checked = engine.validateAnswer(question, { questionId: "q1", choiceIds: ["q1-mind", "q1-unknown"] });
  assert.strictEqual(checked.ok, false);
  const tooMany = engine.validateAnswer(question, { questionId: "q1", choiceIds: ["q1-mind", "q1-care", "q1-law"] });
  assert.strictEqual(tooMany.ok, false);
});

if (failed) process.exit(1);
console.log("엔진 테스트 통과");
