/* 대학별 권장과목 데모 (~30개 모집단위/대학)
   - 수시·정시 데모 모집단위는 guide.js에서 누락 시 보강
   - coreRowspan / recommendRowspan / coreColspan / coreSkip / recommendSkip */
window.ADMIT_UNIV_RECOMMEND = (() => {
  const TARGET = 30;
  const CORE_HUM = "국어, 영어, 사회";
  const CORE_HUM_HIST = "국어, 영어, 사회, 한국사";
  const CORE_BIZ = "국어, 영어, 수학(대수, 미적분Ⅰ, 확률과 통계)";
  const CORE_MATH = "대수, 미적분Ⅰ, 확률과 통계, 미적분Ⅱ, 기하";
  const CORE_SCI = "대수, 미적분Ⅰ, 확률과 통계, 화학, 생명과학";
  const CORE_MED = "대수, 미적분Ⅰ, 확률과 통계, 미적분Ⅱ, 화학, 생명과학";
  const CORE_NURSE = "생명과학, 화학, 수학(대수·확률과 통계)";
  const CORE_EDU = "국어, 영어, 수학(대수·미적분Ⅰ·확률과 통계), 한국사";
  const CORE_FREE = "계열 구분 없이 자신의 진로 및 적성을 고려하여 교과목 선택 이수";

  const POOLS = {
    hum: [
      "국어국문학과",
      "영어영문학과",
      "사학과",
      "철학과",
      "중어중문학과",
      "일어일문학과",
      "독어독문학과",
      "불어불문학과",
      "문헌정보학과",
      "문화인류학과",
      "미디어커뮤니케이션학과",
      "커뮤니케이션학부",
      "심리학과",
      "사회복지학과",
      "사회학과",
      "정치외교학과",
      "행정학과",
      "법학과",
      "경찰행정학부",
      "국제학부",
    ],
    biz: [
      "경영학과",
      "경영학부",
      "경제학과",
      "경제학부",
      "무역학과",
      "회계학과",
      "금융학과",
      "관광경영학과",
      "호텔경영학과",
      "글로벌경영학과",
      "부동산학과",
      "통계학과",
    ],
    stem: [
      "수학과",
      "물리학과",
      "화학과",
      "생명과학과",
      "지구환경과학과",
      "컴퓨터공학과",
      "소프트웨어학과",
      "인공지능학과",
      "전자공학과",
      "전기전자공학과",
      "기계공학과",
      "기계공학부",
      "화학공학과",
      "신소재공학과",
      "산업공학과",
      "건축학과",
      "토목공학과",
      "항공우주공학과",
      "반도체공학과",
      "정보통신공학과",
      "데이터사이언스학과",
      "바이오공학과",
    ],
    edu: [
      "교육학과",
      "국어교육과",
      "영어교육과",
      "수학교육과",
      "과학교육과",
      "사회교육과",
      "역사교육과",
      "지리교육과",
      "체육교육과",
      "초등교육과",
      "유아교육과",
      "특수교육과",
    ],
    health: [
      "간호학과",
      "간호학부",
      "의예과",
      "치의예과",
      "한의예과",
      "약학과",
      "약학부",
      "수의예과",
      "임상병리학과",
      "물리치료학과",
      "보건행정학과",
      "의공학과",
      "식품영양학과",
    ],
    contract: [
      "계약학과(삼성디스플레이)",
      "반도체시스템공학과(계약)",
      "소프트웨어융합학과(계약)",
      "IT계약학과",
      "스마트팩토리학과",
      "배터리공학과",
      "디스플레이융합공학과",
    ],
  };

  const UNIV_META = [
    { name: "서울대학교", theme: "med", bias: ["health", "stem", "hum", "biz", "edu"] },
    { name: "연세대학교(서울)", theme: "med", bias: ["health", "hum", "biz", "stem", "edu"] },
    { name: "경희대학교(서울)", theme: "med", bias: ["health", "stem", "hum", "biz", "edu"] },
    { name: "성균관대학교(수원)", theme: "med", bias: ["stem", "health", "biz", "hum", "edu"] },
    { name: "건국대학교(서울)", theme: "med", bias: ["health", "stem", "hum", "biz", "edu"] },
    { name: "이화여자대학교", theme: "edu-elem", bias: ["edu", "hum", "biz", "health", "stem"] },
    { name: "한국교원대학교", theme: "edu-elem", bias: ["edu", "hum", "stem", "biz", "health"] },
    { name: "공주교육대학교", theme: "edu-elem", bias: ["edu", "hum", "stem", "biz", "health"] },
    { name: "부산대학교", theme: "nurse", bias: ["health", "stem", "hum", "biz", "edu"] },
    { name: "중앙대학교(서울)", theme: "nurse", bias: ["health", "hum", "biz", "stem", "edu"] },
    { name: "연세대학교(미래)", theme: "nurse", bias: ["health", "stem", "hum", "biz", "edu"] },
    { name: "가천대학교", theme: "nurse", bias: ["health", "stem", "hum", "biz", "edu"] },
    { name: "고려대학교(서울)", theme: "edu", bias: ["edu", "hum", "stem", "biz", "health"] },
    { name: "숙명여자대학교", theme: "edu", bias: ["edu", "hum", "biz", "stem", "health"] },
    { name: "서울교육대학교", theme: "edu-elem", bias: ["edu", "hum", "stem", "biz", "health"] },
    { name: "한국외국어대학교(서울)", theme: "edu", bias: ["hum", "edu", "biz", "stem", "health"] },
    { name: "가천대학교(글로벌)", theme: "contract", bias: ["contract", "stem", "biz", "hum", "health"] },
    { name: "성균관대학교(서울)", theme: "contract", bias: ["contract", "hum", "biz", "stem", "edu"] },
    { name: "한양대학교(서울)", theme: "contract", bias: ["contract", "stem", "hum", "biz", "health"] },
    { name: "숭실대학교", theme: "contract", bias: ["contract", "stem", "hum", "biz", "edu"] },
    { name: "KAIST", theme: "advanced", bias: ["stem", "health", "biz", "hum", "edu"] },
    { name: "포항공과대학교", theme: "advanced", bias: ["stem", "health", "biz", "hum", "edu"] },
    { name: "한양대학교(ERICA)", theme: "advanced", bias: ["stem", "hum", "biz", "health", "edu"] },
    { name: "인하대학교", theme: "advanced", bias: ["stem", "hum", "biz", "health", "edu"] },
    { name: "울산과학기술원", theme: "advanced", bias: ["stem", "health", "biz", "hum", "edu"] },
    { name: "서강대학교", theme: "", bias: ["hum", "biz", "stem", "edu", "health"] },
    { name: "전남대학교", theme: "", bias: ["biz", "hum", "stem", "edu", "health"] },
    { name: "충남대학교", theme: "", bias: ["stem", "hum", "biz", "edu", "health"] },
    { name: "제주대학교", theme: "", bias: ["biz", "hum", "stem", "edu", "health"] },
    { name: "동국대학교(서울)", theme: "", bias: ["hum", "biz", "stem", "edu", "health"] },
  ];

  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }

  function pickCore(unit, theme) {
    if (/의예|치의|한의|수의|약학/.test(unit)) return CORE_MED;
    if (/간호|보건|임상|물리치료|식품영양|의공/.test(unit)) return CORE_NURSE;
    if (/교육|초등|유아|특수/.test(unit)) return CORE_EDU;
    if (/수학|물리|화학|생명|지구|컴퓨터|소프트웨어|인공|전자|전기|기계|화공|소재|산업|건축|토목|항공|반도체|정보|데이터|바이오|계약|팩토리|배터리|디스플레이|전산/.test(unit))
      return CORE_MATH;
    if (/경영|경제|무역|회계|금융|관광|호텔|부동산|통계/.test(unit)) return CORE_BIZ;
    if (theme === "advanced" || theme === "contract") return CORE_MATH;
    if (theme === "med") return CORE_SCI;
    return CORE_HUM_HIST;
  }

  /* 핵심과목에 이미 있는 과목은 권장에서 제외 (분리 컬럼일 때만) */
  function subjectTokens(text) {
    return String(text || "")
      .split(/[,，]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function overlapsCore(core, subject) {
    const c = String(core || "");
    const s = String(subject || "").trim();
    if (!s || s === "-") return false;
    if (c.includes(s)) return true;
    /* 부분 과목명도 겹치면 제외 (예: 핵심에 한국사 있으면 권장 한국사 불가) */
    const keys = s.split(/[·\/]/).map((x) => x.trim()).filter((x) => x.length >= 2);
    return keys.some((k) => c.includes(k));
  }

  function withoutCoreOverlap(core, recommend) {
    if (!recommend || recommend === "-") return "-";
    const kept = subjectTokens(recommend).filter((s) => !overlapsCore(core, s));
    return kept.length ? kept.join(", ") : "-";
  }

  function pickRecommend(unit, style, idx, core = "") {
    if (style === "empty") return "-";
    if (style === "colspan") return null;
    let raw = "-";
    if (/컴퓨터|소프트웨어|인공|데이터|전산|정보/.test(unit)) raw = idx % 2 ? "정보, 인공지능 수학" : "정보";
    else if (/기계|전자|전기|항공|반도체|화공|소재/.test(unit)) raw = idx % 2 ? "물리학" : "물리학, 화학";
    else if (/의예|치의|한의|수의|약학|간호|생명/.test(unit)) raw = idx % 3 ? "물리학" : "기하";
    else if (/경영|경제/.test(unit)) raw = idx % 2 ? "경제" : "사회";
    else if (/교육|초등|유아|특수/.test(unit)) raw = idx % 2 ? "제2외국어/한문" : "사회, 과학";
    else if (/국어|영어|사학|철학|중어|일어/.test(unit)) raw = idx % 2 ? "제2외국어/한문" : "지리";
    else if (idx % 4 === 0) raw = "제2외국어/한문";
    return withoutCoreOverlap(core, raw);
  }

  function buildUnitList(meta, preferred = []) {
    const seen = new Set();
    const units = [];
    const push = (u) => {
      const name = String(u || "").trim();
      if (!name || seen.has(name)) return false;
      seen.add(name);
      units.push(name);
      return true;
    };
    preferred.forEach((u) => push(u));
    meta.bias.forEach((key) => {
      (POOLS[key] || []).forEach((u) => push(u));
    });
    Object.values(POOLS).forEach((list) => list.forEach((u) => push(u)));
    /* 대학별 순서 섞기 (preferred는 앞쪽 고정) */
    const seed = hashStr(meta.name);
    const head = preferred.filter((u) => seen.has(u));
    const rest = units.filter((u) => !head.includes(u));
    const shuffled = rest
      .map((u, i) => ({ u, k: (seed + i * 17) % 9973 }))
      .sort((a, b) => a.k - b.k)
      .map((x) => x.u);
    const ordered = [...head, ...shuffled];
    let n = 1;
    while (ordered.length < TARGET + 10) {
      const base = units[(seed + n) % Math.max(units.length, 1)] || `모집단위${n}`;
      const extra = `${String(base).replace(/\(.*\)$/, "")} ${n}`.trim();
      if (!seen.has(extra)) {
        seen.add(extra);
        ordered.push(extra);
      }
      n += 1;
      if (n > 80) break;
    }
    return ordered.slice(0, Math.max(TARGET, 30));
  }

  function buildRows(meta, preferred = []) {
    const style = hashStr(meta.name) % 3; /* 0 merge-heavy, 1 separate, 2 colspan-mix */
    const units = buildUnitList(meta, preferred);
    const rows = [];
    let i = 0;
    while (i < TARGET && i < units.length) {
      const pattern = (hashStr(meta.name + units[i]) + style) % 5;
      if (pattern === 0 && i + 2 < TARGET) {
        /* 핵심 3행 병합 */
        const core = pickCore(units[i], meta.theme);
        const rec = pickRecommend(units[i], "empty", i, core);
        rows.push({
          unit: units[i],
          core,
          recommend: rec,
          guide: "-",
          coreRowspan: 3,
          recommendRowspan: rec === "-" ? 3 : 1,
        });
        rows.push({
          unit: units[i + 1],
          coreSkip: true,
          recommend: rec === "-" ? undefined : pickRecommend(units[i + 1], "sep", i + 1, core),
          recommendSkip: rec === "-",
          guide: "-",
        });
        rows.push({
          unit: units[i + 2],
          coreSkip: true,
          recommend: rec === "-" ? undefined : pickRecommend(units[i + 2], "sep", i + 2, core),
          recommendSkip: rec === "-",
          guide: "-",
        });
        i += 3;
      } else if (pattern === 1 && i + 1 < TARGET) {
        /* 핵심 2행 병합, 권장은 각각 */
        const core = pickCore(units[i], meta.theme);
        rows.push({
          unit: units[i],
          core,
          recommend: pickRecommend(units[i], "sep", i, core),
          guide: "-",
          coreRowspan: 2,
        });
        rows.push({
          unit: units[i + 1],
          coreSkip: true,
          recommend: pickRecommend(units[i + 1], "sep", i + 1, core),
          guide: "-",
        });
        i += 2;
      } else if (pattern === 2) {
        /* 핵심+권장 가로 병합 — 한 칸이라 중복 허용 */
        rows.push({
          unit: units[i],
          core: style === 2 && i % 7 === 0 ? CORE_FREE : pickCore(units[i], meta.theme),
          recommend: null,
          guide: "-",
          coreColspan: 2,
        });
        i += 1;
      } else {
        const core = pickCore(units[i], meta.theme);
        rows.push({
          unit: units[i],
          core,
          recommend: pickRecommend(units[i], "sep", i, core),
          guide: "-",
        });
        i += 1;
      }
    }
    /* 정확히 TARGET 행 맞추기 (rowspan 때문에 넘치면 자름) */
    while (rows.length > TARGET) rows.pop();
    while (rows.length < TARGET && i < units.length) {
      const core = pickCore(units[i], meta.theme);
      rows.push({
        unit: units[i],
        core,
        recommend: pickRecommend(units[i], "sep", i, core),
        guide: "-",
      });
      i += 1;
    }
    /* rowspan 깨짐 보정: 잘린 꼬리의 skip 제거 */
    for (let r = 0; r < rows.length; r += 1) {
      const row = rows[r];
      if (row.coreRowspan > 1) {
        const need = row.coreRowspan - 1;
        const left = rows.length - r - 1;
        if (left < need) {
          row.coreRowspan = left + 1;
          if (row.recommendRowspan > row.coreRowspan) row.recommendRowspan = row.coreRowspan;
        }
      }
    }
    return rows.slice(0, TARGET);
  }

  const DEMO_UNIT_BY_UNIV = {
    서울대학교: ["의예과"],
    "연세대학교(서울)": ["치의예과"],
    "경희대학교(서울)": ["한의예과"],
    "성균관대학교(수원)": ["약학과"],
    "건국대학교(서울)": ["수의예과"],
    이화여자대학교: ["초등교육과"],
    한국교원대학교: ["초등교육과"],
    공주교육대학교: ["초등교육과"],
    부산대학교: ["간호학과"],
    "중앙대학교(서울)": ["간호학과"],
    "연세대학교(미래)": ["보건행정학과"],
    가천대학교: ["간호학과"],
    "고려대학교(서울)": ["수학교육과"],
    숙명여자대학교: ["영어교육과"],
    서울교육대학교: ["초등교육과"],
    "한국외국어대학교(서울)": ["한국어교육과"],
    "가천대학교(글로벌)": ["계약학과(삼성디스플레이)"],
    "성균관대학교(서울)": ["반도체시스템공학과(계약)"],
    "한양대학교(서울)": ["소프트웨어융합학과(계약)"],
    숭실대학교: ["IT계약학과"],
    KAIST: ["전산학부"],
    포항공과대학교: ["반도체공학과"],
    "한양대학교(ERICA)": ["인공지능학과"],
    인하대학교: ["항공우주공학과"],
    울산과학기술원: ["전기전자공학과"],
    서강대학교: ["커뮤니케이션학부"],
    전남대학교: ["경영학부"],
    충남대학교: ["기계공학부"],
    제주대학교: ["관광경영학과"],
    "동국대학교(서울)": ["경찰행정학부"],
  };

  const packs = {};
  UNIV_META.forEach((meta) => {
    packs[meta.name] = buildRows(meta, DEMO_UNIT_BY_UNIV[meta.name] || []);
  });

  /* 데모 목록 외 보강 대학 */
  [
    { name: "홍익대학교(서울)", theme: "", bias: ["hum", "stem", "biz", "edu", "health"] },
    { name: "아주대학교", theme: "advanced", bias: ["stem", "biz", "hum", "health", "edu"] },
    { name: "영남대학교", theme: "nurse", bias: ["hum", "edu", "stem", "health", "biz"] },
    { name: "전북대학교", theme: "med", bias: ["hum", "biz", "stem", "health", "edu"] },
    { name: "강원대학교", theme: "edu-elem", bias: ["edu", "hum", "stem", "health", "biz"] },
  ].forEach((meta) => {
    packs[meta.name] = buildRows(meta, DEMO_UNIT_BY_UNIV[meta.name] || []);
  });

  return packs;
})();
