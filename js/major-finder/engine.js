/* 전공 찾기 추천 엔진. UI와 분리되어 있고, 같은 답변·데이터·버전이면 같은 결과를 반환한다. */
(function (root) {
  function fail(error) {
    return { ok: false, error: error };
  }

  function createEngine(data) {
    if (!data || !data.config) throw new Error("major finder data missing");
    const weights = data.config.weights;
    const profiles = data.profiles.slice().sort(function (a, b) {
      return a.sortOrder - b.sortOrder;
    });
    const profileById = new Map(profiles.map(function (p) { return [p.majorId, p]; }));
    const questionById = new Map(data.questions.map(function (q) { return [q.id, q]; }));
    const lateById = new Map(data.lateQuestions.map(function (q) { return [q.id, q]; }));
    const tagById = new Map(data.tags.map(function (t) { return [t.id, t]; }));
    const fixedIds = data.questions.map(function (q) { return q.id; });

    function unitsOf(valueName) {
      var value = data.config.activityValues[valueName];
      if (typeof value !== "number") return null;
      return Math.round(value * 4) / 2;
    }

    function sameIds(a, b) {
      if (!a || !b || a.questionId !== b.questionId) return false;
      var left = (a.choiceIds || []).slice().sort();
      var right = (b.choiceIds || []).slice().sort();
      return left.length === right.length && left.every(function (id, i) { return id === right[i]; });
    }

    function validateAnswer(question, answer) {
      if (!question) return fail("문항을 찾을 수 없습니다.");
      if (!answer || answer.questionId !== question.id) return fail("문항 ID가 맞지 않습니다.");
      if (!Array.isArray(answer.choiceIds)) return fail("보기 ID가 필요합니다.");
      var ids = answer.choiceIds;
      if (new Set(ids).size !== ids.length) return fail("보기를 중복 선택할 수 없습니다.");
      var choices = ids.map(function (id) {
        return question.choices.find(function (c) { return c.id === id; });
      });
      if (choices.some(function (c) { return !c; })) return fail("존재하지 않는 보기입니다.");
      var specials = choices.filter(function (c) { return c.special; });
      if (question.kind === "activity") {
        if (ids.length !== 1) return fail("활동 문항은 하나만 고를 수 있습니다.");
        if (unitsOf(choices[0].value) === null) return fail("활동 응답값이 올바르지 않습니다.");
        return { ok: true };
      }
      var maxSelect = question.maxSelect || 2;
      if (specials.length) {
        if (ids.length !== 1) return fail("특별 보기는 혼자만 고를 수 있습니다.");
        return { ok: true };
      }
      if (ids.length < 1 || ids.length > maxSelect) return fail("보기 선택 수가 맞지 않습니다.");
      return { ok: true };
    }

    function topicTagsOf(answers) {
      var tags = [];
      answers.forEach(function (answer) {
        var question = questionById.get(answer.questionId);
        if (!question || question.kind !== "topic") return;
        answer.choiceIds.forEach(function (id) {
          var choice = question.choices.find(function (c) { return c.id === id; });
          (choice && choice.tags || []).forEach(function (tag) {
            if (tags.indexOf(tag) === -1) tags.push(tag);
          });
        });
      });
      return tags;
    }

    function activityUnitsOf(answers) {
      var map = {};
      data.tags.filter(function (t) { return t.type === "activity"; }).forEach(function (t) {
        map[t.id] = 0;
      });
      answers.forEach(function (answer) {
        var question = questionById.get(answer.questionId);
        if (!question || question.kind !== "activity") return;
        var choice = question.choices.find(function (c) { return c.id === answer.choiceIds[0]; });
        if (!choice) return;
        map[question.activityId] = unitsOf(choice.value);
      });
      return map;
    }

    function lateContribution(profile, question, choiceIds) {
      var best = 0;
      var core = false;
      choiceIds.forEach(function (id) {
        var choice = question.choices.find(function (c) { return c.id === id; });
        if (!choice || choice.special) return;
        if (choice.coreMajorIds.indexOf(profile.majorId) !== -1) {
          best = Math.max(best, weights.lateCore * 2);
          core = true;
        } else if (choice.relatedMajorIds.indexOf(profile.majorId) !== -1) {
          best = Math.max(best, weights.lateRelated * 2);
        }
      });
      return { points2: best, core: core };
    }

    function blankLate() {
      var map = new Map();
      profiles.forEach(function (p) {
        map.set(p.majorId, { points2: 0, coreCount: 0 });
      });
      return map;
    }

    function applyLateAnswer(map, question, choiceIds) {
      profiles.forEach(function (profile) {
        var got = lateContribution(profile, question, choiceIds);
        var slot = map.get(profile.majorId);
        slot.points2 += got.points2;
        if (got.core) slot.coreCount += 1;
      });
    }

    function capLate(map) {
      var cap = weights.lateCap * 2;
      map.forEach(function (slot) {
        if (slot.points2 > cap) slot.points2 = cap;
      });
    }

    function lateMapOf(answers, extra) {
      var map = blankLate();
      answers.forEach(function (answer) {
        var question = lateById.get(answer.questionId);
        if (!question) return;
        applyLateAnswer(map, question, answer.choiceIds);
      });
      if (extra && extra.question && extra.choiceIds) {
        applyLateAnswer(map, extra.question, extra.choiceIds);
      }
      capLate(map);
      return map;
    }

    function connected(profile, tags) {
      return profile.coreTopics.concat(profile.relatedTopics).some(function (tag) {
        return tags.indexOf(tag) !== -1;
      });
    }

    function scoreRows(answers, extra) {
      var tags = topicTagsOf(answers);
      var activities = activityUnitsOf(answers);
      var late = lateMapOf(answers, extra);
      var rows = profiles.map(function (profile) {
        var topic = 0;
        var coreTopicMatch = 0;
        var hierarchical = profile.coreTopics[0] && String(profile.coreTopics[0]).indexOf("mid:") === 0;
        if (hierarchical) {
          var midTag = "mid:" + profile.track + "|" + profile.mid;
          var trackTag = "track:" + profile.track;
          var midHit = tags.indexOf(midTag) !== -1;
          var trackHit = tags.indexOf(trackTag) !== -1;
          var narrowed = tags.some(function (tag) { return tag.indexOf("mid:" + profile.track + "|") === 0; });
          if (midHit || (trackHit && !narrowed)) {
            topic = weights.topicCore * 2;
            coreTopicMatch = 1;
          } else if (trackHit) {
            topic = weights.topicRelated * 2;
          }
        } else if (profile.coreTopics.some(function (tag) { return tags.indexOf(tag) !== -1; })) {
          topic = weights.topicCore * 2;
          coreTopicMatch = 1;
        } else if (profile.relatedTopics.some(function (tag) { return tags.indexOf(tag) !== -1; })) {
          topic = weights.topicRelated * 2;
        }
        var coreUnits = activities[profile.coreActivity] || 0;
        var relatedUnits = profile.relatedActivity ? (activities[profile.relatedActivity] || 0) : 0;
        var activity = coreUnits * weights.activityCore + relatedUnits * weights.activityRelated;
        var lateSlot = late.get(profile.majorId);
        var points2 = topic + activity + lateSlot.points2;
        return {
          majorId: profile.majorId,
          name: profile.name,
          track: profile.track,
          mid: profile.mid,
          sortOrder: profile.sortOrder,
          studyText: profile.studyText,
          points2: points2,
          topicPoints2: topic,
          activityPoints2: activity,
          latePoints2: lateSlot.points2,
          lateCoreCount: lateSlot.coreCount,
          coreTopicMatch: coreTopicMatch,
          profile: profile,
        };
      });
      rows.sort(function (a, b) {
        if (b.points2 !== a.points2) return b.points2 - a.points2;
        if (b.lateCoreCount !== a.lateCoreCount) return b.lateCoreCount - a.lateCoreCount;
        if (b.coreTopicMatch !== a.coreTopicMatch) return b.coreTopicMatch - a.coreTopicMatch;
        if (b.activityPoints2 !== a.activityPoints2) return b.activityPoints2 - a.activityPoints2;
        return a.majorId < b.majorId ? -1 : a.majorId > b.majorId ? 1 : 0;
      });
      return { rows: rows, tags: tags, activities: activities };
    }

    function topSet(rows) {
      return new Set(rows.slice(0, 3).map(function (row) { return row.majorId; }));
    }

    function sameSet(a, b) {
      if (a.size !== b.size) return false;
      var ok = true;
      a.forEach(function (id) { if (!b.has(id)) ok = false; });
      return ok;
    }

    function candidateSet(scored) {
      var rows = scored.rows;
      var top = rows.slice(0, data.config.candidate.topN).map(function (row) { return row.majorId; });
      var rank3 = rows[Math.min(2, rows.length - 1)];
      var window2 = data.config.candidate.withinRank3 * 2;
      var extra = rows.filter(function (row) {
        return top.indexOf(row.majorId) === -1 && rank3.points2 - row.points2 <= window2 && connected(row.profile, scored.tags);
      }).map(function (row) { return row.majorId; });
      return new Set(top.concat(extra));
    }

    function askedState(answers) {
      var ids = new Set();
      var diffs = new Set();
      answers.forEach(function (answer) {
        var question = lateById.get(answer.questionId);
        if (!question) return;
        ids.add(question.id);
        diffs.add(question.diffId);
      });
      return { ids: ids, diffs: diffs };
    }

    function rankingInfo(question, scored, answers) {
      var options = question.choices.filter(function (choice) { return !choice.special; });
      var supports = [];
      options.forEach(function (choice) {
        var majors = [];
        choice.coreMajorIds.concat(choice.relatedMajorIds).forEach(function (id) {
          if (scored.candidates.has(id) && majors.indexOf(id) === -1) majors.push(id);
        });
        if (majors.length) supports.push(majors.slice().sort().join("|"));
      });
      if (supports.length < 2) return null;
      var distinct = supports.some(function (key) { return key !== supports[0]; });
      if (!distinct) return null;
      var before = topSet(scored.rows);
      var changeCount = 0;
      options.forEach(function (choice) {
        var hyp = scoreRows(answers, { question: question, choiceIds: [choice.id] });
        if (!sameSet(before, topSet(hyp.rows))) changeCount += 1;
      });
      if (changeCount < 1) return null;
      var rank3 = scored.rows[Math.min(2, scored.rows.length - 1)];
      var window2 = data.config.candidate.withinRank3 * 2;
      var linked = new Set();
      options.forEach(function (choice) {
        choice.coreMajorIds.concat(choice.relatedMajorIds).forEach(function (id) {
          if (scored.candidates.has(id)) linked.add(id);
        });
      });
      var closeCount = 0;
      linked.forEach(function (id) {
        var row = scored.rows.find(function (item) { return item.majorId === id; });
        if (row && rank3.points2 - row.points2 <= window2) closeCount += 1;
      });
      return { changeCount: changeCount, closeCount: closeCount };
    }

    function focusOf(answers) {
      var tags = topicTagsOf(answers);
      return {
        tags: tags,
        mids: tags.filter(function (tag) { return tag.indexOf("mid:") === 0; }),
        tracks: tags.filter(function (tag) { return tag.indexOf("track:") === 0; }),
      };
    }

    function lateInFocus(question, focus) {
      if (!question || question.role === "default") return false;
      var real = question.choices.filter(function (choice) { return !choice.special; }).length;
      if (real < 2) return false;
      if (focus.mids.length) return question.topicTags.some(function (tag) { return focus.mids.indexOf(tag) !== -1; });
      if (focus.tracks.length) return question.topicTags.some(function (tag) { return focus.tracks.indexOf(tag) !== -1; });
      return false;
    }

    function midSize(midTag) {
      return profiles.filter(function (profile) {
        return "mid:" + profile.track + "|" + profile.mid === midTag;
      }).length;
    }

    function lateBudget(focus) {
      if (focus.mids.length) {
        var maxSize = 0;
        focus.mids.forEach(function (tag) { maxSize = Math.max(maxSize, midSize(tag)); });
        if (maxSize < 2) return 0;
        return Math.ceil(maxSize / 3);
      }
      return focus.tracks.length ? 2 : 0;
    }

    function midQuestionsFor(tracks) {
      return data.questions.filter(function (question) {
        return question.kind === "topic" && question.trackTag && tracks.indexOf(question.trackTag) !== -1;
      }).sort(function (a, b) { return a.id < b.id ? -1 : 1; });
    }

    function pickFocusedActivity(answers, focus) {
      var asked = {};
      answers.forEach(function (answer) {
        var question = questionById.get(answer.questionId);
        if (question && question.kind === "activity") asked[question.id] = true;
      });
      var pool = data.questions.filter(function (question) {
        return question.kind === "activity" && !asked[question.id];
      });
      var weight = {};
      focusedProfiles(focus).forEach(function (profile) {
        weight[profile.coreActivity] = (weight[profile.coreActivity] || 0) + 2;
        if (profile.relatedActivity) weight[profile.relatedActivity] = (weight[profile.relatedActivity] || 0) + 1;
      });
      return pool.slice().sort(function (a, b) {
        var diff = (weight[b.activityId] || 0) - (weight[a.activityId] || 0);
        if (diff) return diff;
        return a.id < b.id ? -1 : 1;
      })[0] || null;
    }

    function focusedProfiles(focus) {
      return profiles.filter(function (profile) {
        var midTag = "mid:" + profile.track + "|" + profile.mid;
        var trackTag = "track:" + profile.track;
        if (focus.mids.length) return focus.mids.indexOf(midTag) !== -1;
        if (focus.tracks.length) return focus.tracks.indexOf(trackTag) !== -1;
        return false;
      });
    }

    function activityCandidates(scored, tags) {
      var rows = scored.rows.slice().sort(function (a, b) {
        if (b.topicPoints2 !== a.topicPoints2) return b.topicPoints2 - a.topicPoints2;
        return a.majorId < b.majorId ? -1 : a.majorId > b.majorId ? 1 : 0;
      });
      var top = rows.slice(0, Math.min(8, rows.length));
      var line = top.length ? top[top.length - 1].topicPoints2 : 0;
      var extra = rows.filter(function (row) {
        return top.indexOf(row) === -1 && row.topicPoints2 === line && connected(row.profile, tags);
      });
      return top.concat(extra).map(function (row) { return row.profile; });
    }

    function coreTagsSelected(answers) {
      var order = [];
      answers.forEach(function (answer) {
        var question = questionById.get(answer.questionId);
        if (!question || question.kind !== "topic") return;
        answer.choiceIds.forEach(function (id) {
          var choice = question.choices.find(function (c) { return c.id === id; });
          (choice && choice.tags || []).forEach(function (tag) {
            if (order.indexOf(tag) !== -1) return;
            var isCore = profiles.some(function (profile) { return profile.coreTopics.indexOf(tag) !== -1; });
            if (isCore) order.push(tag);
          });
        });
      });
      return order;
    }

    function bestPoints(scored, tag) {
      var best = 0;
      scored.rows.forEach(function (row) {
        if (row.profile.coreTopics.indexOf(tag) !== -1 && row.points2 > best) best = row.points2;
      });
      return best;
    }

    function rankedCoreTags(answers) {
      var tags = coreTagsSelected(answers);
      if (tags.length < 2) return tags;
      var scored = scoreRows(answers);
      return tags.slice().sort(function (a, b) {
        var diff = bestPoints(scored, b) - bestPoints(scored, a);
        if (diff) return diff;
        return tags.indexOf(a) - tags.indexOf(b);
      });
    }

    function activityCount(answers) {
      return answers.filter(function (answer) {
        var question = questionById.get(answer.questionId);
        return question && question.kind === "activity";
      }).length;
    }

    function unaskedActivities(answers) {
      var asked = {};
      answers.forEach(function (answer) { asked[answer.questionId] = true; });
      return data.questions.filter(function (question) {
        return question.kind === "activity" && !asked[question.id];
      });
    }

    function pickActivityForTag(answers, tag) {
      var pool = unaskedActivities(answers);
      var members = profiles.filter(function (profile) { return profile.coreTopics.indexOf(tag) !== -1; });
      if (!pool.length || !members.length) return null;
      var ranked = pool.map(function (question) {
        var weight = 0;
        var values = members.map(function (profile) {
          if (profile.coreActivity === question.activityId) {
            weight += 2;
            return 25;
          }
          if (profile.relatedActivity === question.activityId) {
            weight += 1;
            return 10;
          }
          return 0;
        });
        var spread = Math.max.apply(null, values) - Math.min.apply(null, values);
        return { question: question, weight: weight, spread: spread };
      }).sort(function (a, b) {
        if (b.weight !== a.weight) return b.weight - a.weight;
        if (b.spread !== a.spread) return b.spread - a.spread;
        return a.question.id < b.question.id ? -1 : 1;
      });
      if (!ranked.length || ranked[0].weight <= 0) return null;
      return ranked[0].question;
    }

    function pickNextActivity(answers) {
      var cores = coreTagsSelected(answers);
      if (cores.length >= 2) {
        var target = activityCount(answers) === 1 ? cores[1] : cores[0];
        var aimed = pickActivityForTag(answers, target);
        if (aimed) return aimed;
      }
      var asked = {};
      answers.forEach(function (answer) { asked[answer.questionId] = true; });
      var pool = data.questions.filter(function (question) {
        return question.kind === "activity" && !asked[question.id];
      });
      if (!pool.length) return null;
      var tags = topicTagsOf(answers);
      var scored = scoreRows(answers);
      var candidates = tags.length ? activityCandidates(scored, tags) : [];
      if (candidates.length >= 2) {
        var ranked = pool.map(function (question) {
          var values = candidates.map(function (profile) {
            if (profile.coreActivity === question.activityId) return 25;
            if (profile.relatedActivity === question.activityId) return 10;
            return 0;
          });
          var spread = Math.max.apply(null, values) - Math.min.apply(null, values);
          var coreCount = values.filter(function (value) { return value === 25; }).length;
          var linked = values.filter(function (value) { return value > 0; }).length;
          return { question: question, spread: spread, coreCount: coreCount, linked: linked };
        }).sort(function (a, b) {
          if ((a.linked === 0) !== (b.linked === 0)) return a.linked === 0 ? 1 : -1;
          if (b.spread !== a.spread) return b.spread - a.spread;
          if (b.coreCount !== a.coreCount) return b.coreCount - a.coreCount;
          return a.question.id < b.question.id ? -1 : 1;
        });
        if (ranked[0] && ranked[0].spread > 0) return ranked[0].question;
      }
      return pool.slice().sort(function (a, b) { return a.id < b.id ? -1 : 1; })[0];
    }

    function planNext(answers) {
      var topicIds = ["q1", "q2", "q3", "q4", "q5", "q6"];
      if (topicIds.every(function (id) { return questionById.has(id); })) {
        if (answers.length < 6) return questionById.get(topicIds[answers.length]);
        var actCount = answers.filter(function (answer) {
          var question = questionById.get(answer.questionId);
          return question && question.kind === "activity";
        }).length;
        if (actCount < 3) return pickNextActivity(answers);
        var lateCount = answers.filter(function (answer) { return lateById.has(answer.questionId); }).length;
        if (lateCount < 3) return selectLateQuestion(answers);
        return null;
      }
      return null;
    }

    function weightLeft(focus, question) {
      var weight = 0;
      focusedProfiles(focus).forEach(function (profile) {
        if (profile.coreActivity === question.activityId) weight += 2;
        if (profile.relatedActivity === question.activityId) weight += 1;
      });
      return weight > 0;
    }

    function phasePlan(answers) {
      var focus = focusOf(answers);
      var trackAnswered = answers.some(function (answer) { return answer.questionId === "q-track"; });
      var askedTopic = answers.filter(function (answer) {
        var question = questionById.get(answer.questionId);
        return question && question.kind === "topic";
      }).length;
      var topicTotal = 2;
      if (trackAnswered && !focus.tracks.length) topicTotal = 1;
      else if (focus.tracks.length) topicTotal = 1 + midQuestionsFor(focus.tracks).length;
      topicTotal = Math.max(topicTotal, askedTopic);
      return {
        topic: topicTotal,
        activity: !trackAnswered || focus.tracks.length ? 2 : 0,
        late: !trackAnswered ? 2 : lateBudget(focus),
      };
    }

    function selectLateForTag(answers, tag) {
      var asked = askedState(answers);
      var ids = {};
      profiles.forEach(function (profile) {
        if (profile.coreTopics.indexOf(tag) !== -1) ids[profile.majorId] = true;
      });
      function fresh(question) {
        return question && !asked.ids.has(question.id) && !asked.diffs.has(question.diffId) && question.role !== "default";
      }
      function hits(question) {
        var count = 0;
        question.choices.forEach(function (choice) {
          if (choice.special) return;
          choice.coreMajorIds.forEach(function (id) { if (ids[id]) count += 1; });
        });
        return count;
      }
      var ranking = [];
      data.lateQuestions.forEach(function (question) {
        if (!fresh(question) || hits(question) < 1) return;
        var real = question.choices.filter(function (choice) { return !choice.special; }).length;
        if (real < 2) return;
        var before = scoreRows(answers).rows.filter(function (row) { return ids[row.majorId]; }).slice(0, 2);
        var changeCount = 0;
        question.choices.forEach(function (choice) {
          if (choice.special || !choice.coreMajorIds.some(function (id) { return ids[id]; })) return;
          var next = scoreRows(answers, { question: question, choiceIds: [choice.id] }).rows.filter(function (row) {
            return ids[row.majorId];
          }).slice(0, before.length);
          if (before.some(function (row, index) { return !next[index] || next[index].majorId !== row.majorId; })) changeCount += 1;
        });
        ranking.push({
          question: question,
          hits: hits(question),
          changeCount: changeCount,
          topicHit: (question.topicTags || []).indexOf(tag) !== -1 ? 1 : 0,
        });
      });
      ranking.sort(function (a, b) {
        if (b.changeCount !== a.changeCount) return b.changeCount - a.changeCount;
        if (b.hits !== a.hits) return b.hits - a.hits;
        if (b.topicHit !== a.topicHit) return b.topicHit - a.topicHit;
        return a.question.id < b.question.id ? -1 : 1;
      });
      return ranking.length ? ranking[0].question : null;
    }

    function selectLateQuestion(answers) {
      var lateCount = answers.filter(function (answer) { return lateById.has(answer.questionId); }).length;
      if (lateCount < 3) {
        var pre = answers.filter(function (answer) { return !lateById.has(answer.questionId); });
        var cores = rankedCoreTags(pre);
        if (cores.length >= 2) {
          var aimed = selectLateForTag(answers, lateCount < 2 ? cores[0] : cores[1]);
          if (aimed) return aimed;
        }
      }
      var scored = scoreRows(answers);
      scored.candidates = candidateSet(scored);
      var asked = askedState(answers);
      var tags = topicTagsOf(answers);
      function fresh(question) {
        return question && !asked.ids.has(question.id) && !asked.diffs.has(question.diffId);
      }
      var covered = {};
      answers.forEach(function (answer) {
        var question = lateById.get(answer.questionId);
        if (!question) return;
        (question.topicTags || []).forEach(function (tag) { covered[tag] = true; });
      });
      var ranking = [];
      data.lateQuestions.forEach(function (question) {
        if (!fresh(question) || question.role === "default") return;
        var real = question.choices.filter(function (choice) { return !choice.special; }).length;
        if (real < 2) return;
        var info = rankingInfo(question, scored, answers);
        if (!info) return;
        var freshTopics = (question.topicTags || []).filter(function (tag) {
          return tags.indexOf(tag) !== -1 && !covered[tag];
        }).length;
        ranking.push({ question: question, info: info, freshTopics: freshTopics });
      });
      ranking.sort(function (a, b) {
        if (b.info.changeCount !== a.info.changeCount) return b.info.changeCount - a.info.changeCount;
        if (b.info.closeCount !== a.info.closeCount) return b.info.closeCount - a.info.closeCount;
        if (b.freshTopics !== a.freshTopics) return b.freshTopics - a.freshTopics;
        return a.question.id < b.question.id ? -1 : a.question.id > b.question.id ? 1 : 0;
      });
      if (ranking.length) return ranking[0].question;
      var clarify = data.lateQuestions.filter(function (question) {
        return fresh(question) && question.role !== "default" && (question.topicTags || []).some(function (tag) {
          return tags.indexOf(tag) !== -1;
        });
      });
      clarify.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
      if (clarify.length) return clarify[0];
      var rest = data.lateQuestions.filter(fresh);
      rest.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
      return rest[0] || null;
    }

    function hasPositive(answers, tags, activities) {
      if (tags.length) return true;
      var positiveActivity = Object.keys(activities).some(function (key) { return activities[key] > 0; });
      if (positiveActivity) return true;
      return answers.some(function (answer) {
        var question = lateById.get(answer.questionId);
        if (!question) return false;
        return answer.choiceIds.some(function (id) {
          var choice = question.choices.find(function (c) { return c.id === id; });
          return choice && !choice.special;
        });
      });
    }

    function topicChoiceLabel(answers, tag) {
      var label = "";
      answers.forEach(function (answer) {
        if (label) return;
        var question = questionById.get(answer.questionId);
        if (!question || question.kind !== "topic") return;
        answer.choiceIds.forEach(function (id) {
          if (label) return;
          var choice = question.choices.find(function (c) { return c.id === id; });
          if (choice && (choice.tags || []).indexOf(tag) !== -1) label = choice.label;
        });
      });
      return label;
    }

    function pickedPhrase(label) {
      if (/공부$/.test(label)) return label.replace(/공부$/, "공부를 골랐어요.");
      if (/일$/.test(label)) return label.replace(/일$/, "일을 골랐어요.");
      return label + " 쪽을 골랐어요.";
    }

    function reasonFor(row, answers) {
      var found = "";
      answers.forEach(function (answer) {
        if (found) return;
        var question = lateById.get(answer.questionId);
        if (!question) return;
        answer.choiceIds.forEach(function (id) {
          if (found) return;
          var choice = question.choices.find(function (c) { return c.id === id; });
          if (choice && !choice.special && choice.coreMajorIds.indexOf(row.majorId) !== -1 && choice.reason) {
            found = choice.reason;
          }
        });
      });
      if (found) return found;
      var tags = topicTagsOf(answers);
      var activities = activityUnitsOf(answers);
      var coreHit = row.profile.coreTopics.find(function (tag) { return tags.indexOf(tag) !== -1; });
      var positiveAct = (activities[row.profile.coreActivity] || 0) > 0
        || (row.profile.relatedActivity && (activities[row.profile.relatedActivity] || 0) > 0);
      if (coreHit && positiveAct) {
        var actId = (activities[row.profile.coreActivity] || 0) > 0 ? row.profile.coreActivity : row.profile.relatedActivity;
        var act = tagById.get(actId);
        var topic = tagById.get(coreHit);
        return (topic ? topic.label : "고른 주제") + "에 관심을 골랐고, " + (act ? act.label : "고른 활동") + "을 해보고 싶다고 답했어요.";
      }
      var matched = coreHit;
      if (matched) {
        var tag = tagById.get(matched);
        return (tag ? tag.label : "고른 주제") + "에 관심을 골랐어요.";
      }
      if ((activities[row.profile.coreActivity] || 0) > 0) {
        var act = tagById.get(row.profile.coreActivity);
        return (act ? act.label : "고른") + " 활동을 해보고 싶다고 답했어요.";
      }
      if (row.profile.relatedActivity && (activities[row.profile.relatedActivity] || 0) > 0) {
        var rel = tagById.get(row.profile.relatedActivity);
        return (rel ? rel.label : "고른") + " 활동을 해보고 싶다고 답했어요.";
      }
      return "선택한 관심과 가까운 전공이에요.";
    }

    function present(row, slotKind, reason) {
      return {
        majorId: row.majorId,
        name: row.name,
        track: row.track,
        mid: row.mid,
        sortOrder: row.sortOrder,
        studyText: row.studyText,
        slotKind: slotKind,
        reason: reason,
        points2: row.points2,
        score: row.points2 / 2,
        breakdown: {
          topic: row.topicPoints2 / 2,
          activity: row.activityPoints2 / 2,
          late: row.latePoints2 / 2,
          lateCoreCount: row.lateCoreCount,
          coreTopicMatch: row.coreTopicMatch === 1,
        },
      };
    }

    function questionKind(id) {
      var question = questionById.get(id);
      if (question) return question.kind;
      if (lateById.has(id)) return "late";
      return "";
    }

    function positiveActivity(answers) {
      var units = activityUnitsOf(answers);
      return Object.keys(units).some(function (key) { return units[key] > 0; });
    }

    function pickActivityQuestion(answers, pool) {
      var tags = topicTagsOf(answers);
      var weight = {};
      profiles.forEach(function (profile) {
        var hit = !tags.length || profile.coreTopics.concat(profile.relatedTopics).some(function (tag) {
          return tags.indexOf(tag) !== -1;
        });
        if (!hit) return;
        weight[profile.coreActivity] = (weight[profile.coreActivity] || 0) + (tags.length ? 2 : 1);
        if (profile.relatedActivity) weight[profile.relatedActivity] = (weight[profile.relatedActivity] || 0) + 1;
      });
      return pool.slice().sort(function (a, b) {
        var diff = (weight[b.activityId] || 0) - (weight[a.activityId] || 0);
        if (diff) return diff;
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      })[0] || null;
    }

    function pickQuestion(answers, askedIds) {
      if (answers.length >= 6) return null;
      var topics = answers.filter(function (answer) { return questionKind(answer.questionId) === "topic"; });
      var acts = answers.filter(function (answer) { return questionKind(answer.questionId) === "activity"; });
      var lates = answers.filter(function (answer) { return questionKind(answer.questionId) === "late"; });
      var tags = topicTagsOf(answers);
      var positive = positiveActivity(answers);
      var room = 6 - answers.length;
      var topicLeft = data.questions.filter(function (question) {
        return question.kind === "topic" && askedIds.indexOf(question.id) === -1;
      });
      if (!topics.length && topicLeft.length) return topicLeft[0];
      if (!tags.length && topics.length < 2 && room > 2 && topicLeft.length) return topicLeft[0];
      var actLeft = data.questions.filter(function (question) {
        return question.kind === "activity" && askedIds.indexOf(question.id) === -1;
      });
      var reserveLate = lates.length ? 0 : 1;
      var actGoal = positive ? 1 : 2;
      if (acts.length < actGoal && actLeft.length && room > reserveLate) {
        return pickActivityQuestion(answers, actLeft);
      }
      if (lates.length >= 2) return null;
      if (lates.length === 1 && positive && tags.length && answers.length >= 4) return null;
      if (answers.length < 4 || !lates.length || (lates.length === 1 && (!positive || !tags.length))) {
        return selectLateQuestion(answers);
      }
      return null;
    }

    function isShort(session) {
      return !!(session && session.mode === "short");
    }

    function materializeShort(session, index) {
      var built = [];
      for (var i = 0; i <= index; i += 1) {
        if (i > 0 && !built[i - 1].answer) return fail("이전 문항 응답이 없습니다.");
        var answers = built.map(function (step) { return step.answer; }).filter(Boolean);
        var asked = built.map(function (step) { return step.questionId; });
        var question = pickQuestion(answers, asked);
        if (!question) return fail("다음 문항이 없습니다.");
        var prev = session.steps[i];
        built.push({
          questionId: question.id,
          answer: prev && prev.questionId === question.id ? (prev.answer || null) : null,
        });
      }
      return { ok: true, steps: built };
    }

    function checkShortPath(answers) {
      if (!Array.isArray(answers) || answers.length < 4 || answers.length > 6) return fail("응답은 4개에서 6개 문항이어야 합니다.");
      var prior = [];
      var asked = [];
      for (var i = 0; i < answers.length; i += 1) {
        var expected = pickQuestion(prior, asked);
        if (!expected || answers[i].questionId !== expected.id) return fail("문항 경로가 맞지 않습니다.");
        var checked = validateAnswer(expected, answers[i]);
        if (!checked.ok) return checked;
        prior.push(answers[i]);
        asked.push(expected.id);
      }
      if (pickQuestion(prior, asked)) return fail("아직 끝나지 않은 경로입니다.");
      return { ok: true };
    }

    function checkPath(answers) {
      if (!Array.isArray(answers) || !answers.length) return fail("응답이 없습니다.");
      if (answers[0] && answers[0].questionId === "q1") {
        if (answers.length !== 12) return fail("응답은 12문항이어야 합니다.");
        var prior = [];
        for (var i = 0; i < answers.length; i += 1) {
          var expected = planNext(prior);
          if (!expected || answers[i].questionId !== expected.id) return fail("문항 경로가 맞지 않습니다.");
          var checked = validateAnswer(expected, answers[i]);
          if (!checked.ok) return checked;
          prior.push(answers[i]);
        }
        if (planNext(prior)) return fail("아직 끝나지 않은 경로입니다.");
        return { ok: true };
      }
      if (answers.length !== 15) return checkShortPath(answers);
      if (!Array.isArray(answers) || answers.length !== 15) return fail("응답은 15문항이어야 합니다.");
      for (var i = 0; i < 12; i += 1) {
        var question = questionById.get(fixedIds[i]);
        var checked = validateAnswer(question, answers[i]);
        if (!checked.ok) return checked;
        if (answers[i].questionId !== fixedIds[i]) return fail("공통 문항 순서가 맞지 않습니다.");
      }
      var prior = answers.slice(0, 12);
      var seenDiff = new Set();
      for (var n = 0; n < 3; n += 1) {
        var expected = selectLateQuestion(prior);
        var given = answers[12 + n];
        if (!given || given.questionId !== expected.id) return fail("후반 문항 경로가 맞지 않습니다.");
        if (seenDiff.has(expected.diffId)) return fail("같은 차이를 다시 물었습니다.");
        var lateChecked = validateAnswer(expected, given);
        if (!lateChecked.ok) return lateChecked;
        seenDiff.add(expected.diffId);
        prior = answers.slice(0, 13 + n);
      }
      return { ok: true };
    }

    function isEligible(row) {
      return row.lateCoreCount >= 1 || (row.coreTopicMatch === 1 && row.activityPoints2 > 0);
    }

    function compareRows(a, b) {
      if (b.points2 !== a.points2) return b.points2 - a.points2;
      if (b.lateCoreCount !== a.lateCoreCount) return b.lateCoreCount - a.lateCoreCount;
      if (b.coreTopicMatch !== a.coreTopicMatch) return b.coreTopicMatch - a.coreTopicMatch;
      if (b.activityPoints2 !== a.activityPoints2) return b.activityPoints2 - a.activityPoints2;
      return a.majorId < b.majorId ? -1 : a.majorId > b.majorId ? 1 : 0;
    }

    function rowsForTag(scored, tag) {
      return scored.rows.filter(function (row) { return row.profile.coreTopics.indexOf(tag) !== -1; });
    }

    function preferEligible(rows) {
      return rows.filter(isEligible).concat(rows.filter(function (row) { return !isEligible(row); }));
    }

    function takeRows(rows, limit, used) {
      var got = [];
      rows.forEach(function (row) {
        if (got.length >= limit || used[row.majorId]) return;
        used[row.majorId] = true;
        got.push(row);
      });
      return got;
    }

    function relatedRows(scored, sourceRows, used) {
      var tags = [];
      sourceRows.forEach(function (row) {
        (row.profile.relatedTopics || []).forEach(function (tag) {
          if (tags.indexOf(tag) === -1) tags.push(tag);
        });
      });
      var rows = [];
      var seen = {};
      tags.forEach(function (tag) {
        rowsForTag(scored, tag).forEach(function (row) {
          if (used[row.majorId] || seen[row.majorId]) return;
          seen[row.majorId] = true;
          rows.push(row);
        });
      });
      rows.sort(compareRows);
      return rows;
    }

    function rowsInSameMids(scored, sourceRows, used) {
      var mids = [];
      sourceRows.forEach(function (row) {
        if (row.mid && mids.indexOf(row.mid) === -1) mids.push(row.mid);
      });
      var rows = scored.rows.filter(function (row) {
        return !used[row.majorId] && mids.indexOf(row.mid) !== -1;
      });
      rows.sort(compareRows);
      return rows;
    }

    function chooseSeats(scored, answers) {
      var selected = rankedCoreTags(answers);
      if (!selected.length) return null;
      var used = {};
      var chosen = [];
      if (selected.length === 1) {
        chosen = chosen.concat(takeRows(preferEligible(rowsForTag(scored, selected[0])), 3, used));
      } else {
        var primary = preferEligible(rowsForTag(scored, selected[0]));
        var secondary = preferEligible(rowsForTag(scored, selected[1]));
        chosen = chosen.concat(takeRows(primary, 2, used));
        chosen = chosen.concat(takeRows(secondary, 1, used));
        if (chosen.length < 3) chosen = chosen.concat(takeRows(primary, 3 - chosen.length, used));
        if (chosen.length < 3) chosen = chosen.concat(takeRows(secondary, 3 - chosen.length, used));
        for (var i = 2; i < selected.length && chosen.length < 3; i += 1) {
          chosen = chosen.concat(takeRows(preferEligible(rowsForTag(scored, selected[i])), 3 - chosen.length, used));
        }
      }
      if (chosen.length < 3) {
        var flat = [];
        selected.forEach(function (tag) {
          rowsForTag(scored, tag).forEach(function (row) { flat.push(row); });
        });
        var related = relatedRows(scored, flat, used);
        chosen = chosen.concat(takeRows(preferEligible(related), 3 - chosen.length, used));
        if (chosen.length < 3) {
          chosen = chosen.concat(takeRows(preferEligible(rowsInSameMids(scored, flat.concat(related), used)), 3 - chosen.length, used));
        }
      }
      if (chosen.length < 3) {
        chosen = chosen.concat(takeRows(scored.rows.filter(function (row) {
          return connected(row.profile, selected);
        }), 3 - chosen.length, used));
      }
      if (chosen.length < 3) chosen = chosen.concat(takeRows(scored.rows, 3 - chosen.length, used));
      chosen.sort(compareRows);
      return chosen;
    }

    function presentSeats(rows, answers) {
      var selected = coreTagsSelected(answers);
      return rows.map(function (row) {
        var own = row.profile.coreTopics.some(function (tag) { return selected.indexOf(tag) !== -1; });
        var kind = (own && row.activityPoints2 >= 0) || isEligible(row) ? "recommended" : "also";
        return present(row, kind, reasonFor(row, answers));
      });
    }

    function recommend(input) {
      var answers = Array.isArray(input) ? input : (input && input.answers);
      var version = Array.isArray(input) ? data.version : (input && input.version);
      if (version !== data.config.version) return fail("문항 버전이 맞지 않습니다.");
      var path = checkPath(answers);
      if (!path.ok) return path;
      var scored = scoreRows(answers);
      if (!hasPositive(answers, scored.tags, scored.activities)) {
        var explore = data.config.exploreMajorIds.map(function (id) {
          var row = scored.rows.find(function (item) { return item.majorId === id; });
          return present(row, "explore", data.config.exploreReason);
        });
        return { ok: true, version: data.version, kind: "explore", items: explore };
      }
      var seated = chooseSeats(scored, answers);
      var items;
      if (seated) {
        items = presentSeats(seated, answers);
      } else {
        var eligible = scored.rows.filter(isEligible);
        items = eligible.slice(0, 3).map(function (row) {
          return present(row, "recommended", reasonFor(row, answers));
        });
        if (items.length < 3) {
          var rest = scored.rows.filter(function (row) {
            return !items.some(function (item) { return item.majorId === row.majorId; });
          });
          rest.sort(function (a, b) {
            var ai = connected(a.profile, scored.tags) ? 1 : 0;
            var bi = connected(b.profile, scored.tags) ? 1 : 0;
            if (bi !== ai) return bi - ai;
            return compareRows(a, b);
          });
          rest.some(function (row) {
            if (items.length >= 3) return true;
            items.push(present(row, "also", reasonFor(row, answers)));
            return false;
          });
        }
      }
      var kind = items.every(function (item) { return item.slotKind === "recommended"; }) ? "personalized" : "mixed";
      return { ok: true, version: data.version, kind: kind, items: items };
    }

    function createSession() {
      return { mode: "path", phase: "intro", cursor: 0, steps: [] };
    }

    function materializePath(session, index) {
      var built = [];
      for (var i = 0; i <= index; i += 1) {
        if (i > 0 && !built[i - 1].answer) return fail("이전 문항 응답이 없습니다.");
        var answers = built.map(function (step) { return step.answer; }).filter(Boolean);
        var question = planNext(answers);
        if (!question) return fail("다음 문항이 없습니다.");
        var prev = session.steps[i];
        built.push({
          questionId: question.id,
          answer: prev && prev.questionId === question.id ? (prev.answer || null) : null,
        });
      }
      return { ok: true, steps: built };
    }

    function createShortSession() {
      return { mode: "short", phase: "intro", cursor: 0, steps: [] };
    }

    function materializeLate(session, slot) {
      var built = [];
      for (var i = 0; i <= slot; i += 1) {
        if (i > 0 && !built[i - 1].answer) return fail("이전 후반 문항 응답이 없습니다.");
        var answers = session.fixed.filter(Boolean).concat(built.map(function (item) { return item.answer; }).filter(Boolean));
        var question = selectLateQuestion(answers);
        var prev = session.late[i];
        built.push({
          questionId: question.id,
          answer: prev && prev.questionId === question.id ? (prev.answer || null) : null,
        });
      }
      return { ok: true, slots: built };
    }

    function isPath(session) {
      return !!(session && session.mode === "path");
    }

    function currentQuestion(session) {
      if (isPath(session)) {
        var madePath = materializePath(session, session.cursor);
        if (!madePath.ok) return null;
        var prefixMatches = session.steps && session.steps.length >= madePath.steps.length;
        for (var p = 0; prefixMatches && p < madePath.steps.length; p += 1) {
          if (!session.steps[p] || session.steps[p].questionId !== madePath.steps[p].questionId) prefixMatches = false;
        }
        if (!prefixMatches) session.steps = madePath.steps;
        var pathId = madePath.steps[session.cursor].questionId;
        return questionById.get(pathId) || lateById.get(pathId);
      }
      if (isShort(session)) {
        var made = materializeShort(session, session.cursor);
        if (!made.ok) return null;
        session.steps = made.steps;
        var id = made.steps[session.cursor].questionId;
        return questionById.get(id) || lateById.get(id);
      }
      if (session.cursor < 12) return questionById.get(fixedIds[session.cursor]);
      var made = materializeLate(session, session.cursor - 12);
      if (!made.ok) return null;
      var slot = session.cursor - 12;
      var prefix = true;
      for (var i = 0; i <= slot; i += 1) {
        if (!session.late[i] || session.late[i].questionId !== made.slots[i].questionId) prefix = false;
      }
      if (!prefix) session.late = made.slots;
      return lateById.get(made.slots[slot].questionId);
    }

    function currentAnswer(session) {
      if (isPath(session) || isShort(session)) {
        var step = session.steps[session.cursor];
        return step ? step.answer : null;
      }
      if (session.cursor < 12) return session.fixed[session.cursor];
      var slot = session.late[session.cursor - 12];
      return slot ? slot.answer : null;
    }

    function setAnswer(session, answer) {
      var question = currentQuestion(session);
      var checked = validateAnswer(question, answer);
      if (!checked.ok) return checked;
      if (isPath(session)) {
        var madePath = materializePath(session, session.cursor);
        if (!madePath.ok) return madePath;
        var prevPath = (session.steps[session.cursor] && session.steps[session.cursor].answer) || null;
        var changedPath = !sameIds(prevPath, answer);
        if (!changedPath) return { ok: true };
        var kept = session.steps.slice();
        kept[session.cursor] = {
          questionId: question.id,
          answer: { questionId: answer.questionId, choiceIds: answer.choiceIds.slice() },
        };
        if (question.kind === "topic") {
          var head = kept.slice(0, session.cursor + 1);
          for (var t = session.cursor + 1; t < 6 && t < kept.length; t += 1) {
            if (!kept[t] || !kept[t].answer) break;
            head.push(kept[t]);
          }
          session.steps = head;
        } else {
          session.steps = kept.slice(0, session.cursor + 1);
        }
        return { ok: true };
      }
      if (isShort(session)) {
        var made = materializeShort(session, session.cursor);
        if (!made.ok) return made;
        var prev = made.steps[session.cursor].answer;
        var changed = !sameIds(prev, answer);
        made.steps[session.cursor] = {
          questionId: made.steps[session.cursor].questionId,
          answer: { questionId: answer.questionId, choiceIds: answer.choiceIds.slice() },
        };
        session.steps = changed ? made.steps.slice(0, session.cursor + 1) : made.steps;
        return { ok: true };
      }
      if (session.cursor < 12) {
        var changed = !sameIds(session.fixed[session.cursor], answer);
        session.fixed[session.cursor] = { questionId: answer.questionId, choiceIds: answer.choiceIds.slice() };
        if (changed) session.late = [];
        return { ok: true };
      }
      var slot = session.cursor - 12;
      var made = materializeLate(session, slot);
      if (!made.ok) return made;
      var prev = session.late[slot] && session.late[slot].questionId === made.slots[slot].questionId ? session.late[slot].answer : null;
      var changedLate = !sameIds(prev, answer);
      var next = made.slots.slice();
      next[slot] = { questionId: made.slots[slot].questionId, answer: { questionId: answer.questionId, choiceIds: answer.choiceIds.slice() } };
      if (!changedLate && session.late[slot] && session.late[slot].questionId === next[slot].questionId) {
        session.late[slot] = next[slot];
      } else {
        session.late = next;
      }
      return { ok: true };
    }

    function answersFromSession(session) {
      if (isPath(session) || isShort(session)) {
        return (session.steps || []).map(function (step) { return step.answer; }).filter(Boolean);
      }
      var answers = session.fixed.filter(Boolean);
      session.late.forEach(function (slot) {
        if (slot.answer) answers.push(slot.answer);
      });
      return answers;
    }

    function hasNext(session) {
      if (isPath(session)) {
        var pathAnswers = [];
        var steps = session.steps || [];
        for (var n = 0; n <= session.cursor && n < steps.length; n += 1) {
          if (!steps[n].answer) break;
          pathAnswers.push(steps[n].answer);
        }
        return !!planNext(pathAnswers);
      }
      if (!isShort(session)) return session.cursor < 14;
      var answers = [];
      var asked = [];
      var steps = session.steps || [];
      for (var i = 0; i <= session.cursor && i < steps.length; i += 1) {
        if (!steps[i].answer) break;
        answers.push(steps[i].answer);
        asked.push(steps[i].questionId);
      }
      if (answers.length >= 6) return false;
      return !!pickQuestion(answers, asked);
    }

    function isLastQuestion(session) {
      if (isPath(session)) {
        var prior = [];
        for (var n = 0; n < session.cursor; n += 1) {
          if (!session.steps[n] || !session.steps[n].answer) return false;
          prior.push(session.steps[n].answer);
        }
        var current = currentQuestion(session);
        if (!current) return true;
        return current.choices.every(function (choice) {
          var trial = prior.concat([{ questionId: current.id, choiceIds: [choice.id] }]);
          return !planNext(trial);
        });
      }
      if (!isShort(session)) return session.cursor >= 14;
      if (session.cursor >= 5) return true;
      var prior = [];
      var asked = [];
      for (var i = 0; i < session.cursor; i += 1) {
        if (!session.steps[i] || !session.steps[i].answer) return false;
        prior.push(session.steps[i].answer);
        asked.push(session.steps[i].questionId);
      }
      var current = currentQuestion(session);
      if (!current) return true;
      asked = asked.concat(current.id);
      return current.choices.every(function (choice) {
        var trial = prior.concat([{ questionId: current.id, choiceIds: [choice.id] }]);
        return !pickQuestion(trial, asked);
      });
    }

    return {
      data: data,
      profiles: profiles,
      profileById: profileById,
      questionById: questionById,
      lateById: lateById,
      fixedIds: fixedIds,
      validateAnswer: validateAnswer,
      scoreRows: scoreRows,
      selectLateQuestion: selectLateQuestion,
      planNext: planNext,
      phasePlan: phasePlan,
      recommend: recommend,
      createSession: createSession,
      createShortSession: createShortSession,
      currentQuestion: currentQuestion,
      currentAnswer: currentAnswer,
      setAnswer: setAnswer,
      answersFromSession: answersFromSession,
      hasNext: hasNext,
      isLastQuestion: isLastQuestion,
      reasonFor: reasonFor,
    };
  }

  var api = { createEngine: createEngine };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.MajorFinderEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
