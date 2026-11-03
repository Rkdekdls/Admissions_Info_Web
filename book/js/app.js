/* ============================================
   고교생활가이드 플립북 메인 앱
   turn.js, 페이지 목록, 하단바, 전체화면
   ============================================ */

const PAGE_FILES = [
  'pages/00.표지/title.html',
  'pages/01.목차/list.html',
  'pages/02.파트/001.파트1/part1-01.html',
  'pages/02.파트/001.파트1/part1-02.html',
  'pages/02.파트/001.파트1/part1-03.html',
  'pages/02.파트/001.파트1/part1-04.html',
  'pages/02.파트/001.파트1/part1-05.html',
  'pages/02.파트/001.파트1/part1-06.html',
  'pages/02.파트/002.파트2/part2-01.html',
  'pages/02.파트/002.파트2/part2-02.html',
  'pages/02.파트/002.파트2/part2-03.html',
  'pages/02.파트/002.파트2/part2-04.html',
  'pages/02.파트/002.파트2/part2-05.html',
  'pages/02.파트/002.파트2/part2-06.html',
  'pages/02.파트/002.파트2/part2-07.html',
  'pages/02.파트/003.파트3/part3-01.html',
  'pages/02.파트/003.파트3/part3-02.html',
  'pages/02.파트/003.파트3/part3-03.html',
  'pages/02.파트/003.파트3/part3-04.html',
  'pages/02.파트/003.파트3/part3-05.html',
  'pages/02.파트/003.파트3/part3-06.html',
  'pages/02.파트/003.파트3/part3-07.html',
  'pages/02.파트/003.파트3/part3-08.html',
  'pages/02.파트/003.파트3/part3-09.html',
  'pages/02.파트/004.파트4/part4-01.html',
  'pages/02.파트/004.파트4/part4-02.html',
  'pages/02.파트/004.파트4/part4-03.html',
  'pages/02.파트/004.파트4/part4-04.html',
  'pages/02.파트/004.파트4/part4-05.html',
  'pages/02.파트/004.파트4/part4-06.html',
  'pages/02.파트/005.파트5/part5-01.html',
  'pages/02.파트/005.파트5/part5-02.html',
  'pages/02.파트/005.파트5/part5-03.html',
  'pages/02.파트/005.파트5/part5-04.html',
  'pages/02.파트/005.파트5/part5-05.html',
  'pages/02.파트/005.파트5/part5-06.html',
  'pages/02.파트/005.파트5/part5-07.html',
  'pages/02.파트/005.파트5/part5-08.html',
  'pages/02.파트/006.파트6/part6-01.html',
  'pages/02.파트/006.파트6/part6-02.html',
  'pages/02.파트/006.파트6/part6-03.html',
  'pages/02.파트/006.파트6/part6-04.html',
  'pages/03.부록/001.부록1/appendix1-01.html',
  'pages/03.부록/001.부록1/appendix1-02.html',
  'pages/03.부록/001.부록1/appendix1-03.html',
  'pages/03.부록/001.부록1/appendix1-04.html',
  'pages/03.부록/001.부록1/appendix1-05.html',
  'pages/03.부록/002.부록2/appendix2-01.html',
  'pages/03.부록/002.부록2/appendix2-03.html',
  'pages/03.부록/002.부록2/appendix2-04.html',
  'pages/03.부록/002.부록2/appendix2-06.html',
  'pages/03.부록/003.부록3/appendix3-01.html',
  'pages/03.부록/004.부록4/appendix4-01.html',
  'pages/03.부록/004.부록4/appendix4-03.html',
  'pages/03.부록/004.부록4/appendix4-05.html',
  'pages/03.부록/004.부록4/appendix4-06.html',
  'pages/03.부록/004.부록4/appendix4-08.html'
];

const BP_MOBILE_MAX = 767;   // 모바일 (세로·가로)
const BP_TABLET_MAX = 1023;  // 태블릿 (세로·가로)

let bookInitialized = false;

function getViewMode() {
  const w = window.innerWidth;
  if (w <= BP_MOBILE_MAX) return "mobile";   // ~767
  if (w <= BP_TABLET_MAX) return "tablet";   // 768~1023
  return "desktop";                          // 1024~
}

function isPortrait() {
  return window.matchMedia("(orientation: portrait)").matches;
}

/* 마우스·키보드 중심의 데스크톱/노트북인지 판별 (아이패드 등 터치 기기 제외) */
function isDesktopLike() {
  if (!window.matchMedia) return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** PC 가로형(1024px 이상 가로, 노트북·데스크톱만)에서만 true. 페이지 번호 직접 입력은 이 경우에만 허용 */
function isPCHorizontal() {
  const w = window.innerWidth;
  return isDesktopLike() && w >= 1024 && !isPortrait();
}

/* ============================================
   기기/화면 종류 판별 기준 + UI 요약

   1) 가로폭 기준 (뷰포트 width)
      - 모바일(스마트폰):          ~ 767px
      - 태블릿:                   768px ~ 1023px
      - 노트북/PC/데스크톱/모니터: 1024px ~
      → 실제로는 "기기 종류"가 아니라, 현재 브라우저 뷰포트의 가로폭만 보고 분류한다.

   2) 방향(가로/세로) 기준
      - isPortrait() === true  → 세로(portrait)
      - isPortrait() === false → 가로(landscape)

   3) 싱글/더블 페이지 기준 (페이지 몇 개 노출)
      - shouldSingleView():
          · 1023px 이하 & 세로(portrait) → 1페이지(싱글 뷰)
          · 그 외                          → 2페이지(더블 뷰)

   4) 페이지 번호 표시/입력 기준
      - 표시 방식:
          · 싱글 뷰: "03" 처럼 단일 페이지 번호
          · 더블 뷰: "02 - 03" 처럼 좌·우 페이지 범위 표시
      - 직접 입력(편집) 허용:
          · isDesktopLike() === true  (hover: hover, pointer: fine → 마우스/트랙패드 있음)
          · 가로폭 1024px 이상
          · 세로모드가 아닌 경우(가로 화면)
        → 위 조건을 모두 만족하는 경우만 "PC/노트북 가로 화면"으로 보고,
          페이지 번호 입력 후 해당 페이지로 이동 기능을 활성화한다.
        → 모바일/태블릿 및 터치 환경에서는 페이지 번호 박스는 "표시 전용"이며,
          터치로 편집·이동은 불가능하다.

   5) 하단바 구성 (로딩바 / 페이지바 / 첫·끝·돋보기 버튼) - 기기/화면별
      - 노트북/PC/데스크톱/모니터 (1024px 이상):
          · 페이지: 항상 2페이지(더블 뷰)
          · 페이지 번호: "01 - 02" 형식, 가로 화면에서만 키보드로 수정 가능
          · 하단바: 로딩바 + 페이지바(이전/다음 + 번호) + 첫·끝·돋보기 버튼 모두 노출
      - 태블릿 가로 (768px ~ 1023px & 가로):
          · 페이지: 2페이지(더블 뷰)
          · 페이지 번호: "01 - 02" 형식, 표시만 가능(입력 불가)
          · 하단바: 로딩바 + 페이지바 + 첫·끝·돋보기 버튼 모두 노출
      - 태블릿 세로 (768px ~ 1023px & 세로):
          · 페이지: 1페이지(싱글 뷰)
          · 페이지 번호: "03" 형식, 표시만 가능(입력 불가)
          · 하단바: 페이지바만 노출 (로딩바·아이콘 버튼 숨김)
      - 모바일 세로 (~ 767px & 세로):
          · 페이지: 1페이지(싱글 뷰)
          · 페이지 번호: "03" 형식, 표시만 가능(입력 불가)
          · 하단바: 페이지바만 노출 (로딩바·아이콘 버튼 숨김)
      - 모바일 가로 (~ 767px & 가로, 특히 낮은 높이의 가로형 기기):
          · 페이지: 2페이지(더블 뷰)
          · 페이지 번호: "02 - 03" 형식, 표시만 가능(입력 불가)
          · 하단바: 페이지바만 노출 (로딩바·아이콘 버튼 숨김,
   ============================================ */

/* PC: 더블 / 태블릿·모바일: 세로면 싱글, 가로면 더블 */
function shouldSingleView() {
  const w = window.innerWidth;
  return (w <= BP_TABLET_MAX) && isPortrait(); // 1023px 이하 세로는 싱글
}

/* ============================================
   페이지 생성 및 iframe 로드
   ============================================ */
function setupIframeLoadHandler(iframe) {
  const $iframe = $(iframe);
  if ($iframe.attr("data-handler-setup") === "true") return;
  $iframe.attr("data-handler-setup", "true");

  iframe.addEventListener("load", function() {
    function markReady() {
      requestAnimationFrame(function() {
        $iframe.attr("data-ready", "true");
      });
    }
    markReady();
  }, { once: true });
}

function createPages() {
  const $flipbook = $("#flipbook");

  PAGE_FILES.forEach((pageFile, index) => {
    const pageNum = index + 1;

    const iframe = $("<iframe></iframe>")
      .attr("data-src", pageFile + "?flipbook=1")
      .attr("loading", "lazy")
      .css({
        "pointer-events": "auto",
        "transform": "translateZ(0)"
      });

    setupIframeLoadHandler(iframe[0]);

    const pageClass = (pageNum % 2 === 0) ? "even" : "odd";

    const $page = $("<div></div>")
      .addClass("page " + pageClass)
      .attr("data-page", pageNum)
      .append(iframe);

    $page.appendTo($flipbook);
  });
}

function ensurePageLoaded(pageNum) {
  if (!pageNum || pageNum < 1 || pageNum > PAGE_FILES.length) return;

  const $page = $("#flipbook .page[data-page='" + pageNum + "']");
  const $iframe = $page.find("iframe");

  if (!$iframe.length) return;
  if ($iframe.attr("data-src-loaded") === "true") return;

  const src = $iframe.attr("data-src");
  if (!src) return;

  $iframe.attr("src", src);
  $iframe.attr("data-src-loaded", "true");
}

function getPreloadRadius() {
  return getViewMode() === "desktop" ? 3 : 2;
}

function preloadAround(page, radius) {
  radius = radius == null ? getPreloadRadius() : radius;
  for (let p = page - radius; p <= page + radius; p++) {
    ensurePageLoaded(p);
  }
}

/* 페이지 번호 포맷: 1~9 → 01~09, 범위는 "01 - 02" 형식 */
function formatPageText(text) {
  const s = String(text ?? "").trim();

  const pad1to9 = (v) => {
    const n = parseInt(String(v).trim(), 10);
    if (!isNaN(n) && n >= 1 && n <= 9) return "0" + n;
    return String(n);
  };

  if (s.includes("-")) {
    const [aRaw, bRaw] = s.split("-").map(t => t.trim());
    const a = pad1to9(aRaw);
    const b = pad1to9(bRaw);
    return `${a} - ${b}`;
  }

  return s.replace(/\d+/g, (m) => pad1to9(m));
}

/* 현재 페이지 표시, 페이지바 텍스트, 슬라이더 진행률 동기화 */
function updatePageUI(page, view) {
  let pageNumberText = "";

  if (view && view.length > 1) {
    const pages = view.filter(p => p && p <= PAGE_FILES.length);
    if (pages.length === 0 || pages[0] === pages[pages.length - 1]) {
      pageNumberText = `${page || 1}`;
    } else {
      pageNumberText = `${pages[0]}-${pages[pages.length - 1]}`; // formatPageText가 " - "로 변환
    }
  } else if (page) {
    pageNumberText = `${page}`;
  } else {
    pageNumberText = "1";
  }

  const formatted = formatPageText(pageNumberText);

  const $pageLabel = $("#pageLabel");
  const $existingNumber = $pageLabel.find(".page-number");

  if ($existingNumber.length) {
    $existingNumber.text(formatted);
  } else {
    $pageLabel.html(`<span class="page-number">${formatted}</span>`);
  }

  const totalDigits = String(PAGE_FILES.length).length;
  document.documentElement.style.setProperty('--total-digits', totalDigits);

  const currentPage = page || 1;
  const $slider = $("#pageSlider");
  if ($slider.length) {
    const max = PAGE_FILES.length;
    const rightPage = (view && view.length)
      ? Math.max(...view.filter(p => p && p <= max), 1)
      : currentPage;
    const sliderPage = Math.min(rightPage, max);
    $slider.val(sliderPage);
    const pct = max > 1 ? ((sliderPage - 1) / (max - 1)) * 100 : 0;
    $slider[0].style.setProperty("--slider-progress", pct + "%");
  }
}

/* ============================================
   플립북 레이아웃 (turn.js, 하단바 너비)
   ============================================ */
/* iOS Safari 동적 뷰포트 대응: visualViewport 우선 사용 */
function getViewportSize() {
  const vv = window.visualViewport;
  return {
    width: vv ? vv.width : window.innerWidth,
    height: vv ? vv.height : window.innerHeight
  };
}

function updateFlipbookLayout() {
  const { width: viewportWidth, height: viewportHeight } = getViewportSize();

  const single = shouldSingleView();

  const bottomBarHeight = 40;
  const verticalMargin = 20;

  const maxBookWidth = viewportWidth * 0.95;
  const maxBookHeight = viewportHeight - bottomBarHeight - verticalMargin;

  const A4_RATIO = 297 / 210;

  let pageWidth, pageHeight, bookWidth, bookHeight, displayMode;

  if (single) {
    pageWidth = maxBookWidth;
    pageHeight = Math.round(pageWidth * A4_RATIO);

    if (pageHeight > maxBookHeight) {
      pageHeight = maxBookHeight;
      pageWidth = Math.round(pageHeight / A4_RATIO);
    }

    bookWidth = pageWidth;
    bookHeight = pageHeight;
    displayMode = "single";

    const scaleFactor = 0.97;
    bookWidth = Math.round(bookWidth * scaleFactor);
    bookHeight = Math.round(bookHeight * scaleFactor);
    pageWidth = Math.round(pageWidth * scaleFactor);
    pageHeight = Math.round(pageHeight * scaleFactor);

  } else {
    const maxPageWidth = maxBookWidth / 2;
    const maxPageHeight = maxBookHeight;

    if (maxPageWidth * A4_RATIO <= maxPageHeight) {
      pageWidth = maxPageWidth;
      pageHeight = Math.round(pageWidth * A4_RATIO);
    } else {
      pageHeight = maxPageHeight;
      pageWidth = Math.round(pageHeight / A4_RATIO);
    }

    bookWidth = pageWidth * 2;
    bookHeight = pageHeight;
    displayMode = "double";

    const mode = getViewMode();
    const scaleFactor = (mode === "tablet") ? 0.94 : 0.97;

    bookWidth = Math.round(bookWidth * scaleFactor);
    bookHeight = Math.round(bookHeight * scaleFactor);
    pageWidth = Math.round(pageWidth * scaleFactor);
    pageHeight = Math.round(pageHeight * scaleFactor);
  }

  // 싱글(1페이지) / 더블(2페이지) 뷰에 따라
  // 플립북 래퍼에 클래스를 부여해 중앙 그림자 기둥 노출 여부를 제어
  const $wrapper = $(".flipbook-wrapper");
  $wrapper
    .removeClass("single-view double-view")
    .addClass(single ? "single-view" : "double-view");

  $(".flipbook-wrapper").css({ width: bookWidth, height: bookHeight });
  $("#flipbook").css({ width: bookWidth, height: bookHeight });
  $("#flipbook .page").css({ width: pageWidth, height: pageHeight });
  $(".bottom-bar").css({ width: bookWidth });

  setTimeout(function() {
    $("#flipbook .page iframe[data-ready='true']").each(function() {
      try {
        if (this.contentWindow) {
          this.contentWindow.postMessage({
            type: 'flipbook-resize',
            width: pageWidth,
            height: pageHeight
          }, '*');
        }
      } catch (e) {}
    });
  }, 300);

  if (!bookInitialized) {
    $("#flipbook").turn({
      width: bookWidth,
      height: bookHeight,
      display: displayMode,
      autoCenter: true,
      elevation: getViewMode() === "desktop" ? 0 : 1,
      gradients: false,
      duration: getViewMode() === "desktop" ? 1000 : 650,
      acceleration: true,
      when: {
        turning: function(event, page, view) {
          $(".flipbook-wrapper").addClass("turning");
          preloadAround(page, getPreloadRadius());

          $("#flipbook .page").removeClass("even odd");
          $("#flipbook .page").each(function(index) {
            if ((index + 1) % 2 === 0) $(this).addClass("even");
            else $(this).addClass("odd");
          });
        },
        turned: function(event, page, view) {
          preloadAround(page, getPreloadRadius());

          const currentPages = view || [page];
          let allReady = true;

          currentPages.forEach(function(p) {
            const $page = $("#flipbook .page[data-page='" + p + "']");
            const $iframe = $page.find("iframe");
            if ($iframe.length && !$iframe.attr("data-ready")) {
              allReady = false;
            }
          });

          function finalize() {
            requestAnimationFrame(function() {
              $(".flipbook-wrapper").removeClass("turning");
              $("#flipbook .page").removeClass("even odd");
              $("#flipbook .page").each(function(index) {
                if ((index + 1) % 2 === 0) $(this).addClass("even");
                else $(this).addClass("odd");
              });
              updatePageUI(page, view);
            });
          }

          if (allReady) finalize();
          else setTimeout(finalize, 0);
        }
      }
    });

    $("#flipbook .page").each(function(index) {
      if ((index + 1) % 2 === 0) $(this).addClass("even");
      else $(this).addClass("odd");
    });

    bookInitialized = true;
  } else {
    $("#flipbook").turn("size", bookWidth, bookHeight);
    $("#flipbook").turn("display", displayMode);

    $("#flipbook .page").removeClass("even odd");
    $("#flipbook .page").each(function(index) {
      if ((index + 1) % 2 === 0) $(this).addClass("even");
      else $(this).addClass("odd");
    });
  }

  const page = $("#flipbook").turn("page") || 1;
  const view = $("#flipbook").turn("view");
  updatePageUI(page, view);

  const $slider = $("#pageSlider");
  if ($slider.length) {
    $slider.attr("max", PAGE_FILES.length);
  }
}

/* ============================================
   전체화면
   ============================================ */
function requestFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen().catch(()=>{});
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

function isFullscreen() {
  return !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement);
}

/* ============================================
   초기화 및 이벤트 바인딩
   ============================================ */
$(document).ready(function () {
  createPages();
  preloadAround(1, getPreloadRadius());
  updateFlipbookLayout();
  $(".flipbook-wrapper").removeClass("turning");

  /* iOS: 주소창/툴바 노출·숨김 시 레이아웃 재계산 */
  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener("resize", function () { updateFlipbookLayout(); });
    vv.addEventListener("scroll", function () { updateFlipbookLayout(); });
  }

  function onFullscreenChange() {
    document.body.classList.toggle("fullscreen-active", isFullscreen());
  }
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("webkitfullscreenchange", onFullscreenChange);
  document.addEventListener("mozfullscreenchange", onFullscreenChange);
  document.addEventListener("MSFullscreenChange", onFullscreenChange);

  $("#fullscreenBtn").on("click", function(e) {
    e.preventDefault();
    if (isFullscreen()) exitFullscreen();
    else requestFullscreen();
  });

  $("#bottomPrevBtn").click(function() {
    $("#flipbook").turn("previous");
  });

  $("#bottomNextBtn").click(function() {
    $("#flipbook").turn("next");
  });

  $("#firstPageBtn").click(function() {
    preloadAround(1, getPreloadRadius());
    $("#flipbook").turn("page", 1);
  });

  $("#lastPageBtn").click(function() {
    const lastPage = PAGE_FILES.length;
    preloadAround(lastPage, getPreloadRadius());
    $("#flipbook").turn("page", lastPage);
  });

  /* 페이지 번호: 클릭 시 input으로 편집 (contenteditable 대체, 모바일·태블릿 안정) */
  const $pageInputBox = $(".page-input-box");
  const $pageNumberInput = $("#pageNumberInput");
  var pageEditApplying = false;
  var pageEditMinViewportHeight = 0;
  var pageEditVvResizeId = null;

  function closePageEditMode(appliedPage) {
    var tid = $pageInputBox.data("blur-timeout-id");
    if (tid) clearTimeout(tid);
    $pageInputBox.removeData("blur-timeout-id");
    if (pageEditVvResizeId) clearTimeout(pageEditVvResizeId);
    pageEditVvResizeId = null;
    $pageInputBox.removeClass("editing");
    $pageNumberInput.val("");
    if (appliedPage != null) {
      updatePageUI(appliedPage, [appliedPage]);
    } else {
      const page = $("#flipbook").turn("page") || 1;
      const view = $("#flipbook").turn("view");
      updatePageUI(page, view);
    }
  }

  function applyPageAndClose() {
    if (pageEditApplying) return;
    if (!isPCHorizontal()) { closePageEditMode(null); return; }
    var tid = $pageInputBox.data("blur-timeout-id");
    if (tid) clearTimeout(tid);
    $pageInputBox.removeData("blur-timeout-id");
    if (pageEditVvResizeId) clearTimeout(pageEditVvResizeId);
    pageEditVvResizeId = null;
    pageEditApplying = true;

    const raw = $pageNumberInput.val().trim();
    const pageNum = parseInt(raw, 10);
    const maxPage = PAGE_FILES.length;
    const valid = !isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPage;

    if (valid) {
      preloadAround(pageNum, getPreloadRadius());
      $("#flipbook").turn("page", pageNum);
    }
    closePageEditMode(valid ? pageNum : null);
    pageEditApplying = false;
  }

  $(document).on("click", ".page-input-box .page-label, .page-input-box .page-number", function(e) {
    if (!isPCHorizontal()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if ($pageInputBox.hasClass("editing")) return;
    e.stopPropagation();

    const currentPage = $("#flipbook").turn("page") || 1;
    const $label = $("#pageLabel");
    const existingText = $label.find(".page-number").text() || String(currentPage);

    // 클릭 시에는 현재 표시된 페이지 텍스트(예: "02 - 03")를 그대로 input에 넣어준다.
    // 실제 페이지 이동은 applyPageAndClose()에서 parseInt로 처리하므로 동작은 유지된다.
    $pageNumberInput.val(existingText);
    $pageInputBox.addClass("editing");
    var vv = window.visualViewport;
    pageEditMinViewportHeight = vv ? vv.height : window.innerHeight;
    setTimeout(function() {
      $pageNumberInput[0].focus();
      $pageNumberInput[0].select();
    }, 50);
  });

  $pageNumberInput.on("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      applyPageAndClose();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closePageEditMode();
    }
  });

  $pageNumberInput.on("keypress", function(e) {
    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      applyPageAndClose();
    }
  });

  /* iOS Safari: 일부 기기에서 keydown 대신 keyup만 오는 케이스 대응 */
  $pageNumberInput.on("keyup", function(e) {
    if (e.key === "Enter" || e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      applyPageAndClose();
    }
  });

  /* iOS Safari: 완료 키가 change만 발생시키는 케이스 대응 */
  $pageNumberInput.on("change", function() {
    if (!$pageInputBox.hasClass("editing")) return;
    setTimeout(function() {
      if (!$pageInputBox.hasClass("editing")) return;
      applyPageAndClose();
    }, 0);
  });

  /* 폼 submit: 많은 기기에서 키보드 "완료"/"Go"가 form submit으로 옴 */
  $("#pageJumpForm").on("submit", function(e) {
    e.preventDefault();
    applyPageAndClose();
  });

  /* blur: PC는 즉시 적용, 모바일·태블릿은 값 반영 타이밍을 위해 지연 후 적용 */
  $pageNumberInput.on("blur", function() {
    if (!$pageInputBox.hasClass("editing")) return;
    var delay = isPCHorizontal() ? 0 : 400;
    var tid = setTimeout(function() {
      if (!$pageInputBox.hasClass("editing")) return;
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          if (!$pageInputBox.hasClass("editing")) return;
          applyPageAndClose();
        });
      });
    }, delay);
    $pageInputBox.data("blur-timeout-id", tid);
  });

  /* 모바일·태블릿: 파란 엔터가 이벤트 없이 키보드만 닫을 때 → viewport 높이 증가 감지 후 input blur로 넘김 */
  function handleViewportKeyboardClosed() {
    if (!$pageInputBox.hasClass("editing")) return;
    if (pageEditVvResizeId) clearTimeout(pageEditVvResizeId);
    pageEditVvResizeId = null;
    $pageNumberInput[0].blur();
  }

  if (window.visualViewport) {
    var checkViewportHeight = function() {
      if (!$pageInputBox.hasClass("editing")) return;
      var vv = window.visualViewport;
      var h = vv.height;
      if (h < pageEditMinViewportHeight) pageEditMinViewportHeight = h;
      var threshold = Math.max(40, pageEditMinViewportHeight * 0.1);
      if (h > pageEditMinViewportHeight + threshold) {
        if (pageEditVvResizeId) clearTimeout(pageEditVvResizeId);
        pageEditVvResizeId = setTimeout(handleViewportKeyboardClosed, 80);
      }
    };
    window.visualViewport.addEventListener("resize", checkViewportHeight);
    window.visualViewport.addEventListener("scroll", checkViewportHeight);
  }

  (function() {
    var resizeScheduled = false;
    $(window).on("resize", function() {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(function() {
        resizeScheduled = false;
        if ($pageInputBox.hasClass("editing") && !isPCHorizontal()) closePageEditMode(null);
        updateFlipbookLayout();
        setTimeout(function() {
          $("#flipbook .page").removeClass("even odd");
          $("#flipbook .page").each(function(index) {
            if ((index + 1) % 2 === 0) $(this).addClass("even");
            else $(this).addClass("odd");
          });
        }, 100);
      });
    });
  })();

  updatePageUI(1, [1]);
});