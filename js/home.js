/* 홈 화면 — 사이드바 목차·탭과 동일 목적지로 연결 */
(() => {
  const SCOPE_UI = {
    susi: {
      placeholder: "대학명 또는 모집단위 검색",
      chips: [
        { q: "고려대", label: "#고려대" },
        { q: "가천대", label: "#가천대" },
        { q: "경영학과", label: "#경영학과" },
        { q: "간호학과", label: "#간호학과" },
      ],
    },
    jeongsi: {
      placeholder: "대학명 또는 모집단위 검색",
      chips: [
        { q: "고려대", label: "#고려대" },
        { q: "가천대", label: "#가천대" },
        { q: "경영학과", label: "#경영학과" },
        { q: "간호학과", label: "#간호학과" },
      ],
    },
    university: {
      placeholder: "대학명 검색",
      chips: [
        { q: "고려대", label: "#고려대" },
        { q: "가천대", label: "#가천대" },
      ],
    },
  };

  function go(tab, section) {
    if (typeof window.selectGuideTab === "function") {
      window.selectGuideTab(tab, section || undefined);
      return;
    }
    location.hash = section ? `#${tab}/${section}` : `#${tab}`;
  }

  function applyHomeSearch(query, scope) {
    const q = String(query || "").trim();
    const tab = scope === "jeongsi" || scope === "university" ? scope : "susi";
    const section = tab === "susi" ? "susi-subject" : tab === "university" ? "university-info" : "";
    go(tab, section);
    window.setTimeout(() => {
      const panel = document.querySelector(`#panel-${tab}`);
      const input = panel?.querySelector('input[name="keyword"]');
      if (!input) return;
      input.value = q;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    }, 80);
  }

  function getScope(form) {
    return form?.querySelector('select[name="scope"]')?.value || "susi";
  }

  function syncScopeUi(form, chipsRoot) {
    if (!form) return;
    const scope = getScope(form);
    const ui = SCOPE_UI[scope] || SCOPE_UI.susi;
    const input = form.querySelector('input[name="q"]');
    const hidden = form.querySelector(".home-search-field .visually-hidden");
    if (input) {
      input.placeholder = ui.placeholder;
      input.setAttribute("aria-label", ui.placeholder);
    }
    if (hidden) hidden.textContent = ui.placeholder;

    if (!chipsRoot) return;
    chipsRoot.replaceChildren();
    ui.chips.forEach((chip) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "home-chip";
      btn.setAttribute("data-home-chip", chip.q);
      btn.textContent = chip.label;
      btn.addEventListener("click", () => {
        applyHomeSearch(chip.q, getScope(form));
      });
      chipsRoot.appendChild(btn);
    });
  }

  function bindHome(root) {
    if (!root || root.dataset.bound === "1") return;
    root.dataset.bound = "1";

    root.querySelectorAll("[data-home-go]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const tab = btn.getAttribute("data-home-go");
        const section = btn.getAttribute("data-home-section") || "";
        if (tab) go(tab, section);
      });
    });

    root.querySelectorAll("[data-major-find-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        go("major", "major-explore");
        if (window.MajorFinderUI) window.MajorFinderUI.open();
      });
    });

    const homeMajorExplore = {
      인공지능공학: "인공지능학과",
      반도체공학: "반도체공학과",
      기계공학: "기계공학부",
      간호학: "간호학과",
      경영학: "경영학부",
    };

    root.querySelectorAll("[data-home-major]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-home-major");
        const exploreName = homeMajorExplore[name] || name;
        if (exploreName && window.Guide && typeof window.Guide.openMajorExploreByName === "function") {
          window.Guide.openMajorExploreByName(exploreName);
        }
      });
    });

    const form = root.querySelector("[data-home-search]");
    const chipsRoot = root.querySelector("[data-home-chips]");
    if (form) {
      if (typeof Guide !== "undefined" && typeof Guide.enhanceAdmitSelects === "function") {
        Guide.enhanceAdmitSelects(form);
      }
      const scopeSelect = form.querySelector('select[name="scope"]');
      if (scopeSelect) {
        scopeSelect.addEventListener("change", () => syncScopeUi(form, chipsRoot));
      }
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector('input[name="q"]');
        applyHomeSearch(input?.value || "", getScope(form));
      });
      syncScopeUi(form, chipsRoot);
    }

    mountCalendar(root);
  }

  const CAL_EVENTS = [
    { start: "2026-03-24", end: "2026-03-24", title: "3월 모의고사" },
    { start: "2026-05-07", end: "2026-05-07", title: "5월 모의고사" },
    { start: "2026-06-04", end: "2026-06-04", title: "6월 평가원 모의평가" },
    { start: "2026-07-08", end: "2026-07-08", title: "7월 모의고사" },
    { start: "2026-09-02", end: "2026-09-02", title: "9월 평가원 모의평가" },
    { start: "2026-09-07", end: "2026-09-11", title: "수시 원서접수" },
    { start: "2026-10-20", end: "2026-10-20", title: "10월 모의고사" },
    { start: "2026-11-19", end: "2026-11-19", title: "대학수학능력시험" },
    { start: "2026-12-18", end: "2026-12-18", title: "수시 합격자 발표" },
    { start: "2026-12-21", end: "2026-12-23", title: "수시 합격자 등록" },
    { start: "2026-12-29", end: "2026-12-29", title: "수시 충원 통보 마감" },
    { start: "2026-12-30", end: "2026-12-30", title: "수시 충원 등록 마감" },
    { start: "2027-01-04", end: "2027-01-07", title: "정시 원서접수" },
    { start: "2027-01-11", end: "2027-01-17", title: "정시 가군 전형" },
    { start: "2027-01-18", end: "2027-01-24", title: "정시 나군 전형" },
    { start: "2027-01-25", end: "2027-01-31", title: "정시 다군 전형" },
    { start: "2027-02-05", end: "2027-02-05", title: "정시 합격자 발표" },
    { start: "2027-02-10", end: "2027-02-12", title: "정시 합격자 등록" },
    { start: "2027-02-17", end: "2027-02-17", title: "정시 충원 통보 마감" },
    { start: "2027-02-18", end: "2027-02-18", title: "정시 충원 등록 마감" },
  ];

  function dateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function eventsOn(key) {
    return CAL_EVENTS.filter((event) => key >= event.start && key <= event.end);
  }

  function formatDay(key) {
    const [year, month, day] = key.split("-").map(Number);
    return `${year}년 ${month}월 ${day}일`;
  }

  function formatTipDate(event) {
    if (event.start === event.end) return formatDay(event.start);
    const [y1, m1, d1] = event.start.split("-").map(Number);
    const [y2, m2, d2] = event.end.split("-").map(Number);
    if (y1 === y2 && m1 === m2) return `${y1}년 ${m1}월 ${d1}일 ~ ${d2}일`;
    if (y1 === y2) return `${y1}년 ${m1}월 ${d1}일 ~ ${m2}월 ${d2}일`;
    return `${formatDay(event.start)} ~ ${formatDay(event.end)}`;
  }

  function sharesRange(a, b) {
    return CAL_EVENTS.some((event) => event.start !== event.end && a >= event.start && a <= event.end && b >= event.start && b <= event.end);
  }

  function mountCalendar(root) {
    const cal = root.querySelector("[data-home-cal]");
    if (!cal) return;
    const monthLabel = cal.querySelector("[data-cal-month]");
    const daysEl = cal.querySelector("[data-cal-days]");
    const tip = cal.querySelector("[data-cal-tip]");
    const todayKey = dateKey(new Date());
    let view = new Date();
    view = new Date(view.getFullYear(), view.getMonth(), 1);
    let pinned = "";
    let hovered = "";

    function hideTip() {
      tip.hidden = true;
      tip.replaceChildren();
    }

    function placeTip(button) {
      const events = eventsOn(button.dataset.date);
      if (!events.length) {
        hideTip();
        return;
      }
      tip.replaceChildren();
      events
        .slice()
        .sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end))
        .forEach((event) => {
          const title = document.createElement("p");
          title.className = "home-cal-tip-title";
          title.textContent = formatTipDate(event);
          const body = document.createElement("p");
          body.className = "home-cal-tip-body";
          body.textContent = event.title;
          tip.append(title, body);
        });
      tip.hidden = false;
      const cell = button.getBoundingClientRect();
      const tipBox = tip.getBoundingClientRect();
      let left = cell.right + 8;
      let top = cell.top + (cell.height - tipBox.height) / 2;
      if (top < 8) top = 8;
      if (top + tipBox.height > window.innerHeight - 8) {
        top = Math.max(8, window.innerHeight - tipBox.height - 8);
      }
      if (left + tipBox.width > window.innerWidth - 8) {
        left = Math.max(8, cell.left - tipBox.width - 8);
      }
      tip.style.position = "fixed";
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
    }

    function activeKey() {
      return hovered || pinned;
    }

    function syncTip() {
      const key = activeKey();
      const button = key ? daysEl.querySelector(`[data-date="${key}"]`) : null;
      if (!button || button.classList.contains("is-out") || !eventsOn(key).length) {
        hideTip();
        return;
      }
      placeTip(button);
    }

    function render() {
      monthLabel.textContent = `${view.getFullYear()}년 ${view.getMonth() + 1}월`;
      daysEl.replaceChildren();
      const first = new Date(view.getFullYear(), view.getMonth(), 1);
      const start = new Date(first);
      start.setDate(1 - first.getDay());
      for (let i = 0; i < 42; i += 1) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const key = dateKey(date);
        const outside = date.getMonth() !== view.getMonth();
        const events = outside ? [] : eventsOn(key);
        const cell = document.createElement(events.length ? "button" : "span");
        if (events.length) cell.type = "button";
        cell.className = "home-cal-day";
        cell.dataset.date = key;
        cell.textContent = String(date.getDate());
        if (outside) cell.classList.add("is-out");
        if (key === todayKey) cell.classList.add("is-today");
        if (events.length) {
          cell.classList.add("is-event");
          cell.setAttribute("aria-label", `${view.getMonth() + 1}월 ${date.getDate()}일 ${events.map((event) => event.title).join(", ")}`);
          cell.addEventListener("mouseenter", () => {
            hovered = key;
            syncTip();
          });
          cell.addEventListener("mouseleave", () => {
            if (hovered === key) hovered = "";
            syncTip();
          });
          cell.addEventListener("focus", () => {
            hovered = key;
            syncTip();
          });
          cell.addEventListener("blur", () => {
            if (hovered === key) hovered = "";
            syncTip();
          });
        }
        daysEl.append(cell);
      }
      const cells = [...daysEl.children];
      cells.forEach((cell, index) => {
        if (!cell.classList.contains("is-event")) return;
        const key = cell.dataset.date;
        const prev = index % 7 !== 0 ? cells[index - 1] : null;
        const next = index % 7 !== 6 ? cells[index + 1] : null;
        const prevOn = prev && !prev.classList.contains("is-out") && sharesRange(key, prev.dataset.date);
        const nextOn = next && !next.classList.contains("is-out") && sharesRange(key, next.dataset.date);
        if (prevOn && nextOn) cell.classList.add("is-join-mid");
        else if (nextOn) cell.classList.add("is-join-start");
        else if (prevOn) cell.classList.add("is-join-end");
      });
      syncJoin();
      syncTip();
    }

    function syncJoin() {
      const panel = cal.closest(".home-panel");
      const cells = daysEl.querySelectorAll(".home-cal-day");
      if (cells.length < 8 || !panel) return;
      const desktop = window.matchMedia("(min-width: 1280px)").matches;
      if (!desktop) {
        panel.style.width = "";
        cal.style.removeProperty("--cal-gap");
        const across = cells[1].getBoundingClientRect().left - cells[0].getBoundingClientRect().right;
        const size = Math.max(0, across);
        daysEl.style.setProperty("--cal-join", `${size}px`);
        daysEl.style.setProperty("--cal-row", `${size}px`);
        return;
      }
      daysEl.style.removeProperty("--cal-row");
      const lowerW = cal.closest(".home-lower").getBoundingClientRect().width;
      const daySize = 28;
      const oldGap = Math.max(0, ((lowerW - 24) / 4 - 26.6 - daySize * 7) / 6);
      const verticalGap = () => cells[7].getBoundingClientRect().top - cells[0].getBoundingClientRect().bottom;
      const apply = (gap) => {
        const size = Math.max(0, gap);
        cal.style.setProperty("--cal-gap", `${size}px`);
        panel.style.width = `${Math.ceil(daySize * 7 + size * 6 + 26.6)}px`;
        daysEl.style.setProperty("--cal-join", `${size}px`);
      };
      const rowRelief = 2;
      let gap = Math.min(verticalGap() + rowRelief, oldGap);
      apply(gap);
      const next = Math.min(verticalGap() + rowRelief, oldGap);
      if (Math.abs(next - gap) > 0.6) apply(next);
    }

    cal.querySelector("[data-cal-prev]").addEventListener("click", () => {
      pinned = "";
      hovered = "";
      view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
      render();
    });
    cal.querySelector("[data-cal-next]").addEventListener("click", () => {
      pinned = "";
      hovered = "";
      view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      render();
    });
    window.addEventListener("resize", syncJoin);
    document.addEventListener("click", (event) => {
      if (cal.contains(event.target)) return;
      if (!pinned && !hovered) return;
      pinned = "";
      hovered = "";
      daysEl.querySelectorAll(".is-selected").forEach((button) => {
        button.classList.remove("is-selected");
        button.removeAttribute("aria-pressed");
      });
      hideTip();
    });
    render();
  }

  function init() {
    const panel = document.getElementById("panel-home");
    if (panel) bindHome(panel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
