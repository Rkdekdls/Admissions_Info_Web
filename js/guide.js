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
      title: "대학",
      numberNav: false,
      search: "university",
      nav: [],
      blocks: [],
    },
  };

  const mounted = new Set();

  function pageMounts(pages) {
    return `<div class="info-mount" data-pages="${encodeURIComponent(JSON.stringify(pages))}"></div>`;
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
      <option value="gangwon">강원</option>
      <option value="gyeonggi">경기</option>
      <option value="gyeongnam">경남</option>
      <option value="gyeongbuk">경북</option>
      <option value="gwangju">광주</option>
      <option value="daegu">대구</option>
      <option value="daejeon">대전</option>
      <option value="busan">부산</option>
      <option value="seoul">서울</option>
      <option value="ulsan">울산</option>
      <option value="incheon">인천</option>
      <option value="jeonnam">전남</option>
      <option value="jeonbuk">전북</option>
      <option value="jeju">제주</option>
      <option value="chungnam">충남</option>
      <option value="chungbuk">충북</option>
    </select>`;

    if (type === "university") {
      /* 2024 대학알리미 기준(입시톡 정리) — 정원내 입학정원·경쟁률·충원율 */
      const uniRows = [
        ["한국외국어대학교(서울)", "서울", "사립", "3,490명", "13.1:1", "99.8%"],
        ["연세대학교(서울)", "서울", "사립", "3,495명", "10.9:1", "99.5%"],
        ["고려대학교(서울)", "서울", "사립", "3,992명", "9.8:1", "99.7%"],
        ["성균관대학교(수원)", "경기", "사립", "3,447명", "21.2:1", "99.4%"],
        ["한양대학교(서울)", "서울", "사립", "2,906명", "19.3:1", "99.9%"],
        ["서강대학교", "서울", "사립", "1,602명", "20.3:1", "99.1%"],
        ["중앙대학교(서울)", "서울", "사립", "3,210명", "26.3:1", "99.9%"],
        ["경희대학교(서울)", "서울", "사립", "4,840명", "15.9:1", "99.9%"],
        ["이화여자대학교", "서울", "사립", "3,197명", "10.1:1", "99.7%"],
        ["홍익대학교(서울)", "서울", "사립", "2,421명", "18.0:1", "100.0%"],
        ["건국대학교(서울)", "서울", "사립", "3,000명", "19.9:1", "100.0%"],
        ["동국대학교(서울)", "서울", "사립", "2,823명", "18.1:1", "99.9%"],
        ["인하대학교", "인천", "사립", "3,444명", "15.0:1", "100.0%"],
        ["부산대학교", "부산", "국립", "4,311명", "8.6:1", "99.7%"],
        ["연세대학교(미래)", "강원", "사립", "1,409명", "10.3:1", "100.0%"],
      ]
        .map(([name, region, founding, quota, rate, fill], index, list) => {
          const classes = [];
          if (index % 2 === 1) classes.push("is-alt");
          if (index === list.length - 1) classes.push("is-last-visible");
          const cls = classes.length ? ` class="${classes.join(" ")}"` : "";
          return `<tr data-uni-row data-year="2024"${cls}>
              <td class="admit-data-name">${name}</td>
              <td>${region}</td>
              <td>${founding}</td>
              <td>${quota}</td>
              <td>${formatAdmitRate(rate)}</td>
              <td>${fill}</td>
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
            <input type="search" name="keyword" placeholder="대학 검색" aria-label="대학 검색">
          </label>
          ${regionSelect}
          <select class="admit-search-select" name="year" aria-label="연도">
            <option value="">연도 전체</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select class="admit-search-select" name="founding" aria-label="설립유형">
            <option value="">설립유형 전체</option>
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
                <th style="padding: 3mm 2mm !important; height: 12mm !important;">설립유형</th>
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
        <select class="admit-search-select" name="area" aria-label="반영영역">
          <option value="">반영영역 전체</option>
          ${areaOptions}
        </select>
        <select class="admit-search-select" name="inquiry" aria-label="탐구반영">
          <option value="">탐구반영 전체</option>
          <option value="1">1과목</option>
          <option value="2">2과목</option>
        </select>`
        : `${regionSelect}
        ${trackSelect}
        <select class="admit-search-select" name="minimum" aria-label="수능최저">
          <option value="">수능최저 전체</option>
          <option value="yes">수능최저 적용</option>
          <option value="no">수능최저 미적용</option>
        </select>`;

    const detailBody = `<div class="admit-theme-head">
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
          <input type="search" name="keyword" placeholder="대학·모집단위 검색" aria-label="대학·모집단위 검색">
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
    /* 대학명·지역·계열·모집단위는 수시와 동일 / 군·전형·인원·경쟁률 등은 2025 정시 실데이터 */
    return [
      {
        univ: "한국외국어대학교(서울)",
        region: "서울",
        track: "인문",
        group: "다군",
        groupKey: "da",
        typeName: "일반전형(수능)",
        unit: "경영학부",
        quota: "53명",
        rate: "12.38",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "268.50",
      },
      {
        univ: "연세대학교(서울)",
        region: "서울",
        track: "인문",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "경영학과",
        quota: "166명",
        rate: "3.58",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "292.80",
      },
      {
        univ: "연세대학교(서울)",
        region: "서울",
        track: "인문",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "국어국문학과",
        quota: "28명",
        rate: "4.12",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "268.40",
      },
      {
        univ: "고려대학교(서울)",
        region: "서울",
        track: "인문",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "경제학과",
        quota: "34명",
        rate: "2.88",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "290.10",
      },
      {
        univ: "고려대학교(서울)",
        region: "서울",
        track: "인문",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "사회학과",
        quota: "22명",
        rate: "5.41",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "255.70",
      },
      {
        univ: "성균관대학교(수원)",
        region: "경기",
        track: "자연",
        group: "나군",
        groupKey: "na",
        typeName: "일반전형(수능)",
        unit: "소프트웨어학과",
        quota: "28명",
        rate: "6.64",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "278.50",
      },
      {
        univ: "한양대학교(서울)",
        region: "서울",
        track: "자연",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "기계공학부",
        quota: "65명",
        rate: "3.20",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "276.20",
      },
      {
        univ: "한양대학교(서울)",
        region: "서울",
        track: "자연",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "건축학부",
        quota: "30명",
        rate: "4.15",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "259.80",
      },
      {
        univ: "서강대학교",
        region: "서울",
        track: "인문",
        group: "나군",
        groupKey: "na",
        typeName: "일반전형(수능)",
        unit: "커뮤니케이션학부",
        quota: "23명",
        rate: "5.09",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "284.60",
      },
      {
        univ: "서강대학교",
        region: "서울",
        track: "인문",
        group: "나군",
        groupKey: "na",
        typeName: "일반전형(수능)",
        unit: "철학과",
        quota: "12명",
        rate: "6.33",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "248.20",
      },
      {
        univ: "중앙대학교(서울)",
        region: "서울",
        track: "인문",
        group: "다군",
        groupKey: "da",
        typeName: "일반전형(수능)",
        unit: "경영학부",
        quota: "210명",
        rate: "14.59",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "272.30",
      },
      {
        univ: "경희대학교(서울)",
        region: "서울",
        track: "공통",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "호텔관광대학",
        quota: "42명",
        rate: "3.62",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "268.90",
      },
      {
        univ: "이화여자대학교",
        region: "서울",
        track: "인문",
        group: "나군",
        groupKey: "na",
        typeName: "일반전형(수능)",
        unit: "심리학과",
        quota: "188명",
        rate: "2.94",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "281.70",
      },
      {
        univ: "이화여자대학교",
        region: "서울",
        track: "인문",
        group: "나군",
        groupKey: "na",
        typeName: "일반전형(수능)",
        unit: "영어영문학과",
        quota: "40명",
        rate: "3.85",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "264.30",
      },
      {
        univ: "홍익대학교(서울)",
        region: "서울",
        track: "인문",
        group: "다군",
        groupKey: "da",
        typeName: "일반전형(수능)",
        unit: "경영학부",
        quota: "121명",
        rate: "13.84",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "265.40",
      },
      {
        univ: "건국대학교(서울)",
        region: "서울",
        track: "자연",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "수의예과",
        quota: "39명",
        rate: "6.00",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "288.20",
      },
      {
        univ: "동국대학교(서울)",
        region: "서울",
        track: "인문",
        group: "다군",
        groupKey: "da",
        typeName: "일반전형(수능)",
        unit: "경찰행정학부",
        quota: "23명",
        rate: "8.61",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "270.50",
      },
      {
        univ: "인하대학교",
        region: "인천",
        track: "자연",
        group: "나군",
        groupKey: "na",
        typeName: "일반전형(수능)",
        unit: "항공우주공학과",
        quota: "6명",
        rate: "6.50",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "262.10",
      },
      {
        univ: "부산대학교",
        region: "부산",
        track: "공통",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "간호학과",
        quota: "25명",
        rate: "2.76",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "258.80",
      },
      {
        univ: "연세대학교(미래)",
        region: "강원",
        track: "인문",
        group: "가군",
        groupKey: "ga",
        typeName: "일반전형(수능)",
        unit: "보건행정학과",
        quota: "9명",
        rate: "5.33",
        method: "수능 100%",
        area: "국·수·영·탐",
        areaKey: "area-0",
        inquiry: "2",
        score: "245.60",
      },
    ];
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

    /* Y축은 스크롤 밖 고정, 플롯만 가로 스크롤
       칸 간격은 PC 기준 고정(화면 너비에 따라 줄이지 않음) → 태블릿·모바일도 동일 크기 + 스크롤 */
    const yAxisW = 48;
    const pad = { top: 16, right: 12, bottom: 44, left: 8 };
    const plotH = 280;
    const colW = 84;
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
        return `<text class="admit-jeongsi-y" x="${yAxisW - 10}" y="${y + 4}" text-anchor="end">${v}</text>`;
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
        return `<g class="admit-jeongsi-mark ${cls}">
          ${mark}
          <text class="admit-jeongsi-x" x="${x}" y="${pad.top + plotH + 26}" text-anchor="middle">${item.label}</text>
        </g>`;
      })
      .join("");

    body.innerHTML = `<div class="admit-jeongsi-chart-frame">
        <div class="admit-jeongsi-y-stick" aria-hidden="true">
          <svg class="admit-jeongsi-y-svg" width="${yAxisW}" height="${height}" viewBox="0 0 ${yAxisW} ${height}" preserveAspectRatio="xMinYMid meet">
            ${yLabels}
          </svg>
        </div>
        <div class="admit-jeongsi-chart-scroll">
          <svg class="admit-jeongsi-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMinYMid meet" role="img" aria-label="대학별 백분위 평균 분포">
            ${hGrid}
            ${marks}
          </svg>
        </div>
      </div>`;
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
        return `<tr data-jeongsi-row data-region="${regionKey}" data-track="${trackKey}" data-group="${item.groupKey}" data-area="${item.areaKey}" data-inquiry="${item.inquiry}" data-quota="${item.quota}" data-rate="${item.rate}" data-score="${item.score}" data-percentile="${Number.isFinite(percentile) ? percentile.toFixed(2) : ""}"${cls}>
            <td class="admit-data-name">${item.univ}</td>
            <td>${item.region}</td>
            <td>${item.track}</td>
            <td>${item.group}</td>
            <td>${item.typeName}</td>
            <td>${item.unit}</td>
            <td>${item.quota}</td>
            <td>${formatAdmitRate(item.rate)}</td>
            <td>${item.method}</td>
            <td>${item.area}</td>
            <td>${item.inquiry}과목</td>
            <td class="admit-highlight-score admit-jeongsi-score">${formatJeongsiScore(item.score, item.area, item.inquiry)}</td>
            <td class="admit-highlight-score">${formatJeongsiPercentile(item.score, item.area, item.inquiry)}</td>
            <td><button type="button" class="admit-data-view is-unlinked" aria-disabled="true" title="준비 중">보기</button></td>
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
            ${th("반영영역")}
            ${th("탐구반영")}
            ${th("지원가능 점수")}
            ${th("백분위 평균")}
            ${th("상세")}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }

  function susiUnitTableHtml() {
    /* 대학명·지역·계열·모집단위 고정 / 전형명은 대학별 실제 전형명 / 수치는 2025 수시 실데이터 기준 */
    const units = [
      {
        univ: "한국외국어대학교(서울)",
        region: "서울",
        track: "인문",
        unit: "경영학부",
        교과명: "학생부교과(고교추천)",
        종합명: "학생부종합(면접형)",
        논술명: "논술전형",
        교과: ["11명", "11.36", "학생부 100%", "1.80", "적용"],
        종합: ["15명", "11.53", "[1단계] 서류 100% / [2단계] 면접 100%", "미적용"],
        논술: ["31명", "74.58", "논술 100%", "적용"],
      },
      {
        univ: "연세대학교(서울)",
        region: "서울",
        track: "인문",
        unit: "경영학과",
        교과명: "추천형",
        종합명: "활동우수형",
        논술명: "논술전형",
        교과: ["45명", "5.53", "학생부 100%", "1.40", "적용"],
        종합: ["47명", "7.87", "[1단계] 서류 100% / [2단계] 서류 60% + 면접 40%", "적용"],
        논술: ["15명", "105.73", "논술 100%", "미적용"],
      },
      {
        univ: "고려대학교(서울)",
        region: "서울",
        track: "인문",
        unit: "경제학과",
        교과명: "학교추천",
        종합명: "학업우수전형",
        논술명: "논술전형",
        교과: ["21명", "6.10", "교과 80% + 서류 20%", "1.52", "적용"],
        종합: ["25명", "10.48", "서류 100%", "적용"],
        논술: ["13명", "81.85", "논술 100%", "적용"],
      },
      {
        univ: "성균관대학교(수원)",
        region: "경기",
        track: "자연",
        unit: "소프트웨어학과",
        교과명: "학교장추천",
        종합명: "학과모집",
        논술명: "논술우수",
        교과: ["10명", "13.10", "학생부 100%", "1.55", "적용"],
        종합: ["28명", "17.29", "서류 100%", "미적용"],
        논술: ["10명", "83.70", "논술 100%", "적용"],
      },
      {
        univ: "한양대학교(서울)",
        region: "서울",
        track: "자연",
        unit: "기계공학부",
        교과명: "지역균형발전",
        종합명: "일반(종합평가)",
        논술명: "논술",
        교과: ["17명", "14.10", "학생부 100%", "1.49", "미적용"],
        종합: ["29명", "18.90", "서류 100%", "미적용"],
        논술: ["9명", "112.40", "논술 100%", "미적용"],
      },
      {
        univ: "서강대학교",
        region: "서울",
        track: "인문",
        unit: "커뮤니케이션학부",
        교과명: "고교장추천",
        종합명: "일반전형",
        논술명: "논술",
        교과: ["10명", "16.30", "학생부 100%", "1.53", "적용"],
        종합: ["18명", "8.94", "서류 100%", "미적용"],
        논술: ["12명", "100.80", "논술 100%", "적용"],
      },
      {
        univ: "중앙대학교(서울)",
        region: "서울",
        track: "인문",
        unit: "경영학부",
        교과명: "지역균형",
        종합명: "다빈치형인재",
        논술명: "논술",
        교과: ["46명", "10.00", "학생부 100%", "1.80", "적용"],
        종합: ["22명", "19.30", "서류 100%", "미적용"],
        논술: ["54명", "55.57", "논술 100%", "적용"],
      },
      {
        univ: "경희대학교(서울)",
        region: "서울",
        track: "공통",
        unit: "호텔관광대학",
        교과명: "지역균형",
        종합명: "네오르네상스",
        논술명: "논술우수자",
        교과: ["13명", "6.50", "학생부 70% + 교과종합평가 30%", "2.04", "적용"],
        종합: ["28명", "11.80", "[1단계] 서류 100% / [2단계] 1단계 70% + 면접 30%", "미적용"],
        논술: ["6명", "61.71", "논술 100%", "적용"],
      },
      {
        univ: "이화여자대학교",
        region: "서울",
        track: "인문",
        unit: "심리학과",
        교과명: "고교추천",
        종합명: "미래인재",
        논술명: "논술",
        교과: ["11명", "4.64", "학생부 100%", "1.92", "적용"],
        종합: ["12명", "6.33", "[1단계] 서류 100% / [2단계] 면접 100%", "적용"],
        논술: ["6명", "29.00", "논술 100%", "적용"],
      },
      {
        univ: "홍익대학교(서울)",
        region: "서울",
        track: "인문",
        unit: "경영학부",
        교과명: "학교장추천자",
        종합명: "학교생활우수자",
        논술명: "논술",
        교과: ["37명", "8.78", "학생부 100%", "2.04", "적용"],
        종합: ["58명", "14.97", "서류 100%", "적용"],
        논술: ["48명", "49.31", "논술 90% + 학생부교과 10%", "적용"],
      },
      {
        univ: "건국대학교(서울)",
        region: "서울",
        track: "자연",
        unit: "수의예과",
        교과명: "KU지역균형",
        종합명: "KU자기추천",
        논술명: "KU논술우수자",
        교과: ["5명", "16.60", "학생부 100%", "1.35", "적용"],
        종합: ["16명", "35.75", "서류 100%", "미적용"],
        논술: ["6명", "272.50", "논술 100%", "적용"],
      },
      {
        univ: "동국대학교(서울)",
        region: "서울",
        track: "인문",
        unit: "경찰행정학부",
        교과명: "학교장추천",
        종합명: "Do Dream",
        논술명: "논술",
        교과: ["6명", "14.67", "학생부 100%", "1.87", "적용"],
        종합: ["8명", "25.88", "서류 100%", "미적용"],
        논술: ["15명", "48.80", "논술 100%", "적용"],
      },
      {
        univ: "인하대학교",
        region: "인천",
        track: "자연",
        unit: "항공우주공학과",
        교과명: "지역균형",
        종합명: "인하미래인재",
        논술명: "논술우수자",
        교과: ["12명", "9.70", "학생부 100%", "2.30", "적용"],
        종합: ["19명", "13.50", "[1단계] 서류 100% / [2단계] 면접 100%", "미적용"],
        논술: ["9명", "30.40", "논술 100%", "적용"],
      },
      {
        univ: "부산대학교",
        region: "부산",
        track: "공통",
        unit: "간호학과",
        교과명: "학생부교과",
        종합명: "학생부종합",
        논술명: "논술",
        교과: ["10명", "8.40", "학생부 100%", "2.08", "적용"],
        종합: ["10명", "12.80", "[1단계] 서류 100% / [2단계] 면접 100%", "적용"],
        논술: ["8명", "17.25", "논술 100%", "적용"],
      },
      {
        univ: "연세대학교(미래)",
        region: "강원",
        track: "인문",
        unit: "보건행정학과",
        교과명: "교과우수자",
        종합명: "종합면접",
        논술명: "논술우수자",
        교과: ["9명", "9.56", "학생부 100%", "2.80", "적용"],
        종합: ["5명", "5.40", "[1단계] 서류 100% / [2단계] 1단계 70% + 면접 30%", "미적용"],
        논술: ["5명", "3.40", "논술 100%", "적용"],
      },
    ];

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
          return `<tr data-susi-type="${typeKey}"${cls}${typeKey === "교과" ? "" : " hidden"}>
            <td class="admit-data-name">${item.univ}</td>
            <td>${item.region}</td>
            <td>${item.track}</td>
            <td>${typeName}</td>
            <td>${item.unit}</td>
            <td>${stats[0]}</td>
            <td>${formatAdmitRate(stats[1])}</td>
            <td>${stats[2]}</td>
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
            ${th("지원가능 등급", ' data-susi-grade-col')}
            ${th("수능최저")}
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

  function formatAdmitRate(value) {
    if (value == null || value === "" || value === "—") return "—";
    const n = parseAdmitNumber(value);
    return Number.isFinite(n) ? `${n.toFixed(2)}:1` : "—";
  }

  function formatAdmitGrade(value) {
    if (value == null || value === "" || value === "—") return "—";
    const n = parseFloat(String(value).trim());
    return Number.isFinite(n) ? n.toFixed(2) : "—";
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
    if (!Number.isFinite(n) || !max) return "—";
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
    return Number.isFinite(pct) ? `${pct.toFixed(2)} / 100` : "—";
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

    rows.forEach((row) => {
      const name = row.cells[0]?.textContent.trim() || "";
      const region = row.cells[1]?.textContent.trim() || "";
      const founding = row.cells[2]?.textContent.trim() || "";
      /* 공개 데이터는 2024 스냅샷 1종 — 연도 선택은 동일 목록 유지 */
      const yearOk = !yearVal || row.dataset.year === yearVal || row.dataset.year === "2024";
      const keywordOk = !keyword || name.toLowerCase().includes(keyword);
      const regionOk = !regionLabel || region === regionLabel;
      const foundingOk = !foundingLabel || founding === foundingLabel;
      row.hidden = !(yearOk && keywordOk && regionOk && foundingOk);
    });
    stripeVisibleRows(rows);
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
    }

    const keyword = (root.querySelector('input[name="keyword"]')?.value || "").trim().toLowerCase();
    const regionVal = root.querySelector('select[name="region"]')?.value || "";
    const trackVal = root.querySelector('select[name="track"]')?.value || "";
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
        grade: (row) => parseAdmitNumber(row.cells[8]?.textContent),
      })
    );
    [...ofType, ...others].forEach((row) => tbody.appendChild(row));

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
      const minimum = (row.cells[9]?.textContent || "").trim();
      const keywordOk =
        !keyword || univ.toLowerCase().includes(keyword) || unit.toLowerCase().includes(keyword);
      const regionOk = !regionLabel || region === regionLabel;
      const trackOk = !trackLabel || track === trackLabel;
      const minimumOk =
        !minimumVal ||
        (minimumVal === "yes" && minimum === "적용") ||
        (minimumVal === "no" && minimum === "미적용");
      row.hidden = !(keywordOk && regionOk && trackOk && minimumOk);
    });
    stripeVisibleRows(ofType);
  }

  function applyJeongsiTableFilters(root) {
    const table = root.querySelector("[data-jeongsi-unit-table]");
    if (!table) return;
    const tbody = table.tBodies[0];
    if (!tbody) return;
    const keyword = (root.querySelector('input[name="keyword"]')?.value || "").trim().toLowerCase();
    const regionVal = root.querySelector('select[name="region"]')?.value || "";
    const trackVal = root.querySelector('select[name="track"]')?.value || "";
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
        score: (row) => parseAdmitNumber(row.dataset.score || row.cells[11]?.textContent),
        percentile: (row) => parseAdmitNumber(row.dataset.percentile || row.cells[12]?.textContent),
      })
    );
    rows.forEach((row) => tbody.appendChild(row));

    rows.forEach((row) => {
      const univ = row.cells[0]?.textContent.trim() || "";
      const unit = row.cells[5]?.textContent.trim() || "";
      const keywordOk =
        !keyword || univ.toLowerCase().includes(keyword) || unit.toLowerCase().includes(keyword);
      const regionOk = !regionVal || row.dataset.region === regionVal;
      const trackOk = !trackVal || row.dataset.track === trackVal;
      const groupOk = !groupVal || row.dataset.group === groupVal;
      const areaOk = !areaVal || row.dataset.area === areaVal;
      const inquiryOk = !inquiryVal || row.dataset.inquiry === inquiryVal;
      row.hidden = !(keywordOk && regionOk && trackOk && groupOk && areaOk && inquiryOk);
    });
    stripeVisibleRows(rows);
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
    if (raw == null || raw === "" || raw === "-") return "-";
    const n = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(n)) return String(raw);
    return `${n.toFixed(2)}:1`;
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

  /* 전형방법 문구 → 학생부/면접/논술 등 칸에 매핑 (표 데이터만) */
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
      const value = pct ? `${pct[1]}%` : part;
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
      scores.총점 = "100%";
    } else if (parts.length === 1 && /100\s*%/.test(parts[0])) {
      scores.선발비율 = "100%";
      scores.총점 = "100%";
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
  const RECORD_RATIO_ROWS = ["교과", "출결", "자격증", "활동", "봉사", "기타"];
  const GRADE_RATIO_ROWS = ["1학년", "2학년", "3학년", "1·2학년", "2·3학년", "1·3학년", "1·2·3학년"];
  const SCHEDULE_COLS = ["접수일정", "합격발표", "면접일정", "논술일정", "실기일정", "적성일정", "기타일정"];

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
            <button type="button" class="admit-detail-tab" role="tab" aria-selected="false" data-admit-detail-tab="result">입시결과</button>
            <button type="button" class="admit-detail-tab" role="tab" aria-selected="false" data-admit-detail-tab="materials" hidden>종합자료</button>
          </div>
          <div class="admit-detail-body">
            <div class="admit-detail-panel" data-admit-detail-panel="info"></div>
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
      });
    }

    /* 이전 세션 모달에 종합자료 탭이 없으면 보강 */
    const tabs = root.querySelector(".admit-detail-tabs");
    const body = root.querySelector(".admit-detail-body");
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
    const resultTab = root.querySelector('[data-admit-detail-tab="result"]');
    const materialsTab = root.querySelector('[data-admit-detail-tab="materials"]');
    if (mode === "university") {
      if (infoTab) {
        infoTab.textContent = "신입생 현황";
        infoTab.hidden = false;
        infoTab.classList.add("is-active");
        infoTab.setAttribute("aria-selected", "true");
      }
      if (resultTab) {
        resultTab.textContent = "대학발표 자료";
        resultTab.hidden = false;
        resultTab.classList.remove("is-active");
        resultTab.setAttribute("aria-selected", "false");
      }
      if (materialsTab) materialsTab.hidden = true;
    } else {
      if (infoTab) {
        infoTab.textContent = "모집정보";
        infoTab.hidden = false;
      }
      if (resultTab) {
        resultTab.textContent = "입시결과";
        resultTab.hidden = false;
      }
      /* materials는 openSusiAdmitDetail에서 종합일 때만 표시 */
    }
  }

  function parseAdmitStatNumber(value) {
    const n = Number(String(value || "").replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function formatAdmitCount(n) {
    return `${Math.round(n).toLocaleString("ko-KR")}명`;
  }

  function buildUniRateChart(points) {
    /* 전체 폭 840 유지 · Y축은 스크롤 밖 고정, 플롯만 좌우 스크롤 */
    const yAxisW = 44;
    const plotOuterW = 840 - yAxisW;
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
        return `<line x1="${pad.l}" y1="${y}" x2="${plotOuterW - pad.r}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
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
        return `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#1a4796" stroke-width="2"/>
          <text x="${(x - 4).toFixed(1)}" y="${y - 12}" text-anchor="middle" fill="#1a4796" font-size="13" font-weight="${
          last ? "700" : "600"
        }">${p.value}</text>
          <text x="${x}" y="${h - pad.b / 2}" text-anchor="middle" dominant-baseline="middle" fill="#6b7280" font-size="13">${p.year}</text>`;
      })
      .join("");
    return `<div class="admit-detail-uni-chart-frame">
      <div class="admit-detail-uni-chart-y" aria-hidden="true">
        <svg class="admit-detail-uni-chart-y-svg" width="${yAxisW}" height="${h}" viewBox="0 0 ${yAxisW} ${h}" preserveAspectRatio="xMinYMid meet">
          ${yLabels}
        </svg>
      </div>
      <div class="admit-detail-uni-chart-scroll">
        <svg class="admit-detail-uni-chart-svg" width="${plotOuterW}" height="${h}" viewBox="0 0 ${plotOuterW} ${h}" preserveAspectRatio="xMinYMid meet" role="img" aria-label="신입생 경쟁률 추이">
          ${grid}
          <path d="${line}" fill="none" stroke="#1a4796" stroke-width="2.2" stroke-linejoin="round"/>
          ${dots}
        </svg>
      </div>
    </div>`;
  }

  function openUniversityAdmitDetail(row) {
    if (!row) return;
    const cells = [...row.children];
    const textAt = (index) => (cells[index]?.textContent || "").replace(/\s+/g, " ").trim();
    const univ = textAt(0) || "대학";
    const uniExtra = (window.ADMIT_UNI_DETAIL && window.ADMIT_UNI_DETAIL[univ]) || null;
    const yearOrder = ["2024", "2025", "2026"];
    const latest = uniExtra?.years?.["2026"] || null;
    const quotaText = latest ? `${latest.quota.toLocaleString("ko-KR")}명` : textAt(3) || "-";
    const rateText = latest ? `${latest.rate}:1` : textAt(4) || "-";
    const fillText = latest ? `${latest.fill}%` : textAt(5) || "-";
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
        return [y, d.recruit, d.quota, d.applicants, d.enrolled, `${d.fill}%`, `${d.rate}:1`];
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
        ([label, a, b, c]) =>
          `<tr><th scope="row">${escapeHtml(label)}</th><td>${a}%</td><td>${b}%</td><td>${c}%</td></tr>`
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
    infoPanel.hidden = false;
    resultPanel.hidden = true;
    root.hidden = false;
    document.body.style.overflow = "hidden";
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
    const gradeTd = cells[8];
    const gradeVisible = gradeTd && !gradeTd.hidden && getComputedStyle(gradeTd).display !== "none";
    const grade = gradeVisible ? textAt(8) : "";
    const minimum = textAt(gradeVisible ? 9 : 8);

    const root = ensureAdmitDetailModal();
    const crumb = root.querySelector("#admit-detail-crumb");
    const tags = root.querySelector("[data-admit-detail-tags]");
    const infoPanel = root.querySelector('[data-admit-detail-panel="info"]');
    const resultPanel = root.querySelector('[data-admit-detail-panel="result"]');
    const materialsPanel = root.querySelector('[data-admit-detail-panel="materials"]');
    const materialsTab = root.querySelector('[data-admit-detail-tab="materials"]');
    const showMaterials = typeKey === "종합";

    crumb.innerHTML = `${escapeHtml(univ)}<span class="admit-detail-crumb-sep">›</span>${escapeHtml(unit)}`;
    /* 수시 팝업: 입학처 버튼 없음 */
    tags.innerHTML = `
      <span class="admit-detail-tag is-primary">수시</span>
      <span class="admit-detail-tag">${escapeHtml(typeKey)}</span>
      <span class="admit-detail-tag">${escapeHtml(typeName)}</span>`;
    setAdmitDetailTabMode(root, "susi");
    if (materialsTab) materialsTab.hidden = !showMaterials;

    const yearly = pickSusiYearly(univ, unit, typeKey);
    /* 연도별 수집값 채운 뒤, 목록 표에 있는 값은 기준연도에 그대로 덮어씀 */
    const quotaByYear = yearlyFieldMap(yearly, "quota", ADMIT_DETAIL_YEARS, quota || "-");
    const minByYear = yearlyFieldMap(yearly, "min", ADMIT_DETAIL_YEARS, minimum || "-");
    const methodByYear = yearlyFieldMap(yearly, "method", ADMIT_DETAIL_YEARS, method || "-");
    if (quota) quotaByYear[ADMIT_DETAIL_DATA_YEAR] = quota;
    if (minimum) minByYear[ADMIT_DETAIL_DATA_YEAR] = minimum;
    if (method) methodByYear[ADMIT_DETAIL_DATA_YEAR] = method;
    const rateByYearRaw = yearlyFieldMap(yearly, "rate", ADMIT_RESULT_YEARS, rate || "-");
    const rateByYear = {};
    ADMIT_RESULT_YEARS.forEach((y) => {
      if (y === ADMIT_DETAIL_DATA_YEAR && rate) {
        rateByYear[y] = /:/.test(rate) ? rate : formatRateCell(rate);
      } else {
        rateByYear[y] = formatRateCell(rateByYearRaw[y]);
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
      ["수능최저", minByYear],
      ["지원가능 졸업년도", gradByYear],
    ]
      .map(([label, value]) => `<tr><th scope="row">${escapeHtml(label)}</th>${yearCells(value)}</tr>`)
      .join("");

    /* —— 지원자격: 전형 유형별 공개 요강 공통 문구 —— */
    const eligDefaultYear = "2027";
    const eligByType = (window.ADMIT_SUSI_ELIG && window.ADMIT_SUSI_ELIG[typeKey]) || "-";
    const yearChips = ADMIT_DETAIL_YEARS.map(
      (year) =>
        `<button type="button" class="admit-detail-year-chip${
          year === eligDefaultYear ? " is-active" : ""
        }" data-admit-elig-year="${year}">${year}</button>`
    ).join("");

    /* —— 전형일정: 선택 연도(기본 2027) 요강 일정 —— */
    const scheduleMap = window.ADMIT_SUSI_SCHEDULE || {};
    const scheduleHead = `<tr>${SCHEDULE_COLS.map((col) => `<th scope="col">${col}</th>`).join("")}</tr>`;
    const scheduleRow = (year) => {
      const row = scheduleMap[year] || {};
      return SCHEDULE_COLS.map((col) => {
        if (typeKey === "논술" && col === "면접일정") return "-";
        if (typeKey !== "논술" && col === "논술일정") return "-";
        if (typeKey === "교과" && col === "면접일정") return "-";
        return row[col] || "-";
      });
    };
    const scheduleBody = `<tr>${scheduleRow(eligDefaultYear)
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

    /* —— 학생부 반영 세부: 전형 유형별 공통 패턴을 연도 컬럼 전체에 채움 —— */
    const recordDefaults =
      typeKey === "논술"
        ? { 교과: "10%", 출결: "-", 자격증: "-", 활동: "-", 봉사: "-", 기타: "-" }
        : { 교과: "100%", 출결: "-", 자격증: "-", 활동: "-", 봉사: "-", 기타: "-" };
    if (typeKey === "교과" && /교과종합|종합평가/.test(method)) {
      recordDefaults.교과 = "70%";
      recordDefaults.기타 = "30%";
    }
    const gradeRatioDefaults = {
      "1학년": "-",
      "2학년": "-",
      "3학년": "-",
      "1·2학년": "-",
      "2·3학년": "-",
      "1·3학년": "-",
      "1·2·3학년": "100%",
    };
    const recordRatioBody = RECORD_RATIO_ROWS.map((key, index) => {
      const group =
        index === 0
          ? `<th scope="row" rowspan="${RECORD_RATIO_ROWS.length}" class="admit-detail-th-stack">학생부<br>반영 비율</th>`
          : "";
      return `<tr>${group}<th scope="row" colspan="2">${escapeHtml(key)}</th>${yearCells(
        recordDefaults[key] || "-"
      )}</tr>`;
    }).join("");
    const gradeRatioBody = GRADE_RATIO_ROWS.map((key, index) => {
      if (index === 0) {
        return `<tr>
          <th scope="row" rowspan="${GRADE_RATIO_ROWS.length + 2}" class="admit-detail-th-stack">교과<br>반영 방법</th>
          <th scope="row" rowspan="${GRADE_RATIO_ROWS.length}" class="admit-detail-th-stack">학년<br>반영 비율</th>
          <th scope="row">${escapeHtml(key)}</th>
          ${yearCells(gradeRatioDefaults[key] || "-")}
        </tr>`;
      }
      return `<tr><th scope="row">${escapeHtml(key)}</th>${yearCells(gradeRatioDefaults[key] || "-")}</tr>`;
    }).join("");
    const recordExtraBody = `
      <tr><th scope="row" colspan="2">활용지표</th>${yearCells("석차등급")}</tr>
      <tr><th scope="row" colspan="2">반영교과</th>${yearCells(
        track === "자연" ? "국·수·영·과 전 과목" : "국·수·영·사 전 과목"
      )}</tr>`;

    infoPanel.innerHTML = `
      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">모집단위</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table">
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
      </section>

      <section class="admit-detail-section">
        <h3 class="admit-detail-section-title">학생부 반영 세부 정보</h3>
        <div class="admit-detail-table-wrap">
          <table class="admit-detail-table admit-detail-table-record">
            <colgroup>
              <col class="admit-detail-col-stack">
              <col class="admit-detail-col-stack">
              <col class="admit-detail-col-item">
              <col span="${ADMIT_DETAIL_YEARS.length}" class="admit-detail-col-year">
            </colgroup>
            <thead>${yearHeaderRow(3)}</thead>
            <tbody>
              ${recordRatioBody}
              ${gradeRatioBody}
              ${recordExtraBody}
            </tbody>
          </table>
        </div>
      </section>`;

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
          avgByYear[year] = Number.isFinite(n) ? (n + 0.15).toFixed(2) : g50 && g50 !== "-" ? g50 : "-";
        }
        midValueByYear[year] = g70 && g70 !== "-" ? g70 : "-";
        midLabelByYear[year] = g70 && g70 !== "-" ? "70컷" : "-";
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
              <tr><th scope="row">최저</th>${cutYearCells("-")}</tr>
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
      const slotCells = ADMIT_RESULT_TIME_SLOTS.map(() => `<td>-</td><td>-</td>`).join("");
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

    /* 종합자료: 종합 전형 상세에만 표시 */
    if (materialsPanel) {
      if (showMaterials) {
        const shortUniv = univ.replace(/\(.*?\)/g, "").trim();
        const materialsFiles = [
          {
            year: "2027",
            title: `2027학년도 ${shortUniv} 학생부종합전형 안내서.pdf`,
            date: "2026.05.27",
          },
        ];
        const yearOpts = ["학년도 전체", ...ADMIT_RESULT_YEARS]
          .map((y, i) => `<option value="${y === "학년도 전체" ? "all" : y}"${i === 0 ? " selected" : ""}>${y}</option>`)
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
              <h3 class="admit-detail-section-title">대학발표 종합 자료</h3>
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
      const on = btn.dataset.admitDetailTab === "info";
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    infoPanel.hidden = false;
    resultPanel.hidden = true;
    if (materialsPanel) materialsPanel.hidden = true;
    root.hidden = false;
    document.body.style.overflow = "hidden";
    root.querySelector("[data-admit-detail-close].admit-detail-close")?.focus();

    infoPanel.querySelectorAll("[data-admit-elig-year]").forEach((chip) => {
      chip.addEventListener("click", () => {
        infoPanel.querySelectorAll("[data-admit-elig-year]").forEach((node) => {
          node.classList.toggle("is-active", node === chip);
        });
        const box = infoPanel.querySelector("[data-admit-elig-text]");
        if (box) box.textContent = eligByType;
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

  function bindAdmitSearch(panel) {
    const root = panel.querySelector("[data-admit-search]");
    if (!root || root.dataset.bound === "1") return;
    root.dataset.bound = "1";

    enhanceAdmitSelects(root);

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

    /* 학과 유형별: 호버만 유지, 클릭 선택/표시 없음 */
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
        } else if (root.dataset.searchType === "university") {
          openUniversityAdmitDetail(viewBtn.closest("tr"));
        }
        return;
      }
      const button = event.target.closest("[data-theme]");
      if (!button || !root.contains(button)) return;
      event.preventDefault();
    });

    const refresh = () => applyAdmitFilters(panel);
    root.addEventListener("input", (event) => {
      if (event.target.matches?.('input[name="keyword"]')) refresh();
    });
    root.addEventListener("search", (event) => {
      if (event.target.matches?.('input[name="keyword"]')) refresh();
    });
    root.addEventListener("change", (event) => {
      if (
        event.target.matches?.(
          'select[name="region"], select[name="track"], select[name="minimum"], select[name="founding"], select[name="year"], select[name="sort"], select[name="group"], select[name="area"], select[name="inquiry"]'
        )
      ) {
        refresh();
      }
    });
    refresh();
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

    const blocks = guide.blocks
      .map((block) => {
        const chapter = chapterOf(block.id);
        const slices = block.slices ? ' data-slices="1"' : "";
        return `<section class="guide-block" id="${block.id}" data-chapter="${chapter || ""}"${slices}>
          <div class="book-stack">${pageMounts(block.pages)}</div>
        </section>`;
      })
      .join("");

    const sectionNav = guide.nav.length
      ? `<div class="section-nav" role="tablist" aria-label="${guide.title} 안의 항목">${nav}</div>`
      : "";
    const search = guide.search ? admitSearchHtml(guide.search) : "";

    panel.innerHTML = `<h1>${guide.title}</h1>
      ${sectionNav}
      ${search}
      ${blocks}`;

    if (guide.search) bindAdmitSearch(panel);

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
    /* 대학 탭처럼 섹션 탭이 없으면 필터만 적용 */
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
    }
  });

  return { open, guides };
})();
