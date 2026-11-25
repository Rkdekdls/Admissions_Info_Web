const assert = require("assert");
const { loadEngine, preferenceAnswers, preferMajorLate } = require("./helpers");

const engine = loadEngine();
const data = engine.data;

function resultFor(name) {
  const major = engine.profiles.find((item) => item.name === name);
  const answers = preferenceAnswers(engine, major, preferMajorLate);
  assert.ok(answers.length >= 8 && answers.length <= 10, name + " 문항 수");
  assert.strictEqual(engine.planNext(answers), null, name + " 경로 종료");
  assert.strictEqual(new Set(answers.map((answer) => answer.questionId)).size, answers.length, name + " 문항 중복");
  const result = engine.recommend({ version: data.version, answers });
  assert.strictEqual(result.ok, true, result.error);
  assert.strictEqual(result.items[0].name, name, name);
  assert.strictEqual(result.items[0].slotKind, "recommended");
  return { answers, result };
}

function finishAfterSwap(answers, fromLabel, toLabel) {
  const index = answers.findIndex((answer) => {
    const question = data.lateQuestions.find((item) => item.id === answer.questionId);
    return question && question.choices.some((choice) => choice.id === answer.choiceIds[0] && choice.label.indexOf(fromLabel) !== -1);
  });
  assert.ok(index >= 0, fromLabel);
  const question = data.lateQuestions.find((item) => item.id === answers[index].questionId);
  const nextChoice = question.choices.find((choice) => choice.label.indexOf(toLabel) !== -1);
  assert.ok(nextChoice, toLabel);
  const next = answers.slice(0, index).map((answer) => ({ questionId: answer.questionId, choiceIds: answer.choiceIds.slice() }));
  next.push({ questionId: question.id, choiceIds: [nextChoice.id] });
  while (engine.planNext(next)) {
    const upcoming = engine.planNext(next);
    const neutral = upcoming.choices.find((choice) => choice.special) || upcoming.choices.find((choice) => !choice.special);
    next.push({ questionId: upcoming.id, choiceIds: [neutral.id] });
  }
  const result = engine.recommend({ version: data.version, answers: next });
  assert.strictEqual(result.ok, true, result.error);
  return result;
}

const arch = resultFor("건축학");
const build = resultFor("건축공학");
const city = resultFor("도시공학");
const korean = resultFor("국어국문학");
const english = resultFor("영어영문학");
const medicine = resultFor("의예과");
assert.deepStrictEqual(arch.result.items.map((item) => item.name), ["건축학", "건축공학", "도시공학"]);
assert.deepStrictEqual(korean.result.items.map((item) => item.name), ["국어국문학", "영어영문학", "중국어문학"]);
assert.deepStrictEqual(medicine.result.items.map((item) => item.name), ["의예과", "간호학", "재활치료"]);
[arch, korean, medicine].forEach((item) => {
  const scores = item.result.items.map((row) => row.score);
  assert.ok(scores[0] >= scores[1] && scores[1] >= scores[2]);
});
const law = resultFor("법학");
const nursing = resultFor("간호학");
const rehab = resultFor("재활치료");
const stats = resultFor("통계학");
const ai = resultFor("인공지능공학");
const mind = resultFor("심리학");
const society = resultFor("사회학");

const careSwap = finishAfterSwap(nursing.answers, "돌보기", "다시 걷");
assert.strictEqual(careSwap.items[0].name, "재활치료");
assert.ok(careSwap.items[0].reason.indexOf("다시 걷") !== -1);

function pathWith(tags, lateLabel) {
  const answers = [];
  while (engine.planNext(answers)) {
    const question = engine.planNext(answers);
    if (question.kind === "topic") {
      const hits = question.choices.filter((choice) => !choice.special && (choice.tags || []).some((tag) => tags.indexOf(tag) !== -1));
      const skip = question.choices.find((choice) => choice.specialKind === "unknown");
      answers.push({
        questionId: question.id,
        choiceIds: hits.length ? [hits[0].id] : [skip.id],
      });
      continue;
    }
    if (question.kind === "activity") {
      const skip = question.choices.find((choice) => choice.value === "unknown");
      answers.push({ questionId: question.id, choiceIds: [skip.id] });
      continue;
    }
    const hit = question.choices.find((choice) => !choice.special && choice.label.indexOf(lateLabel) !== -1);
    const fallback = question.choices.find((choice) => choice.special);
    answers.push({ questionId: question.id, choiceIds: [(hit || fallback).id] });
  }
  const result = engine.recommend({ version: data.version, answers });
  assert.strictEqual(result.ok, true, result.error);
  return result;
}

const surveySwap = pathWith(["t_number", "t_soft"], "추천");
assert.strictEqual(surveySwap.items[0].name, "인공지능공학");
assert.ok(surveySwap.items[0].reason.indexOf("추천") !== -1);
const surveyBase = pathWith(["t_number", "t_soft"], "설문");
assert.strictEqual(surveyBase.items[0].name, "통계학");
assert.notStrictEqual(surveyBase.items[0].reason, surveySwap.items[0].reason);

const mindSwap = finishAfterSwap(mind.answers, "다르게 느끼", "규칙이 생기는");
assert.strictEqual(mindSwap.items[0].name, "사회학");
assert.ok(mindSwap.items[0].reason.indexOf("규칙이 생기는") !== -1);

const languageSwap = finishAfterSwap(korean.answers, "한국어", "영어");
assert.strictEqual(languageSwap.items[0].name, "영어영문학");
assert.ok(languageSwap.items[0].reason.indexOf("영어") !== -1);

const noneAnswers = [];
for (let i = 0; i < 10; i += 1) {
  const question = engine.planNext(noneAnswers);
  if (!question) break;
  const skip = question.choices.find((choice) => choice.specialKind === "unknown" || choice.special);
  noneAnswers.push({ questionId: question.id, choiceIds: [skip.id] });
}
const none = engine.recommend({ version: data.version, answers: noneAnswers });
assert.strictEqual(none.kind, "explore");
assert.strictEqual(none.items.length, 3);

const session = engine.createSession();
session.phase = "question";
let total = 0;
for (let i = 0; i < 10; i += 1) {
  const question = engine.currentQuestion(session);
  if (!question) break;
  const real = question.choices.filter((item) => !item.special);
  engine.setAnswer(session, { questionId: question.id, choiceIds: [real[real.length - 1].id] });
  total = session.steps.length;
  if (engine.hasNext(session)) session.cursor += 1;
}
assert.ok(total >= 8 && total <= 10);
session.cursor = 0;
engine.currentQuestion(session);
assert.strictEqual(session.steps.length, total, "뒤로 이동만 하면 이후 응답을 유지");
const first = session.steps[0].answer.choiceIds[0];
const other = engine.currentQuestion(session).choices.find((choice) => !choice.special && choice.id !== first);
engine.setAnswer(session, { questionId: "q1", choiceIds: [other.id] });
assert.ok(session.steps.length <= 5, "관심 문항을 바꾸면 이후 맞춤 문항은 다시 고름");
assert.ok(session.steps.slice(1, 5).every((step) => step.answer), "다른 관심 문항 응답은 유지");
assert.notStrictEqual(session.steps[0].answer.choiceIds[0], first);

console.log("시나리오 검증 통과");
console.log("건설", [arch, build, city].map((item) => item.result.items[0].name).join(" / "));
console.log("언어", korean.result.items[0].name, "->", english.result.items[0].name);
console.log("의학", medicine.result.items[0].name, "법학", law.result.items[0].name);
console.log("변경", [careSwap, surveySwap, mindSwap, languageSwap].map((item) => item.items[0].name).join(" / "));
console.log("재활", rehab.result.items[0].name, "인공지능", ai.result.items[0].name, "사회학", society.result.items[0].name);
