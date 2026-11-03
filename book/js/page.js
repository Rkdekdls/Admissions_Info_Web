/* ============================================
   플립북 iframe 페이지용 공통 스크립트
   body/페이지 스타일, A4 스케일, postMessage 리사이즈
   ============================================ */
(function () {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("web") === "1") {
    function initWebPage() {
      const style = document.createElement("style");
      style.textContent = [
        "html, body {",
        "  margin: 0 !important;",
        "  padding: 0 !important;",
        "  background: #fff !important;",
        "  min-height: 0 !important;",
        "  height: auto !important;",
        "  display: block !important;",
        "  overflow: visible !important;",
        "}",
        ".page, [class$='-page'] {",
        "  width: 210mm !important;",
        "  height: auto !important;",
        "  min-height: 0 !important;",
        "  overflow: visible !important;",
        "  border: none !important;",
        "  box-shadow: none !important;",
        "  margin: 0 !important;",
        "}",
        ".content-area {",
        "  height: auto !important;",
        "  min-height: 0 !important;",
        "}",
        ".content-area::before { display: none !important; }",
        ".page-footer {",
        "  position: static !important;",
        "  transform: none !important;",
        "  left: auto !important;",
        "  bottom: auto !important;",
        "  display: block;",
        "  margin-top: 8mm;",
        "}"
      ].join("\n");
      document.head.appendChild(style);

      function reportHeight() {
        const page = document.querySelector(".page") || document.body;
        const height = Math.ceil(page.getBoundingClientRect().height);
        if (!height || !window.parent) return;
        window.parent.postMessage({ type: "book-page-height", height: height }, "*");
      }

      reportHeight();
      window.addEventListener("load", function () {
        reportHeight();
        window.setTimeout(reportHeight, 150);
        window.setTimeout(reportHeight, 500);
      });

      if (window.ResizeObserver) {
        const page = document.querySelector(".page") || document.body;
        const observer = new ResizeObserver(reportHeight);
        observer.observe(page);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initWebPage);
    } else {
      initWebPage();
    }
    return;
  }

  if (urlParams.get("flipbook") !== "1") return;

  const A4_WIDTH_PX = 210 * 3.7795;
  const A4_HEIGHT_PX = 297 * 3.7795;

  function adjustForFlipbook() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "white";
    document.body.style.display = "block";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    const pageElement = document.querySelector(".page");
    if (pageElement) {
      pageElement.style.margin = "0";
      pageElement.style.border = "none";

      const iframeWidth = window.innerWidth;
      const iframeHeight = window.innerHeight;
      const scaleX = iframeWidth / A4_WIDTH_PX;
      const scaleY = iframeHeight / A4_HEIGHT_PX;
      const scale = Math.min(scaleX, scaleY);

      document.body.style.transform = "scale(" + scale + ")";
      document.body.style.transformOrigin = "top left";
      document.body.style.width = A4_WIDTH_PX + "px";
      document.body.style.height = A4_HEIGHT_PX + "px";
    }
  }

  function applyResizeMessage(event) {
    if (event.data && event.data.type === "flipbook-resize") {
      const newScaleX = event.data.width / A4_WIDTH_PX;
      const newScaleY = event.data.height / A4_HEIGHT_PX;
      const newScale = Math.min(newScaleX, newScaleY);
      document.body.style.transform = "scale(" + newScale + ")";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", adjustForFlipbook);
  } else {
    adjustForFlipbook();
  }

  window.addEventListener("message", applyResizeMessage, false);

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(adjustForFlipbook, 100);
  });
})();