const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = Array.from(document.querySelectorAll(".panel"));
const crumbParent = document.getElementById("crumb-parent");
const crumbCurrent = document.getElementById("crumb-current");
const crumbCurrentSep = document.getElementById("crumb-current-sep");
const crumbSectionSep = document.getElementById("crumb-section-sep");
const crumbSection = document.getElementById("crumb-section");
const app = document.getElementById("app");
const sidebarToggle = document.getElementById("sidebar-toggle");
const mobileNavBtn = document.getElementById("mobile-nav-btn");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
const groups = Array.from(document.querySelectorAll(".nav-group[data-group]"));

const titles = {
  home: "홈",
  curriculum: "교육과정 체계",
  record: "학교생활기록부",
  exam: "수능 및 모의고사",
  screening: "대입전형 이해",
  schedule: "일정 및 원서접수",
  major: "전공·권장과목",
  susi: "수시",
  jeongsi: "정시",
  university: "대학·캠퍼스 정보",
};

const groupTitles = {
  home: "홈",
  admission: "대입 준비 가이드",
  major: "전공·권장과목",
  university: "대학·캠퍼스 정보",
  info: "수시·정시 정보",
};

const HOME_TAB = "home";
const HOME_SECTION = "";
const DEFAULT_BY_GROUP = {
  home: { tab: "home", section: "" },
  admission: { tab: "curriculum", section: "" },
  major: { tab: "major", section: "major-explore" },
  university: { tab: "university", section: "university-info" },
  info: { tab: "susi", section: "susi-subject" },
};
/* 세로≤860 + 폰 가로(짧은 높이) — 큰 폰 가로에서 데스크톱 사이드바/글자가 켜지지 않게 */
const MOBILE_MQ = window.matchMedia(
  "(max-width: 860px), (max-width: 1279px) and (max-height: 500px) and (orientation: landscape)"
);

function isMobileNav() {
  return MOBILE_MQ.matches;
}

function getGroup(name) {
  return groups.find((item) => item.dataset.group === name);
}

function setGroupOpen(name, open) {
  const group = getGroup(name);
  if (!group) return;
  const parentButton = group.querySelector(".nav-parent");
  group.classList.toggle("is-open", open);
  if (parentButton) {
    parentButton.setAttribute("aria-expanded", open ? "true" : "false");
  }
}

/* 한쪽 그룹만 열림 — 다른 쪽은 닫음 */
function openGroupExclusive(name) {
  groups.forEach((group) => {
    setGroupOpen(group.dataset.group, group.dataset.group === name);
  });
}

function setMobileNavOpen(open) {
  app.classList.toggle("is-nav-open", open);
  if (sidebarBackdrop) sidebarBackdrop.hidden = !open;
  if (mobileNavBtn) {
    mobileNavBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNavBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }
  if (open) {
    app.classList.remove("is-collapsed");
    if (sidebarToggle) {
      sidebarToggle.setAttribute("aria-expanded", "true");
      sidebarToggle.setAttribute("aria-label", "사이드바 접기");
    }
  }
}

function closeMobileNav() {
  if (app.classList.contains("is-nav-open")) setMobileNavOpen(false);
}

function parseRoute() {
  const raw = location.hash.replace(/^#/, "").trim();
  if (!raw) return { tab: "", section: "" };
  const [tab, section = ""] = raw.split("/");
  /* 구형 단일 해시(#susi-subject 등) → 탭/섹션으로 복원 */
  if (!section && tab && !document.querySelector(`#panel-${tab}`)) {
    const legacy = {
      "susi-subject": ["susi", "susi-subject"],
      "susi-holistic": ["susi", "susi-holistic"],
      "susi-essay": ["susi", "susi-essay"],
      "university-info": ["university", "university-info"],
      "university-map": ["university", "university-map"],
      "university-roadview": ["university", "university-roadview"],
      "major-explore": ["major", "major-explore"],
      "major-by-field": ["major", "major-by-field"],
      "major-by-univ": ["major", "major-by-univ"],
      "life-system": ["curriculum", "life-system"],
      "curriculum-credit": ["curriculum", "curriculum-credit"],
      "curriculum-subject": ["curriculum", "curriculum-subject"],
      "curriculum-grade": ["curriculum", "curriculum-grade"],
      "record-role": ["record", "record-role"],
      "record-form": ["record", "record-form"],
      "exam-csat": ["exam", "exam-csat"],
      "exam-score": ["exam", "exam-score"],
      "exam-mock": ["exam", "exam-mock"],
      "screening-compare": ["screening", "screening-compare"],
      "screening-subject": ["screening", "screening-subject"],
      "screening-holistic": ["screening", "screening-holistic"],
      "screening-essay": ["screening", "screening-essay"],
      "screening-csat": ["screening", "screening-csat"],
      "life-roadmap": ["screening", "life-roadmap"],
      "schedule-plan": ["schedule", "schedule-plan"],
      "schedule-after": ["schedule", "schedule-after"],
    };
    const mapped = legacy[tab];
    if (mapped) return { tab: mapped[0], section: mapped[1] };
  }
  return { tab, section };
}

function setRoute(tab, section) {
  const next = section ? `#${tab}/${section}` : `#${tab}`;
  if (location.hash === next) return;
  /* pushState로 뒤로가기 지원 — popstate에서 UI 동기화 */
  history.pushState(null, "", next);
}

/* 탭·섹션 전환 후 본문 스크롤 리셋 — 레이아웃/해시 스크롤이 한 프레임 늦는 경우까지 맞춤 */
function resetMainScroll() {
  const main = document.querySelector(".main");
  if (!main) return;
  main.scrollTop = 0;
  requestAnimationFrame(() => {
    main.scrollTop = 0;
    requestAnimationFrame(() => {
      main.scrollTop = 0;
    });
  });
}
window.resetMainScroll = resetMainScroll;

function sectionLabelFor(tab, section) {
  if (!section) return "";
  const panel = document.querySelector(`#panel-${tab}`);
  const btn = panel?.querySelector(`.section-tab[data-section="${section}"]`);
  return btn ? btn.textContent.replace(/^\d+\.\s*/, "").trim() : "";
}

function setCrumbPart(el, show, text) {
  if (!el) return;
  if (typeof text === "string") el.textContent = text;
  if (show) el.removeAttribute("hidden");
  else el.setAttribute("hidden", "");
}

function setCrumb(tab, section) {
  const isHome = tab === "home";
  const mainTop = document.querySelector(".main-top");
  const crumb = document.querySelector(".crumb");
  if (mainTop) mainTop.classList.toggle("is-home", isHome);
  if (crumb) {
    if (isHome) crumb.setAttribute("hidden", "");
    else crumb.removeAttribute("hidden");
  }

  if (isHome) {
    setCrumbPart(crumbParent, false, "");
    setCrumbPart(crumbCurrentSep, false);
    setCrumbPart(crumbCurrent, false, "");
    setCrumbPart(crumbSectionSep, false);
    setCrumbPart(crumbSection, false, "");
    return;
  }

  const sectionTab = section
    ? tabs.find((item) => item.dataset.tab === tab && item.dataset.section === section)
    : null;
  const tabBtn = sectionTab || tabs.find((item) => item.dataset.tab === tab);
  const groupName = tabBtn?.dataset.group || "admission";
  const sidebarSection = Boolean(sectionTab?.dataset.section);
  const label = sidebarSection ? "" : sectionLabelFor(tab, section);
  const currentLabel = sidebarSection
    ? sectionTab.textContent.replace(/\s+/g, " ").trim()
    : titles[tab] || "";
  const showSection = Boolean(label);

  setCrumbPart(crumbParent, true, groupTitles[groupName] || groupTitles.admission);
  setCrumbPart(crumbCurrentSep, true);
  setCrumbPart(crumbCurrent, true, currentLabel);
  setCrumbPart(crumbSectionSep, showSection);
  setCrumbPart(crumbSection, showSection, label || "");
}

window.syncGuideHash = (tab, section) => {
  if (!tab) return;
  setRoute(tab, section || "");
  setCrumb(tab, section || "");
};

function selectTab(name, updateHash, targetId) {
  const isHome = name === "home" || name === HOME_TAB;
  const preferred =
    !isHome && targetId
      ? tabs.find((item) => item.dataset.tab === name && item.dataset.section === targetId)
      : null;
  const tab =
    isHome
      ? null
      : preferred ||
        tabs.find((item) => item.dataset.tab === name && !item.dataset.section) ||
        tabs.find((item) => item.dataset.tab === name) ||
        tabs[0];
  const key = isHome ? "home" : tab.dataset.tab;
  const groupName = isHome ? "home" : tab.dataset.group || "admission";
  const requestedSection = targetId || tab?.dataset.section || "";

  panels.forEach((panel) => {
    const active = panel.id === `panel-${key}`;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });

  document.title = "입시 정보 조회 서비스";
  if (!isHome && typeof Guide !== "undefined" && Guide.open) {
    Guide.open(key, requestedSection || undefined);
  }
  const panel = document.querySelector(`#panel-${key}`);
  const activeSection =
    isHome
      ? ""
      : requestedSection ||
        panel?.querySelector(".section-tab.is-active")?.dataset.section ||
        "";

  tabs.forEach((item) => {
    const sameTab = !isHome && item.dataset.tab === key;
    const section = item.dataset.section || "";
    const active = sameTab && (!section || section === activeSection);
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", active ? "true" : "false");
    item.tabIndex = active ? 0 : -1;
  });

  setCrumb(key, activeSection);
  resetMainScroll();

  if (isHome) {
    groups.forEach((group) => setGroupOpen(group.dataset.group, false));
  } else {
    openGroupExclusive(groupName);
  }

  if (updateHash) {
    setRoute(key, activeSection);
  }

  if (isMobileNav()) closeMobileNav();
}

window.selectGuideTab = (name, targetId) => selectTab(name, true, targetId);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (!isMobileNav() && app.classList.contains("is-collapsed")) {
      app.classList.remove("is-collapsed");
      sidebarToggle.setAttribute("aria-expanded", "true");
      sidebarToggle.setAttribute("aria-label", "사이드바 접기");
    }
    selectTab(tab.dataset.tab, true, tab.dataset.section || undefined);
  });
});

groups.forEach((group) => {
  const parentButton = group.querySelector(".nav-parent");
  if (!parentButton || parentButton.tagName !== "BUTTON") return;

  parentButton.addEventListener("click", () => {
    if (!isMobileNav() && app.classList.contains("is-collapsed")) {
      app.classList.remove("is-collapsed");
      sidebarToggle.setAttribute("aria-expanded", "true");
      sidebarToggle.setAttribute("aria-label", "사이드바 접기");
    }
    /* 이미 열린 그룹을 다시 누르면 접기 */
    if (group.classList.contains("is-open")) {
      setGroupOpen(group.dataset.group, false);
      return;
    }
    /* 대입 준비 가이드 → 교육과정 / 전공·권장과목 → 전공 탐색 / 대학·캠퍼스 → 대학별 현황 / 수시·정시 → 수시 */
    const fallback = DEFAULT_BY_GROUP[group.dataset.group] || { tab: HOME_TAB, section: HOME_SECTION };
    selectTab(fallback.tab, true, fallback.section || undefined);
  });
});

sidebarToggle.addEventListener("click", () => {
  if (isMobileNav()) {
    setMobileNavOpen(!app.classList.contains("is-nav-open"));
    return;
  }
  const collapsed = app.classList.toggle("is-collapsed");
  sidebarToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
  sidebarToggle.setAttribute("aria-label", collapsed ? "사이드바 펼치기" : "사이드바 접기");
});

if (mobileNavBtn) {
  mobileNavBtn.addEventListener("click", () => {
    setMobileNavOpen(!app.classList.contains("is-nav-open"));
  });
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", () => closeMobileNav());
}

MOBILE_MQ.addEventListener("change", () => {
  if (!isMobileNav()) {
    closeMobileNav();
  } else {
    app.classList.remove("is-collapsed");
    if (sidebarToggle) {
      sidebarToggle.setAttribute("aria-expanded", "true");
      sidebarToggle.setAttribute("aria-label", "사이드바 접기");
    }
  }
});

/*
 * 라우팅 규칙 (PC·모바일·태블릿 동일)
 * - 첫 인입(해시 없음) → 홈 (#home)
 * - 새로고침 → 현재 해시(탭/섹션) 유지
 * - 로고 클릭 → 홈
 * - 대입 준비 가이드 그룹만 클릭 → 교육과정 체계
 * - 전공·권장과목 그룹만 클릭 → 전공 탐색
 * - 대학·캠퍼스 정보 그룹만 클릭 → 대학별 현황
 * - 수시·정시 정보 그룹만 클릭 → 수시 › 교과
 */
function resolveInitialRoute() {
  const { tab, section } = parseRoute();
  if (!tab) return { tab: HOME_TAB, section: HOME_SECTION };
  if (tab === HOME_TAB) return { tab: HOME_TAB, section: HOME_SECTION };
  if (!document.querySelector(`#panel-${tab}`)) {
    return { tab: HOME_TAB, section: HOME_SECTION };
  }
  return { tab, section: section || "" };
}

groups.forEach((group) => setGroupOpen(group.dataset.group, false));
{
  const initial = resolveInitialRoute();
  selectTab(initial.tab, true, initial.section || undefined);
}

window.addEventListener("popstate", () => {
  const { tab, section } = resolveInitialRoute();
  selectTab(tab, false, section || undefined);
});

const brandHome = document.getElementById("brand-home");
if (brandHome) {
  brandHome.addEventListener("click", (event) => {
    event.preventDefault();
    selectTab(HOME_TAB, true);
  });
}
