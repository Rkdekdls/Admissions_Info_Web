const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = Array.from(document.querySelectorAll(".panel"));
const crumbParent = document.getElementById("crumb-parent");
const crumbCurrent = document.getElementById("crumb-current");
const app = document.getElementById("app");
const sidebarToggle = document.getElementById("sidebar-toggle");
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

window.syncGuideHash = (tab, section) => {
  if (!tab) return;
  setRoute(tab, section || "");
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

  if (crumbParent) crumbParent.textContent = groupTitles[groupName] || groupTitles.admission;
  crumbCurrent.textContent = titles[key];
  document.title = "입시 정보 조회 서비스";
  Guide.open(key, targetId);
  const main = document.querySelector(".main");
  if (main) main.scrollTop = 0;

  setGroupOpen(groupName, true);

  if (updateHash) {
    const panel = document.querySelector(`#panel-${key}`);
    const activeSection =
      targetId ||
      panel?.querySelector(".section-tab.is-active")?.dataset.section ||
      "";
    setRoute(key, activeSection);
  }
}

window.selectGuideTab = (name, targetId) => selectTab(name, true, targetId);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const groupName = tab.dataset.group || "admission";
    if (app.classList.contains("is-collapsed")) {
      app.classList.remove("is-collapsed");
      sidebarToggle.setAttribute("aria-expanded", "true");
      sidebarToggle.setAttribute("aria-label", "사이드바 접기");
    }
    setGroupOpen(groupName, true);
    selectTab(tab.dataset.tab, true);
  });
});

groups.forEach((group) => {
  const parentButton = group.querySelector(".nav-parent");
  if (!parentButton || parentButton.tagName !== "BUTTON") return;

  parentButton.addEventListener("click", () => {
    if (app.classList.contains("is-collapsed")) {
      app.classList.remove("is-collapsed");
      sidebarToggle.setAttribute("aria-expanded", "true");
      sidebarToggle.setAttribute("aria-label", "사이드바 접기");
      setGroupOpen(group.dataset.group, true);
      return;
    }
    setGroupOpen(group.dataset.group, !group.classList.contains("is-open"));
  });
});

sidebarToggle.addEventListener("click", () => {
  const collapsed = app.classList.toggle("is-collapsed");
  sidebarToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
  sidebarToggle.setAttribute("aria-label", collapsed ? "사이드바 펼치기" : "사이드바 접기");
});

const { tab: hashTab, section: hashSection } = parseRoute();
const startTab =
  tabs.find((tab) => tab.dataset.tab === hashTab) ||
  tabs.find((tab) => tab.dataset.tab === HOME_TAB) ||
  tabs[0];
const startGroup = startTab.dataset.group || "info";
const startSection = hashSection || undefined;

groups.forEach((group) => {
  setGroupOpen(group.dataset.group, group.dataset.group === startGroup);
});

if (!hashTab) {
  selectTab(HOME_TAB, true, HOME_SECTION);
} else {
  selectTab(startTab.dataset.tab, true, startSection);
}

const brandHome = document.getElementById("brand-home");
if (brandHome) {
  brandHome.addEventListener("click", (event) => {
    event.preventDefault();
    selectTab(HOME_TAB, true, HOME_SECTION);
  });
}
