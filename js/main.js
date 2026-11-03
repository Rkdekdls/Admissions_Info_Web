const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = Array.from(document.querySelectorAll(".panel"));
const crumbParent = document.getElementById("crumb-parent");
const crumbCurrent = document.getElementById("crumb-current");
const app = document.getElementById("app");
const sidebarToggle = document.getElementById("sidebar-toggle");
const mobileNavBtn = document.getElementById("mobile-nav-btn");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
const groups = Array.from(document.querySelectorAll(".nav-group[data-group]"));

const titles = {
  curriculum: "교육과정 체계",
  record: "학교생활기록부",
  exam: "수능 및 모의고사",
  screening: "대입전형 이해",
  schedule: "일정 및 원서접수",
  susi: "수시",
  jeongsi: "정시",
  university: "대학",
};

const groupTitles = {
  admission: "대입 제도",
  info: "입시 정보",
};

const HOME_TAB = "susi";
const HOME_SECTION = "susi-subject"; /* 수시 > 교과 */
const DEFAULT_BY_GROUP = {
  info: { tab: "susi", section: "susi-subject" },
  admission: { tab: "curriculum", section: "" },
};
const MOBILE_MQ = window.matchMedia("(max-width: 860px)");

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
  return { tab, section };
}

function setRoute(tab, section) {
  const next = section ? `#${tab}/${section}` : `#${tab}`;
  if (location.hash !== next) history.replaceState(null, "", next);
}

function sectionLabelFor(tab, section) {
  if (!section) return "";
  const panel = document.querySelector(`#panel-${tab}`);
  const btn = panel?.querySelector(`.section-tab[data-section="${section}"]`);
  return btn ? btn.textContent.replace(/^\d+\.\s*/, "").trim() : "";
}

function setCrumb(tab, section) {
  const tabBtn = tabs.find((item) => item.dataset.tab === tab);
  const groupName = tabBtn?.dataset.group || "admission";
  if (crumbParent) crumbParent.textContent = groupTitles[groupName] || groupTitles.admission;
  const label = sectionLabelFor(tab, section);
  crumbCurrent.textContent = label ? `${titles[tab]} › ${label}` : titles[tab] || "";
}

window.syncGuideHash = (tab, section) => {
  if (!tab) return;
  setRoute(tab, section || "");
  setCrumb(tab, section || "");
};

function selectTab(name, updateHash, targetId) {
  const tab = tabs.find((item) => item.dataset.tab === name) || tabs[0];
  const key = tab.dataset.tab;
  const groupName = tab.dataset.group || "admission";

  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", active ? "true" : "false");
    item.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.id === `panel-${key}`;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });

  document.title = "입시 정보 조회 서비스";
  Guide.open(key, targetId);
  const panel = document.querySelector(`#panel-${key}`);
  const activeSection =
    targetId ||
    panel?.querySelector(".section-tab.is-active")?.dataset.section ||
    "";
  setCrumb(key, activeSection);
  const main = document.querySelector(".main");
  if (main) main.scrollTop = 0;

  openGroupExclusive(groupName);

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
    selectTab(tab.dataset.tab, true);
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
    /* 입시 정보 → 수시·교과 / 대입 제도 → 교육과정 체계 */
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

const { tab: hashTab, section: hashSection } = parseRoute();
/* PC·모바일 공통 홈: 입시 정보 > 수시 > 교과 */
const startTab =
  tabs.find((tab) => tab.dataset.tab === hashTab) ||
  tabs.find((tab) => tab.dataset.tab === HOME_TAB) ||
  tabs[0];
const startKey = startTab.dataset.tab;
const startGroup = startTab.dataset.group || "info";
const startSection =
  hashSection ||
  (startKey === HOME_TAB ? HOME_SECTION : undefined);

groups.forEach((group) => {
  setGroupOpen(group.dataset.group, group.dataset.group === startGroup);
});

if (!hashTab) {
  selectTab(HOME_TAB, true, HOME_SECTION);
} else {
  selectTab(startKey, true, startSection);
}

const brandHome = document.getElementById("brand-home");
if (brandHome) {
  brandHome.addEventListener("click", (event) => {
    event.preventDefault();
    /* 홈: 대입 제도 닫힘 + 입시 정보 수시·교과 */
    selectTab(HOME_TAB, true, HOME_SECTION);
  });
}
