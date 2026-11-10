const Guide = (() => {
  function src(file) {
    return `content/pages/${file}.html`;
  }

  function series(prefix, from, to) {
    const pages = [];
    for (let number = from; number <= to; number += 1) {
      const name = `${prefix}-${String(number).padStart(2, "0")}`;
      pages.push(src(name));
    }
    return pages;
  }

  const guides = {
    curriculum: {
      kicker: "PART 2",
      title: "교육과정 체계",
      nav: [
        { href: "#life-system", label: "2022 개정 교육과정 이해" },
        { href: "#curriculum-credit", label: "고교학점제 핵심 개념" },
        { href: "#curriculum-subject", label: "과목 선택 전략 가이드" },
        { href: "#curriculum-grade", label: "내신 평가 구조와 성적 산출" },
      ],
      blocks: [
        {
          id: "life-system",
          title: "PART 2",
          heading: "2022 개정 교육과정 이해",
          pages: series("part1", 4, 5),
        },
        {
          id: "curriculum-credit",
          title: "PART 2",
          heading: "고교학점제 핵심 개념",
          pages: series("part2", 3, 3),
        },
        {
          id: "curriculum-subject",
          title: "PART 2",
          heading: "과목 선택 전략 가이드",
          pages: series("part2", 4, 5),
        },
        {
          id: "curriculum-grade",
          title: "PART 2",
          heading: "내신 평가 구조와 성적 산출",
          pages: series("part2", 6, 7),
        },
      ],
    },
    record: {
      kicker: "PART 3",
      title: "학교생활기록부",
      nav: [
        { href: "#record-role", label: "학생부의 역할과 중요성" },
        { href: "#record-form", label: "2022 개정 학생부 구성" },
      ],
      blocks: [
        {
          id: "record-role",
          title: "PART 3",
          heading: "학생부의 역할과 중요성",
          pages: [...series("part3", 1, 2), src("part3-09")],
        },
        {
          id: "record-form",
          title: "PART 3",
          heading: "2022 개정 학생부 구성",
          slices: true,
          pages: series("part3", 3, 8),
        },
      ],
    },
    exam: {
      kicker: "PART 4",
      title: "수능 및 모의고사",
      nav: [
        { href: "#exam-csat", label: "수능의 구조 이해" },
        { href: "#exam-score", label: "수능 성적표 읽기" },
        { href: "#exam-mock", label: "모의고사란 무엇인가?" },
      ],
      blocks: [
        {
          id: "exam-csat",
          title: "PART 4",
          heading: "수능의 구조 이해",
          pages: series("part4", 3, 3),
        },
        {
          id: "exam-score",
          title: "PART 4",
          heading: "수능 성적표 읽기",
          pages: [...series("part4", 5, 5), src("part4-04")],
        },
        {
          id: "exam-mock",
          title: "PART 4",
          heading: "모의고사란 무엇인가?",
          pages: series("part4", 1, 2),
        },
      ],
    },
    screening: {
      kicker: "PART 5",
      title: "대입전형 이해",
      nav: [
        { href: "#screening-compare", label: "수시와 정시 전형 비교" },
        { href: "#screening-subject", label: "[수시] 학생부 교과 전형" },
        { href: "#screening-holistic", label: "[수시] 학생부 종합 전형" },
        { href: "#screening-essay", label: "[수시] 논술 전형" },
        { href: "#screening-csat", label: "[정시] 수능 위주 전형" },
        { href: "#life-roadmap", label: "고교 3년 주요 일정" },
      ],
      blocks: [
        {
          id: "screening-compare",
          title: "PART 5",
          heading: "수시와 정시 전형 비교",
          pages: series("part5", 1, 2),
        },
        {
          id: "screening-subject",
          title: "PART 5",
          heading: "[수시] 학생부 교과 전형",
          pages: series("part5", 3, 3),
        },
        {
          id: "screening-holistic",
          title: "PART 5",
          heading: "[수시] 학생부 종합 전형",
          pages: series("part5", 4, 4),
        },
        {
          id: "screening-essay",
          title: "PART 5",
          heading: "[수시] 논술 전형",
          pages: series("part5", 5, 5),
        },
        {
          id: "screening-csat",
          title: "PART 5",
          heading: "[정시] 수능 위주 전형",
          pages: series("part5", 6, 6),
        },
        {
          id: "life-roadmap",
          title: "PART 5",
          heading: "고교 3년 주요 일정",
          pages: series("part1", 6, 6),
        },
      ],
    },
    schedule: {
      kicker: "PART 6",
      title: "일정 및 원서접수",
      nav: [
        { href: "#schedule-plan", label: "원서접수 전략 설계 방식" },
        { href: "#schedule-after", label: "원서접수 이후 진행 흐름" },
      ],
      blocks: [
        {
          id: "schedule-plan",
          title: "PART 6",
          heading: "원서접수 전략 설계 방식",
          pages: [...series("part6", 3, 3), src("part6-02")],
        },
        {
          id: "schedule-after",
          title: "PART 6",
          heading: "원서접수 이후 진행 흐름",
          pages: series("part6", 4, 4),
        },
      ],
    },
    susi: {
      kicker: "",
      title: "수시",
      numberNav: false,
      search: "susi",
      nav: [
        { href: "#susi-subject", label: "교과" },
        { href: "#susi-holistic", label: "종합" },
        { href: "#susi-essay", label: "논술" },
      ],
      blocks: [
        { id: "susi-subject", title: "", heading: "교과", pages: [] },
        { id: "susi-holistic", title: "", heading: "종합", pages: [] },
        { id: "susi-essay", title: "", heading: "논술", pages: [] },
      ],
    },
    jeongsi: {
      kicker: "",
      title: "정시",
      numberNav: false,
      search: "jeongsi",
      nav: [],
      blocks: [],
    },
    university: {
      kicker: "",
      title: "대학 정보",
      numberNav: false,
      hideSectionNav: true,
      search: "university",
      nav: [
        { href: "#university-info", label: "대학별 현황" },
        { href: "#university-map", label: "캠퍼스 지도" },
        { href: "#university-roadview", label: "캠퍼스 로드뷰" },
      ],
      blocks: [
        { id: "university-info", title: "", heading: "대학별 현황", pages: [] },
        { id: "university-map", title: "", heading: "캠퍼스 지도", pages: [] },
        { id: "university-roadview", title: "", heading: "캠퍼스 로드뷰", pages: [] },
      ],
    },
  };

  const mounted = new Set();

  function pageMounts(pages) {
    return `<div class="info-mount" data-pages="${encodeURIComponent(JSON.stringify(pages))}"></div>`;
  }

  const gradeMethodExamples = {
    sum: {
      title: "성취도 점수를 더해요",
      caseLabel: "대표 사례 · 연세대 추천형",
      tags: ["2등급", "A"],
      result: "63 + 30 = 93점",
      feature: "같은 석차등급이라도 성취도 점수가 높으면 유리할 수 있습니다.",
    },
    better: {
      title: "유리한 쪽을 골라줘요",
      caseLabel: "대표 사례 · 서강대 논술(일반)",
      tags: ["3등급", "A"],
      result: "1등급으로 계산",
      feature: "석차등급보다 성취도가 좋은 학생에게 유리할 수 있습니다.",
    },
    replace: {
      title: "석차등급이 없으면 성취도로 대체해요",
      caseLabel: "대표 사례 · 고려대 학교추천",
      tags: ["융합선택", "A"],
      result: "1등급과 같은 100점",
      feature: "석차등급이 없는 과목도 성취도 환산 기준에 따라 반영될 수 있습니다.",
    },
    rank: {
      title: "석차등급 중심으로 봐요",
      caseLabel: "대표 사례 · 한양대 추천형",
      tags: ["석차등급 기재 과목"],
      result: "정량 반영 · 성취도만 기재 시 제외",
      feature: "석차등급이 있는 과목의 관리가 중요하며, 성취도만 기재된 과목은 정량평가에서 제외될 수 있습니다.",
    },
  };

  let gradeMethodPopReposition = null;
  let gradeMethodPopScrollLock = false;

  function isGradeMethodPopSheet() {
    return window.matchMedia("(max-width: 1279px)").matches;
  }

  function closeGradeMethodExample() {
    document.querySelectorAll(".admit-grade-method-pop, .admit-grade-method-pop-backdrop").forEach((el) => el.remove());
    document.querySelectorAll(".admit-grade-method-example.is-open").forEach((el) => {
      el.classList.remove("is-open");
      el.setAttribute("aria-expanded", "false");
    });
    if (gradeMethodPopReposition) {
      window.removeEventListener("resize", gradeMethodPopReposition);
      window.removeEventListener("scroll", gradeMethodPopReposition, true);
      gradeMethodPopReposition = null;
    }
    if (gradeMethodPopScrollLock) {
      document.body.style.removeProperty("overflow");
      gradeMethodPopScrollLock = false;
    }
  }

  function positionGradeMethodPop(pop, anchor) {
    if (isGradeMethodPopSheet()) {
      pop.classList.add("is-sheet");
      pop.classList.remove("is-above");
      pop.style.left = "";
      pop.style.top = "";
      return;
    }
    pop.classList.remove("is-sheet");
    const rect = anchor.getBoundingClientRect();
    const popW = pop.offsetWidth;
    const popH = pop.offsetHeight;
    const gap = 10;
    let left = rect.right - popW;
    let top = rect.bottom + gap;
    left = Math.max(12, Math.min(left, window.innerWidth - popW - 12));
    if (top + popH > window.innerHeight - 12 && rect.top - gap - popH > 12) {
      top = rect.top - gap - popH;
      pop.classList.add("is-above");
    } else {
      pop.classList.remove("is-above");
    }
    pop.style.left = `${Math.round(left)}px`;
    pop.style.top = `${Math.round(top)}px`;
  }

  function openGradeMethodExample(exampleEl) {
    const card = exampleEl.closest("[data-grade-method]");
    const id = card?.getAttribute("data-grade-method");
    const data = id ? gradeMethodExamples[id] : null;
    if (!data) return;

    const alreadyOpen = exampleEl.classList.contains("is-open");
    closeGradeMethodExample();
    if (alreadyOpen) return;

    exampleEl.classList.add("is-open");
    exampleEl.setAttribute("aria-expanded", "true");

    const tags = data.tags
      .map((tag) => `<span class="admit-grade-method-pop-tag">${tag}</span>`)
      .join("");
    const sheet = isGradeMethodPopSheet();
    if (sheet) {
      const backdrop = document.createElement("button");
      backdrop.type = "button";
      backdrop.className = "admit-grade-method-pop-backdrop";
      backdrop.setAttribute("aria-label", "닫기");
      backdrop.addEventListener("click", (event) => {
        event.preventDefault();
        closeGradeMethodExample();
      });
      document.body.appendChild(backdrop);
      document.body.style.overflow = "hidden";
      gradeMethodPopScrollLock = true;
    }
    const pop = document.createElement("div");
    pop.className = "admit-grade-method-pop" + (sheet ? " is-sheet" : "");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-modal", sheet ? "true" : "false");
    pop.setAttribute("aria-label", "반영방식 예시");
    pop.innerHTML = `
      <button type="button" class="admit-grade-method-pop-close" data-grade-method-pop-close aria-label="닫기">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <p class="admit-grade-method-pop-kicker">반영방식 예시</p>
      <p class="admit-grade-method-pop-title">${data.title}</p>
      <p class="admit-grade-method-pop-case">${data.caseLabel}</p>
      <div class="admit-grade-method-pop-calc">
        ${tags}
        <span class="admit-grade-method-pop-arrow" aria-hidden="true">→</span>
        <span class="admit-grade-method-pop-result">${data.result}</span>
      </div>
      <div class="admit-grade-method-pop-feature">
        <p class="admit-grade-method-pop-feature-label">이 방식의 특징</p>
        <p class="admit-grade-method-pop-feature-text">${data.feature}</p>
      </div>
      <p class="admit-grade-method-pop-note">* 계산 예시는 대표 전형 기준이며, 실제 반영방법과 환산 기준은 대학·전형별로 다를 수 있습니다.</p>
    `;
    document.body.appendChild(pop);
    positionGradeMethodPop(pop, exampleEl);
    gradeMethodPopReposition = () => {
      if (!document.body.contains(pop) || !document.body.contains(exampleEl)) {
        closeGradeMethodExample();
        return;
      }
      const nowSheet = isGradeMethodPopSheet();
      const hasBackdrop = !!document.querySelector(".admit-grade-method-pop-backdrop");
      if (nowSheet && !hasBackdrop) {
        const backdrop = document.createElement("button");
        backdrop.type = "button";
        backdrop.className = "admit-grade-method-pop-backdrop";
        backdrop.setAttribute("aria-label", "닫기");
        backdrop.addEventListener("click", (event) => {
          event.preventDefault();
          closeGradeMethodExample();
        });
        document.body.appendChild(backdrop);
        document.body.style.overflow = "hidden";
        gradeMethodPopScrollLock = true;
        pop.setAttribute("aria-modal", "true");
      } else if (!nowSheet && hasBackdrop) {
        document.querySelectorAll(".admit-grade-method-pop-backdrop").forEach((el) => el.remove());
        if (gradeMethodPopScrollLock) {
          document.body.style.removeProperty("overflow");
          gradeMethodPopScrollLock = false;
        }
        pop.setAttribute("aria-modal", "false");
      }
      positionGradeMethodPop(pop, exampleEl);
    };
    window.addEventListener("resize", gradeMethodPopReposition);
    window.addEventListener("scroll", gradeMethodPopReposition, true);

    pop.querySelector("[data-grade-method-pop-close]")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeGradeMethodExample();
    });
  }

  /* 상세검색 필터 카드 ↔ 상세보기「교과성적 반영 방법」 공통 */
  const ADMIT_GRADE_METHODS = [
    {
      id: "sum",
      tone: "sky",
      badge: "성취도 합산",
      title: "성취도 점수를 더해요",
      desc: "석차등급 점수에 성취도별 점수를 합산해 반영합니다.",
    },
    {
      id: "better",
      tone: "indigo",
      badge: "유리한 지표 선택",
      title: "유리한 쪽을 골라줘요",
      desc: "석차등급과 성취도 중 더 유리한 결과를 반영합니다.",
    },
    {
      id: "replace",
      tone: "pink",
      badge: "성취도 대체",
      title: "석차등급이 없으면 성취도로 대체해요",
      desc: "석차등급이 없는 과목을 성취도로 환산합니다.",
    },
    {
      id: "rank",
      tone: "slate",
      badge: "석차등급 중심",
      title: "석차등급 중심으로 봐요",
      desc: "석차등급이 기재된 과목을 정량평가의 중심 지표로 반영합니다.",
    },
  ];
  const ADMIT_GRADE_METHOD_IDS = ADMIT_GRADE_METHODS.map((item) => item.id);
  const ADMIT_GRADE_METHOD_BY_ID = Object.fromEntries(
    ADMIT_GRADE_METHODS.map((item) => [item.id, item])
  );

  function admitGradeMethodInfo(id) {
    const key = String(id || "")
      .split(",")[0]
      .trim();
    return ADMIT_GRADE_METHOD_BY_ID[key] || null;
  }

  /* 정량 반영일 때만 성적 반영 방식 태그 — 필터·상세보기 연동 */
  function admitGradeMethodAttr(reflectLabel, preferred, fallbackIndex = 0) {
    if (!/정량/.test(String(reflectLabel || ""))) return "";
    const fromData = String(preferred || "")
      .split(",")[0]
      .trim();
    if (fromData && ADMIT_GRADE_METHOD_BY_ID[fromData]) return fromData;
    return ADMIT_GRADE_METHOD_IDS[Math.abs(fallbackIndex) % ADMIT_GRADE_METHOD_IDS.length] || "";
  }

  function admitGradeMethodCards() {
    return ADMIT_GRADE_METHODS.map(
      (item) => `<button type="button" class="admit-grade-method-card" data-grade-method="${item.id}" data-tone="${item.tone}" aria-pressed="false">
          <span class="admit-grade-method-card-top">
            <span class="admit-grade-method-badge">${item.badge}</span>
            <span class="admit-grade-method-example" data-grade-method-example aria-expanded="false" aria-haspopup="dialog">예시 보기</span>
          </span>
          <span class="admit-grade-method-body">
            <span class="admit-grade-method-title">${item.title}</span>
            <span class="admit-grade-method-desc">${item.desc}</span>
          </span>
        </button>`
    ).join("");
  }

  function inferAdmitTheme(unit) {
    const u = String(unit || "");
    if (/계약/.test(u)) return "contract";
    if (/의예|치의|한의|약학|수의/.test(u)) return "med";
    if (/초등교육|교대/.test(u)) return "edu-elem";
    if (/간호|보건/.test(u)) return "nurse";
    if (/교육과|사범|교육학/.test(u)) return "edu";
    if (/소프트웨어|반도체|인공지능|\bAI\b|데이터|첨단|항공우주|전산|전기전자/.test(u)) return "advanced";
    return "";
  }

  function admitCardFilterValues(root, attr) {
    const cardSel =
      attr === "data-grade-method"
        ? ".admit-grade-method-card"
        : attr === "data-theme"
          ? ".admit-theme-card"
          : "";
    const scope = cardSel || `[${attr}]`;
    const selected = [
      ...root.querySelectorAll(`${scope}[${attr}][aria-pressed="true"]`),
      ...root.querySelectorAll(`${scope}[${attr}].is-active`),
    ];
    return [
      ...new Set(
        selected
          .map((card) => card.getAttribute(attr) || "")
          .map((value) => value.trim())
          .filter(Boolean)
      ),
    ];
  }

  /* 선택된 값이 없으면 통과, 있으면 행 태그 중 하나라도 겹치면 통과(OR) */
  function rowMatchesAdmitCards(row, dataKey, values) {
    if (!values?.length) return true;
    const raw = String(row?.dataset?.[dataKey] || "").trim();
    if (!raw) return false;
    const tags = raw
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    return values.some((value) => tags.includes(value));
  }

  /* 상세 검색 카드(2순위) — 상단 바 통과 후 AND(방식 OR × 유형 OR) */
  function passesAdmitDetailCards(row, root) {
    const gradeMethods = admitCardFilterValues(root, "data-grade-method");
    const themes = admitCardFilterValues(root, "data-theme");
    /* 성적 반영 방식 필터는 태그가 있는(정량) 행만 */
    if (gradeMethods.length && !String(row?.dataset?.gradeMethod || "").trim()) return false;
    return (
      rowMatchesAdmitCards(row, "gradeMethod", gradeMethods) &&
      rowMatchesAdmitCards(row, "theme", themes)
    );
  }

  function updateAdmitListCount(root, visibleCount) {
    /* 정렬 셀렉트가 있는 목록 제목만 — 정시 차트 제목 제외 */
    const title =
      root.querySelector(".admit-list-head:has([data-susi-sort]) .admit-list-title") ||
      root.querySelector(".admit-list-head:has([data-jeongsi-sort]) .admit-list-title") ||
      root.querySelector(".admit-list-head:has([data-uni-sort]) .admit-list-title") ||
      root.querySelector(".admit-list-head .admit-list-title");
    if (!title) return;
    if (!title.dataset.baseLabel) {
      title.dataset.baseLabel = title.textContent.replace(/\s*\(?\d+\s*건\)?\s*$/, "").trim();
    }
    title.textContent = `${title.dataset.baseLabel}(${visibleCount}건)`;
  }

  function admitThemeButtons(includePharmacy) {
    /* 아이콘 공통: viewBox 24, 내용물 ≈ 5~19 영역, stroke 1.9 */
    const iconAttrs = `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = {
      /* 의·치·한·약·수 — 안 채운 십자가 */
      med: `<svg ${iconAttrs}><path d="M10 5.5h4v4.5h4.5v4H14v4.5h-4V14H5.5v-4H10V5.5Z"/></svg>`,
      /* 교대·초등교육 — 학사모 */
      "edu-elem": `<svg ${iconAttrs}><path d="m4.5 10 7.5-3.8L19.5 10 12 13.8 4.5 10Z"/><path d="M7.2 11.8v3.6c0 .7 2.2 1.9 4.8 1.9s4.8-1.2 4.8-1.9v-3.6"/><path d="M19.5 10.2v4.2"/></svg>`,
      /* 간호·보건 — 하트 + 십자가 */
      nurse: `<svg ${iconAttrs}><path d="M17.8 8.1A3.2 3.2 0 0 0 12 8.6a3.2 3.2 0 0 0-5.8-.5C4.8 9.5 4.9 11.6 6.8 13.6L12 18.5l5.2-4.9c1.9-2 2-4.1.6-5.5Z"/><path d="M12 10.4v3.2M10.4 12h3.2"/></svg>`,
      /* 사범계열 — 펼친 책 */
      edu: `<svg ${iconAttrs}><path d="M12 7.2C10.5 6.2 8.6 5.8 6.5 5.8c-1 0-1.9.2-2.7.5v11c.9-.4 1.9-.6 2.7-.6 2.1 0 4 .6 5.5 1.6"/><path d="M12 7.2c1.5-1 3.4-1.4 5.5-1.4 1 0 1.9.2 2.7.5v11c-.9-.4-1.9-.6-2.7-.6-2.1 0-4 .6-5.5 1.6"/><path d="M12 7.2v11"/></svg>`,
      /* 계약학과 — 체인 링크 */
      contract: `<svg ${iconAttrs}><path d="M10.2 13.2a3.6 3.6 0 0 0 5.4.4l2.1-2.1a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2"/><path d="M13.8 10.8a3.6 3.6 0 0 0-5.4-.4L6.3 12.5a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2"/></svg>`,
      /* 첨단학과 — 반도체 칩 */
      advanced: `<svg ${iconAttrs}><rect x="7" y="7" width="10" height="10" rx="1.5" fill="none"/><rect x="10.5" y="10.5" width="3" height="3" rx="0.4" fill="none"/><path d="M9.5 4.5v2.5M14.5 4.5v2.5M9.5 17v2.5M14.5 17v2.5M4.5 9.5h2.5M4.5 14.5h2.5M17 9.5h2.5M17 14.5h2.5"/></svg>`,
    };
    const themes = [
      { id: "med", tone: "red", label: "의·치·한·약·수" },
      { id: "edu-elem", tone: "orange", label: "교대·초등교육" },
      { id: "nurse", tone: "green", label: "간호·보건" },
      { id: "edu", tone: "purple", label: "사범계열" },
      { id: "contract", tone: "yellow", label: "계약학과" },
      { id: "advanced", tone: "teal", label: "첨단학과" },
    ];
    return themes
      .map(
        (theme) =>
          `<button type="button" class="admit-theme-card" data-theme="${theme.id}" data-tone="${theme.tone}" aria-pressed="false">
            <span class="admit-theme-card-icon" aria-hidden="true">${icons[theme.id]}</span>
            <span class="admit-theme-card-label">${theme.label}</span>
          </button>`
      )
      .join("");
  }

  function admitSearchHtml(type) {
    const regionSelect = `<select class="admit-search-select" name="region" aria-label="지역">
      <option value="">지역 전체</option>
      <option value="seoul">서울</option>
      <option value="gyeonggi">경기</option>
      <option value="gangwon">강원</option>
      <option value="gyeongnam">경남</option>
      <option value="gyeongbuk">경북</option>
      <option value="gwangju">광주</option>
      <option value="daegu">대구</option>
      <option value="daejeon">대전</option>
      <option value="busan">부산</option>
      <option value="ulsan">울산</option>
      <option value="incheon">인천</option>
      <option value="jeonnam">전남</option>
      <option value="jeonbuk">전북</option>
      <option value="jeju">제주</option>
      <option value="chungnam">충남</option>
      <option value="chungbuk">충북</option>
    </select>`;

    if (type === "university") {
      /* 대학 탭: 상단 필터만 (상세 검색 없음) */
      const uniSource = (window.ADMIT_DEMO_UNIVS || []).map((row) =>
        Array.isArray(row)
          ? {
              name: row[0],
              region: row[1],
              founding: row[2],
              quota: row[3],
              rate: row[4],
              fill: row[5],
            }
          : row
      );
      const uniRows = uniSource
        .map((item, index, list) => {
          const classes = [];
          if (index % 2 === 1) classes.push("is-alt");
          if (index === list.length - 1) classes.push("is-last-visible");
          const cls = classes.length ? ` class="${classes.join(" ")}"` : "";
          return `<tr data-uni-row data-year="2024"${cls}>
              <td class="admit-data-name">${escapeHtml(item.name)}</td>
              <td>${escapeHtml(item.region)}</td>
              <td>${escapeHtml(item.founding)}</td>
              <td>${formatAdmitQuota(item.quota)}</td>
              <td>${formatAdmitRate(item.rate)}</td>
              <td>${formatAdmitFill(item.fill)}</td>
              <td><button type="button" class="admit-data-view">보기</button></td>
            </tr>`;
        })
        .join("");

      return `<section class="admit-search" data-admit-search data-search-type="university">
        <div class="admit-search-bar">
          <label class="admit-search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/>
              <path d="m20 20-3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <input type="search" name="keyword" placeholder="대학명 검색" aria-label="대학명 검색">
          </label>
          ${regionSelect}
          <select class="admit-search-select" name="year" aria-label="연도">
            <option value="">연도 전체</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select class="admit-search-select" name="founding" aria-label="설립 유형">
            <option value="">설립 유형 전체</option>
            <option value="national">국립</option>
            <option value="private">사립</option>
            <option value="special">특별법인</option>
          </select>
        </div>
        <div class="admit-list-head">
          <h2 class="title-3 admit-list-title">대학 목록</h2>
          <select class="admit-search-select" name="sort" aria-label="정렬" data-uni-sort>
            <option value="name">대학명순</option>
            <option value="quota-desc">입학정원 많은순</option>
            <option value="quota-asc">입학정원 적은순</option>
            <option value="rate-desc">경쟁률 높은순</option>
            <option value="rate-asc">경쟁률 낮은순</option>
            <option value="fill-desc">충원율 높은순</option>
            <option value="fill-asc">충원율 낮은순</option>
          </select>
        </div>
        <div class="admit-data-wrap">
          <table class="admit-data-table comparison-table" data-uni-table>
            <thead>
              <tr>
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">대학명(캠퍼스)</th>
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">지역</th>
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">설립 유형</th>
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">입학정원</th>
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">신입생 경쟁률</th>
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">신입생 충원율</th>
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">상세</th>
              </tr>
            </thead>
            <tbody>${uniRows}</tbody>
          </table>
        </div>
      </section>`;
    }

    const trackSelect = `<select class="admit-search-select" name="track" aria-label="계열">
      <option value="">계열 전체</option>
      <option value="common">공통</option>
      <option value="humanities">인문</option>
      <option value="natural">자연</option>
      <option value="arts">예체능</option>
    </select>`;

    const areas = [
      "국·수·영·탐",
      "국·수·영",
      "국·수·탐",
      "국·영·탐",
      "수·영·탐",
      "국·수",
      "국·영",
      "국·탐",
      "수·영",
      "수·탐",
      "영·탐",
      "국어",
      "수학",
      "영어",
      "탐구",
    ];
    const areaOptions = areas
      .map((label, index) => `<option value="area-${index}">${label}</option>`)
      .join("");

    const reflectSelect = `<select class="admit-search-select" name="reflect" aria-label="학생부 반영">
          <option value="">학생부 반영 전체</option>
          <option value="quant">정량</option>
          <option value="qual">정성</option>
          <option value="both">정량+정성</option>
          <option value="none">미반영</option>
        </select>`;

    const filters =
      type === "jeongsi"
        ? `${regionSelect}
        ${trackSelect}
        <select class="admit-search-select" name="group" aria-label="모집군">
          <option value="">모집군 전체</option>
          <option value="ga">가군</option>
          <option value="na">나군</option>
          <option value="da">다군</option>
        </select>
        ${reflectSelect}
        <select class="admit-search-select" name="area" aria-label="반영 영역">
          <option value="">반영 영역 전체</option>
          ${areaOptions}
        </select>
        <select class="admit-search-select" name="inquiry" aria-label="탐구 반영">
          <option value="">탐구 반영 전체</option>
          <option value="1">1과목</option>
          <option value="2">2과목</option>
        </select>`
        : `${regionSelect}
        ${trackSelect}
        ${reflectSelect}
        <select class="admit-search-select" name="minimum" aria-label="수능 최저">
          <option value="">수능 최저 전체</option>
          <option value="yes">수능 최저 적용</option>
          <option value="no">수능 최저 미적용</option>
        </select>`;

    const gradeMethodBlock =
      type === "susi" || type === "jeongsi"
        ? `<div class="admit-theme-head">
            <div class="admit-theme-title">
              <p class="admit-theme-label is-marked">성적 반영 방식</p>
            </div>
          </div>
          <div class="admit-grade-method-cards" role="group" aria-label="성적 반영 방식">
            ${admitGradeMethodCards()}
          </div>`
        : "";

    const detailBody = `${gradeMethodBlock}
          <div class="admit-theme-head${type === "susi" || type === "jeongsi" ? " admit-theme-head-spaced" : ""}">
            <div class="admit-theme-title">
              <p class="admit-theme-label is-marked">학과 유형별</p>
            </div>
          </div>
          <div class="admit-theme-cards" role="group" aria-label="학과 유형별">
            ${admitThemeButtons(type === "jeongsi")}
          </div>`;

    return `<section class="admit-search" data-admit-search data-search-type="${type}">
      <div class="admit-search-bar">
        <label class="admit-search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <path d="m20 20-3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <input type="search" name="keyword" placeholder="대학명 또는 모집단위 검색" aria-label="대학명 또는 모집단위 검색">
        </label>
        ${filters}
      </div>
      <div class="admit-search-detail">
        <div class="admit-search-detail-head">
          <p class="admit-search-detail-title">상세 검색</p>
          <button type="button" class="admit-search-toggle" data-admit-toggle aria-expanded="true"><span data-admit-toggle-label>접기</span> <span class="admit-search-toggle-arrow" aria-hidden="true">▲</span></button>
        </div>
        <div class="admit-search-body" data-admit-body>
          ${detailBody}
        </div>
      </div>
      ${
        type === "susi"
          ? `<div class="admit-list-head">
          <h2 class="title-3 admit-list-title">모집단위 목록</h2>
          <select class="admit-search-select" name="sort" aria-label="정렬" data-susi-sort>
            <option value="name">대학명순</option>
            <option value="quota-desc">모집인원 많은순</option>
            <option value="quota-asc">모집인원 적은순</option>
            <option value="rate-desc">경쟁률 높은순</option>
            <option value="rate-asc">경쟁률 낮은순</option>
            <option value="grade-desc" data-susi-grade-sort>지원가능 등급 높은순</option>
            <option value="grade-asc" data-susi-grade-sort>지원가능 등급 낮은순</option>
          </select>
        </div>
        ${susiUnitTableHtml()}`
          : `${jeongsiChartHtml()}
        <div class="admit-list-head">
          <h2 class="title-3 admit-list-title">모집단위 목록</h2>
          <select class="admit-search-select" name="sort" aria-label="정렬" data-jeongsi-sort>
            <option value="name">대학명순</option>
            <option value="quota-desc">모집인원 많은순</option>
            <option value="quota-asc">모집인원 적은순</option>
            <option value="rate-desc">경쟁률 높은순</option>
            <option value="rate-asc">경쟁률 낮은순</option>
            <option value="percentile-desc">백분위 평균 높은순</option>
            <option value="percentile-asc">백분위 평균 낮은순</option>
          </select>
        </div>
        ${jeongsiUnitTableHtml()}`
      }
    </section>`;
  }

  function jeongsiUnitsData() {
    /* ADMIT_DEMO_UNITS: 필터(학과유형·성적반영·지역) 체감용 30행 + 요강형 전형 수치 */
    return (window.ADMIT_DEMO_UNITS || []).map((item) => {
      const j = item.jeongsi || {};
      return {
        univ: item.univ,
        region: item.region,
        track: item.track,
        unit: item.unit,
        theme: item.theme || "",
        gradeMethod: item.gradeMethod || "",
        group: j.group || "가군",
        groupKey: j.groupKey || "ga",
        typeName: j.typeName || "일반전형(수능)",
        quota: j.quota || "10명",
        rate: j.rate || "5.00",
        method: j.method || "수능 100%",
        reflect: j.reflect || "미반영",
        area: j.area || "국·수·영·탐",
        areaKey: j.areaKey || "area-0",
        inquiry: j.inquiry || "2",
        score: j.score || "250.00",
      };
    });
  }

  function shortUnivLabel(univ) {
    const raw = String(univ || "").trim();
    const campus = raw.match(/\(([^)]+)\)/);
    const base = raw
      .replace(/\([^)]*\)/g, "")
      .replace(/여자대학교$/g, "여대")
      .replace(/외국어대학교$/g, "외국어대")
      .replace(/대학교$/g, "대")
      .trim();
    /* 캠퍼스 다르면 다른 대학 — 라벨에도 구분 */
    return campus ? `${base}(${campus[1]})` : base;
  }

  function measureJeongsiLabelWidth(text, fontSize = 13) {
    const canvas =
      measureJeongsiLabelWidth._canvas ||
      (measureJeongsiLabelWidth._canvas = document.createElement("canvas"));
    const ctx = canvas.getContext("2d");
    if (!ctx) return String(text || "").length * fontSize;
    ctx.font = `400 ${fontSize}px Pretendard, "Noto Sans KR", "Segoe UI", sans-serif`;
    return ctx.measureText(String(text || "")).width;
  }

  /* X축: 캠퍼스는 둘째 줄 — 가로 겹침 줄임 */
  function jeongsiAxisLabel(label) {
    const text = String(label || "");
    const matched = text.match(/^(.*?)(\([^)]+\))$/);
    if (matched && matched[1].trim()) {
      return { lines: [matched[1].trim(), matched[2]], full: text };
    }
    return { lines: [text], full: text };
  }

  function jeongsiChartHtml() {
    return `<div class="admit-list-head admit-jeongsi-chart-title-head">
        <h2 class="title-3 admit-list-title">대학별 백분위 평균</h2>
      </div>
      <div class="admit-jeongsi-chart" data-jeongsi-chart>
        <ul class="admit-jeongsi-chart-legend" aria-label="모집군 범례">
          <li class="is-ga"><span aria-hidden="true"></span>가군</li>
          <li class="is-na"><span aria-hidden="true"></span>나군</li>
          <li class="is-da"><span aria-hidden="true"></span>다군</li>
        </ul>
        <div class="admit-jeongsi-chart-body" data-jeongsi-chart-body></div>
      </div>`;
  }

  function renderJeongsiChart(root) {
    const body = root.querySelector("[data-jeongsi-chart-body]");
    if (!body) return;

    /* 표에 보이는 행 → 대학별 min~max / X축은 max 높은 순(왼쪽→오른쪽) */
    const visibleRows = [
      ...root.querySelectorAll("[data-jeongsi-unit-table] tbody tr[data-jeongsi-row]:not([hidden])"),
    ];
    const byUniv = new Map();
    visibleRows.forEach((row) => {
      const pct = Number.parseFloat(row.dataset.percentile);
      const fallback = Number.isFinite(pct)
        ? pct
        : parseAdmitNumber(row.cells[12]?.textContent);
      if (!Number.isFinite(fallback)) return;
      const univ = row.cells[0]?.textContent.trim() || "";
      if (!univ) return;
      const groupKey = row.dataset.group || "ga";
      const prev = byUniv.get(univ);
      if (!prev) {
        byUniv.set(univ, {
          univ,
          label: shortUnivLabel(univ),
          groupKey,
          min: fallback,
          max: fallback,
        });
        return;
      }
      if (fallback > prev.max) prev.groupKey = groupKey;
      prev.min = Math.min(prev.min, fallback);
      prev.max = Math.max(prev.max, fallback);
    });

    const series = [...byUniv.values()].sort((a, b) => {
      if (b.max !== a.max) return b.max - a.max; /* max 큰 대학이 왼쪽 */
      return a.label.localeCompare(b.label, "ko");
    });
    if (!series.length) {
      body.innerHTML = `<p class="admit-jeongsi-chart-empty">조건에 맞는 모집단위가 없습니다.</p>`;
      return;
    }

    /* Y축 고정 + 플롯 스크롤
       칸 최소폭 = 라벨 안 겹침 / 남는 폭이 있으면 칸을 늘려 우측 여백 없이 채움(사이드바 접힘 등) */
    const yAxisW = 48;
    const labelFont = 13;
    const labelGap = 20;
    const axisLabels = series.map((item) => jeongsiAxisLabel(item.label));
    const maxLabelW = Math.max(
      40,
      ...axisLabels.map((lab) =>
        Math.max(...lab.lines.map((line) => measureJeongsiLabelWidth(line, labelFont)))
      )
    );
    const minColW = Math.max(96, Math.ceil(maxLabelW) + labelGap);
    const multiLine = axisLabels.some((lab) => lab.lines.length > 1);
    const pad = { top: 16, right: 16, bottom: multiLine ? 58 : 44, left: 8 };
    const plotH = 280;
    const availPlotW = Math.max(0, (body.clientWidth || 0) - yAxisW - pad.left - pad.right);
    const stretchColW = series.length > 0 ? availPlotW / series.length : minColW;
    const colW = Math.max(minColW, stretchColW);
    const plotW = Math.max(series.length, 1) * colW;
    const width = pad.left + plotW + pad.right;
    const height = pad.top + plotH + pad.bottom;
    const yAt = (v) => pad.top + ((100 - v) / 100) * plotH;
    const xAt = (index) => pad.left + index * colW + colW / 2;
    const groupClass = { ga: "is-ga", na: "is-na", da: "is-da" };
    const yTicks = [100, 80, 60, 40, 20, 0];

    const yLabels = yTicks
      .map((v) => {
        const y = yAt(v);
        return `<text class="admit-jeongsi-y" x="${yAxisW - 10}" y="${y + 4}" text-anchor="end" font-size="${labelFont}">${v}</text>`;
      })
      .join("");

    const hGrid = yTicks
      .map((v) => {
        const y = yAt(v);
        return `<line class="admit-jeongsi-grid" x1="${pad.left}" y1="${y}" x2="${pad.left + plotW}" y2="${y}" />`;
      })
      .join("");

    const marks = series
      .map((item, index) => {
        const x = xAt(index);
        const yMax = yAt(item.max);
        const yMin = yAt(item.min);
        const cls = groupClass[item.groupKey] || "is-ga";
        const span = Math.abs(item.max - item.min);
        /* 위끝=max 고정 → 왼쪽(max↑)에서 오른쪽(max↓)으로 내려가는 모양 */
        const barW = 28;
        const barTop = Math.min(yMax, yMin);
        const barH = span < 0.05 ? barW : Math.max(barW, Math.abs(yMin - yMax));
        const mark = `<rect x="${x - barW / 2}" y="${barTop}" width="${barW}" height="${barH}" rx="0" />`;
        const lab = axisLabels[index];
        const labelY = pad.top + plotH + 22;
        const labelText =
          lab.lines.length > 1
            ? lab.lines
                .map(
                  (line, lineIndex) =>
                    `<tspan x="${x}" dy="${lineIndex === 0 ? 0 : 14}">${escapeHtml(line)}</tspan>`
                )
                .join("")
            : escapeHtml(lab.lines[0]);
        return `<g class="admit-jeongsi-mark ${cls}">
          ${mark}
          <text class="admit-jeongsi-x" x="${x}" y="${labelY}" text-anchor="middle" font-size="${labelFont}">${labelText}</text>
        </g>`;
      })
      .join("");

    body.dataset.jeongsiMinCol = String(minColW);
    body.dataset.jeongsiPadLeft = String(pad.left);
    body.dataset.jeongsiPadRight = String(pad.right);
    body.dataset.jeongsiHeight = String(height);
    body.dataset.jeongsiColW = String(colW);
    body.innerHTML = `<div class="admit-jeongsi-chart-frame">
        <div class="admit-jeongsi-y-stick" aria-hidden="true">
          <svg class="admit-jeongsi-y-svg" width="${yAxisW}" height="${height}" viewBox="0 0 ${yAxisW} ${height}" preserveAspectRatio="xMinYMid meet">
            ${yLabels}
          </svg>
        </div>
        <div class="admit-jeongsi-chart-scroll">
          <svg class="admit-jeongsi-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="width:${width}px;min-width:${width}px;max-width:none;height:${height}px;flex-shrink:0" preserveAspectRatio="xMinYMid meet" role="img" aria-label="대학별 백분위 평균 분포">
            ${hGrid}
            ${marks}
          </svg>
        </div>
      </div>`;
    bindJeongsiChartLayout(root);
  }

  /* 사이드바 접힘 등: SVG 통째 재생성 없이 X 간격·폭만 갱신 */
  function layoutJeongsiChartFast(root) {
    const body = root.querySelector("[data-jeongsi-chart-body]");
    const svg = body?.querySelector(".admit-jeongsi-svg");
    const markNodes = body?.querySelectorAll(".admit-jeongsi-mark");
    if (!body || !svg || !markNodes?.length) return false;

    const yAxisW = 48;
    const barW = 28;
    const padLeft = Number(body.dataset.jeongsiPadLeft || 8);
    const padRight = Number(body.dataset.jeongsiPadRight || 16);
    const minColW = Number(body.dataset.jeongsiMinCol || 96);
    const height = Number(body.dataset.jeongsiHeight || 340);
    const n = markNodes.length;
    const availPlotW = Math.max(0, (body.clientWidth || 0) - yAxisW - padLeft - padRight);
    const colW = Math.max(minColW, n > 0 ? availPlotW / n : minColW);
    const prev = Number(body.dataset.jeongsiColW || 0);
    if (Math.abs(prev - colW) < 0.5) return true;

    const plotW = n * colW;
    const width = padLeft + plotW + padRight;
    body.dataset.jeongsiColW = String(colW);

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.style.width = `${width}px`;
    svg.style.minWidth = `${width}px`;
    svg.style.height = `${height}px`;

    body.querySelectorAll(".admit-jeongsi-grid").forEach((line) => {
      line.setAttribute("x1", String(padLeft));
      line.setAttribute("x2", String(padLeft + plotW));
    });

    markNodes.forEach((g, index) => {
      const x = padLeft + index * colW + colW / 2;
      const rect = g.querySelector("rect");
      const text = g.querySelector(".admit-jeongsi-x");
      if (rect) rect.setAttribute("x", String(x - barW / 2));
      if (text) {
        text.setAttribute("x", String(x));
        text.querySelectorAll("tspan").forEach((tspan) => tspan.setAttribute("x", String(x)));
      }
    });
    return true;
  }

  function bindJeongsiChartLayout(root) {
    if (!root || root.dataset.jeongsiChartLayout === "1") return;
    root.dataset.jeongsiChartLayout = "1";
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        if (!root.isConnected) return;
        layoutJeongsiChartFast(root);
      });
    };
    const body = root.querySelector("[data-jeongsi-chart-body]");
    if (body && typeof ResizeObserver !== "undefined") {
      new ResizeObserver(schedule).observe(body);
      return;
    }
    window.addEventListener("resize", schedule);
  }

  function jeongsiUnitTableHtml() {
    const units = jeongsiUnitsData();
    const rows = units
      .map((item, index) => {
        const classes = [];
        if (index % 2 === 1) classes.push("is-alt");
        if (index === units.length - 1) classes.push("is-last-visible");
        const cls = classes.length ? ` class="${classes.join(" ")}"` : "";
        const regionKey = REGION_KEY[item.region] || "";
        const trackKey = TRACK_KEY[item.track] || "";
        const percentile = jeongsiPercentile(item.score, item.area, item.inquiry);
        const reflect = item.reflect || inferJeongsiRecordReflect(item.method);
        const reflectKey = susiReflectKey(reflect);
        const theme = item.theme || inferAdmitTheme(item.unit);
        const gradeMethod = admitGradeMethodAttr(reflect, item.gradeMethod, index);
        return `<tr data-jeongsi-row data-region="${regionKey}" data-track="${trackKey}" data-group="${item.groupKey}" data-area="${item.areaKey}" data-inquiry="${item.inquiry}" data-reflect="${reflectKey}" data-theme="${theme}" data-grade-method="${gradeMethod}" data-quota="${item.quota}" data-rate="${item.rate}" data-score="${item.score}" data-percentile="${Number.isFinite(percentile) ? percentile.toFixed(2) : ""}"${cls}>
            <td class="admit-data-name">${item.univ}</td>
            <td>${item.region}</td>
            <td>${item.track}</td>
            <td>${escapeHtml(String(item.group || "").replace(/군$/, ""))}</td>
            <td>${item.typeName}</td>
            <td>${item.unit}</td>
            <td>${formatAdmitQuota(item.quota)}</td>
            <td>${formatAdmitRate(item.rate)}</td>
            <td>${item.method}</td>
            <td data-jeongsi-reflect-col>${escapeHtml(reflect)}</td>
            <td>${item.area}</td>
            <td>${escapeHtml(String(item.inquiry ?? ""))}</td>
            <td class="admit-highlight-score admit-jeongsi-score">${formatJeongsiScore(item.score, item.area, item.inquiry)}</td>
            <td class="admit-highlight-score">${formatJeongsiPercentile(item.score, item.area, item.inquiry)}</td>
            <td><button type="button" class="admit-data-view">보기</button></td>
          </tr>`;
      })
      .join("");

    const th = (label) =>
      `<th style="padding: 3mm 2mm !important; height: 12mm !important;">${label}</th>`;

    return `<div class="admit-data-wrap">
      <table class="admit-data-table comparison-table" data-jeongsi-unit-table>
        <thead>
          <tr>
            ${th("대학명(캠퍼스)")}
            ${th("지역")}
            ${th("계열")}
            ${th("군")}
            ${th("전형명")}
            ${th("모집단위")}
            ${th("모집인원")}
            ${th("전년도 경쟁률")}
            ${th("전형방법")}
            ${th("학생부 반영")}
            ${th("반영 영역")}
            ${th("탐구 반영")}
            ${th("지원가능 점수")}
            ${th("백분위 평균")}
            ${th("상세")}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }

  /* 학생부 반영 구분 — 필터·표 컬럼 공통 */
  const SUSI_REFLECT_LABEL = {
    quant: "정량",
    qual: "정성",
    both: "정량+정성",
    none: "미반영",
  };

  function inferSusiRecordReflect(typeKey, method) {
    const m = String(method || "");
    if (typeKey === "논술") return /학생부|교과/.test(m) ? "정량" : "미반영";
    if (typeKey === "종합") {
      if (/교과/.test(m) && /서류|면접|종합/.test(m)) return "정량+정성";
      return "정성";
    }
    /* 교과: 서류·종합평가 혼합이면 정량+정성, 학생부/교과만이면 정량 */
    if (/서류|종합평가|교과종합|면접/.test(m)) return "정량+정성";
    return "정량";
  }

  /* 정시: 학생부·교과 언급 없으면 미반영 */
  function inferJeongsiRecordReflect(method) {
    const m = String(method || "");
    if (/학생부|교과/.test(m)) {
      if (/서류|면접|정성|종합/.test(m)) return "정량+정성";
      return "정량";
    }
    return "미반영";
  }

  function susiReflectKey(label) {
    const entry = Object.entries(SUSI_REFLECT_LABEL).find(([, text]) => text === label);
    return entry ? entry[0] : "";
  }

  function susiUnitTableHtml() {
    /* 대학명·지역·계열·모집단위 고정 / 전형명은 대학별 실제 전형명 / 수치는 2025 수시 실데이터 기준 */
    const units = (window.ADMIT_DEMO_UNITS || []).map((item) => ({
      univ: item.univ,
      region: item.region,
      track: item.track,
      unit: item.unit,
      theme: item.theme || "",
      gradeMethod: item.gradeMethod || "",
      교과명: item.교과명,
      종합명: item.종합명,
      논술명: item.논술명,
      교과: item.교과,
      종합: item.종합,
      논술: item.논술,
    }));
    const rows = ["교과", "종합", "논술"]
      .flatMap((typeKey) =>
        units.map((item, index) => {
          const stats = item[typeKey];
          const typeName = item[`${typeKey}명`] || typeKey;
          const hasGrade = typeKey === "교과";
          const classes = [];
          if (typeKey === "교과" && index % 2 === 1) classes.push("is-alt");
          if (typeKey === "교과" && index === units.length - 1) classes.push("is-last-visible");
          const cls = classes.length ? ` class="${classes.join(" ")}"` : "";
          const gradeCell = hasGrade
            ? `<td class="admit-highlight-score" data-susi-grade-col>${formatAdmitGrade(stats[3])}</td>`
            : `<td class="admit-highlight-score" data-susi-grade-col hidden></td>`;
          const minimum = hasGrade ? stats[4] : stats[3];
          const reflect =
            item[`${typeKey}반영`] || inferSusiRecordReflect(typeKey, stats[2]);
          const reflectKey = susiReflectKey(reflect);
          const theme = item.theme || inferAdmitTheme(item.unit);
          const gradeMethod = admitGradeMethodAttr(reflect, item.gradeMethod, index);
          return `<tr data-susi-type="${typeKey}" data-reflect="${reflectKey}" data-theme="${theme}" data-grade-method="${gradeMethod}"${cls}${typeKey === "교과" ? "" : " hidden"}>
            <td class="admit-data-name">${item.univ}</td>
            <td>${item.region}</td>
            <td>${item.track}</td>
            <td>${typeName}</td>
            <td>${item.unit}</td>
            <td>${formatAdmitQuota(stats[0])}</td>
            <td>${formatAdmitRate(stats[1])}</td>
            <td>${stats[2]}</td>
            <td data-susi-reflect-col>${reflect}</td>
            ${gradeCell}
            <td>${minimum}</td>
            <td><button type="button" class="admit-data-view">보기</button></td>
          </tr>`;
        })
      )
      .join("");

    const th = (label, attrs = "") =>
      `<th${attrs} style="padding: 3mm 2mm !important; height: 12mm !important;">${label}</th>`;

    return `<div class="admit-data-wrap">
      <table class="admit-data-table comparison-table" data-susi-unit-table>
        <thead>
          <tr>
            ${th("대학명(캠퍼스)")}
            ${th("지역")}
            ${th("계열")}
            ${th("전형명")}
            ${th("모집단위")}
            ${th("모집인원")}
            ${th("전년도 경쟁률")}
            ${th("전형방법")}
            ${th("학생부 반영")}
            ${th("지원가능 등급", ' data-susi-grade-col')}
            ${th("수능 최저")}
            ${th("상세")}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }

  function susiTypeFromSection(id) {
    if (id === "susi-holistic") return "종합";
    if (id === "susi-essay") return "논술";
    return "교과";
  }

  const REGION_LABEL = {
    gangwon: "강원",
    gyeonggi: "경기",
    gyeongnam: "경남",
    gyeongbuk: "경북",
    gwangju: "광주",
    daegu: "대구",
    daejeon: "대전",
    busan: "부산",
    seoul: "서울",
    ulsan: "울산",
    incheon: "인천",
    jeonnam: "전남",
    jeonbuk: "전북",
    jeju: "제주",
    chungnam: "충남",
    chungbuk: "충북",
  };
  const TRACK_LABEL = {
    common: "공통",
    humanities: "인문",
    natural: "자연",
    arts: "예체능",
  };
  const FOUNDING_LABEL = {
    national: "국립",
    private: "사립",
    special: "특별법인",
  };

  function parseAdmitNumber(text) {
    const raw = String(text || "").trim();
    /* 경쟁률 "13.1:1" → 13.1 */
    const ratio = raw.match(/^([\d.]+)\s*:/);
    if (ratio) {
      const n = parseFloat(ratio[1]);
      return Number.isFinite(n) ? n : NaN;
    }
    /* 지원가능 점수 "292.80 / 400" → 292.80 */
    const scored = raw.match(/^([\d.]+)\s*\//);
    if (scored) {
      const n = parseFloat(scored[1]);
      return Number.isFinite(n) ? n : NaN;
    }
    const n = parseFloat(raw.replace(/,/g, "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : NaN;
  }

  const REGION_KEY = Object.fromEntries(
    Object.entries(REGION_LABEL).map(([key, label]) => [label, key])
  );
  const TRACK_KEY = Object.fromEntries(
    Object.entries(TRACK_LABEL).map(([key, label]) => [label, key])
  );

  function isAdmitBlank(value) {
    const raw = String(value ?? "").trim();
    return !raw || raw === "-" || raw === "—" || raw === "–";
  }

  /* 경쟁률: 항상 소수 2자리 + :1 (예: 6.80:1) */
  function formatAdmitRate(value) {
    if (isAdmitBlank(value)) return "-";
    const n = parseAdmitNumber(value);
    return Number.isFinite(n) ? `${n.toFixed(2)}:1` : "-";
  }

  /* 충원율 등 %: 항상 소수 1자리 + % (예: 99.6%, 100.0%) */
  function formatAdmitFill(value) {
    if (isAdmitBlank(value)) return "-";
    const n = parseAdmitNumber(String(value).replace(/%/g, ""));
    return Number.isFinite(n) ? `${n.toFixed(1)}%` : "-";
  }

  /* 인원: 천단위 콤마 + 명 (예: 3,163명) */
  function formatAdmitQuota(value) {
    if (isAdmitBlank(value)) return "-";
    const n = parseAdmitNumber(value);
    return Number.isFinite(n) ? `${Math.round(n).toLocaleString("ko-KR")}명` : "-";
  }

  /* 등급·백분위·점수: 소수 2자리 */
  function formatAdmitGrade(value) {
    if (isAdmitBlank(value)) return "-";
    const n = parseFloat(String(value).trim());
    return Number.isFinite(n) ? n.toFixed(2) : "-";
  }

  /* 국·수·영 각 100점, 탐구 1과목당 50점 */
  function jeongsiScoreMax(area, inquiry) {
    const text = String(area || "");
    let max = 0;
    if (text.includes("국")) max += 100;
    if (text.includes("수")) max += 100;
    if (text.includes("영")) max += 100;
    if (text.includes("탐")) max += 50 * (Number(inquiry) || 0);
    return max;
  }

  function formatJeongsiScore(score, area, inquiry) {
    const n = Number(score);
    const max = jeongsiScoreMax(area, inquiry);
    if (!Number.isFinite(n) || !max) return "-";
    return `${n.toFixed(2)} / ${max}`;
  }

  /* 지원가능 점수 → 100점 만점 환산 */
  function jeongsiPercentile(score, area, inquiry) {
    const n = Number(score);
    const max = jeongsiScoreMax(area, inquiry);
    if (!Number.isFinite(n) || !max) return NaN;
    return (n / max) * 100;
  }

  function formatJeongsiPercentile(score, area, inquiry) {
    const pct = jeongsiPercentile(score, area, inquiry);
    return Number.isFinite(pct) ? pct.toFixed(2) : "-";
  }

  function stripeVisibleRows(rows) {
    let visible = 0;
    let lastVisible = null;
    rows.forEach((row) => {
      row.classList.remove("is-last-visible");
      const show = !row.hidden;
      row.classList.toggle("is-alt", show && visible % 2 === 1);
      if (show) {
        lastVisible = row;
        visible += 1;
      }
    });
    if (lastVisible) lastVisible.classList.add("is-last-visible");
  }

  function compareAdmitRows(a, b, mode, getters) {
    const key = mode.replace(/-(asc|desc)$/, "");
    if (key === "name") {
      return getters.name(a).localeCompare(getters.name(b), "ko");
    }
    /* 등급: 높은순=숫자 작음(1등급), 낮은순=숫자 큼 */
    let dir = mode.endsWith("-asc") ? 1 : mode.endsWith("-desc") ? -1 : 1;
    if (key === "grade") dir = mode === "grade-desc" ? 1 : -1;
    const av = getters[key] ? getters[key](a) : NaN;
    const bv = getters[key] ? getters[key](b) : NaN;
    if (!Number.isFinite(av) && !Number.isFinite(bv)) return getters.name(a).localeCompare(getters.name(b), "ko");
    if (!Number.isFinite(av)) return 1;
    if (!Number.isFinite(bv)) return -1;
    if (av === bv) return getters.name(a).localeCompare(getters.name(b), "ko");
    return (av - bv) * dir;
  }

  function applyUniTableFilters(root) {
    const table = root.querySelector("[data-uni-table]");
    if (!table) return;
    const tbody = table.tBodies[0];
    const keyword = (root.querySelector('input[name="keyword"]')?.value || "").trim().toLowerCase();
    const regionVal = root.querySelector('select[name="region"]')?.value || "";
    const yearVal = root.querySelector('select[name="year"]')?.value || "";
    const foundingVal = root.querySelector('select[name="founding"]')?.value || "";
    const sortVal = root.querySelector("[data-uni-sort]")?.value || "name";
    const regionLabel = REGION_LABEL[regionVal] || "";
    const foundingLabel = FOUNDING_LABEL[foundingVal] || "";

    const rows = [...tbody.querySelectorAll("tr[data-uni-row]")];
    rows.sort((a, b) =>
      compareAdmitRows(a, b, sortVal, {
        name: (row) => row.cells[0]?.textContent.trim() || "",
        quota: (row) => parseAdmitNumber(row.cells[3]?.textContent),
        rate: (row) => parseAdmitNumber(row.cells[4]?.textContent),
        fill: (row) => parseAdmitNumber(row.cells[5]?.textContent),
      })
    );
    rows.forEach((row) => tbody.appendChild(row));

    let visible = 0;
    rows.forEach((row) => {
      const name = row.cells[0]?.textContent.trim() || "";
      const region = row.cells[1]?.textContent.trim() || "";
      const founding = row.cells[2]?.textContent.trim() || "";
      const yearOk = !yearVal || row.dataset.year === yearVal || row.dataset.year === "2024";
      const keywordOk = !keyword || name.toLowerCase().includes(keyword);
      const regionOk = !regionLabel || region === regionLabel;
      const foundingOk = !foundingLabel || founding === foundingLabel;
      const show = yearOk && keywordOk && regionOk && foundingOk;
      row.hidden = !show;
      if (show) visible += 1;
    });
    stripeVisibleRows(rows);
    updateAdmitListCount(root, visible);
  }

  function applySusiTableFilters(panel, root, sectionId) {
    const table = root.querySelector("[data-susi-unit-table]");
    if (!table) return;
    const tbody = table.tBodies[0];
    const type = susiTypeFromSection(sectionId);
    const showGrade = type === "교과";
    table.querySelectorAll("[data-susi-grade-col]").forEach((cell) => {
      cell.hidden = !showGrade;
    });
    const sort = root.querySelector("[data-susi-sort]");
    if (sort) {
      sort.querySelectorAll("[data-susi-grade-sort]").forEach((opt) => {
        opt.hidden = !showGrade;
        opt.disabled = !showGrade;
      });
      if (!showGrade && (sort.value === "grade-desc" || sort.value === "grade-asc")) {
        sort.value = "name";
      }
      /* 커스텀 셀렉트 메뉴에도 숨김 반영 — 종합·논술에서는 등급 정렬 제외 */
      sort.closest(".admit-select")?._rebuildAdmitSelect?.();
    }

    const keyword = (root.querySelector('input[name="keyword"]')?.value || "").trim().toLowerCase();
    const regionVal = root.querySelector('select[name="region"]')?.value || "";
    const trackVal = root.querySelector('select[name="track"]')?.value || "";
    const reflectVal = root.querySelector('select[name="reflect"]')?.value || "";
    const minimumVal = root.querySelector('select[name="minimum"]')?.value || "";
    const sortVal = sort?.value || "name";
    const regionLabel = REGION_LABEL[regionVal] || "";
    const trackLabel = TRACK_LABEL[trackVal] || "";

    const allRows = [...tbody.querySelectorAll("tr[data-susi-type]")];
    const ofType = allRows.filter((row) => row.dataset.susiType === type);
    const others = allRows.filter((row) => row.dataset.susiType !== type);

    ofType.sort((a, b) =>
      compareAdmitRows(a, b, sortVal, {
        name: (row) => row.cells[0]?.textContent.trim() || "",
        quota: (row) => parseAdmitNumber(row.cells[5]?.textContent),
        rate: (row) => parseAdmitNumber(row.cells[6]?.textContent),
        grade: (row) => parseAdmitNumber(row.cells[9]?.textContent),
      })
    );
    [...ofType, ...others].forEach((row) => tbody.appendChild(row));

    let visible = 0;
    allRows.forEach((row) => {
      if (row.dataset.susiType !== type) {
        row.hidden = true;
        row.classList.remove("is-last-visible");
        return;
      }
      const univ = row.cells[0]?.textContent.trim() || "";
      const region = row.cells[1]?.textContent.trim() || "";
      const track = row.cells[2]?.textContent.trim() || "";
      const unit = row.cells[4]?.textContent.trim() || "";
      const minimum = (row.cells[10]?.textContent || "").trim();
      /* 1순위: 상단 필터 */
      const keywordOk =
        !keyword || univ.toLowerCase().includes(keyword) || unit.toLowerCase().includes(keyword);
      const regionOk = !regionLabel || region === regionLabel;
      const trackOk = !trackLabel || track === trackLabel;
      const reflectOk = !reflectVal || row.dataset.reflect === reflectVal;
      const minimumOk =
        !minimumVal ||
        (minimumVal === "yes" && minimum === "적용") ||
        (minimumVal === "no" && minimum === "미적용");
      const primaryOk = keywordOk && regionOk && trackOk && reflectOk && minimumOk;
      /* 2순위: 상세 검색 카드 */
      const show = primaryOk && passesAdmitDetailCards(row, root);
      row.hidden = !show;
      if (show) visible += 1;
    });
    stripeVisibleRows(ofType);
    updateAdmitListCount(root, visible);
  }

  function applyJeongsiTableFilters(root) {
    const table = root.querySelector("[data-jeongsi-unit-table]");
    if (!table) return;
    const tbody = table.tBodies[0];
    if (!tbody) return;
    const keyword = (root.querySelector('input[name="keyword"]')?.value || "").trim().toLowerCase();
    const regionVal = root.querySelector('select[name="region"]')?.value || "";
    const trackVal = root.querySelector('select[name="track"]')?.value || "";
    const reflectVal = root.querySelector('select[name="reflect"]')?.value || "";
    const groupVal = root.querySelector('select[name="group"]')?.value || "";
    const areaVal = root.querySelector('select[name="area"]')?.value || "";
    const inquiryVal = root.querySelector('select[name="inquiry"]')?.value || "";
    const sortVal =
      root.querySelector("[data-jeongsi-sort]")?.value ||
      root.querySelector('select[name="sort"]')?.value ||
      "name";

    const rows = [...tbody.querySelectorAll("tr[data-jeongsi-row]")];
    rows.sort((a, b) =>
      compareAdmitRows(a, b, sortVal, {
        name: (row) => row.cells[0]?.textContent.trim() || "",
        quota: (row) => parseAdmitNumber(row.dataset.quota || row.cells[6]?.textContent),
        rate: (row) => parseAdmitNumber(row.dataset.rate || row.cells[7]?.textContent),
        score: (row) => parseAdmitNumber(row.dataset.score || row.cells[12]?.textContent),
        percentile: (row) => parseAdmitNumber(row.dataset.percentile || row.cells[13]?.textContent),
      })
    );
    rows.forEach((row) => tbody.appendChild(row));

    let visible = 0;
    rows.forEach((row) => {
      const univ = row.cells[0]?.textContent.trim() || "";
      const unit = row.cells[5]?.textContent.trim() || "";
      /* 1순위: 상단 필터 */
      const keywordOk =
        !keyword || univ.toLowerCase().includes(keyword) || unit.toLowerCase().includes(keyword);
      const regionOk = !regionVal || row.dataset.region === regionVal;
      const trackOk = !trackVal || row.dataset.track === trackVal;
      const reflectOk = !reflectVal || row.dataset.reflect === reflectVal;
      const groupOk = !groupVal || row.dataset.group === groupVal;
      const areaOk = !areaVal || row.dataset.area === areaVal;
      const inquiryOk = !inquiryVal || row.dataset.inquiry === inquiryVal;
      const primaryOk =
        keywordOk && regionOk && trackOk && reflectOk && groupOk && areaOk && inquiryOk;
      /* 2순위: 상세 검색 카드 */
      const show = primaryOk && passesAdmitDetailCards(row, root);
      row.hidden = !show;
      if (show) visible += 1;
    });
    stripeVisibleRows(rows);
    updateAdmitListCount(root, visible);
    renderJeongsiChart(root);
  }

  function applyAdmitFilters(panel, sectionId) {
    const root = panel.querySelector("[data-admit-search]");
    if (!root) return;
    if (root.dataset.searchType === "university") {
      applyUniTableFilters(root);
      return;
    }
    if (root.dataset.searchType === "jeongsi") {
      applyJeongsiTableFilters(root);
      return;
    }
    if (root.dataset.searchType === "susi") {
      const id =
        sectionId ||
        panel.querySelector(".section-tab.is-active")?.dataset.section ||
        "susi-subject";
      applySusiTableFilters(panel, root, id);
    }
  }

  function filterSusiUnitTable(panel, sectionId) {
    applyAdmitFilters(panel, sectionId);
  }

  function closeAdmitSelect(wrap) {
    if (!wrap) return;
    const trigger = wrap.querySelector(".admit-select-trigger");
    const menu = wrap.querySelector(".admit-select-menu");
    wrap.classList.remove("is-open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (menu) menu.hidden = true;
  }

  function closeAllAdmitSelects(except) {
    document.querySelectorAll(".admit-select.is-open").forEach((wrap) => {
      if (wrap !== except) closeAdmitSelect(wrap);
    });
  }

  /* 네이티브 select 팝업은 너비 제어 불가 → 검색 박스와 같은 너비의 커스텀 목록 */
  function enhanceAdmitSelects(root) {
    root.querySelectorAll("select.admit-search-select").forEach((select) => {
      if (select.closest(".admit-select")) return;

      const wrap = document.createElement("div");
      wrap.className = "admit-select";
      if (select.classList.contains("admit-detail-materials-select")) {
        wrap.classList.add("is-chip");
      }
      select.parentNode.insertBefore(wrap, select);
      wrap.appendChild(select);

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "admit-select-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      const aria = select.getAttribute("aria-label");
      if (aria) trigger.setAttribute("aria-label", aria);

      const menu = document.createElement("ul");
      menu.className = "admit-select-menu";
      menu.hidden = true;
      menu.setAttribute("role", "listbox");
      if (aria) menu.setAttribute("aria-label", aria);

      const syncFromSelect = () => {
        const selected = select.options[select.selectedIndex];
        trigger.textContent = selected ? selected.textContent : "";
        [...menu.children].forEach((li) => {
          const on = li.dataset.value === select.value;
          li.classList.toggle("is-selected", on);
          li.setAttribute("aria-selected", on ? "true" : "false");
        });
      };

      const rebuildOptions = () => {
        menu.replaceChildren();
        [...select.options].forEach((opt) => {
          if (opt.hidden) return;
          const li = document.createElement("li");
          li.className = "admit-select-option";
          li.setAttribute("role", "option");
          li.dataset.value = opt.value;
          li.textContent = opt.textContent;
          if (opt.disabled) {
            li.setAttribute("aria-disabled", "true");
            li.classList.add("is-disabled");
          }
          menu.appendChild(li);
        });
        syncFromSelect();
      };

      wrap._rebuildAdmitSelect = rebuildOptions;
      rebuildOptions();

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !wrap.classList.contains("is-open");
        closeAllAdmitSelects(wrap);
        if (!willOpen) {
          closeAdmitSelect(wrap);
          return;
        }
        wrap.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        menu.hidden = false;
      });

      menu.addEventListener("click", (event) => {
        const option = event.target.closest(".admit-select-option");
        if (!option || !menu.contains(option)) return;
        if (option.getAttribute("aria-disabled") === "true") return;
        event.preventDefault();
        event.stopPropagation();
        select.value = option.dataset.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        syncFromSelect();
        closeAdmitSelect(wrap);
      });

      select.addEventListener("change", syncFromSelect);
      wrap.appendChild(trigger);
      wrap.appendChild(menu);
    });
  }

  const ADMIT_DETAIL_YEARS = ["2027", "2026", "2025", "2024"];
  const ADMIT_RESULT_YEARS = ["2027", "2026", "2025"]; /* 입시결과 탭 연도 */
  const ADMIT_DETAIL_DATA_YEAR = "2025"; /* 목록 표 기준 연도(상세는 연도별 맵 사용) */
  const ADMIT_RESULT_TIME_SLOTS = ["D-3", "D-2", "D-1", "D-day 1차", "D-day 2차", "D-day 3차"];

  function toYearMap(value, years = ADMIT_DETAIL_YEARS) {
    if (value && typeof value === "object" && !Array.isArray(value)) return value;
    const out = {};
    years.forEach((year) => {
      out[year] = value;
    });
    return out;
  }

  function pickSusiYearly(univ, unit, typeKey) {
    const store = window.ADMIT_SUSI_YEARLY;
    if (!store) return null;
    return store[`${univ}|${unit}|${typeKey}`] || null;
  }

  /* 수능 최저: 적용 → 계열·모집단위 성격에 맞는 상세 문구 / 미적용은 그대로 */
  const ADMIT_MIN_DETAIL_BY_KIND = {
    med: [
      "국어·수학·영어·탐구 중 3개 영역 등급 합 4 이내",
      "국어·수학·영어·탐구 중 4개 영역 등급 합 5 이내",
      "수학·영어·탐구 중 3개 영역 등급 합 4 이내",
      "국어·수학·영어·과학탐구 중 3개 영역 각 2등급 이내",
    ],
    nurse: [
      "국어·영어·탐구 중 2개 영역 등급 합 6 이내",
      "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내",
      "영어 2등급 이내 및 국어·탐구 중 1개 영역 4등급 이내",
    ],
    edu: [
      "국어·수학·영어·탐구 중 3개 영역 등급 합 7 이내",
      "국어·영어·탐구 중 2개 영역 등급 합 5 이내",
      "국어·수학·영어 중 2개 영역 등급 합 4 이내",
    ],
    natural: [
      "수학·영어·탐구 중 2개 영역 등급 합 4 이내",
      "국어·수학·영어·탐구 중 3개 영역 등급 합 6 이내",
      "수학·탐구 등급 합 3 이내(수학 미적분/기하)",
      "수학 2등급 이내 및 탐구 1개 영역 3등급 이내",
    ],
    humanities: [
      "국어·영어·탐구 중 2개 영역 등급 합 5 이내",
      "국어·수학·영어 중 2개 영역 등급 합 4 이내",
      "국어·영어·탐구 중 2개 영역 각 3등급 이내",
      "영어 2등급 이내 및 국어·탐구 중 1개 영역 3등급 이내",
    ],
    common: [
      "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내",
      "국어·수학·영어·탐구 중 3개 영역 등급 합 7 이내",
      "국어·수학·영어·탐구 중 2개 영역 각 3등급 이내",
    ],
  };

  function admitMinSeedHash(seed) {
    let h = 0;
    const s = String(seed || "");
    for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }

  function admitPick(seed, list) {
    const arr = list || [];
    if (!arr.length) return "-";
    return arr[admitMinSeedHash(seed) % arr.length];
  }

  function admitMinKind(track, unit) {
    const theme = inferAdmitTheme(unit);
    if (theme === "med") return "med";
    if (theme === "nurse") return "nurse";
    if (theme === "edu" || theme === "edu-elem") return "edu";
    if (track === "자연") return "natural";
    if (track === "인문") return "humanities";
    return "common";
  }

  function expandAdmitMinLabel(label, seed = "", track = "", unit = "") {
    const raw = String(label == null ? "" : label).trim();
    if (!raw || raw === "-") return "-";
    if (raw === "미적용") return "미적용";
    if (raw !== "적용") return raw;
    const pool = ADMIT_MIN_DETAIL_BY_KIND[admitMinKind(track, unit)] || ADMIT_MIN_DETAIL_BY_KIND.common;
    return admitPick(seed, pool);
  }

  function resolveSusiElig(typeKey, track, unit) {
    const pack = window.ADMIT_SUSI_ELIG && window.ADMIT_SUSI_ELIG[typeKey];
    if (!pack) return "-";
    if (typeof pack === "string") return pack;
    const theme = inferAdmitTheme(unit);
    if (theme === "med" && pack.med) return pack.med;
    if (theme === "nurse" && pack.nurse) return pack.nurse;
    if ((theme === "edu" || theme === "edu-elem") && pack.edu) return pack.edu;
    if (theme === "advanced" && pack.advanced) return pack.advanced;
    if (theme === "contract" && pack.contract) return pack.contract;
    if (track === "자연" && pack.natural) return pack.natural;
    if (track === "인문" && pack.humanities) return pack.humanities;
    return pack.default || "-";
  }

  function shiftAdmitDateToken(token, days) {
    const m = String(token || "").match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
    if (!m) return token;
    const dt = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + days);
    const y = dt.getFullYear();
    const mo = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}.${mo}.${d}`;
  }

  function shiftAdmitScheduleValue(value, days) {
    const raw = String(value || "");
    if (!raw || raw === "-") return raw;
    return raw.replace(/\d{4}\.\d{2}\.\d{2}/g, (token) => shiftAdmitDateToken(token, days));
  }

  function scheduleRowFor(year, typeKey, seed) {
    const row = (window.ADMIT_SUSI_SCHEDULE && window.ADMIT_SUSI_SCHEDULE[year]) || {};
    const days = admitMinSeedHash(`${seed}|schedule|${year}`) % 4;
    return SCHEDULE_COLS.map((col) => {
      if (typeKey === "논술" && col === "면접일정") return "-";
      if (typeKey !== "논술" && col === "논술일정") return "-";
      if (typeKey === "교과" && col === "면접일정") return "-";
      return shiftAdmitScheduleValue(row[col] || "-", days);
    });
  }

  function yearlyFieldMap(yearly, field, years, fallback) {
    const out = {};
    years.forEach((year) => {
      const fromYear = yearly?.[year]?.[field];
      if (fromYear != null && fromYear !== "") out[year] = fromYear;
      else if (fallback && typeof fallback === "object" && !Array.isArray(fallback)) out[year] = fallback[year] ?? "-";
      else out[year] = fallback ?? "-";
    });
    return out;
  }

  function formatRateCell(raw) {
    return formatAdmitRate(raw);
  }


  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function susiTypeLabel(typeKey) {
    if (typeKey === "종합") return "학생부종합";
    if (typeKey === "논술") return "논술";
    return "학생부교과";
  }

  function parseAdmitMethodSteps(method) {
    const text = String(method || "").replace(/\s+/g, " ").trim();
    const stages = [];
    if (text && text !== "-") {
      const re = /\[([^\]]+)\]\s*([^/\[]+)/g;
      let match;
      while ((match = re.exec(text))) {
        stages.push({ stage: match[1].trim(), detail: match[2].replace(/\/\s*$/, "").trim() });
      }
      /* 축약형: 서류100%→면접100% / 서류100%→서류60%+면접40% */
      if (!stages.length && text.includes("→")) {
        const [first, second] = text.split("→").map((part) => part.trim()).filter(Boolean);
        if (first) stages.push({ stage: "1단계", detail: first });
        if (second) stages.push({ stage: "2단계", detail: second });
      }
      if (!stages.length) stages.push({ stage: "1단계", detail: text });
    }
    /* 전형방법은 1·2단계 모두 표시 (없는 단계는 -) */
    const find = (name) => stages.find((s) => String(s.stage).replace(/\s+/g, "") === name);
    return [
      find("1단계") || { stage: "1단계", detail: "-" },
      find("2단계") || { stage: "2단계", detail: "-" },
    ];
  }

  /* 전형방법 문구 → 학생부/면접/논술 등 칸에 매핑
     선발비율·비고만 %, 배점(학생부·면접·논술·총점 등)은 점 */
  function methodDetailToScores(detail) {
    const scores = {
      선발비율: "-",
      학생부: "-",
      면접: "-",
      논술: "-",
      실기: "-",
      전공적성: "-",
      기타: "-",
      비고: "-",
      총점: "-",
    };
    const text = String(detail || "").trim();
    if (!text || text === "-") return scores;
    const parts = text.split(/\s*\+\s*/).map((part) => part.trim()).filter(Boolean);
    let sum = 0;
    let hasPct = false;
    parts.forEach((part) => {
      const pct = part.match(/([\d.]+)\s*%/);
      const label = part.replace(/\s*[\d.]+\s*%\s*$/, "").trim();
      const value = pct ? `${pct[1]}점` : part;
      if (pct) {
        hasPct = true;
        sum += Number(pct[1]) || 0;
      }
      if (/학생부|교과|서류/.test(label)) {
        if (/서류/.test(label) && !/학생부|교과/.test(label)) scores.기타 = value;
        else scores.학생부 = value;
      } else if (/면접/.test(label)) scores.면접 = value;
      else if (/논술/.test(label)) scores.논술 = value;
      else if (/실기/.test(label)) scores.실기 = value;
      else if (/적성|전공/.test(label)) scores.전공적성 = value;
      else if (label) scores.기타 = value;
      else if (pct) scores.학생부 = value;
    });
    if (hasPct && Math.abs(sum - 100) < 0.05) {
      scores.선발비율 = "100%";
      scores.총점 = "100점";
    } else if (parts.length === 1 && /100\s*%/.test(parts[0])) {
      scores.선발비율 = "100%";
      scores.총점 = "100점";
    } else if (hasPct) {
      scores.선발비율 = `${sum}%`;
      scores.총점 = `${sum}점`;
    }
    scores.비고 = text;
    return scores;
  }

  function yearCells(valueByYearOrSingle, years = ADMIT_DETAIL_YEARS) {
    const map = toYearMap(valueByYearOrSingle, years);
    return years
      .map((year) => {
        const raw = map[year];
        const show = raw == null || raw === "" ? "-" : raw;
        return `<td>${escapeHtml(show)}</td>`;
      })
      .join("");
  }

  function yearHeaderRow(extraLeft = 0, years = ADMIT_DETAIL_YEARS) {
    const left =
      extraLeft > 0
        ? `<th scope="col" colspan="${extraLeft}">구분</th>`
        : `<th scope="col">구분</th>`;
    return `<tr>${left}${years.map((year) => `<th scope="col">${year}</th>`).join("")}</tr>`;
  }

  function dashYearCells(years = ADMIT_DETAIL_YEARS) {
    return yearCells("-", years);
  }

  function resultYearChips(activeYear = "2027") {
    return ADMIT_RESULT_YEARS.map(
      (year) =>
        `<button type="button" class="admit-detail-year-chip${
          year === activeYear ? " is-active" : ""
        }" data-admit-result-year="${year}">${year}</button>`
    ).join("");
  }

  const METHOD_SCORE_ROWS = ["선발비율", "학생부", "면접", "논술", "실기", "전공적성", "기타", "비고", "총점"];
  const RECORD_RATIO_ROWS = ["교과", "출결", "자격증", "활동", "봉사", "기타", "비고"];
  const SCHEDULE_COLS = ["접수일정", "합격발표", "면접일정", "논술일정", "실기일정", "적성일정", "기타일정"];

  /* 팝업 표: PC는 래퍼 맞춤(스크롤 X) / 태블릿·모바일은 PC min(1056)+스크롤 */
  const ADMIT_DETAIL_PC_MIN = 1056;

  function applyAdmitDetailCols(table, widths) {
    let group = table.querySelector("colgroup");
    if (!group) {
      group = document.createElement("colgroup");
      table.insertBefore(group, table.firstChild);
    }
    group.innerHTML = "";
    widths.forEach((w) => {
      const col = document.createElement("col");
      col.style.setProperty("width", w, "important");
      group.appendChild(col);
    });
  }

  function isAdmitDetailLabelTh(el) {
    return (
      el &&
      el.tagName === "TH" &&
      el.closest("tbody") &&
      !el.classList.contains("admit-detail-th-stack")
    );
  }

  function containAdmitDetailCells(table) {
    table.querySelectorAll("th, td").forEach((el) => {
      const isLabelTh = isAdmitDetailLabelTh(el);
      el.style.setProperty("width", "auto", "important");
      el.style.setProperty("min-width", "0", "important");
      el.style.setProperty("max-width", "none", "important");
      /* 회색 구분: 한 줄 유지 · PC 폭은 col %로 맞춤(스크롤 X) */
      el.style.setProperty("white-space", isLabelTh ? "nowrap" : "normal", "important");
      el.style.setProperty("word-break", "keep-all", "important");
      el.style.setProperty("overflow-wrap", isLabelTh ? "normal" : "break-word", "important");
      el.style.setProperty("overflow", "hidden", "important");
      el.style.setProperty("box-sizing", "border-box", "important");
    });
  }

  function measureAdmitDetailCols(table) {
    const probe = table.cloneNode(true);
    probe.querySelectorAll("colgroup").forEach((node) => node.remove());
    probe.setAttribute("style", "");
    probe.style.cssText =
      "position:absolute;left:-99999px;top:0;visibility:hidden;table-layout:auto;width:max-content;border-collapse:separate;border-spacing:0;margin:0;font:inherit;";
    probe.querySelectorAll("th, td").forEach((cell) => {
      const isLabelTh = isAdmitDetailLabelTh(cell);
      const isHeadTh = cell.tagName === "TH" && cell.closest("thead");
      cell.style.cssText = "";
      /* 구분 열·헤더만 nowrap 측정 · 긴 데이터(수능 최저 등)는 줄바꿈 폭으로 */
      cell.style.setProperty(
        "white-space",
        isLabelTh || isHeadTh ? "nowrap" : "normal",
        "important"
      );
      cell.style.setProperty("width", "auto", "important");
      cell.style.setProperty("min-width", "0", "important");
      cell.style.setProperty("max-width", isLabelTh || isHeadTh ? "none" : "160px", "important");
      cell.style.setProperty("overflow", "visible", "important");
      cell.style.setProperty("word-break", "keep-all", "important");
    });
    document.body.appendChild(probe);
    const rows = [...probe.rows];
    const colCount = Math.max(
      0,
      ...rows.map((row) => [...row.cells].reduce((sum, cell) => sum + (cell.colSpan || 1), 0))
    );
    const widths = Array(colCount).fill(0);
    const occupied = Array.from({ length: rows.length }, () => Array(colCount).fill(false));
    rows.forEach((row, r) => {
      let c = 0;
      [...row.cells].forEach((cell) => {
        while (c < colCount && occupied[r][c]) c += 1;
        const cs = cell.colSpan || 1;
        const rs = cell.rowSpan || 1;
        const w = Math.ceil(cell.getBoundingClientRect().width);
        if (cs <= 1) widths[c] = Math.max(widths[c], w);
        else {
          const part = Math.ceil(w / cs);
          for (let i = 0; i < cs; i += 1) widths[c + i] = Math.max(widths[c + i] || 0, part);
        }
        for (let rr = 0; rr < rs; rr += 1) {
          if (!occupied[r + rr]) continue;
          for (let cc = 0; cc < cs; cc += 1) occupied[r + rr][c + cc] = true;
        }
        c += cs;
      });
    });
    probe.remove();
    return widths.map((w) => Math.max(36, w || 36));
  }

  function assignAdmitDetailColWidths(table) {
    /* 종류별 비율은 항상 최신값으로 — 열 수 바뀌면 우측 빈 칸 방지 */
    if (table.classList.contains("admit-detail-table-unit")) {
      /* 구분(한 줄) + 연도 4열 — 회색 라벨 잘림 방지 */
      table.dataset.declaredColWidths = "15,21.25,21.25,21.25,21.25";
      return;
    }
    if (table.classList.contains("admit-detail-table-method")) {
      table.dataset.declaredColWidths = "18,18,16,16,16,16";
      return;
    }
    if (table.classList.contains("admit-detail-table-record")) {
      /* 구분 + 연도 4열 — 회색 스택열 제거 후 전체 폭 사용 */
      table.dataset.declaredColWidths = "15,21.25,21.25,21.25,21.25";
      return;
    }
    if (table.classList.contains("admit-detail-table-schedule")) {
      table.dataset.declaredColWidths = "16,14,14,14,14,14,14";
      return;
    }
    if (table.classList.contains("admit-detail-table-cut")) {
      /* 구분 + 결과 연도 3열(2027·2026·2025) */
      table.dataset.declaredColWidths = "25,25,25,25";
      return;
    }
    if (table.classList.contains("admit-detail-table-trend")) {
      table.dataset.declaredColWidths = "8,6.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,14";
      return;
    }
    if (table.dataset.declaredColWidths) return;
    /* uni-trend·연도형 기타: 측정 후 PC는 컨테이너에 맞춤 */
  }

  function admitDetailContentWidth(table) {
    const wrap = table.closest(".admit-detail-table-wrap");
    let w = wrap?.clientWidth || 0;
    if (w >= 40) return w;
    /* 입시결과 탭이 숨겨진 채 측정될 때: 본문 가용 폭 사용 */
    const body = table.closest(".admit-detail-root")?.querySelector(".admit-detail-body");
    if (!body) return 0;
    const cs = getComputedStyle(body);
    return Math.max(
      0,
      body.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0)
    );
  }

  function isAdmitDetailNarrow() {
    return window.matchMedia("(max-width: 1279px)").matches;
  }

  function fitAdmitDetailColumns(table) {
    const parentW = admitDetailContentWidth(table);
    const narrow = isAdmitDetailNarrow();
    const saved = String(table.dataset.declaredColWidths || "")
      .split(",")
      .map((v) => parseFloat(v))
      .filter((v) => Number.isFinite(v) && v > 0);
    if (saved.length >= 2 && Math.abs(saved.reduce((sum, w) => sum + w, 0) - 100) < 1.5) {
      applyAdmitDetailCols(
        table,
        saved.map((w) => `${w}%`)
      );
      if (narrow) {
        /* 태블릿·모바일: PC 폭 유지 + 가로 스크롤 (열 수에 맞는 %만 적용) */
        const floor = Math.max(ADMIT_DETAIL_PC_MIN, parentW);
        table.style.setProperty("width", `${floor}px`, "important");
        table.style.setProperty("min-width", `${floor}px`, "important");
        table.style.setProperty("max-width", "none", "important");
      } else {
        /* PC만: 스크롤 없이 팝업 폭에 맞춤 */
        table.style.setProperty("width", "100%", "important");
        table.style.setProperty("min-width", "0", "important");
        table.style.setProperty("max-width", "100%", "important");
      }
      return;
    }
    const pxWidths = measureAdmitDetailCols(table);
    if (!pxWidths.length) return;
    const total = pxWidths.reduce((sum, w) => sum + w, 0) || 1;
    applyAdmitDetailCols(
      table,
      pxWidths.map((w) => `${((w / total) * 100).toFixed(4)}%`)
    );
    if (narrow) {
      const floor = Math.max(ADMIT_DETAIL_PC_MIN, Math.ceil(total + 2), parentW);
      table.style.setProperty("width", `${floor}px`, "important");
      table.style.setProperty("min-width", `${floor}px`, "important");
      table.style.setProperty("max-width", "none", "important");
    } else {
      table.style.setProperty("width", "100%", "important");
      table.style.setProperty("min-width", "0", "important");
      table.style.setProperty("max-width", "100%", "important");
    }
  }

  function fitAdmitDetailTables(root) {
    if (!root) return;
    root.querySelectorAll("table.admit-detail-table").forEach((table) => {
      assignAdmitDetailColWidths(table);
      table.style.setProperty("table-layout", "fixed", "important");
      table.style.setProperty("overflow", "hidden", "important");
      containAdmitDetailCells(table);
      fitAdmitDetailColumns(table);
    });
    layoutUniRateChart(root);
  }

  function ensureAdmitDetailModal() {
    let root = document.getElementById("admit-detail-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "admit-detail-root";
      root.className = "admit-detail-root";
      root.hidden = true;
      root.innerHTML = `
        <button type="button" class="admit-detail-backdrop" data-admit-detail-close aria-label="상세 닫기"></button>
        <div class="admit-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="admit-detail-crumb">
          <div class="admit-detail-head">
            <div class="admit-detail-title-wrap">
              <p class="admit-detail-crumb" id="admit-detail-crumb"></p>
            </div>
            <div class="admit-detail-head-actions">
              <div class="admit-detail-tags" data-admit-detail-tags></div>
              <button type="button" class="admit-detail-close" data-admit-detail-close aria-label="닫기">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="admit-detail-tabs" role="tablist" aria-label="상세 구분">
            <button type="button" class="admit-detail-tab is-active" role="tab" aria-selected="true" data-admit-detail-tab="info">모집정보</button>
            <button type="button" class="admit-detail-tab" role="tab" aria-selected="false" data-admit-detail-tab="csat" hidden>수능 반영</button>
            <button type="button" class="admit-detail-tab" role="tab" aria-selected="false" data-admit-detail-tab="record">학생부 반영</button>
            <button type="button" class="admit-detail-tab" role="tab" aria-selected="false" data-admit-detail-tab="result">입시결과</button>
            <button type="button" class="admit-detail-tab" role="tab" aria-selected="false" data-admit-detail-tab="materials" hidden>종합자료</button>
          </div>
          <div class="admit-detail-body">
            <div class="admit-detail-panel" data-admit-detail-panel="info"></div>
            <div class="admit-detail-panel" data-admit-detail-panel="csat" hidden></div>
            <div class="admit-detail-panel" data-admit-detail-panel="record" hidden></div>
            <div class="admit-detail-panel" data-admit-detail-panel="result" hidden></div>
            <div class="admit-detail-panel" data-admit-detail-panel="materials" hidden></div>
          </div>
        </div>`;
      document.body.appendChild(root);

      root.addEventListener("click", (event) => {
        if (event.target.closest("[data-admit-detail-close]")) {
          closeAdmitDetailModal();
          return;
        }
        const tab = event.target.closest("[data-admit-detail-tab]");
        if (!tab || tab.hidden || !root.contains(tab)) return;
        const key = tab.dataset.admitDetailTab;
        root.querySelectorAll("[data-admit-detail-tab]").forEach((btn) => {
          const on = btn === tab;
          btn.classList.toggle("is-active", on);
          btn.setAttribute("aria-selected", on ? "true" : "false");
        });
        root.querySelectorAll("[data-admit-detail-panel]").forEach((panel) => {
          panel.hidden = panel.dataset.admitDetailPanel !== key;
        });
        /* 숨겨져 있던 탭 표도 전폭으로 다시 맞춤 */
        requestAnimationFrame(() => fitAdmitDetailTables(root));
      });
    }

    /* 이전 세션 모달에 탭/패널이 없으면 보강 */
    const tabs = root.querySelector(".admit-detail-tabs");
    const body = root.querySelector(".admit-detail-body");
    if (tabs && !root.querySelector('[data-admit-detail-tab="record"]')) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "admit-detail-tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      btn.dataset.admitDetailTab = "record";
      btn.textContent = "학생부 반영";
      const resultTab = tabs.querySelector('[data-admit-detail-tab="result"]');
      tabs.insertBefore(btn, resultTab || null);
    }
    if (tabs && !root.querySelector('[data-admit-detail-tab="csat"]')) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "admit-detail-tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      btn.dataset.admitDetailTab = "csat";
      btn.hidden = true;
      btn.textContent = "수능 반영";
      const recordTabEl = tabs.querySelector('[data-admit-detail-tab="record"]');
      tabs.insertBefore(btn, recordTabEl || null);
    }
    if (body && !root.querySelector('[data-admit-detail-panel="csat"]')) {
      const panel = document.createElement("div");
      panel.className = "admit-detail-panel";
      panel.dataset.admitDetailPanel = "csat";
      panel.hidden = true;
      const recordPanelEl = body.querySelector('[data-admit-detail-panel="record"]');
      body.insertBefore(panel, recordPanelEl || null);
    }
    if (body && !root.querySelector('[data-admit-detail-panel="record"]')) {
      const panel = document.createElement("div");
      panel.className = "admit-detail-panel";
      panel.dataset.admitDetailPanel = "record";
      panel.hidden = true;
      const resultPanel = body.querySelector('[data-admit-detail-panel="result"]');
      body.insertBefore(panel, resultPanel || null);
    }
    if (tabs && !root.querySelector('[data-admit-detail-tab="materials"]')) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "admit-detail-tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      btn.dataset.admitDetailTab = "materials";
      btn.hidden = true;
      btn.textContent = "종합자료";
      tabs.appendChild(btn);
    }
    if (body && !root.querySelector('[data-admit-detail-panel="materials"]')) {
      const panel = document.createElement("div");
      panel.className = "admit-detail-panel";
      panel.dataset.admitDetailPanel = "materials";
      panel.hidden = true;
      body.appendChild(panel);
    }
    return root;
  }

  function closeAdmitDetailModal() {
    const root = document.getElementById("admit-detail-root");
    if (!root) return;
    root.hidden = true;
    document.body.style.removeProperty("overflow");
  }

  function setAdmitDetailTabMode(root, mode) {
    const infoTab = root.querySelector('[data-admit-detail-tab="info"]');
    const csatTab = root.querySelector('[data-admit-detail-tab="csat"]');
    const recordTab = root.querySelector('[data-admit-detail-tab="record"]');
    const resultTab = root.querySelector('[data-admit-detail-tab="result"]');
    const materialsTab = root.querySelector('[data-admit-detail-tab="materials"]');
    if (mode === "university") {
      if (infoTab) {
        infoTab.textContent = "신입생 현황";
        infoTab.hidden = false;
        infoTab.classList.add("is-active");
        infoTab.setAttribute("aria-selected", "true");
      }
      if (csatTab) csatTab.hidden = true;
      if (recordTab) recordTab.hidden = true;
      if (resultTab) {
        resultTab.textContent = "대학발표 자료";
        resultTab.hidden = false;
        resultTab.classList.remove("is-active");
        resultTab.setAttribute("aria-selected", "false");
      }
      if (materialsTab) materialsTab.hidden = true;
    } else if (mode === "jeongsi") {
      if (infoTab) {
        infoTab.textContent = "모집정보";
        infoTab.hidden = false;
      }
      if (csatTab) {
        csatTab.textContent = "수능 반영";
        csatTab.hidden = false;
      }
      if (recordTab) {
        recordTab.textContent = "학생부 반영";
        recordTab.hidden = false;
      }
      if (resultTab) {
        resultTab.textContent = "입시결과";
        resultTab.hidden = false;
      }
      if (materialsTab) materialsTab.hidden = true;
    } else {
      if (infoTab) {
        infoTab.textContent = "모집정보";
        infoTab.hidden = false;
      }
      if (csatTab) csatTab.hidden = true;
      if (recordTab) {
        recordTab.textContent = "학생부 반영";
        recordTab.hidden = false;
      }
      if (resultTab) {
        resultTab.textContent = "입시결과";
        resultTab.hidden = false;
      }
      /* materials는 openSusiAdmitDetail에서 종합→종합자료 / 논술→논술자료 */
    }
  }

  function buildSusiRecordPanelHtml({
    typeKey,
    method,
    track,
    reflect,
    kind = "susi",
    univ = "",
    unit = "",
    gradeMethod = "",
  }) {
    const reflectLabel = reflect || inferSusiRecordReflect(typeKey, method);
    const hasQuant = /정량/.test(reflectLabel);
    const hasQual = /정성/.test(reflectLabel);
    const none = reflectLabel === "미반영";
    const isJeongsi = kind === "jeongsi";
    const seed = `${univ}|${unit}|${typeKey}|${kind}`;
    const dash = (value) => (value == null || value === "" ? "-" : value);
    /* 해당되는 평가만 체크 표시 (없으면 항목 자체를 숨김) */
    const checkHtml = (on, label) =>
      on
        ? `<span class="admit-record-check"><span class="admit-record-check-mark" aria-hidden="true"></span>${escapeHtml(
            label
          )}</span>`
        : "";

    /* UI 구조 유지 · 정량+정성 / 정성 / 미반영 샘플 · 없는 값만 "-" */
    const evalDesc = none
      ? "해당 전형에서 학생부 평가를 실시하지 않습니다."
      : hasQuant && hasQual
        ? "점수 환산과 학생부 종합평가를 함께 진행합니다."
        : hasQual
          ? "학생부 내용을 평가요소에 따라 종합적으로 평가합니다."
          : hasQuant
            ? "교과 성적을 정량 환산해 반영합니다."
            : "-";

    /* 목록 data-grade-method와 동일 값만 표시(필터 결과 ↔ 상세 불일치 방지) */
    const resolvedGradeMethod = hasQuant
      ? admitGradeMethodAttr(reflectLabel, gradeMethod, admitMinSeedHash(`${seed}|gm`))
      : "";
    const gradeMethodInfo = resolvedGradeMethod ? admitGradeMethodInfo(resolvedGradeMethod) : null;
    const methodBadge = gradeMethodInfo?.badge || "";
    const methodDesc = gradeMethodInfo?.desc || "";
    const ratioDetail = admitPick(seed + "|ratio", [
      "석차 70 : 성취 30",
      "석차 80 : 성취 20",
      "석차 60 : 성취 40",
      "석차등급만",
    ]);
    const subjectCards = [
      { label: "공통", title: ratioDetail === "석차등급만" ? "석차등급" : "석차+성취", detail: ratioDetail },
      { label: "일반선택", title: ratioDetail === "석차등급만" ? "석차등급" : "석차+성취", detail: ratioDetail },
      {
        label: "진로선택",
        title: admitPick(seed + "|career", ["석차+성취", "성취도", "석차등급"]),
        detail: admitPick(seed + "|careerD", ["석차 50 : 성취 50", "성취도 A·B·C", "석차등급만"]),
      },
      { label: "융합(사회·과학)", title: "감점만", detail: admitPick(seed + "|fus1", ["E이면 감점", "D·E이면 감점"]) },
      { label: "융합(그 외)", title: "감점만", detail: admitPick(seed + "|fus2", ["E이면 감점", "미반영"]) },
      { label: "체육·예술", title: "감점만", detail: admitPick(seed + "|art", ["C이면 감점", "D·E이면 감점"]) },
    ].map((card) => (hasQuant ? card : { label: card.label, title: "-", detail: "" }));

    const yearRatio = admitPick(seed + "|year", [
      "1학년 30% · 2학년 40% · 3학년 30%",
      "1학년 20% · 2학년 40% · 3학년 40%",
      "1학년 25% · 2학년 35% · 3학년 40%",
      "전학년 동일 반영",
    ]);
    const subjectLine = hasQuant
      ? admitPick(seed + "|subj", [
          track === "자연" ? "국·수·영·과" : track === "인문" ? "국·수·영·사" : "전 과목",
          "전 과목",
          track === "자연" ? "수학·과학 중심" : "국어·사회 중심",
        ])
      : "-";

    const scoreCalcLines = hasQuant
      ? [
          admitPick(seed + "|calc1", [
            "석차등급 점수는 최대 70점, 성취도 점수는 최대 30점으로 각각 산출한 뒤 합산합니다.",
            "석차등급 점수는 최대 80점, 성취도 점수는 최대 20점으로 각각 산출한 뒤 합산합니다.",
            "석차등급만으로 교과점수를 산출하고 성취도는 동점자 처리에 활용합니다.",
          ]),
          `${univ ? `${univ.replace(/\(.*?\)/g, "").trim()} ` : ""}모집단위(${unit || "해당 학과"}) 기준으로 과목별 이수단위 가중평균을 적용합니다.`,
          "융합선택과목과 체육·예술 과목은 성취도에 따라 감점을 적용합니다.",
          typeKey === "종합"
            ? "서류평가와 면접 단계에서 학생부 정성평가를 병행합니다."
            : "산출된 교과점수는 전형 총점 환산 비율에 따라 반영합니다.",
        ]
      : [];

    /* 정량+정성: 서류평가 / 정성만: 평가 기준 / 미반영: "-"만 */
    const qualTitle = hasQual ? (hasQuant ? "서류평가" : "평가 기준") : "";
    const qualText = hasQual
      ? hasQuant
        ? admitPick(seed + "|qual", ["2단계 전형에서 20 반영", "2단계 전형에서 30 반영", "서류평가 배점에 포함"])
        : admitPick(seed + "|qual2", [
            "학교생활기록부 전 영역을 정성적으로 종합평가",
            `${track === "자연" ? "수학·과학" : "인문·사회"} 역량과 전공 적합성을 중심으로 종합평가`,
            "학업역량·진로역량·공동체역량 평가 기준에 따라 종합평가",
          ])
      : "";

    /* 표 컬럼은 유지 · 데이터 없으면 "-" (정성/미반영 샘플) */
    const gradeScores = hasQuant
      ? admitPick(seed + "|gs", [
          ["70", "63", "45", "25", "0"],
          ["100", "90", "80", "70", "60"],
          ["80", "72", "55", "35", "10"],
        ])
      : ["-", "-", "-", "-", "-"];
    const achieveScores = hasQuant
      ? admitPick(seed + "|as", [
          ["30", "27", "20", "10", "0"],
          ["20", "16", "12", "8", "0"],
          ["40", "32", "24", "12", "0"],
        ])
      : ["-", "-", "-", "-", "-"];

    const evalTypeHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">학생부 평가 유형</h3>
        <div class="admit-record-box admit-record-eval">
          <div class="admit-record-eval-checks">
            ${checkHtml(hasQuant, "정량평가")}
            ${checkHtml(hasQual, "정성평가")}
            ${checkHtml(none, "미반영")}
          </div>
          <p class="admit-record-eval-desc">${escapeHtml(dash(evalDesc))}</p>
        </div>
      </section>`;

    /* 학생부 반영 비율 — 평가 유형과 교과성적 반영 방법 사이 */
    const recordDefaults = (() => {
      if (isJeongsi) {
        if (none || !hasQuant) {
          return { 교과: "-", 출결: "-", 자격증: "-", 활동: "-", 봉사: "-", 기타: "-", 비고: "-" };
        }
        const defaults = { 교과: "100%", 출결: "-", 자격증: "-", 활동: "-", 봉사: "-", 기타: "-", 비고: "-" };
        const pct = String(method || "").match(/학생부\s*(\d+)/);
        if (pct) defaults.교과 = `${pct[1]}%`;
        return defaults;
      }
      if (typeKey === "논술") {
        return { 교과: "10%", 출결: "-", 자격증: "-", 활동: "-", 봉사: "-", 기타: "-", 비고: "-" };
      }
      const defaults = { 교과: "100%", 출결: "-", 자격증: "-", 활동: "-", 봉사: "-", 기타: "-", 비고: "-" };
      if (typeKey === "교과" && /교과종합|종합평가/.test(method || "")) {
        defaults.교과 = "70%";
        defaults.기타 = "30%";
      }
      if (none || (!hasQuant && hasQual)) {
        return { 교과: "-", 출결: "-", 자격증: "-", 활동: "-", 봉사: "-", 기타: "-", 비고: "-" };
      }
      return defaults;
    })();
    const recordRatioBody = RECORD_RATIO_ROWS.map(
      (key) =>
        `<tr><th scope="row">${escapeHtml(key)}</th>${yearCells(recordDefaults[key] || "-")}</tr>`
    ).join("");
    const recordDetailHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">학생부 반영 비율</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-record">
            <colgroup>
              <col class="admit-detail-col-item">
              <col span="${ADMIT_DETAIL_YEARS.length}" class="admit-detail-col-year">
            </colgroup>
            <thead>${yearHeaderRow()}</thead>
            <tbody>${recordRatioBody}</tbody>
          </table>
        </div>
      </section>`;

    const methodTone = gradeMethodInfo?.tone || "";
    const methodTopHtml = hasQuant
      ? `<div class="admit-record-method-top">
            <span class="admit-record-method-badge${
              methodTone ? ` is-tone-${escapeHtml(methodTone)}` : ""
            }"${methodTone ? ` data-tone="${escapeHtml(methodTone)}"` : ""}>${escapeHtml(
              methodBadge
            )}</span>
            <span class="admit-record-method-desc">${escapeHtml(methodDesc)}</span>
          </div>`
      : `<div class="admit-record-method-top">
            <span class="admit-record-empty">-</span>
          </div>`;

    const gradeMethodHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">교과성적 반영 방법</h3>
        <div class="admit-record-box admit-record-box-method">${methodTopHtml}</div>
        <div class="admit-record-box admit-record-box-meta">
          <div class="admit-record-meta">
            <div class="admit-record-meta-item">
              <span class="admit-record-meta-label">반영 교과</span>
              <span class="admit-record-meta-value">${escapeHtml(dash(subjectLine))}</span>
            </div>
            <div class="admit-record-meta-item">
              <span class="admit-record-meta-label">반영 과목</span>
              <span class="admit-record-meta-value">-</span>
            </div>
            <div class="admit-record-meta-item">
              <span class="admit-record-meta-label">학년별 반영비율</span>
              <span class="admit-record-meta-value">${escapeHtml(hasQuant ? yearRatio : "-")}</span>
            </div>
            <div class="admit-record-meta-item">
              <span class="admit-record-meta-label">활용 지표</span>
              <span class="admit-record-meta-value">${escapeHtml(hasQuant ? "석차등급·성취도" : "-")}</span>
            </div>
          </div>
        </div>
      </section>`;

    const subjectTypeHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">과목 유형별 반영</h3>
        <div class="admit-record-subject-grid">
          ${subjectCards
            .map(
              (card) => `<div class="admit-record-subject-card">
              <p class="admit-record-subject-label">${escapeHtml(card.label)}</p>
              <p class="admit-record-subject-title">${escapeHtml(card.title)}</p>
              ${
                card.detail
                  ? `<p class="admit-record-subject-detail">${escapeHtml(card.detail)}</p>`
                  : ""
              }
            </div>`
            )
            .join("")}
        </div>
      </section>`;

    const scoreCalcHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">점수 산출 방법</h3>
        <div class="admit-record-box">
          ${
            scoreCalcLines.length
              ? `<ul class="admit-record-list">${scoreCalcLines
                  .map((line) => `<li>${escapeHtml(line)}</li>`)
                  .join("")}</ul>`
              : `<p class="admit-record-empty">-</p>`
          }
        </div>
      </section>`;

    const qualHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">정성평가 기준</h3>
        <div class="admit-record-box">
          ${
            hasQual
              ? `<p class="admit-record-qual-title">${escapeHtml(qualTitle)}</p>
          <p class="admit-record-qual-text">${escapeHtml(qualText)}</p>`
              : `<p class="admit-record-empty">-</p>`
          }
        </div>
      </section>`;

    /* 환산표: 컬럼·구조 유지, 데이터만 없으면 "-" */
    const convertHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">환산표(등급 점수)</h3>
        <div class="admit-record-convert">
          <div class="admit-detail-table-wrap">
            <table class="admit-detail-table admit-record-convert-table">
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">1</th><th scope="col">2</th><th scope="col">3</th><th scope="col">4</th><th scope="col">5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">점수</th>
                  ${gradeScores.map((v) => `<td>${escapeHtml(v)}</td>`).join("")}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">환산표(성취도 점수)</h3>
        <div class="admit-record-convert">
          <div class="admit-detail-table-wrap">
            <table class="admit-detail-table admit-record-convert-table">
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">A</th><th scope="col">B</th><th scope="col">C</th><th scope="col">D</th><th scope="col">E</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">점수</th>
                  ${achieveScores.map((v) => `<td>${escapeHtml(v)}</td>`).join("")}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>`;

    /* 교과성적 반영 방법 아래 · 원래 시안(상단선 박스 + · 불릿, 표/회색칸 없음) */
    const bonusBoxInner = (() => {
      if (none) return `<p class="admit-record-empty">-</p>`;
      const list = (items) =>
        `<ul class="admit-record-bonus-list">${items
          .map((line) => `<li>${escapeHtml(line)}</li>`)
          .join("")}</ul>`;
      if (isJeongsi) {
        if (!hasQuant) {
          return `<p class="admit-record-bonus-note">※ 해당 전형은 학생부 정량 가산점을 적용하지 않습니다.</p>${list([
            "수능 100% 전형: 학생부 이수 교과 가산점 없음",
            "서류·면접 반영 전형의 가산은 정성평가에 포함하여 별도 점수화하지 않음",
          ])}`;
        }
        const scienceTrack = track === "자연";
        return `<p class="admit-record-bonus-note">※ 전 계열 수능 반영영역별 지정 과목은 없으나, ${
          scienceTrack ? "자연" : "인문"
        } 계열 모집단위 학생부 이수 교과 가산점을 적용합니다.</p>${list([
          `수능위주일반전형(수능·학생부형): 학생부 ${
            scienceTrack ? "수학·과학" : "국어·사회"
          } 교과 3학년 2학기까지 선택과목(일반+진로+융합 선택과목) 권장 최소 이수학점(단위) 수 또는 과목 수 충족 시 전형 총점에서 가점 (총 8점)`,
          scienceTrack
            ? "수학교과 18학점(단위) 또는 5과목 이상: 4점"
            : "국어교과 16학점(단위) 또는 4과목 이상: 4점",
          scienceTrack
            ? "과학교과 20학점(단위) 또는 6과목 이상: 4점"
            : "사회교과 18학점(단위) 또는 5과목 이상: 4점",
          "수능위주일반전형(수능형)은 가산점 없음",
        ])}`;
      }
      if (typeKey === "논술") {
        return `<p class="admit-record-bonus-note">※ 논술전형은 논술고사 성적이 중심이며, 학생부 교과 가산은 제한적으로 적용합니다.</p>${list([
          "논술 성적 반영 후 동점자 처리 시 학생부 교과 우수자에게 가점",
          "진로선택 과목 성취도 A 비율에 따른 가산: 최대 2점",
          "학생부 미반영(논술 100%) 모집단위는 가산점 없음",
        ])}`;
      }
      if (typeKey === "종합" || (hasQual && !hasQuant)) {
        return `<p class="admit-record-bonus-note">※ 학생부종합전형은 정성평가에 포함하여 별도 가산점으로 분리하지 않습니다.</p>${list([
          "서류·면접 평가 시 전공 관련 활동·이수 과목을 종합적으로 반영",
          "정량 환산 가산점(학점·과목 수)은 적용하지 않음",
          "동점자 발생 시 서류평가 점수 → 면접 점수 순으로 처리",
        ])}`;
      }
      return `<p class="admit-record-bonus-note">※ 학생부교과전형에서 진로선택·융합선택 과목 이수에 따른 가산점을 적용합니다.</p>${list([
        "진로선택 과목 성취도 A·B 비율에 따라 최대 5점 가산",
        "융합선택(사회·과학) 과목 이수 시 최대 2점 가산",
        `${track === "자연" ? "수학·과학" : "국어·사회·수학"} 교과 이수단위 충족 시 전형 총점에서 가점`,
        "출결·봉사 등 비교과 가산은 해당 모집단위에 한해 적용",
      ])}`;
    })();
    const bonusHtml = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">가산점</h3>
        <div class="admit-detail-table-wrap">
          <div class="admit-record-bonus-box">${bonusBoxInner}</div>
        </div>
      </section>`;

    return `${evalTypeHtml}${recordDetailHtml}${gradeMethodHtml}${bonusHtml}${subjectTypeHtml}${scoreCalcHtml}${qualHtml}${convertHtml}`;
  }

  function parseAdmitStatNumber(value) {
    const n = Number(String(value || "").replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function formatAdmitCount(n) {
    return `${Math.round(n).toLocaleString("ko-KR")}명`;
  }

  function uniRateChartGeometry(points, plotOuterW) {
    const yAxisW = 44;
    const h = 280;
    const pad = { t: 36, r: 20, b: 42, l: 12 };
    const dataMax = Math.max(...points.map((p) => p.value), 0);
    const maxY = Math.max(30, Math.ceil(dataMax / 10) * 10);
    const plotW = plotOuterW - pad.l - pad.r;
    const plotH = h - pad.t - pad.b;
    const xInset = Math.max(36, plotW * 0.1);
    const xSpan = Math.max(1, plotW - xInset * 2);
    const xAt = (i) =>
      pad.l + xInset + (points.length <= 1 ? xSpan / 2 : (xSpan * i) / (points.length - 1));
    const yAt = (v) => pad.t + plotH - (plotH * v) / maxY;
    const ticks = [0, 10, 20, 30].filter((t) => t <= maxY + 0.01);
    const yLabels = ticks
      .map((t) => {
        const y = yAt(t);
        return `<text x="${yAxisW - 8}" y="${y + 4}" text-anchor="end" fill="#9ca3af" font-size="12">${t}</text>`;
      })
      .join("");
    const grid = ticks
      .map((t) => {
        const y = yAt(t);
        return `<line class="admit-detail-uni-grid" x1="${pad.l}" y1="${y}" x2="${plotOuterW - pad.r}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
      })
      .join("");
    const line = points
      .map((p, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`)
      .join(" ");
    const dots = points
      .map((p, i) => {
        const x = xAt(i);
        const y = yAt(p.value);
        const last = i === points.length - 1;
        return `<g class="admit-detail-uni-mark">
          <circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#1a4796" stroke-width="2"/>
          <text class="admit-detail-uni-val" x="${(x - 4).toFixed(1)}" y="${y - 12}" text-anchor="middle" fill="#1a4796" font-size="13" font-weight="${
          last ? "700" : "600"
        }">${p.value}</text>
          <text class="admit-detail-uni-x" x="${x}" y="${h - pad.b / 2}" text-anchor="middle" dominant-baseline="middle" fill="#6b7280" font-size="13">${p.year}</text>
        </g>`;
      })
      .join("");
    return { yAxisW, h, pad, yLabels, grid, line, dots };
  }

  function buildUniRateChart(points) {
    /* 초기 796 · 이후 layoutUniRateChart가 팝업 폭에 맞춰 가로로 채움 */
    const plotOuterW = 796;
    const geo = uniRateChartGeometry(points, plotOuterW);
    const payload = escapeHtml(JSON.stringify(points));
    return `<div class="admit-detail-uni-chart-frame" data-uni-rate-chart data-uni-rate-points="${payload}" data-uni-rate-w="${plotOuterW}">
      <div class="admit-detail-uni-chart-y" aria-hidden="true">
        <svg class="admit-detail-uni-chart-y-svg" width="${geo.yAxisW}" height="${geo.h}" viewBox="0 0 ${geo.yAxisW} ${geo.h}" preserveAspectRatio="xMinYMid meet">
          ${geo.yLabels}
        </svg>
      </div>
      <div class="admit-detail-uni-chart-scroll">
        <svg class="admit-detail-uni-chart-svg" width="${plotOuterW}" height="${geo.h}" viewBox="0 0 ${plotOuterW} ${geo.h}" preserveAspectRatio="xMinYMid meet" role="img" aria-label="신입생 경쟁률 추이" style="width:${plotOuterW}px;min-width:${plotOuterW}px;max-width:none;height:${geo.h}px">
          ${geo.grid}
          <path class="admit-detail-uni-line" d="${geo.line}" fill="none" stroke="#1a4796" stroke-width="2.2" stroke-linejoin="round"/>
          ${geo.dots}
        </svg>
      </div>
    </div>`;
  }

  function layoutUniRateChart(root) {
    const frame = root?.querySelector?.("[data-uni-rate-chart]");
    if (!frame) return false;
    const scroll = frame.querySelector(".admit-detail-uni-chart-scroll");
    const svg = frame.querySelector(".admit-detail-uni-chart-svg");
    if (!scroll || !svg) return false;
    let points = [];
    try {
      points = JSON.parse(frame.dataset.uniRatePoints || "[]");
    } catch (_) {
      points = [];
    }
    if (!points.length) return false;

    const avail = Math.floor(scroll.clientWidth || 0);
    if (avail < 40) return false;
    /* PC: 컨테이너 폭에 맞춤 · 좁은 화면: 최소 796 유지 후 가로 스크롤 */
    const plotOuterW = Math.max(isAdmitDetailNarrow() ? 796 : avail, avail);
    const prev = Number(frame.dataset.uniRateW || 0);
    if (Math.abs(prev - plotOuterW) < 1) return true;

    const geo = uniRateChartGeometry(points, plotOuterW);
    frame.dataset.uniRateW = String(plotOuterW);
    svg.setAttribute("viewBox", `0 0 ${plotOuterW} ${geo.h}`);
    svg.setAttribute("width", String(plotOuterW));
    svg.setAttribute("height", String(geo.h));
    svg.style.width = `${plotOuterW}px`;
    svg.style.minWidth = `${plotOuterW}px`;
    svg.style.height = `${geo.h}px`;
    svg.innerHTML = `${geo.grid}<path class="admit-detail-uni-line" d="${geo.line}" fill="none" stroke="#1a4796" stroke-width="2.2" stroke-linejoin="round"/>${geo.dots}`;
    return true;
  }

  function bindUniRateChartLayout(root) {
    const frame = root?.querySelector?.("[data-uni-rate-chart]");
    if (!frame) return;
    if (frame.dataset.uniRateBound === "1") {
      layoutUniRateChart(root);
      return;
    }
    frame.dataset.uniRateBound = "1";
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        if (!root.isConnected) return;
        layoutUniRateChart(root);
      });
    };
    const scroll = frame.querySelector(".admit-detail-uni-chart-scroll");
    if (scroll && typeof ResizeObserver !== "undefined") {
      new ResizeObserver(schedule).observe(scroll);
    } else {
      window.addEventListener("resize", schedule);
    }
    schedule();
  }

  function openUniversityAdmitDetail(row) {
    if (!row) return;
    const cells = [...row.children];
    const textAt = (index) => (cells[index]?.textContent || "").replace(/\s+/g, " ").trim();
    const univ = textAt(0) || "대학";
    const uniExtra = (window.ADMIT_UNI_DETAIL && window.ADMIT_UNI_DETAIL[univ]) || null;
    const yearOrder = ["2024", "2025", "2026"];
    const latest = uniExtra?.years?.["2026"] || null;
    const quotaText = latest ? formatAdmitQuota(latest.quota) : formatAdmitQuota(textAt(3)) || "-";
    const rateText = latest ? formatAdmitRate(latest.rate) : formatAdmitRate(textAt(4)) || "-";
    const fillText = latest ? formatAdmitFill(latest.fill) : formatAdmitFill(textAt(5)) || "-";
    const applicantsN = latest?.applicants || 0;
    const enrolledN = latest?.enrolled || 0;
    const chartPoints = yearOrder.map((y) => {
      const rowY = uniExtra?.years?.[y];
      return { year: y, value: rowY ? rowY.rate : 0 };
    });

    const root = ensureAdmitDetailModal();
    const crumb = root.querySelector("#admit-detail-crumb");
    const tags = root.querySelector("[data-admit-detail-tags]");
    const infoPanel = root.querySelector('[data-admit-detail-panel="info"]');
    const resultPanel = root.querySelector('[data-admit-detail-panel="result"]');
    const materialsPanel = root.querySelector('[data-admit-detail-panel="materials"]');

    setAdmitDetailTabMode(root, "university");
    crumb.textContent = shortUnivLabel(univ);
    if (tags) {
      /* 외부 연동 전: 클릭해도 이동하지 않음 */
      tags.innerHTML = `
        <button type="button" class="admit-detail-link-btn is-unlinked" aria-disabled="true">
          대학 홈페이지
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
            <path d="M14 5h5v5M19 5l-9 9M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="admit-detail-link-btn is-unlinked" aria-disabled="true">
          입학처
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
            <path d="M14 5h5v5M19 5l-9 9M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>`;
    }

    const stats = [
      ["입학정원", quotaText || "-"],
      ["지원자", applicantsN ? formatAdmitCount(applicantsN) : "-"],
      ["입학자", enrolledN ? formatAdmitCount(enrolledN) : "-"],
      ["신입생 충원율", fillText || "-"],
      ["신입생 경쟁률", rateText || "-"],
    ]
      .map(
        ([label, value]) => `
        <div class="admit-detail-uni-stat">
          <span class="admit-detail-uni-stat-label">${escapeHtml(label)}</span>
          <strong class="admit-detail-uni-stat-value">${escapeHtml(value)}</strong>
        </div>`
      )
      .join("");

    const formatTrendCount = (n) =>
      n == null || n === "" || n === 0 ? "-" : `${Math.round(n).toLocaleString("ko-KR")}명`;
    const trendRows = yearOrder
      .map((y) => {
        const d = uniExtra?.years?.[y];
        if (!d) return [y, "-", "-", "-", "-", "-", "-"];
        return [
          y,
          d.recruit,
          d.quota,
          d.applicants,
          d.enrolled,
          formatAdmitFill(d.fill),
          formatAdmitRate(d.rate),
        ];
      })
      .map(
        (cols) =>
          `<tr>${cols
            .map((c, i) => {
              let show;
              if (c == null || c === "") show = "-";
              else if (i >= 1 && i <= 4 && typeof c === "number") show = formatTrendCount(c);
              else if (typeof c === "number") show = c.toLocaleString("ko-KR");
              else show = c;
              return i === 0 ? `<th scope="row">${escapeHtml(String(show))}</th>` : `<td>${escapeHtml(String(show))}</td>`;
            })
            .join("")}</tr>`
      )
      .join("");

    const hsSource =
      (window.ADMIT_UNI_HS && (window.ADMIT_UNI_HS[univ] || window.ADMIT_UNI_HS.default)) || [];
    const hsRows = hsSource
      .map(
        ([label, a, b, c]) => {
          const pct = (v) => {
            if (isAdmitBlank(v)) return "-";
            const n = parseAdmitNumber(String(v).replace(/%/g, ""));
            return Number.isFinite(n) ? `${n.toFixed(2)}%` : "-";
          };
          return `<tr><th scope="row">${escapeHtml(label)}</th><td>${pct(a)}</td><td>${pct(b)}</td><td>${pct(
            c
          )}</td></tr>`;
        }
      )
      .join("");

    infoPanel.innerHTML = `
      <section class="admit-detail-section">
        <div class="admit-detail-section-head">
          <h3 class="admit-detail-section-title">신입생 충원</h3>
          <span class="admit-detail-section-meta">기준: 2026년</span>
        </div>
        <div class="admit-detail-uni-stats">${stats}</div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">신입생 경쟁률 추이</h3>
        <div class="admit-detail-uni-chart">${buildUniRateChart(chartPoints)}</div>
      </section>

      <section class="admit-detail-section">
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-uni-trend">
            <thead>
              <tr>
                <th scope="col">기준연도</th>
                <th scope="col">모집인원</th>
                <th scope="col">입학정원</th>
                <th scope="col">지원자</th>
                <th scope="col">입학자</th>
                <th scope="col">신입생 충원율</th>
                <th scope="col">신입생 경쟁률</th>
              </tr>
            </thead>
            <tbody>${trendRows}</tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <div class="admit-detail-section-head">
          <h3 class="admit-detail-section-title">출신 고교 유형</h3>
          <span class="admit-detail-section-meta">출처: 대학알리미</span>
        </div>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table">
            <thead>
              <tr>
                <th scope="col">구분</th>
                <th scope="col">2024</th>
                <th scope="col">2025</th>
                <th scope="col">2026</th>
              </tr>
            </thead>
            <tbody>${hsRows}</tbody>
          </table>
        </div>
      </section>`;

    const shortUniv = univ.replace(/\(.*?\)/g, "").trim();
    const extLinkIcon = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
            <path d="M14 5h5v5M19 5l-9 9M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;
    const uniCardDefs = [
      { title: "대학입학전형 시행계획", years: ["2028", "2027", "2026"] },
      { title: "수시 모집요강", years: ["2028", "2027", "2026"] },
      { title: "정시 모집요강", years: ["2028", "2027", "2026"] },
      { title: "입시결과", years: ["2027", "2026", "2025"] },
      { title: "전공 연계 권장과목", action: "자료 보기" },
    ];
    const uniCards = uniCardDefs
      .map((card) => {
        /* 자료 연동 전: 연도·자료 보기 모두 비동작 */
        const actions = card.action
          ? `<button type="button" class="admit-detail-uni-card-link is-unlinked" aria-disabled="true">${escapeHtml(card.action)}${extLinkIcon}</button>`
          : (card.years || [])
              .map(
                (y) =>
                  `<button type="button" class="admit-detail-uni-card-year is-unlinked" aria-disabled="true">${escapeHtml(y)}</button>`
              )
              .join("");
        return `
      <div class="admit-detail-uni-card">
        <p class="admit-detail-uni-card-title">${escapeHtml(card.title)}</p>
        <div class="admit-detail-uni-card-actions">${actions}</div>
      </div>`;
      })
      .join("");
    const uniFiles = [
      { year: "2027", tag: "종합자료", title: `2027학년도 ${shortUniv} 학생부종합전형 안내서`, date: "2026.05.27" },
      { year: "2027", tag: "논술자료", title: `2027학년도 ${shortUniv} 논술고사 기출문제`, date: "2026.04.15" },
      { year: "2026", tag: "종합자료", title: `2026학년도 ${shortUniv} 수시모집요강`, date: "2025.05.30" },
      { year: "2026", tag: "논술자료", title: `2026학년도 ${shortUniv} 논술 기출·해설`, date: "2025.04.20" },
      { year: "2025", tag: "종합자료", title: `2025학년도 ${shortUniv} 입시결과 안내`, date: "2025.03.15" },
    ];
    const uniYearOpts = ["학년도 전체", "2027", "2026", "2025"]
      .map((y, i) => `<option value="${y === "학년도 전체" ? "all" : y}"${i === 0 ? " selected" : ""}>${y}</option>`)
      .join("");
    const uniFileRows = uniFiles
      .map(
        (file) => `
          <li class="admit-detail-file" data-admit-file-year="${escapeHtml(file.year)}">
            <span class="admit-detail-file-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.6"/>
                <path d="M14 3v5h5" fill="none" stroke="currentColor" stroke-width="1.6"/>
              </svg>
            </span>
            <span class="admit-detail-file-year">${escapeHtml(file.year)}학년도</span>
            <span class="admit-detail-file-tag">${escapeHtml(file.tag)}</span>
            <span class="admit-detail-file-name">${escapeHtml(file.title)}</span>
            <span class="admit-detail-file-meta">
              <span class="admit-detail-file-date">${escapeHtml(file.date)}</span>
              <button type="button" class="admit-detail-file-view is-unlinked" aria-disabled="true">
                파일 보기
                ${extLinkIcon}
              </button>
            </span>
          </li>`
      )
      .join("");

    resultPanel.innerHTML = `
      <div class="admit-detail-uni-grid">${uniCards}</div>
      <section class="admit-detail-section">
        <div class="admit-detail-section-head admit-detail-materials-head">
          <h3 class="admit-detail-section-title">대학발표 자료 목록</h3>
          <div class="admit-detail-materials-filter">
            <select class="admit-search-select admit-detail-materials-select" data-admit-uni-year aria-label="학년도 선택">
              ${uniYearOpts}
            </select>
          </div>
        </div>
        <ul class="admit-detail-file-list" data-admit-uni-file-list>${uniFileRows}</ul>
      </section>`;

    if (materialsPanel) {
      materialsPanel.innerHTML = "";
      materialsPanel.hidden = true;
    }
    const recordPanel = root.querySelector('[data-admit-detail-panel="record"]');
    if (recordPanel) {
      recordPanel.innerHTML = "";
      recordPanel.hidden = true;
    }
    root.querySelectorAll("[data-admit-detail-tab]").forEach((btn) => {
      const on = btn.dataset.admitDetailTab === "info";
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    infoPanel.hidden = false;
    resultPanel.hidden = true;
    root.hidden = false;
    document.body.style.overflow = "hidden";
    /* 표시 후 측정 — hidden이면 부모 폭 0이라 우측이 비어 보임 */
    requestAnimationFrame(() => {
      fitAdmitDetailTables(root);
      bindUniRateChartLayout(root);
    });
    root.querySelector("[data-admit-detail-close].admit-detail-close")?.focus();

    enhanceAdmitSelects(resultPanel);
    resultPanel.querySelector("[data-admit-uni-year]")?.addEventListener("change", (event) => {
      const value = event.target.value;
      resultPanel.querySelectorAll("[data-admit-file-year]").forEach((row) => {
        row.hidden = value !== "all" && row.dataset.admitFileYear !== value;
      });
    });
  }

  function openSusiAdmitDetail(row) {
    if (!row) return;
    const cells = [...row.children];
    const textAt = (index) => (cells[index]?.textContent || "").replace(/\s+/g, " ").trim();
    const univ = textAt(0);
    const region = textAt(1);
    const track = textAt(2);
    const typeKey = row.dataset.susiType || "교과";
    const typeName = textAt(3) || susiTypeLabel(typeKey);
    const unit = textAt(4);
    const quota = textAt(5);
    const rate = textAt(6);
    const method = textAt(7);
    const reflectLabel = textAt(8) || inferSusiRecordReflect(typeKey, method);
    const gradeTd = cells[9];
    const gradeVisible = gradeTd && !gradeTd.hidden && getComputedStyle(gradeTd).display !== "none";
    const grade = gradeVisible ? textAt(9) : "";
    const minimum = textAt(gradeVisible ? 10 : 9);

    const root = ensureAdmitDetailModal();
    const crumb = root.querySelector("#admit-detail-crumb");
    const tags = root.querySelector("[data-admit-detail-tags]");
    const infoPanel = root.querySelector('[data-admit-detail-panel="info"]');
    const recordPanel = root.querySelector('[data-admit-detail-panel="record"]');
    const resultPanel = root.querySelector('[data-admit-detail-panel="result"]');
    const materialsPanel = root.querySelector('[data-admit-detail-panel="materials"]');
    const materialsTab = root.querySelector('[data-admit-detail-tab="materials"]');
    const showMaterials = typeKey === "종합" || typeKey === "논술";
    const materialsKind = typeKey === "논술" ? "논술" : "종합";

    crumb.innerHTML = `${escapeHtml(univ)}<span class="admit-detail-crumb-sep">›</span>${escapeHtml(unit)}`;
    /* 수시 팝업: 입학처 버튼 없음 */
    tags.innerHTML = `
      <span class="admit-detail-tag is-primary">수시</span>
      <span class="admit-detail-tag">${escapeHtml(typeKey)}</span>
      <span class="admit-detail-tag">${escapeHtml(typeName)}</span>`;
    setAdmitDetailTabMode(root, "susi");
    if (materialsTab) {
      materialsTab.hidden = !showMaterials;
      materialsTab.textContent = materialsKind === "논술" ? "논술자료" : "종합자료";
    }

    const yearly = pickSusiYearly(univ, unit, typeKey);
    const minSeed = `${univ}|${unit}|${typeKey}`;
    /* 연도별 수집값 채운 뒤, 목록 표에 있는 값은 기준연도에 그대로 덮어씀 */
    const quotaByYear = yearlyFieldMap(yearly, "quota", ADMIT_DETAIL_YEARS, quota || "-");
    const minByYearRaw = yearlyFieldMap(yearly, "min", ADMIT_DETAIL_YEARS, minimum || "-");
    const minByYear = {};
    ADMIT_DETAIL_YEARS.forEach((year) => {
      minByYear[year] = expandAdmitMinLabel(minByYearRaw[year], `${minSeed}|${year}`, track, unit);
    });
    const methodByYear = yearlyFieldMap(yearly, "method", ADMIT_DETAIL_YEARS, method || "-");
    if (quota) quotaByYear[ADMIT_DETAIL_DATA_YEAR] = quota;
    if (minimum === "미적용") {
      minByYear[ADMIT_DETAIL_DATA_YEAR] = "미적용";
    } else if (minimum === "적용") {
      /* 목록은 적용/미적용만 두고, 상세 문구는 연도 수집값(요강형) 우선 */
      if (!minByYear[ADMIT_DETAIL_DATA_YEAR] || minByYear[ADMIT_DETAIL_DATA_YEAR] === "적용") {
        minByYear[ADMIT_DETAIL_DATA_YEAR] = expandAdmitMinLabel("적용", minSeed, track, unit);
      }
    } else if (minimum) {
      minByYear[ADMIT_DETAIL_DATA_YEAR] = expandAdmitMinLabel(minimum, minSeed, track, unit);
    }
    if (method) methodByYear[ADMIT_DETAIL_DATA_YEAR] = method;
    const rateByYearRaw = yearlyFieldMap(yearly, "rate", ADMIT_RESULT_YEARS, rate || "-");
    const rateByYear = {};
    ADMIT_RESULT_YEARS.forEach((y) => {
      if (y === ADMIT_DETAIL_DATA_YEAR && rate) {
        rateByYear[y] = formatAdmitRate(rate);
      } else {
        rateByYear[y] = formatAdmitRate(rateByYearRaw[y]);
      }
    });
    const waitByYear = yearlyFieldMap(yearly, "wait", ADMIT_RESULT_YEARS, "-");
    const gradeByYear = yearlyFieldMap(
      yearly,
      "grade",
      ADMIT_RESULT_YEARS,
      gradeVisible && grade ? grade : "-"
    );
    if (gradeVisible && grade) gradeByYear[ADMIT_DETAIL_DATA_YEAR] = grade;
    const grade70ByYear = yearlyFieldMap(yearly, "grade70", ADMIT_RESULT_YEARS, "-");
    /* 수집 문구: 한 줄로 통일 */
    const gradByYear = {
      "2027": "2025~2027.02 졸업예정",
      "2026": "2024~2026.02 졸업예정",
      "2025": "2023~2025.02 졸업예정",
      "2024": "2022~2024.02 졸업예정",
    };

    /* —— 모집단위: 연도별 모집·최저·졸업년도 —— */
    const unitRowsHtml = [
      ["모집인원", quotaByYear],
      ["계열", track ? `${track}계열` : "-"],
      ["수능 최저", minByYear],
      ["지원가능 졸업년도", gradByYear],
    ]
      .map(([label, value]) => `<tr><th scope="row">${escapeHtml(label)}</th>${yearCells(value)}</tr>`)
      .join("");

    /* —— 지원자격: 전형·계열·모집단위 성격에 맞는 요강 문구 —— */
    const eligDefaultYear = "2027";
    const eligByType = resolveSusiElig(typeKey, track, unit);
    const yearChips = ADMIT_DETAIL_YEARS.map(
      (year) =>
        `<button type="button" class="admit-detail-year-chip${
          year === eligDefaultYear ? " is-active" : ""
        }" data-admit-elig-year="${year}">${year}</button>`
    ).join("");

    /* —— 전형일정: 선택 연도(기본 2027) 요강 일정(+대학별 미세 일정 이동) —— */
    const scheduleHead = `<tr>${SCHEDULE_COLS.map((col) => `<th scope="col">${col}</th>`).join("")}</tr>`;
    const scheduleBody = `<tr>${scheduleRowFor(eligDefaultYear, typeKey, minSeed)
      .map((c) => `<td>${escapeHtml(c)}</td>`)
      .join("")}</tr>`;

    /* —— 전형방법: 연도별 요강 문구(없으면 목록값)를 단계·항목에 매핑 —— */
    const methodBody = (() => {
      const byYearSteps = {};
      ADMIT_DETAIL_YEARS.forEach((year) => {
        byYearSteps[year] = parseAdmitMethodSteps(methodByYear[year] || method);
      });
      const baseSteps = byYearSteps[ADMIT_DETAIL_DATA_YEAR] || parseAdmitMethodSteps(method);
      return baseSteps
        .map((step, stepIdx) =>
          METHOD_SCORE_ROWS.map((key, index) => {
            const stageCell =
              index === 0
                ? `<th scope="row" class="is-stage" rowspan="${METHOD_SCORE_ROWS.length}">${escapeHtml(
                    step.stage
                  )}</th>`
                : "";
            const valueByYear = {};
            ADMIT_DETAIL_YEARS.forEach((year) => {
              const yStep = byYearSteps[year]?.[stepIdx] || step;
              const scores = methodDetailToScores(yStep.detail);
              valueByYear[year] = scores[key];
            });
            return `<tr>${stageCell}<th scope="row">${escapeHtml(key)}</th>${yearCells(valueByYear)}</tr>`;
          }).join("")
        )
        .join("");
    })();

    infoPanel.innerHTML = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">모집단위</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-unit">
            <thead>${yearHeaderRow()}</thead>
            <tbody>${unitRowsHtml}</tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <div class="admit-detail-section-head">
          <h3 class="admit-detail-section-title">지원자격</h3>
          <div class="admit-detail-year-chips" role="tablist" aria-label="지원자격 연도">${yearChips}</div>
        </div>
        <div class="admit-detail-elig-box" data-admit-elig-text>${escapeHtml(eligByType)}</div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">전형일정</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-schedule">
            <thead>${scheduleHead}</thead>
            <tbody>${scheduleBody}</tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">전형방법</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-method">
            <colgroup>
              <col class="admit-detail-col-method-label">
              <col class="admit-detail-col-method-label">
              <col span="${ADMIT_DETAIL_YEARS.length}" class="admit-detail-col-year">
            </colgroup>
            <thead>${yearHeaderRow(2)}</thead>
            <tbody>${methodBody}</tbody>
          </table>
        </div>
      </section>`;

    if (recordPanel) {
      recordPanel.innerHTML = buildSusiRecordPanelHtml({
        typeKey,
        method,
        track,
        reflect: reflectLabel,
        kind: "susi",
        univ,
        unit,
        gradeMethod: row.dataset.gradeMethod || "",
      });
    }

    /* 입시결과 컷 표: 연도별 50%/70%컷 */
    const cutYearCells = (valueByYearOrSingle, years = ADMIT_RESULT_YEARS, tdClass = "") => {
      const map = toYearMap(valueByYearOrSingle, years);
      const cls = tdClass ? ` class="${tdClass}"` : "";
      return years
        .map((year) => {
          const raw = map[year];
          const show = raw == null || raw === "" ? "-" : raw;
          return `<td${cls}>${escapeHtml(show)}</td>`;
        })
        .join("");
    };
    const cutTable = (title) => {
      const isUni = title === "대학발표";
      const avgByYear = {};
      const midValueByYear = {};
      const midLabelByYear = {};
      ADMIT_RESULT_YEARS.forEach((year) => {
        const g50 = gradeByYear[year];
        const g70 = grade70ByYear[year];
        if (isUni) {
          avgByYear[year] = g50 && g50 !== "-" ? g50 : "-";
        } else {
          const n = parseFloat(g50);
          const offset = 0.08 + (admitMinSeedHash(`${minSeed}|odg|${year}`) % 18) / 100;
          avgByYear[year] = Number.isFinite(n)
            ? (n + offset).toFixed(2)
            : g50 && g50 !== "-"
              ? g50
              : "-";
        }
        midValueByYear[year] = g70 && g70 !== "-" ? g70 : "-";
        midLabelByYear[year] = g70 && g70 !== "-" ? "70컷" : "-";
      });
      const lowByYear = {};
      ADMIT_RESULT_YEARS.forEach((year) => {
        const n = parseFloat(avgByYear[year]);
        lowByYear[year] = Number.isFinite(n)
          ? (n + 0.35 + (admitMinSeedHash(`${minSeed}|low|${year}`) % 20) / 100).toFixed(2)
          : "-";
      });
      return `
      <div class="admit-detail-result-card">
        <div class="admit-detail-result-card-head">
          <h4 class="admit-detail-result-card-title">${escapeHtml(title)}</h4>
          <div class="admit-detail-year-chips">${resultYearChips()}</div>
        </div>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-cut">
            <thead>${yearHeaderRow(0, ADMIT_RESULT_YEARS)}</thead>
            <tbody>
              <tr><th scope="row">평균/50%컷</th>${cutYearCells(avgByYear)}</tr>
              <tr>
                <th scope="row" rowspan="2">70~90%컷</th>
                ${cutYearCells(midValueByYear)}
              </tr>
              <tr>${cutYearCells(midLabelByYear, ADMIT_RESULT_YEARS, "is-cut-sub")}</tr>
              <tr><th scope="row">최저</th>${cutYearCells(isUni ? lowByYear : "-")}</tr>
            </tbody>
          </table>
        </div>
      </div>`;
    };

    const quotaRateRows = [
      ["모집인원", yearlyFieldMap(yearly, "quota", ADMIT_RESULT_YEARS, quota || "-")],
      ["경쟁률", rateByYear],
      ["추합인원", waitByYear],
    ];

    const timeHead = `<tr>
      <th scope="col" rowspan="2">연도</th>
      ${ADMIT_RESULT_TIME_SLOTS.map((slot) => `<th scope="col" colspan="2">${escapeHtml(slot)}</th>`).join("")}
      <th scope="col" rowspan="2">최종</th>
    </tr>
    <tr>
      ${ADMIT_RESULT_TIME_SLOTS.map(() => `<th scope="col">시간</th><th scope="col">경쟁률</th>`).join("")}
    </tr>`;
    const timeBody = ADMIT_RESULT_YEARS.map((year) => {
      const finalVal = rateByYear[year] || "-";
      const finalN = parseAdmitNumber(finalVal);
      const slotCells = ADMIT_RESULT_TIME_SLOTS.map((slot, idx) => {
        if (year === "2027" || !Number.isFinite(finalN)) return `<td>-</td><td>-</td>`;
        const hour = 17 + (admitMinSeedHash(`${minSeed}|t|${year}|${idx}`) % 3);
        const rateN = Math.max(0.2, finalN * (0.25 + idx * 0.22)).toFixed(2);
        return `<td>${hour}시</td><td>${rateN}</td>`;
      }).join("");
      return `<tr><th scope="row">${year}</th>${slotCells}<td class="is-final">${escapeHtml(
        finalVal
      )}</td></tr>`;
    }).join("");

    resultPanel.innerHTML = `
      <div class="admit-detail-result-grid">
        ${cutTable("대학발표")}
        ${cutTable("어디가")}
      </div>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">모집인원 · 경쟁률 · 추합인원</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table">
            <thead>${yearHeaderRow(0, ADMIT_RESULT_YEARS)}</thead>
            <tbody>
              ${quotaRateRows
                .map(
                  ([label, value]) =>
                    `<tr><th scope="row">${escapeHtml(label)}</th>${yearCells(
                      value,
                      ADMIT_RESULT_YEARS
                    )}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">시간대별 경쟁률 추이</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-trend">
            <thead>${timeHead}</thead>
            <tbody>${timeBody}</tbody>
          </table>
        </div>
      </section>`;

    /* 종합자료 / 논술자료: 종합·논술 전형 상세에 표시 (동일 파일 목록 디자인) */
    if (materialsPanel) {
      if (showMaterials) {
        const shortUniv = univ.replace(/\(.*?\)/g, "").trim();
        const materialsTitle =
          materialsKind === "논술" ? "대학발표 논술 자료" : "대학발표 종합 자료";
        const yearAllLabel = materialsKind === "논술" ? "전체 학년도" : "학년도 전체";
        /* 종합·논술 각각 세트 1개 (해설·문제지·답안지·연습지) */
        const materialsFiles =
          materialsKind === "논술"
            ? [
                {
                  year: "2027",
                  title: `2027학년도 ${shortUniv} 과학 서논술형 모의 문항_해설 자료.pdf`,
                  date: "2026.05.10",
                },
                {
                  year: "2027",
                  title: `2027학년도 ${shortUniv} 과학 서논술형 모의 문항_문제지_공개용.pdf`,
                  date: "2026.05.10",
                },
                {
                  year: "2027",
                  title: `2027학년도 ${shortUniv} 과학 서논술형 모의 문항_답안지 양식_공개용.pdf`,
                  date: "2026.05.10",
                },
                {
                  year: "2027",
                  title: `2027학년도 ${shortUniv} 과학 서논술형 모의 문항_연습지 양식_공개용.pdf`,
                  date: "2026.05.10",
                },
              ]
            : [
                {
                  year: "2027",
                  title: `2027학년도 ${shortUniv} 학생부종합전형 안내서.pdf`,
                  date: "2026.05.27",
                },
              ];
        const yearOpts = [yearAllLabel, ...ADMIT_RESULT_YEARS]
          .map(
            (y, i) =>
              `<option value="${y === yearAllLabel ? "all" : y}"${i === 0 ? " selected" : ""}>${y}</option>`
          )
          .join("");
        const fileRows = materialsFiles
          .map(
            (file) => `
          <li class="admit-detail-file" data-admit-file-year="${escapeHtml(file.year)}">
            <span class="admit-detail-file-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.6"/>
                <path d="M14 3v5h5" fill="none" stroke="currentColor" stroke-width="1.6"/>
              </svg>
            </span>
            <span class="admit-detail-file-year">${escapeHtml(file.year)}학년도</span>
            <span class="admit-detail-file-name">${escapeHtml(file.title)}</span>
            <span class="admit-detail-file-meta">
              <span class="admit-detail-file-date">${escapeHtml(file.date)}</span>
              <button type="button" class="admit-detail-file-view is-unlinked" aria-disabled="true">
                파일 보기
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
                  <path d="M14 5h5v5M19 5l-9 9M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </span>
          </li>`
          )
          .join("");
        materialsPanel.innerHTML = `
          <section class="admit-detail-section">
            <div class="admit-detail-section-head admit-detail-materials-head">
              <h3 class="admit-detail-section-title">${escapeHtml(materialsTitle)}</h3>
              <div class="admit-detail-materials-filter">
                <select class="admit-search-select admit-detail-materials-select" data-admit-materials-year aria-label="학년도 선택">
                  ${yearOpts}
                </select>
              </div>
            </div>
            <ul class="admit-detail-file-list" data-admit-materials-list>${fileRows}</ul>
          </section>`;
      } else {
        materialsPanel.innerHTML = "";
      }
    }

    root.querySelectorAll("[data-admit-detail-tab]").forEach((btn) => {
      if (btn.dataset.admitDetailTab === "csat") btn.hidden = true;
      if (btn.dataset.admitDetailTab === "record") btn.hidden = false;
      const on = btn.dataset.admitDetailTab === "info";
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    infoPanel.hidden = false;
    const csatPanelSusi = root.querySelector('[data-admit-detail-panel="csat"]');
    if (csatPanelSusi) {
      csatPanelSusi.innerHTML = "";
      csatPanelSusi.hidden = true;
    }
    if (recordPanel) recordPanel.hidden = true;
    resultPanel.hidden = true;
    if (materialsPanel) materialsPanel.hidden = true;
    root.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => fitAdmitDetailTables(root));
    root.querySelector("[data-admit-detail-close].admit-detail-close")?.focus();

    infoPanel.querySelectorAll("[data-admit-elig-year]").forEach((chip) => {
      chip.addEventListener("click", () => {
        infoPanel.querySelectorAll("[data-admit-elig-year]").forEach((node) => {
          node.classList.toggle("is-active", node === chip);
        });
        const box = infoPanel.querySelector("[data-admit-elig-text]");
        if (box) box.textContent = eligByType;
        const year = chip.dataset.admitEligYear;
        const scheduleTbody = infoPanel.querySelector(".admit-detail-table-schedule tbody");
        if (year && scheduleTbody) {
          scheduleTbody.innerHTML = `<tr>${scheduleRowFor(year, typeKey, minSeed)
            .map((c) => `<td>${escapeHtml(c)}</td>`)
            .join("")}</tr>`;
          fitAdmitDetailTables(root);
        }
      });
    });

    resultPanel.querySelectorAll("[data-admit-result-year]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const card = chip.closest(".admit-detail-result-card");
        card?.querySelectorAll("[data-admit-result-year]").forEach((node) => {
          node.classList.toggle("is-active", node === chip);
        });
      });
    });

    if (materialsPanel && showMaterials) {
      enhanceAdmitSelects(materialsPanel);
      materialsPanel.querySelector("[data-admit-materials-year]")?.addEventListener("change", (event) => {
        const value = event.target.value;
        materialsPanel.querySelectorAll("[data-admit-file-year]").forEach((row) => {
          row.hidden = value !== "all" && row.dataset.admitFileYear !== value;
        });
      });
    }
  }

  /* 정시 상세 팝업 — 수시와 동일 디자인, 탭·표 내용은 정시용 */
  function openJeongsiAdmitDetail(row) {
    if (!row) return;
    const cells = [...row.children];
    const textAt = (index) => (cells[index]?.textContent || "").replace(/\s+/g, " ").trim();
    const univ = textAt(0);
    const track = textAt(2);
    const groupLabel =
      textAt(3) ||
      String(row.dataset.group || "")
        .replace(/^ga$/, "가")
        .replace(/^na$/, "나")
        .replace(/^da$/, "다");
    const typeName = textAt(4) || "일반전형";
    const unit = textAt(5);
    const quota = textAt(6);
    const rate = textAt(7);
    const method = textAt(8);
    const reflectLabel = textAt(9) || inferJeongsiRecordReflect(method);
    const area = textAt(10);
    const inquiry = textAt(11);

    const root = ensureAdmitDetailModal();
    const crumb = root.querySelector("#admit-detail-crumb");
    const tags = root.querySelector("[data-admit-detail-tags]");
    const infoPanel = root.querySelector('[data-admit-detail-panel="info"]');
    const csatPanel = root.querySelector('[data-admit-detail-panel="csat"]');
    const recordPanel = root.querySelector('[data-admit-detail-panel="record"]');
    const resultPanel = root.querySelector('[data-admit-detail-panel="result"]');
    const materialsPanel = root.querySelector('[data-admit-detail-panel="materials"]');
    const primaryYear = "2027";

    const yearFill = (value, years = ADMIT_DETAIL_YEARS) => {
      const map = {};
      years.forEach((year) => {
        map[year] = year === primaryYear ? (value == null || value === "" ? "-" : value) : "-";
      });
      return map;
    };

    crumb.innerHTML = `${escapeHtml(univ)}<span class="admit-detail-crumb-sep">›</span>${escapeHtml(unit)}`;
    const groupFull = /군$/.test(groupLabel) ? groupLabel : `${groupLabel}군`;
    tags.innerHTML = `
      <span class="admit-detail-tag is-primary">정시</span>
      <span class="admit-detail-tag">${escapeHtml(groupFull)}</span>
      <span class="admit-detail-tag">${escapeHtml(typeName)}</span>`;
    setAdmitDetailTabMode(root, "jeongsi");
    if (materialsPanel) {
      materialsPanel.innerHTML = "";
      materialsPanel.hidden = true;
    }

    /* 정시 수능 최저: 수능 100% 단독은 미적용, 그 외는 계열·학과 성격의 상세 문구 */
    const jeongsiMinSeed = `${univ}|${unit}|${typeName || method}`;
    const jeongsiMinLabel = /^수능\s*100%/.test(String(method || "").trim())
      ? "미적용"
      : expandAdmitMinLabel("적용", jeongsiMinSeed, track, unit);
    const quotaByDetailYear = {};
    ADMIT_DETAIL_YEARS.forEach((year, idx) => {
      const base = parseAdmitNumber(quota);
      if (year === primaryYear) quotaByDetailYear[year] = quota || "-";
      else if (Number.isFinite(base)) {
        quotaByDetailYear[year] = `${Math.max(3, Math.round(base * (0.92 + idx * 0.03)))}명`;
      } else quotaByDetailYear[year] = "-";
    });
    const unitRowsHtml = [
      ["모집인원", quotaByDetailYear],
      ["모집군", toYearMap(groupFull, ADMIT_DETAIL_YEARS)],
      ["계열", toYearMap(track ? `${track}계열` : "-", ADMIT_DETAIL_YEARS)],
      ["수능 최저", toYearMap(jeongsiMinLabel, ADMIT_DETAIL_YEARS)],
    ]
      .map(([label, value]) => `<tr><th scope="row">${escapeHtml(label)}</th>${yearCells(value)}</tr>`)
      .join("");

    /* 정시 전형방법: 논술·적성 행 제외, 1·2단계 모두 표시 */
    const JEONGSI_METHOD_ROWS = ["선발비율", "학생부", "수능", "면접", "실기", "기타", "비고", "총점"];
    const emptyJeongsiScores = () => Object.fromEntries(JEONGSI_METHOD_ROWS.map((k) => [k, "-"]));
    const jeongsiScoresFor = (detail) => {
      const scores = emptyJeongsiScores();
      const text = String(detail || "").trim();
      if (!text || text === "-") return scores;
      const parts = text.split(/\s*\+\s*/).map((part) => part.trim()).filter(Boolean);
      let sumPct = 0;
      let hasPct = false;
      parts.forEach((part) => {
        const pct = part.match(/([\d.]+)\s*%/);
        const label = part.replace(/\s*[\d.]+\s*%\s*$/, "").trim();
        /* 배점 칸은 점, 선발비율·비고만 % */
        const value = pct ? `${pct[1]}점` : part;
        if (pct) {
          hasPct = true;
          sumPct += Number(pct[1]) || 0;
        }
        if (/학생부|교과/.test(label)) scores.학생부 = value;
        else if (/수능/.test(label)) scores.수능 = value;
        else if (/면접/.test(label)) scores.면접 = value;
        else if (/실기/.test(label)) scores.실기 = value;
        else if (/서류|기타|논술|적성/.test(label)) scores.기타 = value;
        else if (label) scores.기타 = value;
      });
      if (hasPct) {
        scores.선발비율 = Math.abs(sumPct - 100) < 0.05 ? "100%" : `${sumPct}%`;
        scores.총점 = Math.abs(sumPct - 100) < 0.05 ? "100점" : `${sumPct}점`;
      }
      /* 수능 100% 단독이면 1단계 시안 점수 스케일 */
      if (parts.length === 1 && /수능\s*100/.test(text)) {
        scores.선발비율 = "300%";
        scores.학생부 = "0점";
        scores.수능 = "1,000점";
        scores.면접 = "0점";
        scores.실기 = "0점";
        scores.기타 = "0점";
        scores.총점 = "1,000점";
      }
      scores.비고 = text;
      return scores;
    };
    /* 2단계: 면접·서류가 있으면 시안 점수, 없으면 "-" */
    const jeongsiStage2Scores = (detail) => {
      const text = String(detail || "");
      if (!/면접|서류/.test(text)) return emptyJeongsiScores();
      const scores = emptyJeongsiScores();
      scores.선발비율 = "100%";
      scores.학생부 = "0점";
      scores.수능 = "0점";
      scores.면접 = /면접/.test(text) ? "300점" : "0점";
      scores.실기 = "0점";
      scores.기타 = /서류/.test(text) ? "700점" : "0점";
      scores.총점 = "1,000점";
      scores.비고 = text.trim() || "-";
      return scores;
    };
    const methodSteps = [
      { stage: "1단계", scores: jeongsiScoresFor(method || "수능 100%") },
      { stage: "2단계", scores: jeongsiStage2Scores(method || "") },
    ];
    const methodBody = methodSteps
      .map((step) =>
        JEONGSI_METHOD_ROWS.map((key, index) => {
          const stageCell =
            index === 0
              ? `<th scope="row" class="is-stage" rowspan="${JEONGSI_METHOD_ROWS.length}">${escapeHtml(
                  step.stage
                )}</th>`
              : "";
          return `<tr>${stageCell}<th scope="row">${escapeHtml(key)}</th>${yearCells(
            yearFill(step.scores[key])
          )}</tr>`;
        }).join("")
      )
      .join("");

    infoPanel.innerHTML = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">모집단위</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-unit">
            <thead>${yearHeaderRow()}</thead>
            <tbody>${unitRowsHtml}</tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">전형방법</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-method">
            <colgroup>
              <col class="admit-detail-col-method-label">
              <col class="admit-detail-col-method-label">
              <col span="${ADMIT_DETAIL_YEARS.length}" class="admit-detail-col-year">
            </colgroup>
            <thead>${yearHeaderRow(2)}</thead>
            <tbody>${methodBody}</tbody>
          </table>
        </div>
      </section>`;

    const areaText = area || "국·수·영·탐";
    const areaParts = String(areaText)
      .split("·")
      .map((s) => s.trim())
      .filter(Boolean);
    const areaCount = areaParts.length;
    const inquiryCount =
      inquiry && inquiry !== "-" ? String(inquiry).replace(/\s*과목\s*$/, "").trim() : "-";
    const reflectMethodRows = [
      ["반영 영역", areaText],
      ["총 반영 영역 수", areaCount ? `${areaCount}개 영역` : "-"],
      ["탐구 반영", "통사/통과"],
      ["탐구 반영 과목 수", inquiryCount],
    ];
    /* 수능 반영 비율 + 반영지표는 같은 표 하단에 이어짐 */
    const ratioTopRows = ["국어", "수학", "영어"];
    const ratioPairRows = ["통합사회", "통합과학"];
    const ratioTailRows = ["제2외국어/한문", "한국사"];
    const indicatorRows = ["국어", "수학", "영어", "탐구", "제2외국어/한문"];
    const bonusRows = ["국어", "수학", "영어", "탐구", "제2외국어/한문"];
    const engGradeScores = ["100점", "95점", "90점", "85점", "80점", "70점", "60점", "50점", "40점"];
    const histGradeScores = ["10점", "10점", "10점", "10점", "9.8점", "9.6점", "9.4점", "9.2점", "9점"];
    const ratioRowCount =
      ratioTopRows.length + ratioPairRows.length + ratioTailRows.length + 1; /* +기타 */

    const stackedRows = (groupLabelText, rows, valueByLabel) =>
      rows
        .map((label, index) => {
          const group =
            index === 0
              ? `<th scope="row" rowspan="${rows.length}" class="admit-detail-th-stack">${escapeHtml(
                  groupLabelText
                )}</th>`
              : "";
          const value = valueByLabel(label);
          const map = value && typeof value === "object" ? value : yearFill(value);
          return `<tr>${group}<th scope="row">${escapeHtml(label)}</th>${yearCells(map)}</tr>`;
        })
        .join("");

    /* 통합사회·통합과학: 첫 연도(2027)만 rowspan, 이후 연도는 행별 칸 */
    const pairFirstYearCell = `<td rowspan="2">-</td>`;
    const pairRestYearCells = ADMIT_DETAIL_YEARS.slice(1)
      .map(() => `<td>-</td>`)
      .join("");
    const ratioAndIndicatorBody = `
      ${ratioTopRows
        .map((label, index) => {
          const group =
            index === 0
              ? `<th scope="row" rowspan="${ratioRowCount}" class="admit-detail-th-stack">수능 반영 비율</th>`
              : "";
          return `<tr>${group}<th scope="row">${escapeHtml(label)}</th>${yearCells(
            yearFill("-")
          )}</tr>`;
        })
        .join("")}
      <tr><th scope="row">${escapeHtml(ratioPairRows[0])}</th>${pairFirstYearCell}${pairRestYearCells}</tr>
      <tr><th scope="row">${escapeHtml(ratioPairRows[1])}</th>${pairRestYearCells}</tr>
      ${ratioTailRows
        .map(
          (label) =>
            `<tr><th scope="row">${escapeHtml(label)}</th>${yearCells(yearFill("-"))}</tr>`
        )
        .join("")}
      <tr>
        <th scope="row">기타</th>
        <td colspan="${ADMIT_DETAIL_YEARS.length}">-</td>
      </tr>
      ${stackedRows("반영지표", indicatorRows, () => "-")}
    `;

    if (csatPanel) {
      csatPanel.innerHTML = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">수능 반영방법</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table">
            <colgroup>
              <col class="admit-detail-col-stack">
              <col class="admit-detail-col-item">
              <col span="${ADMIT_DETAIL_YEARS.length}" class="admit-detail-col-year">
            </colgroup>
            <thead>${yearHeaderRow(2)}</thead>
            <tbody>
              ${stackedRows(
                "반영 방법",
                reflectMethodRows.map((r) => r[0]),
                (label) => {
                  const hit = reflectMethodRows.find((r) => r[0] === label);
                  return hit ? hit[1] : "-";
                }
              )}
              ${ratioAndIndicatorBody}
            </tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">수능 가산점</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table">
            <thead>${yearHeaderRow()}</thead>
            <tbody>
              ${bonusRows
                .map((label) => `<tr><th scope="row">${escapeHtml(label)}</th>${dashYearCells()}</tr>`)
                .join("")}
            </tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">등급별 반영 점수(영어)</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-record-convert-table">
            <thead>
              <tr>
                <th scope="col">구분</th>
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<th scope="col">${n}등급</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">비율</th>
                ${engGradeScores.map((v) => `<td>${escapeHtml(v)}</td>`).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">등급별 반영 점수(한국사)</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-record-convert-table">
            <thead>
              <tr>
                <th scope="col">구분</th>
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<th scope="col">${n}등급</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">가산</th>
                ${histGradeScores.map((v) => `<td>${escapeHtml(v)}</td>`).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      </section>`;
    }

    if (recordPanel) {
      const recordTypeKey = /정성/.test(reflectLabel) ? "종합" : "교과";
      recordPanel.innerHTML = buildSusiRecordPanelHtml({
        typeKey: recordTypeKey,
        method,
        track,
        reflect: reflectLabel,
        kind: "jeongsi",
        univ,
        unit,
        gradeMethod: row.dataset.gradeMethod || "",
      });
    }

    const rateValue = rate ? formatAdmitRate(rate) : "-";
    const rateByYear = {};
    const quotaByResultYear = {};
    ADMIT_RESULT_YEARS.forEach((year, idx) => {
      if (year === primaryYear) {
        rateByYear[year] = rateValue;
        quotaByResultYear[year] = quota || "-";
        return;
      }
      const baseRate = parseAdmitNumber(rateValue);
      const baseQuota = parseAdmitNumber(quota);
      rateByYear[year] = Number.isFinite(baseRate)
        ? formatRateCell(baseRate * (0.88 + idx * 0.05 + (admitMinSeedHash(`${jeongsiMinSeed}|jr|${year}`) % 10) / 100))
        : "-";
      quotaByResultYear[year] = Number.isFinite(baseQuota)
        ? `${Math.max(3, Math.round(baseQuota * (0.9 + idx * 0.04)))}명`
        : "-";
    });

    const cutYearCells = (valueByYearOrSingle, years = ADMIT_RESULT_YEARS, tdClass = "") => {
      const map = toYearMap(valueByYearOrSingle, years);
      const cls = tdClass ? ` class="${tdClass}"` : "";
      return years
        .map((year) => {
          const raw = map[year];
          const show = raw == null || raw === "" ? "-" : raw;
          return `<td${cls}>${escapeHtml(show)}</td>`;
        })
        .join("");
    };
    const scoreCell = textAt(12);
    const scoreBase = parseAdmitNumber(scoreCell);
    const cutTable = (title) => {
      const isUni = title === "대학발표";
      const avgByYear = {};
      const midByYear = {};
      const midLabelByYear = {};
      const lowByYear = {};
      ADMIT_RESULT_YEARS.forEach((year, idx) => {
        if (!Number.isFinite(scoreBase)) {
          avgByYear[year] = "-";
          midByYear[year] = "-";
          midLabelByYear[year] = "-";
          lowByYear[year] = "-";
          return;
        }
        const drift = (admitMinSeedHash(`${jeongsiMinSeed}|cut|${title}|${year}`) % 16) / 10;
        const avg = scoreBase - idx * 1.2 - (isUni ? 0 : 2.5) - drift;
        avgByYear[year] = avg.toFixed(2);
        midByYear[year] = (avg - 3.5 - drift * 0.4).toFixed(2);
        midLabelByYear[year] = "70컷";
        lowByYear[year] = (avg - 7.2 - drift * 0.5).toFixed(2);
      });
      return `
      <div class="admit-detail-result-card">
        <div class="admit-detail-result-card-head">
          <h4 class="admit-detail-result-card-title">${escapeHtml(title)}</h4>
          <div class="admit-detail-year-chips">${resultYearChips()}</div>
        </div>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-cut">
            <thead>${yearHeaderRow(0, ADMIT_RESULT_YEARS)}</thead>
            <tbody>
              <tr><th scope="row">평균/50%컷</th>${cutYearCells(avgByYear)}</tr>
              <tr>
                <th scope="row" rowspan="2">70~90%컷</th>
                ${cutYearCells(midByYear)}
              </tr>
              <tr>${cutYearCells(midLabelByYear, ADMIT_RESULT_YEARS, "is-cut-sub")}</tr>
              <tr><th scope="row">최저</th>${cutYearCells(lowByYear)}</tr>
            </tbody>
          </table>
        </div>
      </div>`;
    };

    const timeHead = `<tr>
      <th scope="col" rowspan="2">연도</th>
      ${ADMIT_RESULT_TIME_SLOTS.map((slot) => `<th scope="col" colspan="2">${escapeHtml(slot)}</th>`).join("")}
      <th scope="col" rowspan="2">최종</th>
    </tr>
    <tr>
      ${ADMIT_RESULT_TIME_SLOTS.map(() => `<th scope="col">시간</th><th scope="col">경쟁률</th>`).join("")}
    </tr>`;
    const timeBody = ADMIT_RESULT_YEARS.map((year) => {
      const finalVal = rateByYear[year] || "-";
      const finalN = parseAdmitNumber(finalVal);
      const slotCells = ADMIT_RESULT_TIME_SLOTS.map((slot, i) => {
        if (!Number.isFinite(finalN)) return `<td>-</td><td>-</td>`;
        const hour = 10 + ((admitMinSeedHash(`${jeongsiMinSeed}|jt|${year}|${i}`) + i * 3) % 9);
        const rateN = Math.max(0.3, finalN * (0.2 + i * 0.15)).toFixed(2);
        return `<td>${hour}시</td><td>${rateN}</td>`;
      }).join("");
      return `<tr><th scope="row">${year}</th>${slotCells}<td class="is-final">${escapeHtml(
        finalVal
      )}</td></tr>`;
    }).join("");

    resultPanel.innerHTML = `
      <div class="admit-detail-result-grid">
        ${cutTable("대학발표")}
        ${cutTable("어디가")}
      </div>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">모집인원 · 경쟁률 · 추합인원</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table">
            <thead>${yearHeaderRow(0, ADMIT_RESULT_YEARS)}</thead>
            <tbody>
              <tr><th scope="row">모집인원</th>${yearCells(quotaByResultYear, ADMIT_RESULT_YEARS)}</tr>
              <tr><th scope="row">경쟁률</th>${yearCells(rateByYear, ADMIT_RESULT_YEARS)}</tr>
              <tr><th scope="row">추합인원</th>${dashYearCells(ADMIT_RESULT_YEARS)}</tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">시간대별 경쟁률 추이</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-trend">
            <thead>${timeHead}</thead>
            <tbody>${timeBody}</tbody>
          </table>
        </div>
      </section>`;

    root.querySelectorAll("[data-admit-detail-tab]").forEach((btn) => {
      const on = btn.dataset.admitDetailTab === "info";
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    infoPanel.hidden = false;
    if (csatPanel) csatPanel.hidden = true;
    if (recordPanel) recordPanel.hidden = true;
    resultPanel.hidden = true;
    if (materialsPanel) materialsPanel.hidden = true;
    root.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => fitAdmitDetailTables(root));
    root.querySelector("[data-admit-detail-close].admit-detail-close")?.focus();

    resultPanel.querySelectorAll("[data-admit-result-year]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const card = chip.closest(".admit-detail-result-card");
        card?.querySelectorAll("[data-admit-result-year]").forEach((node) => {
          node.classList.toggle("is-active", node === chip);
        });
      });
    });
  }

  function bindAdmitSearch(panel) {
    const root = panel.querySelector("[data-admit-search]");
    if (!root || root.dataset.bound === "1") return;
    root.dataset.bound = "1";

    enhanceAdmitSelects(root);
    const refresh = () => applyAdmitFilters(panel);

    const toggle = root.querySelector("[data-admit-toggle]");
    const body = root.querySelector("[data-admit-body]");

    if (toggle && body) {
      const label = toggle.querySelector("[data-admit-toggle-label]");
      const arrow = toggle.querySelector(".admit-search-toggle-arrow");
      /* 수시·정시 모두 상세 검색 기본 열림 */
      toggle.setAttribute("aria-expanded", "true");
      if (label) label.textContent = "접기";
      if (arrow) arrow.textContent = "▲";
      body.hidden = false;
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "false";
        const next = !open;
        toggle.setAttribute("aria-expanded", next ? "true" : "false");
        if (label) label.textContent = next ? "접기" : "펼치기";
        if (arrow) arrow.textContent = next ? "▲" : "▼";
        body.hidden = !next;
      });
    }

    /* 성적 반영 방식·학과 유형별: 선택 / 재클릭 시 해제 */
    root.addEventListener("click", (event) => {
      const viewBtn = event.target.closest(".admit-data-view");
      if (viewBtn && root.contains(viewBtn)) {
        event.preventDefault();
        /* 정시 등 미연동 보기 버튼 */
        if (viewBtn.classList.contains("is-unlinked") || viewBtn.getAttribute("aria-disabled") === "true") {
          return;
        }
        if (root.dataset.searchType === "susi") {
          openSusiAdmitDetail(viewBtn.closest("tr"));
        } else if (root.dataset.searchType === "jeongsi") {
          openJeongsiAdmitDetail(viewBtn.closest("tr"));
        } else if (root.dataset.searchType === "university") {
          openUniversityAdmitDetail(viewBtn.closest("tr"));
        }
        return;
      }
      const exampleBtn = event.target.closest("[data-grade-method-example]");
      if (exampleBtn && root.contains(exampleBtn)) {
        event.preventDefault();
        event.stopPropagation();
        openGradeMethodExample(exampleBtn);
        return;
      }
      const methodCard = event.target.closest(".admit-grade-method-card[data-grade-method]");
      if (methodCard && root.contains(methodCard)) {
        event.preventDefault();
        const next = methodCard.getAttribute("aria-pressed") !== "true";
        methodCard.classList.toggle("is-active", next);
        methodCard.setAttribute("aria-pressed", next ? "true" : "false");
        refresh();
        return;
      }
      const themeCard = event.target.closest(".admit-theme-card[data-theme]");
      if (themeCard && root.contains(themeCard)) {
        event.preventDefault();
        const next = themeCard.getAttribute("aria-pressed") !== "true";
        themeCard.classList.toggle("is-active", next);
        themeCard.setAttribute("aria-pressed", next ? "true" : "false");
        refresh();
        return;
      }
    });

    root.addEventListener("input", (event) => {
      if (event.target.matches?.('input[name="keyword"]')) refresh();
    });
    root.addEventListener("search", (event) => {
      if (event.target.matches?.('input[name="keyword"]')) refresh();
    });
    root.addEventListener("change", (event) => {
      if (
        event.target.matches?.(
          'select[name="region"], select[name="track"], select[name="reflect"], select[name="minimum"], select[name="founding"], select[name="year"], select[name="sort"], select[name="group"], select[name="area"], select[name="inquiry"]'
        )
      ) {
        refresh();
      }
    });
    refresh();
  }

  /* lat/lng는 공식 주소 기준 좌표. heading은 로드뷰 초기 시야 */
  const CAMPUS_POINTS = {
    "서울대학교": { lat: 37.460201, lng: 126.952241, heading: 78.2, address: "서울특별시 관악구 관악로 1" },
    "연세대학교(서울)": { lat: 37.565784, lng: 126.938572, heading: 33.8, address: "서울특별시 서대문구 연세로 50" },
    "경희대학교(서울)": { lat: 37.596845, lng: 127.052728, heading: 352.6, address: "서울특별시 동대문구 경희대로 26" },
    "성균관대학교(수원)": { lat: 37.293917, lng: 126.974681, heading: 273.9, address: "경기도 수원시 장안구 서부로 2066" },
    "건국대학교(서울)": { lat: 37.540762, lng: 127.079342, heading: 114.7, address: "서울특별시 광진구 능동로 120" },
    "이화여자대학교": { lat: 37.561742, lng: 126.946541, heading: 145.3, address: "서울특별시 서대문구 이화여대길 52" },
    "한국교원대학교": { lat: 36.6096, lng: 127.3603, heading: 0, address: "충청북도 청주시 흥덕구 강내면 태성탑연로 250" },
    "공주교육대학교": { lat: 36.4529, lng: 127.1245, heading: 0, address: "충청남도 공주시 웅진로 27" },
    "부산대학교": { lat: 35.233691, lng: 129.080978, heading: 317.8, address: "부산광역시 금정구 부산대학로63번길 2" },
    "중앙대학교(서울)": { lat: 37.505548, lng: 126.957045, heading: 240.6, address: "서울특별시 동작구 흑석로 84" },
    "연세대학교(미래)": { lat: 37.87967, lng: 127.728371, heading: 335.3, address: "강원특별자치도 원주시 흥업면 연세대길 1" },
    "가천대학교": { lat: 37.450652, lng: 127.126714, heading: 359.2, address: "경기도 성남시 수정구 성남대로 1342" },
    "고려대학교(서울)": { lat: 37.5894, lng: 127.0324, heading: 185.1, address: "서울특별시 성북구 안암로 145" },
    "숙명여자대학교": { lat: 37.546574, lng: 126.965893, heading: 10, address: "서울특별시 용산구 청파로47길 100" },
    "서울교육대학교": { lat: 37.491256, lng: 127.017219, heading: 311.3, address: "서울특별시 서초구 서초대로 96" },
    "한국외국어대학교(서울)": { lat: 37.597647, lng: 127.056985, heading: 178.8, address: "서울특별시 동대문구 이문로 107" },
    "가천대학교(글로벌)": { lat: 37.450652, lng: 127.126714, heading: 229.1, address: "경기도 성남시 수정구 성남대로 1342" },
    "성균관대학교(서울)": { lat: 37.588458, lng: 126.993641, heading: 323.1, address: "서울특별시 종로구 성균관로 25-2" },
    "한양대학교(서울)": { lat: 37.556967, lng: 127.0468, heading: 327, address: "서울특별시 성동구 왕십리로 222" },
    "숭실대학교": { lat: 37.496337, lng: 126.957458, heading: 197.1, address: "서울특별시 동작구 상도로 369" },
    KAIST: { lat: 36.372681, lng: 127.356252, heading: 22.3, address: "대전광역시 유성구 대학로 291" },
    "포항공과대학교": { lat: 36.014514, lng: 129.325243, heading: 336.3, address: "경상북도 포항시 남구 청암로 77" },
    "한양대학교(ERICA)": { lat: 37.299591, lng: 126.830641, heading: 21.1, address: "경기도 안산시 상록구 한양대학로 55" },
    "인하대학교": { lat: 37.451803, lng: 126.654359, heading: 109.7, address: "인천광역시 미추홀구 인하로 100" },
    "울산과학기술원": { lat: 35.576041, lng: 129.189724, heading: 247, address: "울산광역시 울주군 언양읍 유니스트길 50" },
    "서강대학교": { lat: 37.551464, lng: 126.941041, heading: 69.2, address: "서울특별시 마포구 백범로 35" },
    "전남대학교": { lat: 35.176116, lng: 126.905823, heading: 270.8, address: "광주광역시 북구 용봉로 77" },
    "충남대학교": { lat: 36.369473, lng: 127.340041, heading: 15, address: "대전광역시 유성구 대학로 99" },
    "제주대학교": { lat: 33.456125, lng: 126.561852, heading: 71, address: "제주특별자치도 제주시 제주대학로 102" },
    "동국대학교(서울)": { lat: 37.558702, lng: 126.9984, heading: 77.9, address: "서울특별시 중구 필동로1길 30" },
    "홍익대학교(서울)": { lat: 37.550976, lng: 126.924235, heading: 183.3, address: "서울특별시 마포구 와우산로 94" },
    "아주대학교": { lat: 37.2828, lng: 127.0437, heading: 65.1, address: "경기도 수원시 영통구 월드컵로 206" },
    "영남대학교": { lat: 35.83624, lng: 128.752897, heading: 63.5, address: "경상북도 경산시 대학로 280" },
    "전북대학교": { lat: 35.8468, lng: 127.1297, heading: 308.2, address: "전북특별자치도 전주시 덕진구 백제대로 567" },
    "강원대학교": { lat: 37.8688, lng: 127.7446, heading: 0, address: "강원특별자치도 춘천시 강원대학길 1" },
  };

  function campusRoadviewRadius() {
    return 180;
  }

  const CAMPUS_REGION_ORDER = [
    "서울",
    "경기",
    "강원",
    "경남",
    "경북",
    "광주",
    "대구",
    "대전",
    "부산",
    "울산",
    "인천",
    "전남",
    "전북",
    "제주",
    "충남",
    "충북",
  ];

  function campusRegionRank(region) {
    return region === "서울" ? 0 : region === "경기" ? 1 : 2;
  }

  function campusRows() {
    return (window.ADMIT_DEMO_UNIVS || [])
      .map((row) => (Array.isArray(row) ? { name: row[0], region: row[1] } : row))
      .filter((row) => row && CAMPUS_POINTS[row.name])
      .sort((a, b) => campusRegionRank(a.region) - campusRegionRank(b.region));
  }

  function campusRegionButtonsHtml(rows, attrs = "data-campus-region", defaultRegion = "서울") {
    const present = new Set(rows.map((row) => row.region).filter(Boolean));
    return CAMPUS_REGION_ORDER.filter((name) => present.has(name))
      .map((name) => {
        const on = name === defaultRegion;
        return `<button type="button" class="campus-roadview-region${on ? " is-active" : ""}" ${attrs}="${escapeHtml(name)}" aria-pressed="${on ? "true" : "false"}">${escapeHtml(name)}</button>`;
      })
      .join("");
  }

  function campusShortName(name) {
    return String(name || "")
      .replace(/\([^)]*\)\s*$/, "")
      .trim();
  }

  function campusDistanceKm(aLat, aLng, bLat, bLng) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(bLat - aLat);
    const dLng = toRad(bLng - aLng);
    const lat1 = toRad(aLat);
    const lat2 = toRad(bLat);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  const campusAddressCache = new Map();
  const campusCoordsCache = new Map();

  function campusPoint(name) {
    const raw = CAMPUS_POINTS[name];
    if (!raw) return null;
    if (Array.isArray(raw)) {
      return {
        lat: Number(raw[0]),
        lng: Number(raw[1]),
        heading: Number(raw[3]),
        address: String(raw[4] || ""),
      };
    }
    return {
      lat: Number(raw.lat),
      lng: Number(raw.lng),
      heading: Number(raw.heading),
      address: String(raw.address || ""),
    };
  }

  function campusOfficialAddress(name) {
    const key = String(name || "");
    if (!key) return "";
    if (campusAddressCache.has(key)) return campusAddressCache.get(key);
    const address = campusPoint(key)?.address || "";
    if (address) campusAddressCache.set(key, address);
    return address;
  }

  function resolveCampusPlace(geocoder, name, onDone) {
    const key = String(name || "");
    const info = campusPoint(key);
    if (!info) return;
    const official = campusOfficialAddress(key);
    if (campusCoordsCache.has(key)) {
      onDone?.({ ...info, ...campusCoordsCache.get(key), address: official || info.address });
      return;
    }
    if (!geocoder || !official) {
      onDone?.({ ...info, address: official || info.address });
      return;
    }
    geocoder.addressSearch(official, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && result?.[0]) {
        const lat = Number(result[0].y);
        const lng = Number(result[0].x);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          campusCoordsCache.set(key, { lat, lng });
          onDone?.({ ...info, lat, lng, address: official });
          return;
        }
      }
      onDone?.({ ...info, address: official });
    });
  }

  function resolveCampusAddress(geocoder, name, lat, lng, onDone) {
    const key = String(name || "");
    const official = campusOfficialAddress(key);
    if (official) {
      onDone?.(official);
      if (!campusCoordsCache.has(key) && geocoder) {
        resolveCampusPlace(geocoder, key, () => {});
      }
      return;
    }
    if (!key || !Number.isFinite(lat) || !Number.isFinite(lng) || !geocoder) return;
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status !== window.kakao.maps.services.Status.OK) return;
      const row = result?.[0];
      const address = row?.road_address?.address_name || row?.address?.address_name || "";
      if (!address) return;
      campusAddressCache.set(key, address);
      onDone?.(address);
    });
  }

  function campusKakaoMapUrl(home, dest) {
    if (!home || !dest) return "";
    const sName = encodeURIComponent(home.name || "출발지");
    const eName = encodeURIComponent(dest.address || campusOfficialAddress(dest.name) || campusShortName(dest.name));
    return `https://map.kakao.com/?map_type=TYPE_MAP&target=transit&sX=${home.lng}&sY=${home.lat}&eX=${dest.lng}&eY=${dest.lat}&sName=${sName}&eName=${eName}`;
  }

  function campusKakaoPreviewHtml(kind = "map") {
    const isMap = kind === "map";
    const title = isMap ? "캠퍼스 지도 샘플" : "캠퍼스 로드뷰 샘플";
    const desc = isMap
      ? "대학 위치와 통학 경로는 카카오 지도가 연결된 환경에서 확인할 수 있습니다."
      : "캠퍼스 거리 풍경은 카카오 로드뷰가 연결된 환경에서 확인할 수 있습니다.";
    return `<div class="campus-kakao-preview campus-kakao-preview--${isMap ? "map" : "road"}" role="img" aria-label="${title}">
      <div class="campus-kakao-preview-scene" aria-hidden="true"></div>
      <div class="campus-kakao-preview-card">
        <p class="campus-kakao-preview-kicker">미리보기</p>
        <p class="campus-kakao-preview-title">${title}</p>
        <p class="campus-kakao-preview-desc">${desc}</p>
      </div>
    </div>`;
  }

  function showCampusKakaoPreview(el, kind = "map") {
    if (!el) return;
    el.classList.add("is-preview");
    el.innerHTML = campusKakaoPreviewHtml(kind);
  }

  function hasKakaoAppKey() {
    return Boolean(String(window.KAKAO_MAP_APP_KEY || "").trim());
  }

  function loadKakaoMaps() {
    if (window.kakao && window.kakao.maps) return Promise.resolve(window.kakao);
    if (window.__kakaoMapsLoading) return window.__kakaoMapsLoading;
    const key = String(window.KAKAO_MAP_APP_KEY || "").trim();
    window.__kakaoMapsLoading = new Promise((resolve, reject) => {
      if (!key) {
        reject(new Error("missing-kakao-key"));
        return;
      }
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => resolve(window.kakao));
      };
      script.onerror = () => reject(new Error("kakao-sdk-load-failed"));
      document.head.appendChild(script);
    }).catch((err) => {
      window.__kakaoMapsLoading = null;
      throw err;
    });
    return window.__kakaoMapsLoading;
  }

  async function parseKakaoTransitResponse(res) {
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (!ct.includes("json")) return null;
    const data = await res.json();
    if (!data || typeof data !== "object") return null;
    if (data.status || Array.isArray(data.routes)) return data;
    return null;
  }

  function campusTransitProxyUrls(query) {
    const custom = String(window.KAKAO_TRANSIT_PROXY || "").trim().replace(/\/$/, "");
    const list = [];
    if (custom) list.push(`${custom}?${query}`);
    list.push(`/api/kakao/transit?${query}`);
    if (location.hostname !== "127.0.0.1" || location.port !== "8765") {
      list.push(`http://127.0.0.1:8765/api/kakao/transit?${query}`);
    }
    if (location.hostname !== "localhost" || location.port !== "8765") {
      list.push(`http://localhost:8765/api/kakao/transit?${query}`);
    }
    return [...new Set(list)];
  }

  function campusPlacesProxyUrls(query) {
    const custom = String(window.KAKAO_TRANSIT_PROXY || "").trim().replace(/\/$/, "");
    const list = [];
    if (custom) list.push(`${custom.replace(/\/transit$/, "/places")}?${query}`);
    list.push(`/api/kakao/places?${query}`);
    if (location.hostname !== "127.0.0.1" || location.port !== "8765") {
      list.push(`http://127.0.0.1:8765/api/kakao/places?${query}`);
    }
    if (location.hostname !== "localhost" || location.port !== "8765") {
      list.push(`http://localhost:8765/api/kakao/places?${query}`);
    }
    return [...new Set(list)];
  }

  async function fetchKakaoPlaces(query, center) {
    const q = String(query || "").trim();
    if (!q) return [];
    const params = new URLSearchParams({ query: q, size: "10" });
    if (center && Number.isFinite(center.lng) && Number.isFinite(center.lat)) {
      params.set("x", String(center.lng));
      params.set("y", String(center.lat));
    }
    const qs = params.toString();
    for (const url of campusPlacesProxyUrls(qs)) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        if (!ct.includes("json")) continue;
        const data = await res.json();
        if (Array.isArray(data?.documents)) return data.documents;
      } catch (_) {
        /* try next */
      }
    }
    return null;
  }

  async function fetchKakaoTransit(home, dest) {
    if (!home || !dest) return null;
    const params = new URLSearchParams({
      start_x: String(home.lng),
      start_y: String(home.lat),
      end_x: String(dest.lng),
      end_y: String(dest.lat),
      s_name: home.name || "출발지",
      e_name: `${campusShortName(dest.name)} 정문`,
      input_coord: "WGS84",
      output_coord: "WGS84",
    });
    const query = params.toString();
    // Browser → Kakao REST is blocked by CORS. Use serve.py proxy (same-origin or :8765).
    let lastProxyError = null;
    for (const url of campusTransitProxyUrls(query)) {
      try {
        const proxyRes = await fetch(url);
        if (proxyRes.ok) {
          const data = await parseKakaoTransitResponse(proxyRes);
          if (data) return data;
          continue;
        }
        if (proxyRes.status === 404) continue;
        const text = await proxyRes.text();
        lastProxyError = new Error(text || `proxy-${proxyRes.status}`);
      } catch (err) {
        lastProxyError = err;
      }
    }
    const restKey = window.KAKAO_MAP_REST_KEY || window.KAKAO_MAP_APP_KEY || "";
    if (!restKey) throw lastProxyError || new Error("rest-key-missing");
    const res = await fetch(`https://dapi.kakao.com/v2/routing/publictraffic?${query}`, {
      headers: {
        Authorization: `KakaoAK ${restKey}`,
        KA: `sdk/1.0 os/javascript origin/${location.origin}`,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `http-${res.status}`);
    }
    const data = await parseKakaoTransitResponse(res);
    if (!data) throw lastProxyError || new Error("invalid-transit-json");
    return data;
  }

  function campusTransitStepProps(step) {
    return step?.properties || step || {};
  }

  function campusTransitStepType(step) {
    const props = campusTransitStepProps(step);
    return String(props.type || props.mode || props.vehicleType || step?.type || step?.mode || "").toUpperCase();
  }

  function campusTransitStepPoints(step) {
    const props = campusTransitStepProps(step);
    return step?.path?.points || props.path?.points || step?.points || props.points || [];
  }

  function campusTransitStepLabel(step) {
    const props = campusTransitStepProps(step);
    const type = campusTransitStepType(step);
    if (type.includes("WALK") || type.includes("도보")) return "도보";
    if (type.includes("SUBWAY") || type.includes("지하철")) {
      const vehicle = props.vehicles?.[0]?.name;
      return vehicle || "지하철";
    }
    if (type.includes("BUS") || type.includes("버스")) {
      const vehicle = props.vehicles?.[0]?.name;
      return vehicle ? `버스 ${vehicle}` : "버스";
    }
    return props.guidance || props.name || props.vehicleName || "";
  }

  function campusTransitMinutes(sec) {
    const n = Math.max(0, Math.round(Number(sec || 0) / 60));
    return n;
  }

  function campusTransitFare(props) {
    const value = props?.fare?.value ?? props?.fare;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }

  function campusTransitWalkSeconds(route) {
    return (route?.steps || [])
      .filter((step) => campusTransitStepType(step).includes("WALK"))
      .reduce((sum, step) => {
        const stepProps = campusTransitStepProps(step);
        return sum + (stepProps.time || step.sectionTime || step.time || 0);
      }, 0);
  }

  function campusSubwayLineColor(name) {
    const key = String(name || "").replace(/\s+/g, "");
    const map = {
      "1호선": "#0052A4",
      "2호선": "#00A84D",
      "3호선": "#EF7C1C",
      "4호선": "#00A5E3",
      "5호선": "#996CAC",
      "6호선": "#CD7C2F",
      "7호선": "#747F00",
      "8호선": "#E6186C",
      "9호선": "#BDB092",
      경의중앙선: "#77C4A3",
      공항철도: "#0090D2",
      신분당선: "#D4003B",
      수인분당선: "#F5A200",
      경춘선: "#0C8E72",
      우이신설선: "#B7C452",
      서해선: "#8FC31F",
      신림선: "#6789CA",
      경강선: "#003DA5",
      GTZ: "#B71C1C",
    };
    for (const [line, color] of Object.entries(map)) {
      if (key.includes(line.replace(/\s+/g, ""))) return color;
    }
    return "#1a4796";
  }

  function campusBusTypeColor(type) {
    const key = String(type || "");
    if (key.includes("광역") || key.includes("직행")) return "#F06A00";
    if (key.includes("간선")) return "#3D5BAB";
    if (key.includes("지선")) return "#5BB025";
    if (key.includes("마을")) return "#70B235";
    if (key.includes("공항")) return "#8B5A2B";
    if (key.includes("순환")) return "#33CC99";
    return "#5BB025";
  }

  function campusTransitModeIcon(kind) {
    if (kind === "subway") {
      return `<svg class="campus-transit-mode-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 17v2M16 17v2M4 11h16M9 7h.01M15 7h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 21h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
    }
    if (kind === "bus") {
      return `<svg class="campus-transit-mode-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M8 19h.01M16 19h.01M6 16h2M16 16h2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="19" r="1.6" fill="currentColor"/><circle cx="16" cy="19" r="1.6" fill="currentColor"/></svg>`;
    }
    return `<svg class="campus-transit-mode-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M9 21l3-8 3 8M8 12h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function campusTransitChipHtml(step) {
    const props = campusTransitStepProps(step);
    const type = campusTransitStepType(step);
    if (type.includes("WALK")) {
      return `<span class="campus-transit-chip is-walk">${campusTransitModeIcon("walk")}<span>도보</span></span>`;
    }
    if (type.includes("SUBWAY")) {
      const name = props.vehicles?.[0]?.name || "지하철";
      const color = campusSubwayLineColor(name);
      return `<span class="campus-transit-chip is-subway" style="--chip:${color}">${campusTransitModeIcon("subway")}<span>${escapeHtml(name)}</span></span>`;
    }
    if (type.includes("BUS")) {
      const vehicle = props.vehicles?.[0] || {};
      const name = vehicle.name || "버스";
      const color = campusBusTypeColor(vehicle.type);
      return `<span class="campus-transit-chip is-bus" style="--chip:${color}">${campusTransitModeIcon("bus")}<span>${escapeHtml(name)}</span></span>`;
    }
    return `<span class="campus-transit-chip">${escapeHtml(campusTransitStepLabel(step))}</span>`;
  }

  function campusTransitStopNames(props) {
    return (props.stops || []).map((stop) => stop?.name || stop).filter(Boolean);
  }

  function campusTransitPickRoutes(routes) {
    const list = Array.isArray(routes) ? [...routes] : [];
    if (!list.length) return { featured: [], rest: [] };
    const byTime = [...list].sort(
      (a, b) => (a.properties?.totalTime || 0) - (b.properties?.totalTime || 0)
    );
    const byTransfer = [...list].sort((a, b) => {
      const ta = a.properties?.transfers ?? 99;
      const tb = b.properties?.transfers ?? 99;
      if (ta !== tb) return ta - tb;
      return (a.properties?.totalTime || 0) - (b.properties?.totalTime || 0);
    });
    const featured = [];
    const pushUnique = (route) => {
      if (!route || featured.includes(route)) return;
      featured.push(route);
    };
    pushUnique(byTime[0]);
    pushUnique(byTransfer[0]);
    const rest = list.filter((route) => !featured.includes(route));
    return { featured, rest };
  }

  function campusTransitBadge(route, index, featured) {
    if (!featured.length) return "";
    if (index === 0) return "가장 빠른 경로";
    if (featured.length > 1 && index === 1) {
      const first = featured[0]?.properties?.transfers ?? 0;
      const second = route?.properties?.transfers ?? 0;
      if (second < first) return "환승 최소";
      return `환승 ${second}회`;
    }
    return "";
  }

  function campusTransitStepsTimelineHtml(route) {
    const steps = route?.steps || [];
    const nodes = [];
    steps.forEach((step, index) => {
      const stepProps = campusTransitStepProps(step);
      const type = campusTransitStepType(step);
      const timeMin = campusTransitMinutes(stepProps.time || step.sectionTime || step.time || 0);
      const distance = Number(stepProps.distance || 0);
      const stops = campusTransitStopNames(stepProps);
      const from = stops[0] || "";
      const to = stops[stops.length - 1] || "";
      const viaCount = Math.max(0, stops.length - 1);

      if (type.includes("WALK")) {
        const guide = String(stepProps.guidance || "").trim();
        const exitMatch = guide.match(/\(([^)]*출구[^)]*)\)/);
        nodes.push(`<li class="campus-transit-step is-walk">
          <span class="campus-transit-step-rail" aria-hidden="true"></span>
          <div>
            <p class="campus-transit-step-title">도보 ${timeMin || 1}분${distance ? ` · ${distance}m` : ""}</p>
            ${exitMatch ? `<p class="campus-transit-step-sub">${escapeHtml(exitMatch[1])}</p>` : guide ? `<p class="campus-transit-step-sub">${escapeHtml(guide)}</p>` : ""}
          </div>
        </li>`);
        return;
      }

      const vehicle = stepProps.vehicles?.[0] || {};
      const vehicleName = vehicle.name || (type.includes("SUBWAY") ? "지하철" : "버스");
      const vehicleType = vehicle.type || "";
      const color = type.includes("SUBWAY")
        ? campusSubwayLineColor(vehicleName)
        : campusBusTypeColor(vehicleType);
      const rideLabel = type.includes("SUBWAY")
        ? `${viaCount}개 역 · ${timeMin || 1}분`
        : `${viaCount}개 정류장 · ${timeMin || 1}분`;
      nodes.push(`<li class="campus-transit-step is-ride" style="--leg:${color}">
        <span class="campus-transit-step-rail" aria-hidden="true"></span>
        <div>
          <div class="campus-transit-ride-head">${campusTransitChipHtml(step)}${vehicleType ? `<span class="campus-transit-step-sub">${escapeHtml(vehicleType)}</span>` : ""}</div>
          <p class="campus-transit-step-title">${escapeHtml(from || "승차")} → ${escapeHtml(to || "하차")}</p>
          <p class="campus-transit-step-sub">${rideLabel}${index < steps.length - 1 ? " · 환승" : ""}</p>
        </div>
      </li>`);
    });
    return `<ol class="campus-transit-steps">${nodes.join("")}</ol>`;
  }

  function campusTransitRouteCardHtml(route, index, selected, expanded, badge) {
    const props = route.properties || {};
    const minutes = Math.max(1, campusTransitMinutes(props.totalTime));
    const fare = campusTransitFare(props);
    const walkMin = campusTransitMinutes(campusTransitWalkSeconds(route));
    const transfers = props.transfers ?? 0;
    const km = ((props.totalDistance || 0) / 1000).toFixed(1);
    const chips = (route.steps || [])
      .filter((step) => !campusTransitStepType(step).includes("WALK"))
      .map(campusTransitChipHtml)
      .join("");
    const metaBits = [
      `환승 ${transfers}회`,
      walkMin ? `도보 ${walkMin}분` : "",
      `${km}km`,
      fare != null ? `${fare.toLocaleString("ko-KR")}원` : "",
    ].filter(Boolean);
    return `<article class="campus-transit-option${selected ? " is-active" : ""}${expanded ? " is-expanded" : ""}" data-campus-route-option="${index}">
      <button type="button" class="campus-transit-option-btn" aria-expanded="${expanded ? "true" : "false"}">
        <div class="campus-transit-option-top">
          <strong class="campus-transit-option-time">${minutes}<span>분</span></strong>
          ${badge ? `<span class="campus-transit-option-badge">${escapeHtml(badge)}</span>` : ""}
        </div>
        <p class="campus-transit-option-meta">${escapeHtml(metaBits.join(" · "))}</p>
        <div class="campus-transit-option-chips">${chips || `<span class="campus-transit-chip is-walk">${campusTransitModeIcon("walk")}<span>도보</span></span>`}</div>
      </button>
      <div class="campus-transit-option-detail"${expanded ? "" : " hidden"}>${campusTransitStepsTimelineHtml(route)}</div>
    </article>`;
  }

  function campusMapHtml() {
    const rows = campusRows();
    const regionButtons = `<button type="button" class="campus-roadview-region is-active" data-campus-map-region="" aria-pressed="true">전체</button>${campusRegionButtonsHtml(rows, "data-campus-map-region", "")}`;
    return `<section class="campus-map" data-campus-map>
      <div class="campus-map-tools">
        <label class="admit-search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <path d="m20 20-3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <input type="search" data-campus-map-keyword placeholder="대학명 검색" aria-label="대학명 검색">
        </label>
        <div class="campus-roadview-regions" role="group" aria-label="지역">${regionButtons}</div>
      </div>
      <div class="campus-map-layout">
        <aside class="campus-map-panel" aria-label="통학 경로">
          <div class="campus-map-input" data-campus-map-input>
            <div class="campus-map-field">
              <p class="campus-map-field-label">출발</p>
              <div class="campus-map-origin" data-campus-origin>
                <div class="campus-map-origin-actions campus-roadview-regions" data-campus-origin-choose>
                  <button type="button" class="campus-roadview-region campus-map-home-geo" data-campus-home-geo>
                    <span class="campus-map-origin-ico" aria-hidden="true">📍</span>현재 위치 사용
                  </button>
                  <button type="button" class="campus-roadview-region campus-map-home-btn" data-campus-home-pick aria-pressed="false">
                    <span class="campus-map-origin-ico" aria-hidden="true">🗺️</span>지도에서 선택
                  </button>
                </div>
                <div class="campus-map-origin-picking" data-campus-origin-picking hidden>
                  <p class="campus-map-origin-guide">지도에서 출발할 위치를 눌러 주세요</p>
                  <button type="button" class="campus-map-home-cancel" data-campus-home-cancel>취소</button>
                </div>
                <div class="campus-map-origin-selected" data-campus-origin-selected hidden>
                  <p class="campus-map-origin-value campus-roadview-region" data-campus-origin-value></p>
                  <button type="button" class="campus-roadview-region campus-map-home-edit" data-campus-home-edit>변경</button>
                </div>
              </div>
            </div>
            <div class="campus-map-field">
              <p class="campus-map-field-label">도착</p>
              <p class="campus-map-dest-guide is-empty" data-campus-dest-box>지도에서 대학을 선택해 주세요</p>
            </div>
            <div class="campus-map-route-area" data-campus-route-area>
              <div class="campus-map-route-placeholder is-empty" data-campus-route-placeholder>대중교통 경로 보기</div>
              <div class="campus-map-route-body" data-campus-route-result hidden>
                <div class="campus-transit-options" data-campus-route-options role="listbox" aria-label="대중교통 경로 후보"></div>
                <p class="campus-map-eta" data-campus-eta hidden></p>
                <p class="campus-map-meta-line" data-campus-route-meta hidden></p>
                <button type="button" class="campus-roadview-view campus-map-route-more" data-campus-route-more hidden>다른 경로 더 보기</button>
              </div>
            </div>
          </div>
        </aside>
        <div class="campus-map-stage">
          <div class="campus-roadview-head">
            <div class="campus-roadview-heading">
              <h2 class="campus-roadview-title" data-campus-map-title>통학 경로</h2>
              <p class="campus-roadview-meta" data-campus-map-meta hidden></p>
            </div>
            <button type="button" class="campus-roadview-view" data-campus-map-view disabled>상세 보기</button>
          </div>
          <p class="campus-map-pick-banner" data-campus-map-banner hidden>지도에서 출발할 위치를 눌러 주세요</p>
          <div class="campus-map-canvas" data-campus-map-el role="presentation"></div>
          <p class="campus-map-hint" data-campus-map-hint hidden></p>
        </div>
      </div>
    </section>`;
  }

  function bindCampusMap(root) {
    if (!root || root.dataset.bound === "1") return;
    root.dataset.bound = "1";
    const mapEl = root.querySelector("[data-campus-map-el]");
    const input = root.querySelector("[data-campus-map-keyword]");
    const regionButtons = [...root.querySelectorAll("[data-campus-map-region]")];
    const originChoose = root.querySelector("[data-campus-origin-choose]");
    const originPicking = root.querySelector("[data-campus-origin-picking]");
    const originSelected = root.querySelector("[data-campus-origin-selected]");
    const originValue = root.querySelector("[data-campus-origin-value]");
    const destBox = root.querySelector("[data-campus-dest-box]");
    const homePickBtn = root.querySelector("[data-campus-home-pick]");
    const homeGeoBtn = root.querySelector("[data-campus-home-geo]");
    const homeCancelBtn = root.querySelector("[data-campus-home-cancel]");
    const homeEditBtn = root.querySelector("[data-campus-home-edit]");
    const routePlaceholder = root.querySelector("[data-campus-route-placeholder]");
    const resultBox = root.querySelector("[data-campus-route-result]");
    const optionsEl = root.querySelector("[data-campus-route-options]");
    const etaEl = root.querySelector("[data-campus-eta]");
    const metaEl = root.querySelector("[data-campus-route-meta]");
    const moreBtn = root.querySelector("[data-campus-route-more]");
    const hint = root.querySelector("[data-campus-map-hint]");
    const pickBanner = root.querySelector("[data-campus-map-banner]");
    const mapTitle = root.querySelector("[data-campus-map-title]");
    const mapMeta = root.querySelector("[data-campus-map-meta]");
    const mapViewBtn = root.querySelector("[data-campus-map-view]");
    const rows = campusRows().map((row) => {
      const point = campusPoint(row.name);
      return {
        ...row,
        lat: point?.lat,
        lng: point?.lng,
        address: campusOfficialAddress(row.name),
      };
    });

    let regionFilter = "";
    let pickHome = false;
    let routeState = "idle";
    let home = null;
    let dest = null;
    let map = null;
    let geocoder = null;
    let homeOverlay = null;
    let routeLines = [];
    let featuredRoutes = [];
    let restRoutes = [];
    let showAllRoutes = false;
    let selectedRouteIndex = 0;
    let expandedRouteIndex = -1;
    let routeReqId = 0;
    const markerByName = new Map();

    const destLabel = () => (dest ? dest.name : "");
    const visibleRoutes = () => (showAllRoutes ? [...featuredRoutes, ...restRoutes] : [...featuredRoutes]);
    const formatDistanceKm = (km) => {
      if (!Number.isFinite(km) || km <= 0) return "";
      if (km < 1) return `약 ${Math.max(0.1, Math.round(km * 10) / 10)}km`;
      if (km < 10) return `약 ${km.toFixed(1)}km`;
      return `약 ${Math.round(km)}km`;
    };
    const headMetaText = () => {
      if (!home || !dest) return "";
      const km = campusDistanceKm(home.lat, home.lng, dest.lat, dest.lng);
      return formatDistanceKm(km);
    };
    const homeDisplayLabel = () => {
      if (!home) return "";
      if (home.source === "geo") return "📍 현재 위치";
      return `🗺️ ${home.name || "선택한 위치"}`;
    };
    const shortRegionLabel = (result) => {
      const row = result?.[0];
      const addr = row?.address;
      if (addr) {
        const sido = String(addr.region_1depth_name || "")
          .replace(/특별시$|광역시$|특별자치시$/, "")
          .replace(/특별자치도$/, "")
          .trim();
        return [sido, addr.region_2depth_name, addr.region_3depth_name].filter(Boolean).join(" ");
      }
      return row?.road_address?.address_name || row?.address?.address_name || "지도에서 선택한 위치";
    };

    const setHint = (text, show = true) => {
      if (!hint) return;
      hint.hidden = !show;
      if (text) hint.textContent = text;
    };

    const setPickMode = (on) => {
      pickHome = Boolean(on);
      root.classList.toggle("is-picking-home", pickHome);
      if (homePickBtn) {
        homePickBtn.classList.toggle("is-active", pickHome);
        homePickBtn.setAttribute("aria-pressed", pickHome ? "true" : "false");
      }
      if (pickBanner) pickBanner.hidden = true;
      syncPanel();
    };

    const syncOriginUi = () => {
      const mode = pickHome ? "picking" : home ? "selected" : "choose";
      if (originChoose) originChoose.hidden = mode !== "choose";
      if (originPicking) originPicking.hidden = mode !== "picking";
      if (originSelected) originSelected.hidden = mode !== "selected";
      if (originValue) originValue.textContent = homeDisplayLabel();
    };

    const setRoutePlaceholder = (text, empty = true) => {
      if (!routePlaceholder) return;
      routePlaceholder.hidden = false;
      routePlaceholder.textContent = text;
      routePlaceholder.classList.toggle("is-empty", empty);
      routePlaceholder.classList.toggle("is-loading", !empty && text.includes("조회"));
    };

    const showRouteIdle = () => {
      routeState = "idle";
      root.classList.remove("has-transit-result");
      if (resultBox) resultBox.hidden = true;
      if (optionsEl) optionsEl.replaceChildren();
      if (etaEl) {
        etaEl.hidden = true;
        etaEl.textContent = "";
      }
      if (metaEl) {
        metaEl.hidden = true;
        metaEl.textContent = "";
      }
      if (moreBtn) moreBtn.hidden = true;
      setRoutePlaceholder("대중교통 경로 보기", true);
      clearRouteDraw();
    };

    const showRouteLoading = () => {
      routeState = "loading";
      root.classList.remove("has-transit-result");
      if (resultBox) resultBox.hidden = true;
      setRoutePlaceholder("경로 조회 중…", false);
    };

    const showRouteResult = () => {
      routeState = "result";
      root.classList.add("has-transit-result");
      if (routePlaceholder) routePlaceholder.hidden = true;
      if (resultBox) resultBox.hidden = false;
      setHint("", false);
    };

    const syncPanel = () => {
      syncOriginUi();
      if (destBox) {
        destBox.textContent = dest ? destLabel() : "지도에서 대학을 선택해 주세요";
        destBox.classList.toggle("is-empty", !dest);
      }
      if (mapTitle) mapTitle.textContent = dest?.name || "통학 경로";
      if (mapMeta) {
        const metaText = headMetaText();
        mapMeta.hidden = !metaText;
        mapMeta.textContent = metaText;
      }
      if (mapViewBtn) mapViewBtn.disabled = !dest;
      if (routeState === "idle" || routeState === "loading") {
        setHint("", false);
      }
    };

    const clearRouteDraw = () => {
      routeLines.forEach((line) => line.setMap(null));
      routeLines = [];
    };

    const drawPath = (points, options) => {
      if (!map || !points || points.length < 2) return null;
      const path = points.map((pt) => new window.kakao.maps.LatLng(pt.y ?? pt[1], pt.x ?? pt[0]));
      const line = new window.kakao.maps.Polyline({
        path,
        strokeWeight: options.weight || 5,
        strokeColor: options.color || "#1a4796",
        strokeOpacity: options.opacity || 0.9,
        strokeStyle: options.style || "solid",
      });
      line.setMap(map);
      return line;
    };

    const drawTransitRoute = (route) => {
      clearRouteDraw();
      if (!route || !map) return;
      const bounds = new window.kakao.maps.LatLngBounds();
      let drew = false;
      (route.steps || []).forEach((step) => {
        const type = campusTransitStepType(step);
        const points = campusTransitStepPoints(step);
        const stepProps = campusTransitStepProps(step);
        const isWalk = type.includes("WALK") || type.includes("도보");
        let color = "#1a4796";
        if (isWalk) color = "#6b7280";
        else if (type.includes("SUBWAY")) color = campusSubwayLineColor(stepProps.vehicles?.[0]?.name);
        else if (type.includes("BUS")) color = campusBusTypeColor(stepProps.vehicles?.[0]?.type);
        const line = drawPath(points, {
          color,
          style: isWalk ? "dash" : "solid",
          weight: isWalk ? 4 : 6,
          opacity: isWalk ? 0.75 : 0.92,
        });
        if (line) {
          routeLines.push(line);
          points.forEach((pt) => {
            const lat = pt.y ?? pt[1];
            const lng = pt.x ?? pt[0];
            if (lat != null && lng != null) {
              bounds.extend(new window.kakao.maps.LatLng(lat, lng));
              drew = true;
            }
          });
        }
      });
      if (drew) {
        try {
          map.setBounds(bounds, 48, 48, 48, 48);
        } catch (_) {
          map.setBounds(bounds);
        }
      }
    };

    const scrollSelectedRouteToTop = () => {
      if (!resultBox || !optionsEl) return;
      const card = optionsEl.querySelector(`[data-campus-route-option="${selectedRouteIndex}"]`);
      if (!card) return;
      requestAnimationFrame(() => {
        const pad = Number.parseFloat(getComputedStyle(resultBox).paddingTop) || 0;
        const delta = card.getBoundingClientRect().top - resultBox.getBoundingClientRect().top - pad;
        resultBox.scrollTop += delta;
      });
    };

    const renderTransitResult = (index = 0, expand = true) => {
      const routes = visibleRoutes();
      if (!routes.length || !home || !dest) return;
      selectedRouteIndex = Math.max(0, Math.min(index, routes.length - 1));
      if (expand) expandedRouteIndex = selectedRouteIndex;
      const route = routes[selectedRouteIndex];
      if (optionsEl) {
        optionsEl.hidden = false;
        optionsEl.innerHTML = routes
          .map((item, i) =>
            campusTransitRouteCardHtml(
              item,
              i,
              i === selectedRouteIndex,
              i === expandedRouteIndex,
              campusTransitBadge(item, i, featuredRoutes)
            )
          )
          .join("");
      }
      if (etaEl) {
        etaEl.hidden = true;
        etaEl.textContent = "";
      }
      if (metaEl) {
        metaEl.hidden = true;
        metaEl.textContent = "";
      }
      if (moreBtn) moreBtn.hidden = showAllRoutes || restRoutes.length === 0;
      showRouteResult();
      drawTransitRoute(route);
      syncPanel();
      scrollSelectedRouteToTop();
    };

    const renderTransitFallback = (message) => {
      featuredRoutes = [];
      restRoutes = [];
      selectedRouteIndex = 0;
      expandedRouteIndex = -1;
      if (!hasKakaoAppKey()) {
        if (optionsEl) {
          optionsEl.hidden = true;
          optionsEl.replaceChildren();
        }
        if (etaEl) {
          etaEl.hidden = true;
          etaEl.textContent = "";
        }
        if (metaEl) {
          metaEl.hidden = true;
          metaEl.textContent = "";
        }
        if (moreBtn) moreBtn.hidden = true;
        setRoutePlaceholder("통학 경로 미리보기", true);
        setHint("", false);
        showCampusKakaoPreview(mapEl, "map");
        syncPanel();
        return;
      }
      if (optionsEl) {
        optionsEl.hidden = true;
        optionsEl.replaceChildren();
      }
      if (etaEl) {
        etaEl.hidden = false;
        const km = home && dest ? campusDistanceKm(home.lat, home.lng, dest.lat, dest.lng) : 0;
        etaEl.textContent = `직선 약 ${km < 10 ? km.toFixed(1) : Math.round(km)}km`;
      }
      if (metaEl) {
        metaEl.hidden = false;
        metaEl.textContent = message;
      }
      if (moreBtn) moreBtn.hidden = true;
      showRouteResult();
      setHint("경로선은 serve.py(프록시)로 열면 지도에 표시됩니다.", true);
      if (home && dest) {
        const fallback = drawPath(
          [
            { x: home.lng, y: home.lat },
            { x: dest.lng, y: dest.lat },
          ],
          { color: "#0f7f93", style: "dash", weight: 4 }
        );
        if (fallback) routeLines.push(fallback);
      }
      syncPanel();
    };

    const markerHtml = (name, active) =>
      `<div class="campus-map-marker${active ? " is-active-marker" : ""}">
        <span class="campus-map-marker-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 20V9.5L12 5l8 4.5V20"/>
            <path d="M9 20v-5h6v5"/>
            <path d="M9 11h.01M15 11h.01"/>
          </svg>
        </span>
        <span class="campus-map-marker-label">${escapeHtml(campusShortName(name))}</span>
      </div>`;

    const placeHomePin = (lat, lng) => {
      if (!map) return;
      const pos = new window.kakao.maps.LatLng(lat, lng);
      if (homeOverlay) homeOverlay.setMap(null);
      homeOverlay = new window.kakao.maps.CustomOverlay({
        position: pos,
        yAnchor: 1,
        zIndex: 20,
        content: `<div class="campus-map-home-pin"><span class="campus-map-home-dot"></span><span class="campus-map-home-label">출발</span></div>`,
      });
      homeOverlay.setMap(map);
    };

    const clearHome = () => {
      home = null;
      if (homeOverlay) {
        homeOverlay.setMap(null);
        homeOverlay = null;
      }
      featuredRoutes = [];
      restRoutes = [];
      showRouteIdle();
      syncPanel();
    };

    const maybeRunRoute = () => {
      if (home && dest) {
        runRoute();
        return;
      }
      showRouteIdle();
      syncPanel();
    };

    const setHome = (lat, lng, name, source = "map") => {
      home = {
        lat,
        lng,
        name: name || (source === "geo" ? "현재 위치" : "선택한 출발지"),
        source,
      };
      placeHomePin(lat, lng);
      setPickMode(false);
      featuredRoutes = [];
      restRoutes = [];
      maybeRunRoute();
    };

    const resolveMapAddress = (lat, lng) => {
      setHome(lat, lng, "선택한 위치", "map");
      if (map) {
        map.setLevel(Math.min(map.getLevel(), 5));
        map.setCenter(new window.kakao.maps.LatLng(lat, lng));
      }
      if (!geocoder) return;
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (!home || home.source !== "map" || home.lat !== lat || home.lng !== lng) return;
        if (status !== window.kakao.maps.services.Status.OK) return;
        const label = shortRegionLabel(result);
        if (!label) return;
        home.name = label;
        syncPanel();
      });
    };

    const setDest = (row) => {
      const point = row ? campusPoint(row.name) : null;
      const cached = row ? campusCoordsCache.get(row.name) : null;
      dest = row
        ? {
            name: row.name,
            lat: cached?.lat ?? point?.lat ?? row.lat,
            lng: cached?.lng ?? point?.lng ?? row.lng,
            region: row.region || "",
            address: campusOfficialAddress(row.name) || row.address || "",
          }
        : null;
      featuredRoutes = [];
      restRoutes = [];
      rebuildMarkers();
      syncPanel();
      if (dest) {
        resolveCampusPlace(geocoder, dest.name, (place) => {
          if (!dest || dest.name !== row.name) return;
          dest.lat = place.lat;
          dest.lng = place.lng;
          dest.address = place.address || dest.address;
          rebuildMarkers();
          syncPanel();
          maybeRunRoute();
        });
      }
      maybeRunRoute();
    };

    const fitKoreaOverview = () => {
      if (!map) return;
      map.setLevel(13);
      map.setCenter(new window.kakao.maps.LatLng(36.35, 127.85));
    };

    const fitVisible = (visible) => {
      if (!map || !visible.length) return;
      const q = (input?.value || "").trim();
      if (!regionFilter && !q) {
        fitKoreaOverview();
        return;
      }
      if (visible.length === 1) {
        map.setLevel(5);
        map.setCenter(new window.kakao.maps.LatLng(visible[0].lat, visible[0].lng));
        return;
      }
      const bounds = new window.kakao.maps.LatLngBounds();
      visible.forEach((row) => bounds.extend(new window.kakao.maps.LatLng(row.lat, row.lng)));
      map.setBounds(bounds, 48, 48, 48, 48);
    };

    const rebuildMarkers = () => {
      if (!map) return;
      const q = (input?.value || "").trim().toLowerCase();
      markerByName.forEach((overlay) => overlay.setMap(null));
      markerByName.clear();
      const visible = rows.filter((row) => {
        const regionOk = !regionFilter || row.region === regionFilter;
        const keywordOk = !q || row.name.toLowerCase().includes(q);
        return regionOk && keywordOk;
      });
      visible.forEach((row) => {
        const active = dest && dest.name === row.name;
        const content = document.createElement("div");
        content.innerHTML = markerHtml(row.name, active);
        const button = content.firstElementChild;
        if (button) {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            setDest(row);
          });
        }
        const overlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(row.lat, row.lng),
          yAnchor: 1,
          xAnchor: 0.18,
          zIndex: active ? 12 : 3,
          content,
          clickable: true,
        });
        overlay.setMap(map);
        markerByName.set(row.name, overlay);
      });
      if (q && visible.length === 1 && (!dest || dest.name !== visible[0].name)) {
        setDest(visible[0]);
        return;
      }
      fitVisible(visible);
    };

    const runRoute = async () => {
      if (!home || !dest) return;
      if (!hasKakaoAppKey() || !map) {
        clearRouteDraw();
        featuredRoutes = [];
        restRoutes = [];
        if (optionsEl) {
          optionsEl.hidden = true;
          optionsEl.replaceChildren();
        }
        if (etaEl) {
          etaEl.hidden = true;
          etaEl.textContent = "";
        }
        if (metaEl) {
          metaEl.hidden = true;
          metaEl.textContent = "";
        }
        if (moreBtn) moreBtn.hidden = true;
        setRoutePlaceholder("통학 경로 미리보기", true);
        setHint("", false);
        showCampusKakaoPreview(mapEl, "map");
        syncPanel();
        return;
      }
      const reqId = ++routeReqId;
      const origin = { ...home };
      const target = { ...dest };
      showRouteLoading();
      syncPanel();
      clearRouteDraw();
      try {
        const data = await fetchKakaoTransit(origin, target);
        if (reqId !== routeReqId) return;
        if (!home || !dest || home.lat !== origin.lat || home.lng !== origin.lng || dest.name !== target.name) return;
        const routes = data && data.status === "OK" && Array.isArray(data.routes) ? data.routes : [];
        if (!routes.length) throw new Error(data?.status || data?.message || "no-route");
        const picked = campusTransitPickRoutes(routes);
        featuredRoutes = picked.featured;
        restRoutes = picked.rest;
        showAllRoutes = false;
        expandedRouteIndex = 0;
        renderTransitResult(0, true);
      } catch (err) {
        if (reqId !== routeReqId) return;
        console.warn("[campus-map] transit", err);
        renderTransitFallback(
          "카카오 대중교통 API를 아직 불러오지 못했습니다. python serve.py 로 실행했는지 확인하거나 카카오맵에서 보세요."
        );
      }
    };

    if (!hasKakaoAppKey()) {
      showCampusKakaoPreview(mapEl, "map");
    } else {
      loadKakaoMaps()
        .then((kakao) => {
          map = new kakao.maps.Map(mapEl, {
            center: new kakao.maps.LatLng(36.35, 127.85),
            level: 13,
          });
          geocoder = new kakao.maps.services.Geocoder();
          rows.forEach((row) => {
            resolveCampusPlace(geocoder, row.name, (place) => {
              row.lat = place.lat;
              row.lng = place.lng;
              row.address = place.address || row.address;
              if (dest?.name === row.name) {
                dest.lat = place.lat;
                dest.lng = place.lng;
                dest.address = place.address || dest.address;
                syncPanel();
              }
              rebuildMarkers();
            });
          });
          root._campusMap = map;
          root._campusMapRefresh = () => {
            map.relayout();
            rebuildMarkers();
          };

          kakao.maps.event.addListener(map, "click", (mouseEvent) => {
            if (!pickHome) return;
            const latlng = mouseEvent.latLng;
            resolveMapAddress(latlng.getLat(), latlng.getLng());
          });

          // marker click via delegation on content overlays
          root.addEventListener("click", (event) => {
            const markerBtn = event.target.closest(".campus-map-marker");
            if (!markerBtn || !root.contains(markerBtn)) return;
            const label = markerBtn.querySelector(".campus-map-marker-label")?.textContent || "";
            const row = rows.find((item) => campusShortName(item.name) === label || item.name === label);
            if (row) setDest(row);
          });

          rebuildMarkers();
          syncPanel();
          requestAnimationFrame(() => map.relayout());
          setTimeout(() => {
            map.relayout();
            rebuildMarkers();
          }, 160);
        })
        .catch(() => {
          showCampusKakaoPreview(mapEl, "map");
        });
    }

    if (homePickBtn) {
      homePickBtn.addEventListener("click", () => {
        if (!hasKakaoAppKey() || !map) {
          showCampusKakaoPreview(mapEl, "map");
          setHint("", false);
          return;
        }
        setPickMode(true);
      });
    }

    if (homeCancelBtn) {
      homeCancelBtn.addEventListener("click", () => {
        setPickMode(false);
      });
    }

    if (homeEditBtn) {
      homeEditBtn.addEventListener("click", () => {
        clearHome();
        setPickMode(false);
      });
    }

    if (homeGeoBtn) {
      homeGeoBtn.addEventListener("click", () => {
        if (!navigator.geolocation) {
          if (hasKakaoAppKey()) setHint("이 브라우저에서는 현재 위치를 쓸 수 없습니다. 지도에서 선택해 주세요.");
          else setHint("", false);
          return;
        }
        homeGeoBtn.disabled = true;
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            homeGeoBtn.disabled = false;
            setHome(pos.coords.latitude, pos.coords.longitude, "현재 위치", "geo");
            if (map) {
              map.setLevel(5);
              map.setCenter(new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            } else {
              showCampusKakaoPreview(mapEl, "map");
            }
          },
          () => {
            homeGeoBtn.disabled = false;
            if (hasKakaoAppKey()) setHint("현재 위치를 가져오지 못했습니다. 지도에서 선택해 주세요.");
            else setHint("", false);
          },
          { enableHighAccuracy: true, timeout: 8000 }
        );
      });
    }

    if (mapViewBtn) {
      mapViewBtn.addEventListener("click", () => {
        if (!dest?.name) return;
        openCampusUniversityDetail(dest.name);
      });
    }
    if (moreBtn) {
      moreBtn.addEventListener("click", () => {
        showAllRoutes = true;
        renderTransitResult(selectedRouteIndex, false);
      });
    }
    if (optionsEl) {
      optionsEl.addEventListener("click", (event) => {
        const card = event.target.closest("[data-campus-route-option]");
        if (!card || !optionsEl.contains(card)) return;
        const index = Number(card.dataset.campusRouteOption) || 0;
        if (selectedRouteIndex === index && expandedRouteIndex === index) {
          expandedRouteIndex = -1;
          renderTransitResult(index, false);
          return;
        }
        renderTransitResult(index, true);
      });
    }
    regionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.campusMapRegion ?? "";
        regionFilter = regionFilter === next && next !== "" ? "" : next;
        // 전체("")는 토글 없이 전체 유지
        if (btn.dataset.campusMapRegion === "") regionFilter = "";
        regionButtons.forEach((item) => {
          const value = item.dataset.campusMapRegion ?? "";
          const on = regionFilter === value || (regionFilter === "" && value === "");
          item.classList.toggle("is-active", on);
          item.setAttribute("aria-pressed", on ? "true" : "false");
        });
        rebuildMarkers();
      });
    });
    regionButtons.forEach((item) => {
      const value = item.dataset.campusMapRegion ?? "";
      const on = regionFilter === value;
      item.classList.toggle("is-active", on);
      item.setAttribute("aria-pressed", on ? "true" : "false");
    });

    if (input) input.addEventListener("input", rebuildMarkers);
    syncPanel();
  }

  function campusRoadviewHtml() {
    const rows = campusRows();
    const items = rows
      .map((row, index) => {
        const point = campusPoint(row.name);
        const address = campusOfficialAddress(row.name);
        const selected = index === 0 ? "true" : "false";
        const active = index === 0 ? " is-active" : "";
        return `<button type="button" class="campus-roadview-item${active}" role="option" data-campus-item aria-selected="${selected}" data-name="${escapeHtml(row.name)}" data-region="${escapeHtml(row.region || "")}" data-address="${escapeHtml(address)}" data-lat="${point?.lat ?? ""}" data-lng="${point?.lng ?? ""}" data-heading="${point?.heading ?? ""}">
            <span class="campus-roadview-name">${escapeHtml(row.name)}</span>
            <span class="campus-roadview-item-region">${escapeHtml(row.region || "")}</span>
          </button>`;
      })
      .join("");

    const regionButtons = campusRegionButtonsHtml(rows);

    return `<section class="campus-roadview" data-campus-roadview>
      <div class="campus-roadview-tools">
        <label class="admit-search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <path d="m20 20-3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <input type="search" data-campus-keyword placeholder="대학명 검색" aria-label="대학명 검색">
        </label>
        <div class="campus-roadview-regions" role="group" aria-label="지역">${regionButtons}</div>
      </div>
      <p class="campus-roadview-empty" data-campus-empty hidden>검색 결과가 없습니다.</p>
      <div class="campus-roadview-layout">
        <div class="campus-roadview-list" role="listbox" aria-label="캠퍼스 목록">${items}</div>
        <div class="campus-roadview-stage">
          <div class="campus-roadview-head">
            <div class="campus-roadview-heading">
              <h2 class="campus-roadview-title" data-campus-title>캠퍼스</h2>
              <p class="campus-roadview-meta" data-campus-meta></p>
            </div>
            <button type="button" class="campus-roadview-view" data-campus-view>상세 보기</button>
          </div>
          <div class="campus-roadview-viewer">
            <div class="campus-roadview-frame" data-campus-frame role="application" aria-label="캠퍼스 로드뷰"></div>
            <p class="campus-roadview-miss" data-campus-roadview-miss hidden>이 위치 근처 카카오 로드뷰가 없습니다.</p>
          </div>
        </div>
      </div>
    </section>`;
  }

  function openCampusUniversityDetail(name) {
    const target = String(name || "").replace(/\s+/g, " ").trim();
    if (!target) return;
    const row = [...document.querySelectorAll('#university-info tr[data-uni-row]')].find((tr) => {
      const label = (tr.cells[0]?.textContent || "").replace(/\s+/g, " ").trim();
      return label === target;
    });
    if (row) openUniversityAdmitDetail(row);
  }

  function bindCampusRoadview(root) {
    if (!root || root.dataset.bound === "1") return;
    root.dataset.bound = "1";
    const input = root.querySelector("[data-campus-keyword]");
    const regionButtons = [...root.querySelectorAll("[data-campus-region]")];
    const items = [...root.querySelectorAll("[data-campus-item]")];
    const frame = root.querySelector("[data-campus-frame]");
    const miss = root.querySelector("[data-campus-roadview-miss]");
    const title = root.querySelector("[data-campus-title]");
    const meta = root.querySelector("[data-campus-meta]");
    const empty = root.querySelector("[data-campus-empty]");
    const layout = root.querySelector(".campus-roadview-layout");
    const view = root.querySelector("[data-campus-view]");
    let currentName = "";
    let roadview = null;
    let roadviewClient = null;
    let loadGen = 0;
    let pendingBtn = null;
    let wantedHeading = NaN;

    const setMiss = (text, show, asPreview = false) => {
      if (asPreview && show) {
        showCampusKakaoPreview(frame, "road");
        if (miss) miss.hidden = true;
        return;
      }
      if (frame?.classList.contains("is-preview") && !show) {
        frame.classList.remove("is-preview");
        frame.innerHTML = "";
      }
      if (!miss) return;
      miss.hidden = !show;
      if (text) miss.textContent = text;
      if (frame) frame.classList.toggle("is-empty", Boolean(show));
    };

    const applyWantedHeading = () => {
      if (!roadview || !Number.isFinite(wantedHeading)) return;
      try {
        roadview.setViewpoint({ pan: wantedHeading, tilt: 0, zoom: 0 });
      } catch (_) {
        /* ignore unsupported viewpoint */
      }
    };

    const refreshRoadview = () => {
      if (roadview && typeof roadview.relayout === "function") roadview.relayout();
    };
    root._campusRoadviewRefresh = refreshRoadview;

    const ensureRoadview = async () => {
      const kakao = await loadKakaoMaps();
      if (!frame) throw new Error("missing-roadview-frame");
      if (frame.classList.contains("is-preview")) {
        frame.classList.remove("is-preview");
        frame.innerHTML = "";
        roadview = null;
        roadviewClient = null;
      }
      if (!roadview) {
        roadview = new kakao.maps.Roadview(frame);
        roadviewClient = new kakao.maps.RoadviewClient();
        kakao.maps.event.addListener(roadview, "init", () => {
          refreshRoadview();
          applyWantedHeading();
        });
      }
      return kakao;
    };

    const showRoadviewAt = async (btn) => {
      if (!btn || !frame) return;
      const lat = Number(btn.dataset.lat);
      const lng = Number(btn.dataset.lng);
      const heading = Number(btn.dataset.heading);
      const name = btn.dataset.name || "캠퍼스";
      const gen = ++loadGen;
      wantedHeading = Number.isFinite(heading) ? heading : NaN;
      frame.setAttribute("aria-label", `${name} 캠퍼스 로드뷰`);
      if (!hasKakaoAppKey()) {
        setMiss("", true, true);
        return;
      }
      setMiss("로드뷰를 불러오는 중…", true);
      try {
        const kakao = await ensureRoadview();
        if (gen !== loadGen) return;
        const position = new kakao.maps.LatLng(lat, lng);
        roadviewClient.getNearestPanoId(position, campusRoadviewRadius(), (panoId) => {
          if (gen !== loadGen) return;
          if (panoId == null) {
            setMiss("이 위치의 거리 풍경은 아직 준비되지 않았습니다.", true);
            return;
          }
          setMiss("", false);
          roadview.setPanoId(panoId, position);
          requestAnimationFrame(() => {
            refreshRoadview();
            applyWantedHeading();
          });
          setTimeout(() => {
            refreshRoadview();
            applyWantedHeading();
          }, 160);
        });
      } catch (_) {
        if (gen !== loadGen) return;
        setMiss("", true, true);
      }
    };

    const select = (btn) => {
      if (!btn) return;
      items.forEach((item) => {
        const on = item === btn;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
      const name = btn.dataset.name || "";
      const region = btn.dataset.region || "";
      currentName = name;
      pendingBtn = btn;
      if (view) view.setAttribute("aria-label", name ? `${name} 상세 보기` : "상세 보기");
      if (title) title.textContent = name;
      const official = btn.dataset.address || campusOfficialAddress(name);
      if (meta) meta.textContent = official || region || "";
      showRoadviewAt(btn);
      loadKakaoMaps()
        .then((kakao) => {
          const geocoder = new kakao.maps.services.Geocoder();
          resolveCampusPlace(geocoder, name, (place) => {
            if (currentName !== name) return;
            if (meta) meta.textContent = place.address || official || region || "";
            if (Number.isFinite(place.lat) && Number.isFinite(place.lng)) {
              btn.dataset.lat = String(place.lat);
              btn.dataset.lng = String(place.lng);
              showRoadviewAt(btn);
            }
          });
        })
        .catch(() => {});
    };

    items.forEach((btn) => {
      btn.addEventListener("click", () => {
        select(btn);
      });
    });

    if (view) {
      view.addEventListener("click", () => {
        openCampusUniversityDetail(currentName);
      });
    }

    let regionFilter = regionButtons.some((btn) => btn.dataset.campusRegion === "서울") ? "서울" : "";

    const applyFilter = () => {
      const q = (input?.value || "").trim().toLowerCase();
      let visible = 0;
      let firstVisible = null;
      items.forEach((btn) => {
        const name = (btn.dataset.name || "").toLowerCase();
        const regionOk = !regionFilter || (btn.dataset.region || "") === regionFilter;
        const keywordOk = !q || name.includes(q);
        const show = regionOk && keywordOk;
        btn.hidden = !show;
        if (show) {
          visible += 1;
          if (!firstVisible) firstVisible = btn;
        }
      });
      if (empty) empty.hidden = visible !== 0;
      if (layout) layout.hidden = visible === 0;
      const chosen =
        items.find((btn) => btn.classList.contains("is-active") && !btn.hidden) || firstVisible;
      if (chosen) select(chosen);
      else {
        pendingBtn = null;
        setMiss("", false);
      }
    };

    regionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.campusRegion || "";
        regionFilter = regionFilter === next ? "" : next;
        regionButtons.forEach((item) => {
          const on = Boolean(regionFilter) && item.dataset.campusRegion === regionFilter;
          item.classList.toggle("is-active", on);
          item.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFilter();
      });
    });

    if (input) input.addEventListener("input", applyFilter);
    applyFilter();

    root._campusRoadviewShowPending = () => {
      refreshRoadview();
      if (pendingBtn) showRoadviewAt(pendingBtn);
    };
  }

  function render(key) {
    const guide = guides[key];
    const panel = document.querySelector(`[data-guide="${key}"]`);
    if (!guide || !panel || mounted.has(key)) return;
    mounted.add(key);

    const chapterOf = (id) => guide.nav.findIndex((item) => item.href === `#${id}`) + 1;

    const numbered = guide.numberNav !== false;
    const nav = guide.nav
      .map((item, index) => {
        const id = item.href.replace("#", "");
        const selected = index === 0 ? "true" : "false";
        const active = index === 0 ? " is-active" : "";
        const label = numbered ? `${index + 1}. ${item.label}` : item.label;
        return `<button type="button" class="section-tab${active}" role="tab" data-section="${id}" aria-selected="${selected}" aria-controls="${id}">${label}</button>`;
      })
      .join("");

    const searchInBlock = guide.search === "university";
    const blocks = guide.blocks
      .map((block) => {
        const chapter = chapterOf(block.id);
        const slices = block.slices ? ' data-slices="1"' : "";
        let inner = `<div class="book-stack">${pageMounts(block.pages)}</div>`;
        if (block.id === "university-info") inner = admitSearchHtml("university");
        else if (block.id === "university-map") inner = campusMapHtml();
        else if (block.id === "university-roadview") inner = campusRoadviewHtml();
        return `<section class="guide-block" id="${block.id}" data-chapter="${chapter || ""}"${slices}>
          ${inner}
        </section>`;
      })
      .join("");

    const sectionNav = guide.nav.length
      ? `<div class="section-nav" role="tablist" aria-label="${guide.title} 안의 항목"${guide.hideSectionNav ? " hidden" : ""}>${nav}</div>`
      : "";
    const search = guide.search && !searchInBlock ? admitSearchHtml(guide.search) : "";

    panel.innerHTML = `<h1>${guide.title}</h1>
      ${sectionNav}
      ${search}
      ${blocks}`;

    if (guide.search) bindAdmitSearch(panel);
    const campusMap = panel.querySelector("[data-campus-map]");
    if (campusMap) bindCampusMap(campusMap);
    const roadview = panel.querySelector("[data-campus-roadview]");
    if (roadview) bindCampusRoadview(roadview);

    panel.querySelectorAll(".guide-block").forEach((block) => {
      const mount = block.querySelector(".info-mount");
      if (!mount) return;
      const pages = JSON.parse(decodeURIComponent(mount.dataset.pages));
      if (!pages.length) {
        mount.replaceChildren();
        return;
      }
      WebInfo.mount(mount, pages);
      if (block.dataset.slices) installSlices(block);
    });
    if (guide.nav[0]) {
      activate(panel, guide.nav[0].href.replace("#", ""), false);
    } else if (guide.search) {
      applyAdmitFilters(panel);
    }
  }

  function sliceKey(node) {
    if (!node.classList || !node.classList.contains("title-3")) return null;
    const raw = (node.textContent || "").replace(/\s+/g, " ").trim();
    const matched = raw.match(/^(\d+)\s*[-–]\s*(\d+)\s*[.)]?\s*(.*)$/);
    if (!matched) return null;
    const title = matched[3].trim();
    return {
      id: `${matched[1]}-${matched[2]}`,
      label: title || `${matched[1]}-${matched[2]}`,
    };
  }

  function installSlices(block) {
    const flow = block.querySelector(".book-flow");
    if (!flow) return;
    const order = [];
    const labels = new Map();
    let current = "";

    [...flow.querySelectorAll(".book-sheet")].forEach((sheet) => {
      const root = sheet.shadowRoot;
      const page = root && root.querySelector(".page");
      if (!page) return;
      if (!root.querySelector("style[data-slice-style]")) {
        const style = document.createElement("style");
        style.dataset.sliceStyle = "1";
        style.textContent = `
          .page.is-slice-view {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
          }
          .page.is-slice-view > .is-slice-off {
            display: none !important;
            margin: 0 !important;
          }
          .page.is-slice-view > .title-3:not(.is-slice-off) {
            font-size: 17px !important;
            line-height: 1.4 !important;
            font-weight: 600 !important;
          }
        `;
        root.appendChild(style);
      }
      page.classList.add("is-slice-view");
      [...page.children].forEach((child) => {
        const found = sliceKey(child);
        if (found) {
          current = found.id;
          if (found.id === "2-1") child.classList.add("is-slice-lead");
          if (!labels.has(current)) {
            labels.set(current, found.label);
            order.push(current);
          }
        }
        child.dataset.slice = current;
      });
    });

    if (!order.length) return;

    const nav = document.createElement("div");
    nav.className = "slice-nav";
    nav.setAttribute("role", "tablist");
    nav.setAttribute("aria-label", "2022 개정 학생부 구성 항목");
    order.forEach((id, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "slice-tab" + (index === 0 ? " is-active" : "");
      button.setAttribute("role", "tab");
      button.dataset.slice = id;
      button.setAttribute("aria-selected", index === 0 ? "true" : "false");
      button.textContent = labels.get(id);
      nav.appendChild(button);
    });
    const stack = block.querySelector(".book-stack");
    if (stack) stack.before(nav);

    /* 보이는 블록만: 위 0 / 아래 18px / 마지막 0 — 상하 이중 여백 금지 */
    const applySliceSpacing = (page) => {
      const visible = [...page.children].filter(
        (el) => el.nodeType === 1 && !el.classList.contains("is-slice-off") && el.tagName !== "STYLE"
      );
      visible.forEach((el, index) => {
        el.style.removeProperty("margin");
        el.style.removeProperty("margin-top");
        el.style.removeProperty("margin-bottom");
        el.style.setProperty("margin-top", "0px", "important");
        el.style.setProperty(
          "margin-bottom",
          index === visible.length - 1 ? "0px" : "18px",
          "important"
        );
        if (el.classList.contains("table-scroll")) {
          el.querySelectorAll(":scope > table").forEach((table) => {
            table.style.setProperty("margin-top", "0px", "important");
            table.style.setProperty("margin-bottom", "0px", "important");
          });
        }
      });
    };

    const show = (id) => {
      nav.querySelectorAll(".slice-tab").forEach((button) => {
        const on = button.dataset.slice === id;
        button.classList.toggle("is-active", on);
        button.setAttribute("aria-selected", on ? "true" : "false");
      });
      [...flow.querySelectorAll(".book-sheet")].forEach((sheet) => {
        const page = sheet.shadowRoot && sheet.shadowRoot.querySelector(".page");
        if (!page) return;
        let any = false;
        [...page.children].forEach((child) => {
          const on = child.dataset.slice === id;
          child.classList.toggle("is-slice-off", !on);
          if (on) any = true;
        });
        sheet.classList.toggle("is-slice-off", !any);
        if (any) applySliceSpacing(page);
      });
    };

    show(order[0]);
    block.resetSlices = () => show(order[0]);
    nav.addEventListener("click", (event) => {
      const button = event.target.closest(".slice-tab");
      if (!button || !nav.contains(button)) return;
      show(button.dataset.slice);
      const main = block.closest(".main");
      if (main) main.scrollTop = 0;
    });
  }

  function activate(panel, id, scroll) {
    const buttons = [...panel.querySelectorAll(".section-tab")];
    const known = new Set(buttons.map((button) => button.dataset.section));
    /* 섹션 탭이 없으면 필터만 적용 */
    if (!buttons.length) {
      applyAdmitFilters(panel);
      const key = panel.dataset.guide;
      if (key && typeof window.syncGuideHash === "function") {
        window.syncGuideHash(key, "");
      }
      if (scroll) {
        const main = panel.closest(".main") || document.querySelector(".main");
        if (main) main.scrollTop = 0;
      }
      return;
    }
    const first = buttons[0]?.dataset.section;
    if (!known.has(id)) id = first || "";
    if (!id) return;
    buttons.forEach((button) => {
      const on = button.dataset.section === id;
      button.classList.toggle("is-active", on);
      button.setAttribute("aria-selected", on ? "true" : "false");
    });
    panel.querySelectorAll(".guide-block").forEach((block) => {
      const linked = known.has(block.id);
      const on = linked ? block.id === id : id === first;
      block.hidden = !on;
      if (on && typeof block.resetSlices === "function") block.resetSlices();
    });
    applyAdmitFilters(panel, id);
    const key = panel.dataset.guide;
    if (key && typeof window.syncGuideHash === "function") {
      window.syncGuideHash(key, id);
    }
    if (id === "university-map") {
      const mapRoot = panel.querySelector("[data-campus-map]");
      const refresh = mapRoot && mapRoot._campusMapRefresh;
      if (typeof refresh === "function") {
        requestAnimationFrame(refresh);
        setTimeout(refresh, 160);
      } else if (mapRoot && mapRoot._campusMap) {
        requestAnimationFrame(() => mapRoot._campusMap.relayout());
        setTimeout(() => mapRoot._campusMap.relayout(), 160);
      }
    }
    if (id === "university-roadview") {
      const roadRoot = panel.querySelector("[data-campus-roadview]");
      const refresh = roadRoot && (roadRoot._campusRoadviewShowPending || roadRoot._campusRoadviewRefresh);
      if (typeof refresh === "function") {
        requestAnimationFrame(refresh);
        setTimeout(refresh, 160);
      }
    }
    if (!scroll) return;
    const main = panel.closest(".main") || document.querySelector(".main");
    if (main) main.scrollTop = 0;
  }

  function open(key, targetId) {
    render(key);
    const panel = document.querySelector(`[data-guide="${key}"]`);
    const guide = guides[key];
    if (!panel || !guide) return;
    const first = guide.nav[0] && guide.nav[0].href.replace("#", "");
    activate(panel, targetId || first || "", true);
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".admit-select")) closeAllAdmitSelects();
    const button = event.target.closest(".section-tab");
    if (!button) return;
    const panel = button.closest(".panel");
    if (!panel) return;
    activate(panel, button.dataset.section, true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAdmitDetailModal();
      closeAllAdmitSelects();
      closeGradeMethodExample();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target.closest(".admit-grade-method-pop") ||
      event.target.closest("[data-grade-method-example]")
    ) {
      return;
    }
    closeGradeMethodExample();
  });

  return { open, guides, enhanceAdmitSelects };
})();
