const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");

function loadData() {
  return require(path.join(ROOT, "js", "major-finder", "data.js"));
}

function loadEngine(data) {
  const api = require(path.join(ROOT, "js", "major-finder", "engine.js"));
  return api.createEngine(data || loadData());
}

function sourceMajors() {
  const out = execFileSync("python", [path.join(__dirname, "source_majors.py")], {
    cwd: ROOT,
    encoding: "utf8",
  });
  return JSON.parse(out);
}

function choiceByTag(question, tag) {
  return question.choices.find((choice) => (choice.tags || []).indexOf(tag) !== -1);
}

function activityChoice(question, value) {
  return question.choices.find((choice) => choice.value === value);
}

function preferenceAnswers(engine, major, latePicker) {
  const answers = [];
  for (let guard = 0; guard < 12; guard += 1) {
    const question = engine.planNext(answers);
    if (!question) break;
    if (question.kind === "topic") {
      const picks = question.choices.filter((choice) => !choice.special && (choice.tags || []).some((tag) => {
        return tag === "track:" + major.track || tag === "mid:" + major.track + "|" + major.mid || (major.coreTopics || []).indexOf(tag) !== -1;
      }));
      const ids = picks.slice(0, question.maxSelect || 2).map((choice) => choice.id);
      answers.push({ questionId: question.id, choiceIds: ids.length ? ids : [question.id + "-unknown"] });
      continue;
    }
    if (question.kind === "activity") {
      const wanted = major.coreActivity === question.activityId || major.relatedActivity === question.activityId;
      const choice = activityChoice(question, wanted ? "want" : "no");
      answers.push({ questionId: question.id, choiceIds: [choice.id] });
      continue;
    }
    answers.push({ questionId: question.id, choiceIds: [latePicker(question, major)] });
  }
  return answers;
}

function preferMajorLate(question, major) {
  const core = question.choices.find((choice) => !choice.special && choice.coreMajorIds.indexOf(major.majorId) !== -1);
  if (core) return core.id;
  const related = question.choices.find((choice) => !choice.special && choice.relatedMajorIds.indexOf(major.majorId) !== -1);
  if (related) return related.id;
  return question.choices.find((choice) => choice.special).id;
}

module.exports = {
  ROOT,
  loadData,
  loadEngine,
  sourceMajors,
  preferenceAnswers,
  preferMajorLate,
  choiceByTag,
  activityChoice,
};
