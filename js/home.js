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
