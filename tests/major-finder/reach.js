const { loadEngine, preferenceAnswers, preferMajorLate } = require("./helpers");

const engine = loadEngine();
const misses = [];

engine.profiles.forEach((major) => {
  const offered = [];
  const answers = preferenceAnswers(engine, major, (question, target) => {
    offered.push(question.id);
    return preferMajorLate(question, target);
  });
  const result = engine.recommend({ version: engine.data.version, answers });
  if (!result.ok) {
    misses.push({ name: major.name, cause: "경로 오류: " + result.error, offered });
    return;
  }
  const top = result.items.map((item) => item.majorId);
  if (top.indexOf(major.majorId) === -1) {
    const scored = engine.scoreRows(answers.slice(0, 12));
    const row = scored.rows.find((item) => item.majorId === major.majorId);
    const rank = scored.rows.findIndex((item) => item.majorId === major.majorId) + 1;
    const finalRank = engine.scoreRows(answers).rows.findIndex((item) => item.majorId === major.majorId) + 1;
    const exposed = offered.some((id) => {
      const question = engine.lateById.get(id);
      return question.choices.some((choice) => choice.coreMajorIds.indexOf(major.majorId) !== -1);
    });
    let cause = "배점";
    if (!exposed) cause = "질문 노출";
    else if (row.coreTopicMatch !== 1) cause = "태그";
    misses.push({
      name: major.name,
      cause,
      rankBeforeLate: rank,
      rankAfter: finalRank,
      baseScore: row.points2 / 2,
      top: result.items.map((item) => item.name).join(", "),
      offered: offered.join(", "),
    });
  }
});

console.log("상위 3개 도달:", engine.profiles.length - misses.length, "/", engine.profiles.length);
if (misses.length) {
  misses.forEach((item) => {
    console.error(`- ${item.name}: 원인 ${item.cause}, 후반 전 순위 ${item.rankBeforeLate}, 최종 순위 ${item.rankAfter}, 기본점 ${item.baseScore}, 질문 [${item.offered}], 결과 [${item.top}]`);
  });
  process.exit(1);
}
console.log("전공별 도달 검증 통과");
