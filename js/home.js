/* 홈 화면 — 사이드바 목차·탭과 동일 목적지로 연결 */
(() => {
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
    const section = tab === "susi" ? "susi-subject" : "";
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
    if (form) {
      if (typeof Guide !== "undefined" && typeof Guide.enhanceAdmitSelects === "function") {
        Guide.enhanceAdmitSelects(form);
      }
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector('input[name="q"]');
        const scope = form.querySelector('select[name="scope"]')?.value || "susi";
        applyHomeSearch(input?.value || "", scope);
      });
    }

    root.querySelectorAll("[data-home-chip]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const scope = form?.querySelector('select[name="scope"]')?.value || "susi";
        applyHomeSearch(chip.getAttribute("data-home-chip") || chip.textContent, scope);
      });
    });
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
