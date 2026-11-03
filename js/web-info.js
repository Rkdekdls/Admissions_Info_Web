const WebInfo = (() => {
  const skipClass = new Set([
    "page-footer",
    "chapter-number",
    "chapter-number-wrap",
    "accent-line",
    "chapter-list",
    "chapter-card",
    "main-title",
    "subtitle",
    "report-title",
  ]);

  function classes(el) {
    return el.classList ? [...el.classList] : [];
  }

  function hasClass(el, name) {
    return classes(el).includes(name);
  }

  function isSkipped(el) {
    return classes(el).some((name) => skipClass.has(name));
  }

  function isCard(el) {
    return classes(el).some((name) => /(?:box|card|block)$/.test(name) && name !== "text-body" && name !== "content-area");
  }

  function plainText(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function markup(el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll("script, style").forEach((node) => node.remove());
    clone.querySelectorAll("[style]").forEach((node) => node.removeAttribute("style"));
    clone.querySelectorAll("[class]").forEach((node) => node.removeAttribute("class"));
    return clone.innerHTML.trim();
  }

  function hasElement(el) {
    return [...el.children].some((child) => !isSkipped(child));
  }

  function makeText(html, className) {
    const node = document.createElement(className === "info-sub" || className === "info-title" || className === "info-chapter" ? "h3" : "p");
    if (className === "info-sub") node.tagName;
    const tag = className === "info-title" ? "h3" : className === "info-sub" ? "h4" : className === "info-chapter" ? "p" : "p";
    const el = document.createElement(tag);
    el.className = className;
    el.innerHTML = html;
    return el;
  }

  function headingNode(el) {
    const text = plainText(el);
    if (!text) return null;
    const chapter = /^(chapter|part)\b/i.test(text);
    return makeText(markup(el), chapter ? "info-chapter" : el.tagName === "H3" || hasClass(el, "title-3") || hasClass(el, "section-title") ? "info-sub" : "info-title");
  }

  function isHeading(el) {
    return ["H1", "H2", "H3", "H4"].includes(el.tagName) || classes(el).some((name) => ["title-2", "title-3", "main-title", "report-title", "section-title", "tip-title", "info-title"].includes(name));
  }

  function semanticStyle(el) {
    const style = el.getAttribute("style") || "";
    const kept = [];
    if (el.tagName === "TD") {
      const bg = style.match(/background(?:-color)?\s*:\s*([^;]+)/i);
      if (bg && !/transparent/i.test(bg[1])) kept.push(`background-color:${bg[1].trim()}`);
      const color = style.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i);
      if (color) kept.push(`color:${color[1].trim()}`);
    }
    return kept.join(";");
  }

  function tableNode(table) {
    const wrap = document.createElement("div");
    wrap.className = "info-table-wrap";
    const clone = table.cloneNode(true);
    clone.className = "info-table";
    clone.removeAttribute("style");
    clone.querySelectorAll("tr, th, td, thead, tbody").forEach((cell) => {
      const next = semanticStyle(cell);
      cell.removeAttribute("width");
      cell.removeAttribute("class");
      if (next) cell.setAttribute("style", next);
      else cell.removeAttribute("style");
    });
    wrap.appendChild(clone);
    return wrap;
  }

  function svgNode(svg) {
    const figure = document.createElement("figure");
    figure.className = "info-figure";
    const clone = svg.cloneNode(true);
    clone.removeAttribute("width");
    clone.removeAttribute("height");
    clone.removeAttribute("style");
    clone.setAttribute("class", "info-svg");
    figure.appendChild(clone);
    return figure;
  }

  function listNode(list, chips) {
    const ul = document.createElement("ul");
    ul.className = chips ? "info-chips" : "info-list";
    [...list.children].forEach((item) => {
      if (item.tagName !== "LI") return;
      const li = document.createElement("li");
      li.innerHTML = markup(item);
      if (plainText(li)) ul.appendChild(li);
    });
    return ul.children.length ? ul : null;
  }

  function yearList(el) {
    const wrap = document.createElement("div");
    wrap.className = "info-lines";
    el.querySelectorAll(".year-plan").forEach((plan) => {
      const label = plan.querySelector(".year-badge");
      const body = plan.querySelector(".year-plan-box") || plan;
      const arrow = plan.querySelector(".year-plan-arrow");
      const row = document.createElement("div");
      row.className = "info-line";
      const name = document.createElement("div");
      name.className = "info-line-label";
      name.textContent = `${label ? plainText(label) : ""}${arrow ? ` ${plainText(arrow) || "→"}` : ""}`.trim();
      const copy = document.createElement("p");
      copy.innerHTML = markup(body);
      row.append(name, copy);
      wrap.appendChild(row);
    });
    return wrap.children.length ? wrap : null;
  }

  function group(nodes) {
    const host = document.createElement("div");
    host.className = "info-block";
    nodes.forEach((node) => host.appendChild(node));
    const kids = [...host.children];
    let index = 0;
    while (index < kids.length) {
      const cardLike = kids[index].classList.contains("info-card");
      if (!cardLike) {
        index += 1;
        continue;
      }
      let end = index;
      while (end < kids.length && kids[end].classList.contains("info-card")) end += 1;
      if (end - index >= 2) {
        const grid = document.createElement("div");
        grid.className = "info-grid";
        kids[index].before(grid);
        for (let cursor = index; cursor < end; cursor += 1) grid.appendChild(kids[cursor]);
      }
      index = end;
    }
    if (host.children.length === 1) return host.firstElementChild;
    return host;
  }

  const inlineTags = new Set(["STRONG", "B", "EM", "I", "U", "SPAN", "BR", "A", "SUB", "SUP", "MARK", "SMALL", "WBR", "ABBR", "FONT"]);

  function convertChildren(el) {
    const out = [];
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === 3) {
        const text = node.textContent.replace(/\s+/g, " ").trim();
        if (!text) return;
        const paragraph = document.createElement("p");
        paragraph.className = "info-text";
        paragraph.textContent = text;
        out.push(paragraph);
        return;
      }
      if (node.nodeType !== 1 || isSkipped(node)) return;
      const converted = convert(node);
      if (converted) out.push(converted);
    });
    return out;
  }

  function convert(el) {
    if (!el || el.nodeType !== 1 || isSkipped(el)) return null;
    const tag = el.tagName.toUpperCase();
    if (hasClass(el, "year-plan-list")) return yearList(el);
    if (hasClass(el, "chapter-list")) return listNode(el, true);
    if (tag === "TABLE") return tableNode(el);
    if (tag === "SVG") return svgNode(el);
    if (tag === "UL" || tag === "OL") return listNode(el, false);
    if (isHeading(el)) return headingNode(el);

    const text = plainText(el);
    if (text === "→" || text === "➜" || text === "↓") {
      const arrow = document.createElement("span");
      arrow.className = "info-arrow";
      arrow.textContent = text === "↓" ? "↓" : "→";
      return arrow;
    }

    const rawChildren = [...el.children];
    const childElements = rawChildren.filter((child) => !isSkipped(child));
    if (!childElements.length) {
      if (rawChildren.length || !text) return null;
      return makeText(markup(el), "info-text");
    }
    if (childElements.every((child) => inlineTags.has(child.tagName))) {
      if (!text) return null;
      return makeText(markup(el), "info-text");
    }

    const converted = convertChildren(el);
    if (!converted.length) return null;

    const packed = [];
    converted.forEach((node) => {
      const short = node.classList.contains("info-text") && plainText(node).length < 48;
      const prev = packed[packed.length - 1];
      const prevFigure = prev && prev.classList.contains("info-figure") ? prev : null;
      if (short && prevFigure) {
        const caption = document.createElement("figcaption");
        caption.className = "info-caption";
        caption.innerHTML = node.innerHTML;
        prevFigure.appendChild(caption);
        return;
      }
      packed.push(node);
    });

    const hasFigure = packed.some((node) => node.classList.contains("info-figure") || node.querySelector(".info-figure"));
    const hasTable = packed.some((node) => node.classList.contains("info-table-wrap") || node.querySelector(".info-table-wrap"));
    const visualOnly = packed.every((node) => node.classList.contains("info-figure") || node.classList.contains("info-arrow") || (node.classList.contains("info-text") && plainText(node).length < 24));
    if (hasFigure && !hasTable && packed.length >= 2 && visualOnly) {
      const row = document.createElement("div");
      row.className = "info-row";
      packed.forEach((node) => row.appendChild(node));
      return row;
    }

    const block = group(packed);
    if (isCard(el) && block) {
      if (block.classList.contains("info-card")) return block;
      const card = document.createElement("div");
      card.className = "info-card";
      card.appendChild(block);
      return card;
    }
    return block;
  }

  function render(doc) {
    const page = doc.querySelector(".page");
    if (!page) return null;
    const article = document.createElement("article");
    article.className = "info-flow";
    const nodes = [...page.children].map(convert).filter(Boolean);
    const packed = group(nodes);
    if (!packed) return null;
    if (packed.classList.contains("info-flow") || packed.classList.contains("info-block") || packed.classList.contains("info-grid")) {
      [...packed.childNodes].forEach((node) => article.appendChild(node));
    } else {
      article.appendChild(packed);
    }
    polish(article);
    return article;
  }

  function isEmojiOnly(text) {
    const compact = [...text.replace(/\s/g, "")];
    if (!compact.length || compact.length > 8) return false;
    return /\p{Extended_Pictographic}/u.test(text) || /\d\uFE0F?\u20E3/.test(text);
  }

  function featureGrid(block) {
    const kids = [...block.children];
    if (kids.length < 2 || !kids.every((kid) => kid.classList.contains("info-block"))) return null;
    const parsed = kids.map((kid) => {
      const texts = [...kid.children].filter((child) => child.classList.contains("info-text"));
      if (texts.length < 2 || texts.length > 3 || texts.length !== kid.children.length) return null;
      if (!isEmojiOnly(texts[0].textContent)) return null;
      return texts;
    });
    if (parsed.some((item) => !item)) return null;
    const grid = document.createElement("div");
    grid.className = "feature-grid";
    parsed.forEach((texts) => {
      const card = document.createElement("article");
      card.className = "feature-card";
      const icon = document.createElement("div");
      icon.className = "feature-icon";
      icon.textContent = texts[0].textContent.trim();
      const name = document.createElement("h4");
      name.className = "feature-name";
      name.innerHTML = texts[1].innerHTML;
      card.append(icon, name);
      if (texts[2]) {
        const desc = document.createElement("p");
        desc.className = "feature-desc";
        desc.innerHTML = texts[2].innerHTML;
        card.append(desc);
      }
      grid.append(card);
    });
    return grid;
  }

  function barCompare(block) {
    const kids = [...block.children];
    if (kids.length < 2 || kids.length > 4 || !kids.every((kid) => kid.classList.contains("info-block"))) return null;
    const parsed = kids.map((kid) => {
      const texts = [...kid.children];
      if (texts.length !== 2 || !texts.every((child) => child.classList.contains("info-text"))) return null;
      const value = texts[0].textContent.trim();
      const label = texts[1].textContent.trim();
      const num = parseFloat(value.replace(/[^\d.]/g, ""));
      if (!/^(?:약\s*)?[\d.,]+(?:\s*대\s*[\d.,]+)?\s*[%점회명개배원]?$/.test(value) || !num || label.length > 18) return null;
      return { value, label, num };
    });
    if (parsed.some((item) => !item)) return null;
    const max = Math.max(...parsed.map((item) => item.num));
    const wrap = document.createElement("div");
    wrap.className = "bar-compare";
    parsed.forEach((item, index) => {
      const col = document.createElement("div");
      col.className = "bar-col";
      const value = document.createElement("div");
      value.className = "bar-value";
      value.textContent = item.value;
      const track = document.createElement("div");
      track.className = "bar-track";
      const fill = document.createElement("div");
      fill.className = index === parsed.length - 1 ? "bar-fill is-accent" : "bar-fill";
      fill.style.height = `${Math.max(28, Math.round((item.num / max) * 112))}px`;
      track.append(fill);
      const label = document.createElement("div");
      label.className = "bar-label";
      label.textContent = item.label;
      col.append(value, track, label);
      wrap.append(col);
    });
    return wrap;
  }

  function stepFlow(block) {
    const kids = [...block.children];
    const steps = [];
    kids.forEach((kid) => {
      if (kid.classList.contains("info-arrow")) return;
      const texts = [...kid.children].filter((child) => child.classList.contains("info-text"));
      if (!kid.classList.contains("info-block") || texts.length !== 2 || texts.length !== kid.children.length) {
        steps.push(null);
        return;
      }
      if (!isEmojiOnly(texts[0].textContent) || plainText(texts[1]).length > 18) {
        steps.push(null);
        return;
      }
      steps.push(texts);
    });
    if (steps.length < 3 || steps.some((step) => !step)) return null;
    const flow = document.createElement("div");
    flow.className = "step-flow";
    steps.forEach((texts, index) => {
      if (index) {
        const arrow = document.createElement("span");
        arrow.className = "info-arrow";
        arrow.textContent = "→";
        flow.append(arrow);
      }
      const item = document.createElement("div");
      item.className = "step-item";
      const icon = document.createElement("div");
      icon.className = "step-icon";
      icon.textContent = texts[0].textContent.trim();
      const name = document.createElement("div");
      name.className = "step-name";
      name.innerHTML = texts[1].innerHTML;
      item.append(icon, name);
      flow.append(item);
    });
    return flow;
  }

  function statRow(block) {
    const kids = [...block.children];
    if (kids.length < 3 || kids.length > 7) return null;
    const parts = [];
    for (const kid of kids) {
      const op = kid.classList.contains("info-text") ? kid.textContent.trim() : "";
      if (op === "+" || op === "=") {
        parts.push({ op });
        continue;
      }
      if (!kid.classList.contains("info-block") || kid.querySelector(".info-list, .info-table, .info-sub, .info-title")) return null;
      const texts = [...kid.querySelectorAll(".info-text")];
      if (texts.length < 2 || texts.length > 3 || texts.some((text) => plainText(text).length > 40)) return null;
      parts.push({ texts });
    }
    const stats = parts.filter((part) => part.texts);
    const ops = parts.filter((part) => part.op);
    if (stats.length < 2 || !ops.length || stats.length !== ops.length + 1) return null;
    const row = document.createElement("div");
    row.className = "stat-row";
    parts.forEach((part) => {
      if (part.op) {
        const op = document.createElement("div");
        op.className = "stat-op";
        op.textContent = part.op;
        row.append(op);
        return;
      }
      const card = document.createElement("article");
      card.className = "stat-card";
      const head = document.createElement("h4");
      head.innerHTML = part.texts[0].innerHTML;
      const value = document.createElement("div");
      value.className = "stat-value";
      value.innerHTML = part.texts[1].innerHTML;
      card.append(head, value);
      if (part.texts[2]) {
        const note = document.createElement("div");
        note.className = "stat-note";
        note.innerHTML = part.texts[2].innerHTML;
        card.append(note);
      }
      row.append(card);
    });
    return row;
  }

  function statCluster(block) {
    const kids = [...block.children];
    if (kids.length < 2 || kids.length > 4) return null;
    const parsed = kids.map((kid) => {
      if (!kid.classList.contains("info-block") || kid.querySelector(".info-list, .info-table, .info-sub, .info-title, .info-grid")) return null;
      const texts = [...kid.children].filter((child) => child.classList.contains("info-text"));
      if (texts.length < 2 || texts.length > 3 || texts.length !== kid.children.length) return null;
      if (plainText(texts[0]).length > 24) return null;
      if (texts.some((text) => plainText(text).length > 90)) return null;
      return texts;
    });
    if (parsed.some((item) => !item)) return null;
    const grid = document.createElement("div");
    grid.className = "info-grid";
    parsed.forEach((texts) => {
      const card = document.createElement("article");
      card.className = "info-card";
      texts.forEach((text, index) => {
        const line = document.createElement("p");
        const note = index === texts.length - 1 && texts.length > 2 && plainText(text).length <= 18;
        line.className = index === 0 ? "info-text card-badge" : note ? "info-text card-note" : "info-text";
        line.innerHTML = text.innerHTML;
        card.append(line);
      });
      grid.append(card);
    });
    return grid;
  }

  function splitRow(block) {
    const kids = [...block.children];
    if (kids.length !== 2) return false;
    if (kids.some((kid) => kid.querySelector(".info-table, .info-grid, .step-flow, .bar-compare"))) return false;
    const lengths = kids.map((kid) => plainText(kid).length);
    const short = lengths.findIndex((length) => length > 0 && length <= 18);
    if (short !== 1 || lengths[0] < 24) return false;
    block.classList.add("info-split");
    kids[1].classList.add("is-aside");
    const lead = kids[0].querySelector(":scope > .info-text, .info-text");
    if (lead && plainText(lead).length <= 20) lead.classList.add("info-kicker");
    return true;
  }

  function columnCompare(block) {
    const kids = [...block.children];
    if (kids.length < 2 || kids.length > 4) return null;
    if (!kids.every((kid) => kid.classList.contains("info-block"))) return null;
    const cols = kids.map((col) => {
      const head = [...col.children].find((child) => child.classList.contains("info-text"));
      const body = [...col.children].find((child) => child.classList.contains("info-block"));
      const extra = [...col.children].filter((child) => child !== head && child !== body);
      if (!head || !body || extra.length || plainText(head).length > 42) return null;
      const lines = [...body.children];
      if (!lines.length || lines.length > 4 || !lines.every((line) => line.classList.contains("info-text"))) return null;
      return { head, lines };
    });
    if (cols.some((col) => !col)) return null;
    const row = document.createElement("div");
    row.className = "compare-row";
    cols.forEach((col, index) => {
      const card = document.createElement("article");
      card.className = index === cols.length - 1 ? "compare-col is-accent" : "compare-col";
      const title = document.createElement("h4");
      title.innerHTML = col.head.innerHTML;
      card.append(title);
      const long = col.lines.some((line) => plainText(line).length > 28);
      col.lines.forEach((line, lineIndex) => {
        const copy = document.createElement("p");
        const pointed = plainText(line).startsWith("→") || (long && lineIndex === col.lines.length - 1 && plainText(line).length <= 36);
        if (!long && lineIndex === 0) copy.className = "compare-value";
        else if (pointed || (!long && lineIndex > 0)) copy.className = "compare-note";
        else copy.className = "compare-body";
        copy.innerHTML = line.innerHTML;
        card.append(copy);
      });
      row.append(card);
    });
    return row;
  }

  function pairGrid(block) {
    const kids = [...block.children];
    if (kids.length < 4 || kids.length % 2 || kids.length > 8) return null;
    const pairs = [];
    for (let index = 0; index < kids.length; index += 2) {
      const title = kids[index];
      const body = kids[index + 1];
      const titled = title.classList.contains("info-title") || title.classList.contains("info-sub");
      if (!titled || !body.classList.contains("info-text") || plainText(title).length > 36) return null;
      pairs.push({ title, body });
    }
    const grid = document.createElement("div");
    grid.className = "info-grid";
    pairs.forEach((pair) => {
      const card = document.createElement("article");
      card.className = "info-card point-card";
      card.append(pair.title, pair.body);
      grid.append(card);
    });
    return grid;
  }

  function replaceBlock(block, next) {
    const parent = block.parentElement;
    if (parent?.classList.contains("info-card") && parent.children.length === 1) parent.replaceWith(next);
    else block.replaceWith(next);
  }

  function listGrid(block) {
    const kids = [...block.children];
    if (kids.length < 2 || kids.length > 4) return null;
    if (!kids.every((kid) => kid.classList.contains("info-block") && kid.querySelector(":scope > .info-list") && kid.querySelector(":scope > .info-sub, :scope > .info-title"))) return null;
    const grid = document.createElement("div");
    grid.className = "info-grid";
    kids.forEach((kid) => {
      const card = document.createElement("div");
      card.className = "info-card";
      while (kid.firstChild) card.appendChild(kid.firstChild);
      grid.append(card);
    });
    return grid;
  }

  function qaFromCard(card) {
    const bits = [...card.querySelectorAll(".info-text, .info-title, .info-sub")];
    const number = bits.find((bit) => /^(?:CASE\s*)?\d{1,2}$/i.test(bit.textContent.trim()));
    if (!number) return null;
    const raw = number.textContent.trim().replace(/\s+/g, " ");
    const rest = bits.filter((bit) => bit !== number);
    if (rest.length < 2) return null;
    const digits = raw.match(/\d{1,2}/)[0].padStart(2, "0");
    return {
      num: /^CASE/i.test(raw) ? `CASE ${digits}` : digits,
      title: rest[0].innerHTML,
      body: rest.slice(1).map((bit) => bit.innerHTML).join("<br>"),
    };
  }

  function polish(root) {
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const feature = featureGrid(block);
      if (feature) block.replaceWith(feature);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const bars = barCompare(block);
      if (bars) block.replaceWith(bars);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const flow = stepFlow(block);
      if (flow) block.replaceWith(flow);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const row = statRow(block);
      if (row) block.replaceWith(row);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const cluster = statCluster(block);
      if (cluster) block.replaceWith(cluster);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const grid = listGrid(block);
      if (grid) block.replaceWith(grid);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const row = columnCompare(block);
      if (row) replaceBlock(block, row);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => {
      const grid = pairGrid(block);
      if (grid) replaceBlock(block, grid);
    });
    [...root.querySelectorAll(".info-block")].forEach((block) => splitRow(block));

    root.querySelectorAll(".info-card").forEach((card) => {
      const qa = qaFromCard(card);
      if (!qa) return;
      card.className = "qa-card";
      card.innerHTML = "";
      const top = document.createElement("div");
      top.className = "qa-top";
      const num = document.createElement("span");
      num.className = qa.num.startsWith("CASE") ? "qa-num is-case" : "qa-num";
      num.textContent = qa.num;
      const title = document.createElement("h4");
      title.className = "qa-title";
      title.innerHTML = qa.title;
      top.append(num, title);
      const body = document.createElement("p");
      body.className = "qa-body";
      body.innerHTML = qa.body;
      card.append(top, body);
    });

    root.querySelectorAll(".info-block").forEach((block) => {
      const grids = [...block.children];
      if (grids.length !== 2) return;
      const columns = grids.map((grid) => [...grid.children]);
      if (!columns.every((col) => col.length && col.every((card) => card.classList.contains("qa-card")))) return;
      const merged = document.createElement("div");
      merged.className = "qa-grid";
      const length = Math.max(columns[0].length, columns[1].length);
      for (let index = 0; index < length; index += 1) {
        columns.forEach((col) => {
          if (col[index]) merged.append(col[index]);
        });
      }
      block.replaceWith(merged);
    });

    root.querySelectorAll(".info-grid").forEach((grid) => {
      if ([...grid.children].every((card) => card.classList.contains("qa-card"))) {
        grid.classList.add("qa-grid");
      }
    });

    root.querySelectorAll(".info-card").forEach((card) => {
      const scope = card.children.length === 1 && card.firstElementChild?.classList.contains("info-block")
        ? card.firstElementChild
        : card;
      const lead = scope.firstElementChild;
      if (!lead?.classList.contains("info-text")) return;
      if (lead.textContent.trim().length > 22 || scope.children.length < 2) return;
      lead.classList.add("card-badge");
    });

    root.querySelectorAll(".info-text").forEach((line) => {
      const label = line.textContent.trim();
      if (/^[\d·]+학년$/.test(label)) {
        line.classList.add("info-band");
        line.classList.remove("card-badge");
      }
    });

    balanceColumns(root);
  }

  function isCompactCard(node) {
    if (!node.classList?.contains("info-card")) return false;
    if (node.querySelector(".info-table, .info-figure, .info-row, .bar-compare, .info-band, .info-lines, .step-flow, .info-chips, .info-list, .info-grid, .stat-row")) return false;
    const length = plainText(node).length;
    return length > 0 && length <= 240;
  }

  function balanceColumns(root) {
    root.querySelectorAll(".info-card").forEach((card) => {
      if (card.closest(".feature-grid, .qa-grid, .compare-row, .stat-row")) return;
      if (card.querySelector(".info-table, .info-band, .info-lines")) return;
      const host = card.children.length === 1 && card.firstElementChild?.classList.contains("info-block")
        ? card.firstElementChild
        : card;
      const visual = [...host.children].find((child) => child.classList.contains("bar-compare") || child.classList.contains("info-figure") || child.classList.contains("info-row"));
      if (!visual) return;
      const grid = card.parentElement?.classList.contains("info-grid") ? card.parentElement : null;
      if (grid) {
        if (grid.firstElementChild === card) grid.before(card);
        else grid.after(card);
        if (grid.children.length === 1) grid.replaceWith(grid.firstElementChild);
        else if (!grid.children.length) grid.remove();
      }
      card.classList.add("is-chart");
      host.classList.add("is-chart");
    });

    const flows = root.classList.contains("info-flow")
      ? [root, ...root.querySelectorAll(".info-flow")]
      : [...root.querySelectorAll(".info-flow")];
    flows.forEach((flow) => {
      const kids = [...flow.children];
      let index = 0;
      while (index < kids.length) {
        if (!isCompactCard(kids[index])) {
          index += 1;
          continue;
        }
        let end = index + 1;
        while (end < kids.length && isCompactCard(kids[end])) end += 1;
        if (end - index >= 2) {
          const grid = document.createElement("div");
          grid.className = "info-grid is-two";
          kids[index].before(grid);
          for (let cursor = index; cursor < end; cursor += 1) grid.appendChild(kids[cursor]);
        }
        index = end;
      }
    });

    root.querySelectorAll(".info-list").forEach((list) => {
      if (list.closest(".info-grid, .feature-grid, .qa-grid, .compare-row")) return;
      const items = [...list.children];
      if (items.length < 2 || items.length > 6) return;
      if (items.some((item) => plainText(item).length > 80)) return;
      list.classList.add("is-two");
    });

    root.querySelectorAll(".info-lines").forEach((lines) => {
      const count = lines.children.length;
      if (count >= 2 && count <= 4) lines.classList.add("is-two");
    });
  }

  const bookVars = `
    :host {
      --color-primary: #3B82F6;
      --color-primary-light: #60A5FA;
      --color-primary-dark: #2563EB;
      --color-accent: #FF6B35;
      --color-accent-light: #FF8C5A;
      --color-text: #1F2937;
      --color-text-light: #6B7280;
      --color-text-lighter: #9CA3AF;
      --color-bg: #FFFFFF;
      --color-bg-warm: #FAFAFA;
      --color-bg-blue: #E3F2FD;
      --color-border: #E5E7EB;
      --color-border-light: #F0F0F0;
      --color-shadow: rgba(0, 0, 0, 0.06);
      --color-grey: #9E9E9E;
      --font-family: "Noto Sans KR", Pretendard, sans-serif;
      --page-padding-top: 0;
      --page-padding-bottom: 0;
      --page-padding-left: 0;
      --page-padding-right: 0;
      --spacing-standard: 3mm;
      display: block;
      width: 100%;
      color: var(--color-text);
      font-family: var(--font-family);
    }
    .page,
    .content-area,
    [class$="-page"] {
      width: 100% !important;
      max-width: none !important;
      height: auto !important;
      min-height: 0 !important;
      overflow: visible !important;
      border: 0 !important;
      box-shadow: none !important;
      margin: 0 !important;
    }
    .page-footer,
    .main-title,
    .subtitle,
    .chapter-card,
    .chapter-list,
    .chapter-number,
    .chapter-number-wrap,
    .accent-line,
    .report-title {
      display: none !important;
    }
    .page > :first-child {
      margin-top: 0 !important;
    }
    .page > :last-child {
      margin-bottom: 0 !important;
    }
    .section-heading {
      margin-top: 18px !important;
      margin-bottom: 18px !important;
    }
    .page > .section-heading:first-child,
    .page > :first-child > .section-heading:first-child {
      margin-top: 0 !important;
    }
    .page > .section-heading:last-child,
    .page > :last-child > .section-heading:last-child {
      margin-bottom: 0 !important;
    }
    .section-heading + * {
      margin-top: 0 !important;
    }
    :has(+ .section-heading) {
      margin-bottom: 0 !important;
    }
    .flow-row,
    .icon-grid {
      display: flex !important;
      width: 100% !important;
      align-items: stretch !important;
      justify-content: stretch !important;
      gap: 8px !important;
      box-sizing: border-box !important;
    }
    .icon-grid {
      margin: 8px 0 16px !important;
    }
    .flow-row > .flow-item,
    .icon-grid > .flow-item {
      flex: 1 1 0 !important;
      min-width: 0 !important;
      width: auto !important;
      display: flex !important;
      align-items: stretch !important;
      justify-content: stretch !important;
    }
    .flow-card {
      width: 100% !important;
      height: auto !important;
      border: 2px solid var(--color-primary) !important;
      border-radius: 0 !important;
      background: #fff !important;
      padding: 14px 8px !important;
      transform: none !important;
      box-sizing: border-box !important;
    }
    .flow-row {
      gap: 3.5mm !important;
    }
    .flow-row .flow-card {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      height: 100% !important;
    }
    .flow-row .flow-card > * {
      margin-top: 0 !important;
      text-align: center !important;
    }
    .flow-row .flow-card > :last-child {
      margin-bottom: 0 !important;
    }
    .flow-row > .flow-arrow {
      flex: 0 0 5mm !important;
      width: 5mm !important;
      align-self: center !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      margin: 0 !important;
      color: #6b7280 !important;
      font-family: "Noto Sans KR", Pretendard, sans-serif !important;
      font-size: 16px !important;
      font-weight: 400 !important;
      line-height: normal !important;
      transform: none !important;
    }
    .icon-grid {
      align-items: flex-start !important;
      gap: 4mm !important;
      margin: 1mm 0 0 !important;
    }
    .icon-grid + .report-box {
      margin-top: 4mm !important;
    }
    .icon-grid .flow-card {
      border: 1px solid #E5E7EB !important;
      border-radius: 0 !important;
      padding: 3mm 4mm !important;
    }
    .icon-grid .flow-card > div:first-child {
      font-size: 18px !important;
      margin: 0 0 1.5mm !important;
    }
    .icon-grid .flow-card > div:nth-child(2) {
      font-size: 15px !important;
      font-weight: 700 !important;
      color: #3B82F6 !important;
      margin: 0 0 2mm !important;
    }
    .icon-grid .flow-card > div:nth-child(3) {
      font-size: 15px !important;
      color: #6b7280 !important;
      line-height: 1.6 !important;
      margin: 0 !important;
    }
    .curriculum-table,
    .curriculum-table th,
    .curriculum-table td {
      font-size: 15px !important;
      line-height: 1.5 !important;
    }
    .curriculum-table tbody td {
      padding: 2mm !important;
      font-size: 15px !important;
    }
    .curriculum-table thead th {
      padding: 3mm 2mm !important;
      font-size: 15px !important;
      font-weight: 600 !important;
    }
    .year-badge {
      min-width: 32mm !important;
    }
  `;

  function embedPage(doc) {
    const page = doc.querySelector(".page");
    if (!page) return null;
    page.querySelectorAll(".page-footer, .main-title, .subtitle, .chapter-card, .chapter-list, .chapter-number, .chapter-number-wrap, .accent-line, .report-title").forEach((node) => node.remove());
    const chapter = page.querySelector(".title-2");
    if (chapter) {
      page.querySelectorAll(".text-body, .info-box").forEach((node) => {
        if (chapter.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_PRECEDING) node.remove();
      });
    }
    page.querySelectorAll(".title-2").forEach((node) => node.remove());
    page.querySelectorAll(".title-3").forEach((node) => {
      if (/^\s*\d+\s*-\s*\d+/.test(node.textContent || "")) node.classList.add("section-heading");
    });
    page.querySelectorAll(".icon-grid").forEach((grid) => {
      [...grid.children].forEach((item) => {
        item.classList.add("flow-item");
        const card = item.querySelector("div");
        if (card) card.classList.add("flow-card");
      });
    });
    page.querySelectorAll("div").forEach((node) => {
      if (node.closest(".icon-grid")) return;
      const style = node.getAttribute("style") || "";
      if (!/border-radius:\s*50%/.test(style) || !/width:\s*\d+mm/.test(style)) return;
      node.classList.add("flow-card");
      const item = node.parentElement;
      const row = item && item.parentElement;
      if (!item || !row) return;
      item.classList.add("flow-item");
      row.classList.add("flow-row");
    });
    page.querySelectorAll("div").forEach((node) => {
      if (node.closest(".grade-track")) return;
      if ((node.textContent || "").trim() !== "기초 학업역량 평가") return;
      if (!(node.getAttribute("style") || "").includes("border")) return;
      node.style.alignSelf = "center";
      const row = node.parentElement;
      if (!row) return;
      row.style.marginTop = "0";
      row.style.alignItems = "center";
      const col = [...row.children].find((el) => el !== node);
      const subject = col && col.querySelector(".text-small");
      if (subject) subject.style.marginBottom = "0";
      const card = row.parentElement;
      const fusion = [...page.querySelectorAll("div")].find((el) => (el.textContent || "").trim() === "융합 사고력 평가");
      const fusionPad = fusion && fusion.parentElement && (fusion.parentElement.getAttribute("style") || "").match(/padding:\s*([0-9.]+mm)/);
      const gap = fusionPad ? fusionPad[1] : "3mm";
      if (card) {
        card.style.paddingTop = gap;
        card.style.paddingBottom = gap;
      }
    });
    page.querySelectorAll("div").forEach((node) => {
      if (node.closest(".icon-grid")) return;
      if ((node.textContent || "").trim() !== "→") return;
      const row = node.parentElement;
      if (!row || row.closest(".icon-grid") || row.classList.contains("year-plan") || row.classList.contains("grade-track") || row.closest(".chart-compare") || row.querySelector("svg")) return;
      row.classList.add("flow-row");
      [...row.children].forEach((child) => {
        if ((child.textContent || "").trim() === "→") {
          child.classList.add("flow-arrow");
          return;
        }
        child.classList.add("flow-item");
        const card = [...child.children].find((el) => el.tagName === "DIV");
        if (card) card.classList.add("flow-card");
      });
    });

    /* 비교 차트 화살표: PC는 →, 모바일 세로 배치 시 ↓ */
    page.querySelectorAll(".chart-compare").forEach((compare) => {
      [...compare.children].forEach((child) => {
        const text = (child.textContent || "").replace(/\s+/g, "");
        if (text === "→" || text.includes("→")) child.classList.add("chart-arrow");
      });
    });

    /* 모바일 세로 스택용: 가로 flex 행·학년 트랙 안 3열 표시 */
    page.querySelectorAll(".grade-track").forEach((track) => {
      [...track.children].forEach((child) => {
        if ((child.textContent || "").trim() === "→") child.classList.add("mobile-stack-arrow");
      });
      track.querySelectorAll("div").forEach((inner) => {
        const style = inner.getAttribute("style") || "";
        if (!/display:\s*flex/i.test(style) || /flex-direction:\s*column/i.test(style)) return;
        const kids = [...inner.children];
        if (kids.length < 3) return;
        if (!kids.every((kid) => /flex:\s*1/.test(kid.getAttribute("style") || ""))) return;
        inner.classList.add("mobile-stack-split");
      });
    });

    page.querySelectorAll("div").forEach((node) => {
      if (
        node.classList.contains("flow-row") ||
        node.classList.contains("icon-grid") ||
        node.classList.contains("comparison-container") ||
        node.classList.contains("grade-track") ||
        node.classList.contains("year-plan") ||
        node.classList.contains("year-plan-list") ||
        node.classList.contains("chart-compare") ||
        node.classList.contains("mobile-stack") ||
        node.classList.contains("mobile-stack-split") ||
        node.closest(".chart-compare") ||
        node.closest(".flow-row") ||
        node.closest(".year-plan") ||
        node.querySelector("svg") ||
        node.querySelector("table")
      ) {
        return;
      }
      const style = node.getAttribute("style") || "";
      if (!/display:\s*flex/i.test(style) || /flex-direction:\s*column/i.test(style)) return;
      const kids = [...node.children];
      if (kids.length < 2) return;
      const sideBySide = kids.filter((child) => {
        const childStyle = child.getAttribute("style") || "";
        return (
          /flex:\s*1/.test(childStyle) ||
          child.classList.contains("section-block") ||
          child.classList.contains("comparison-card") ||
          child.classList.contains("guide-card") ||
          child.classList.contains("credit-card")
        );
      }).length;
      if (sideBySide < 2 && kids.length < 3) return;
      node.classList.add("mobile-stack");
      kids.forEach((child) => {
        if ((child.textContent || "").trim() === "→") child.classList.add("mobile-stack-arrow");
      });
    });

    if (!plainText(page)) return null;
    const sheet = document.createElement("div");
    sheet.className = "book-sheet";
    const shadow = sheet.attachShadow({ mode: "open" });
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/page.css?v=36";
    const extra = document.createElement("style");
    extra.textContent = `${[...doc.querySelectorAll("style")].map((node) => node.textContent).join("\n")}\n${bookVars}
@media (max-width: 860px) {
  /* 플로우(과목선택→…): 세로 배치 + 박스 양측(가로) 맞춤 */
  .flow-row {
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: flex-start !important;
    gap: 2mm !important;
    width: 100% !important;
  }
  .flow-row > .flow-item {
    flex: 0 0 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    justify-content: stretch !important;
  }
  .flow-row > .flow-arrow {
    flex: 0 0 auto !important;
    width: auto !important;
    align-self: center !important;
    transform: rotate(90deg) !important;
    padding: 0.5mm 0 !important;
    font-size: 14px !important;
  }
  .flow-row .flow-card {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: 56px !important;
    margin: 0 !important;
    padding: 10px 12px !important;
  }
  .flow-row .flow-card > div:first-child {
    font-size: 18px !important;
    margin: 0 0 2px !important;
  }
  .flow-row .flow-card > div:last-child,
  .flow-row .flow-card > *:last-child {
    font-size: 14px !important;
    line-height: 1.3 !important;
  }
  .icon-grid {
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: flex-start !important;
    gap: 3mm !important;
    width: 100% !important;
  }
  .icon-grid > .flow-item {
    flex: 1 1 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    justify-content: center !important;
  }
  .icon-grid .flow-card {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: 72px !important;
  }
  .comparison-container,
  .checkpoint-container {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 4mm !important;
  }
  .checkpoint-container {
    gap: 2mm !important;
  }
  .checkpoint-container .tip-box,
  .checkpoint-box .tip-box {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }
  .comparison-card,
  .checkpoint-box {
    width: 100% !important;
    min-width: 0 !important;
    flex: 1 1 auto !important;
  }
  .grade-track {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 3mm !important;
  }
  .grade-track > *:not(.mobile-stack-arrow) {
    flex: 1 1 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }
  .mobile-stack-split {
    flex-direction: column !important;
  }
  .mobile-stack-split > * {
    border-left: none !important;
  }
  .mobile-stack-split > * + * {
    border-top: 1px solid #E5E7EB !important;
  }
  .chart-compare {
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: flex-end !important;
    justify-content: center !important;
    height: auto !important;
    min-height: 0 !important;
    gap: 3mm !important;
    padding: 3mm 1mm !important;
  }
  .chart-compare > div:not(.chart-arrow) {
    width: 22mm !important;
    flex: 0 0 22mm !important;
  }
  .chart-compare svg {
    width: 22mm !important;
    height: 22mm !important;
  }
  .chart-compare > .chart-arrow {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 4mm !important;
    flex: 0 0 4mm !important;
    height: 22mm !important;
    margin: 0 0 12px !important;
    padding: 0 !important;
    font-size: 14px !important;
    color: #6b7280 !important;
    transform: none !important;
  }
  .chart-compare > .chart-arrow::before {
    content: none !important;
  }
  .chart-compare > .chart-arrow * {
    transform: none !important;
  }
  .report-box > .title-3 {
    margin-bottom: 4mm !important;
  }
  /* 표: 줄바꿈 없이 좌우 스크롤 (창의적 체험표 제외) */
  .table-scroll {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    width: 100% !important;
    max-width: 100% !important;
  }
  .table-scroll > table:not(.creative-activity-table),
  .table-scroll > .comparison-table:not(.creative-activity-table),
  .table-scroll > .comparison-table.curriculum-table:not(.creative-activity-table) {
    table-layout: auto !important;
    width: max-content !important;
    min-width: 190mm !important;
    max-width: none !important;
  }
  .table-scroll > table:not(.creative-activity-table) th,
  .table-scroll > table:not(.creative-activity-table) td {
    white-space: nowrap !important;
    word-break: keep-all !important;
  }
  /* 창의적 체험(모바일): PC와 동일, 스크롤만 */
  .table-scroll:has(> .creative-activity-table) {
    overflow-x: auto !important;
  }
  .table-scroll > table.creative-activity-table {
    table-layout: fixed !important;
    width: 720px !important;
    min-width: 720px !important;
    max-width: none !important;
  }
  .table-scroll > table.creative-activity-table th,
  .table-scroll > table.creative-activity-table td,
  .table-scroll > table.creative-activity-table td > div {
    white-space: normal !important;
    min-width: 0 !important;
  }
  .list-check li::before,
  .tip-box .list-check li::before,
  .info-box .list-check li::before,
  .section-content li::before,
  .section-content li:before,
  .section-block .section-content li::before,
  .section-block .section-content li:before,
  .comparison-card .section-content li::before,
  .comparison-card .section-content li:before,
  .comparison-card .section-content ul ul li::before,
  .credit-card-content li::before,
  .credit-card-content li:before {
    top: 0.25em !important;
    transform: none !important;
    line-height: 1 !important;
  }
}

table:not(.mistake-table) th,
table:not(.mistake-table) td {
  height: 12mm !important;
  padding-top: calc((12mm - 1lh) / 2) !important;
  padding-bottom: calc((12mm - 1lh) / 2) !important;
  vertical-align: middle !important;
  box-sizing: border-box !important;
}
table.eval-process-table td {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  line-height: 1.5 !important;
}
table th,
table th *,
table td,
table td * {
  font-size: 15px !important;
}
.text-small,
.info-box, .info-box *,
.tip-box, .tip-box *,
.info-title, .tip-title,
.info-title::before, .tip-title::before,
.section-block, .section-block *,
.section-content, .section-content *,
.section-content li::before,
.section-title,
.comparison-card, .comparison-card *,
.comparison-card .section-content li::before,
.card-title, .card-header, .card-grade, .card-revision,
.credit-card, .credit-card *,
.guide-card, .guide-card *,
.guide-text, .guide-title, .guide-example, .guide-content, .guide-number,
.conclusion-box, .conclusion-box *,
.flow-card, .flow-card *,
.report-box, .report-box *,
.list-check, .list-check li, .list-check li::before,
.mistake-number, .mistake-content, .mistake-title, .mistake-explanation,
li::before {
  font-size: 15px !important;
}
.info-box, .info-box *,
.tip-box, .tip-box *,
.info-title::before, .tip-title::before,
.tip-box .list-check li::before,
.info-box .list-check li::before {
  font-size: 15px !important;
}
.card-year,
.card-subtitle,
.comparison-card .card-year,
.comparison-card .card-subtitle,
.card-header .card-year,
.card-header .card-subtitle {
  font-size: 13px !important;
}
.pie-label {
  font-size: 13px !important;
}
@media (max-width: 860px) {
  .pie-label {
    font-size: 15px !important;
  }
}
/* 불릿·체크: 여러 줄이어도 첫 줄 왼쪽에 고정 (세로 중앙 정렬 금지) */
.section-content li::before,
.section-content li:before,
.section-block .section-content li::before,
.section-block .section-content li:before,
.comparison-card .section-content li::before,
.comparison-card .section-content li:before,
.comparison-card .section-content ul ul li::before,
.comparison-card .section-content ul ul li:before,
.credit-card-content li::before,
.credit-card-content li:before,
.list-check li::before,
.tip-box .list-check li::before,
.info-box .list-check li::before {
  top: 0.25em !important;
  transform: none !important;
  line-height: 1 !important;
}
*, *::before, *::after {
  border-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.section-number:not(.chapter-number),
.icon-card,
.simple-icon-circle,
.side-circle {
  border-radius: 50% !important;
}
[style*="border-radius: 50%"]:not(.flow-card),
[style*="border-radius:50%"]:not(.flow-card) {
  border-radius: 50% !important;
}`;
    page.querySelectorAll("table:not(.mistake-table) th, table:not(.mistake-table) td").forEach((cell) => {
      const tight = cell.closest("table.eval-process-table");
      cell.style.setProperty("height", "12mm", "important");
      cell.style.setProperty("padding-top", tight ? "0" : "calc((12mm - 1lh) / 2)", "important");
      cell.style.setProperty("padding-bottom", tight ? "0" : "calc((12mm - 1lh) / 2)", "important");
      cell.style.setProperty("vertical-align", "middle", "important");
      cell.style.setProperty("box-sizing", "border-box", "important");
      if (tight) cell.style.setProperty("line-height", "1.5", "important");
    });
    page.querySelectorAll("table th, table td").forEach((cell) => {
      cell.style.setProperty("font-size", "15px", "important");
      cell.querySelectorAll("*").forEach((node) => {
        node.style.setProperty("font-size", "15px", "important");
      });
    });
    const keepSize = (node) =>
      node.matches("h1, h2, h3, .title-2, .title-3, .section-heading, .text-body, .card-year, .card-subtitle, svg, path, img, .pie-label") ||
      node.closest("h1, h2, h3, .title-2, .title-3, .section-heading, .text-body");
    page.querySelectorAll("*").forEach((node) => {
      if (keepSize(node)) return;
      node.style.setProperty("font-size", "15px", "important");
    });
    page.querySelectorAll(".info-box, .tip-box").forEach((box) => {
      box.style.setProperty("font-size", "15px", "important");
      box.querySelectorAll("*").forEach((node) => {
        node.style.setProperty("font-size", "15px", "important");
      });
    });
    page.querySelectorAll(".card-year, .card-subtitle").forEach((node) => {
      node.style.setProperty("font-size", "13px", "important");
    });
    /* 표 래퍼 + 창의적 체험표 열 비율 강제 */
    const isNarrow = window.matchMedia("(max-width: 860px)").matches;
    page.querySelectorAll(".pie-label").forEach((node) => {
      const size = isNarrow ? "15" : "13";
      node.setAttribute("font-size", size);
      node.style.setProperty("font-size", `${size}px`, "important");
    });
    page.querySelectorAll("table").forEach((table) => {
      if (table.closest(".table-scroll")) return;
      if (table.classList.contains("mistake-table")) return;
      const isCreative =
        table.classList.contains("creative-activity-table") ||
        /창의적 체험활동상황/.test(table.textContent || "");
      if (isCreative) {
        table.classList.add("creative-activity-table");
        let group = table.querySelector("colgroup");
        if (!group) {
          group = document.createElement("colgroup");
          table.insertBefore(group, table.firstChild);
        }
        group.innerHTML = "";
        ["8%", "15%", "8%", "15%", "54%"].forEach((w) => {
          const col = document.createElement("col");
          col.style.setProperty("width", w, "important");
          group.appendChild(col);
        });
        /* PC·모바일 동일 레이아웃. 모바일만 고정폭+스크롤 */
        table.style.setProperty("table-layout", "fixed", "important");
        table.style.setProperty("width", isNarrow ? "720px" : "100%", "important");
        table.style.setProperty("min-width", isNarrow ? "720px" : "0", "important");
        table.style.setProperty("max-width", isNarrow ? "none" : "100%", "important");
        table.querySelectorAll("th, td, td > div").forEach((el) => {
          el.style.setProperty("white-space", "normal", "important");
          el.style.setProperty("min-width", "0", "important");
          el.style.setProperty("word-wrap", "break-word", "important");
        });
        table.querySelectorAll("td > div").forEach((el) => {
          el.style.setProperty("text-align", "justify", "important");
        });
      }
      const wrap = document.createElement("div");
      wrap.className = "table-scroll";
      table.replaceWith(wrap);
      wrap.appendChild(table);
      if (isCreative && isNarrow) {
        wrap.style.setProperty("overflow-x", "auto", "important");
        wrap.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
        wrap.style.setProperty("width", "100%", "important");
        wrap.style.setProperty("max-width", "100%", "important");
      }
    });
    const tableForce = document.createElement("style");
    tableForce.textContent = `
/* PC·모바일 동일 레이아웃(열 비율·양측 맞춤) */
.table-scroll > table.creative-activity-table,
.comparison-table.curriculum-table.creative-activity-table {
  table-layout: fixed !important;
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
}
.table-scroll > table.creative-activity-table col:nth-child(1) { width: 8% !important; }
.table-scroll > table.creative-activity-table col:nth-child(2) { width: 15% !important; }
.table-scroll > table.creative-activity-table col:nth-child(3) { width: 8% !important; }
.table-scroll > table.creative-activity-table col:nth-child(4) { width: 15% !important; }
.table-scroll > table.creative-activity-table col:nth-child(5) { width: 54% !important; }
.table-scroll > table.creative-activity-table th,
.table-scroll > table.creative-activity-table td,
.table-scroll > table.creative-activity-table td > div {
  white-space: normal !important;
  min-width: 0 !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
}
.table-scroll > table.creative-activity-table td > div {
  text-align: justify !important;
}
@media (max-width: 860px) {
  .table-scroll {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  .table-scroll > table:not(.creative-activity-table),
  .table-scroll > .comparison-table.curriculum-table:not(.creative-activity-table) {
    table-layout: auto !important;
    width: max-content !important;
    min-width: 190mm !important;
    max-width: none !important;
  }
  .table-scroll > table:not(.creative-activity-table) th,
  .table-scroll > table:not(.creative-activity-table) td {
    white-space: nowrap !important;
  }
  /* 창의적 체험: PC와 같은 표, 줄이지 말고 좌우 스크롤만 */
  .table-scroll:has(> .creative-activity-table) {
    overflow-x: auto !important;
  }
  .table-scroll > table.creative-activity-table {
    table-layout: fixed !important;
    width: 720px !important;
    min-width: 720px !important;
    max-width: none !important;
  }
}`;
    shadow.append(link, extra, tableForce, page);
    page.querySelectorAll("*").forEach((node) => {
      if (node.matches(".pie-label")) return;
      const size = parseFloat(getComputedStyle(node).fontSize);
      if (size > 0 && size < 13) node.style.setProperty("font-size", "13px", "important");
    });
    return sheet;
  }

  function mount(host, pages) {
    const flow = document.createElement("div");
    flow.className = "book-flow";
    pages.forEach((page) => {
      const name = String(page).split("/").pop().replace(/\.html$/i, "");
      const template = document.getElementById(`page-${name}`);
      if (!template) {
        const fail = document.createElement("p");
        fail.className = "info-text";
        fail.textContent = "이 부분을 불러오지 못했습니다.";
        flow.appendChild(fail);
        return;
      }
      const holder = document.implementation.createHTMLDocument("");
      holder.body.append(template.content.cloneNode(true));
      const sheet = embedPage(holder);
      if (sheet) flow.appendChild(sheet);
    });
    host.replaceChildren(flow);
    const applyGap = () => alignFoundationGap(flow);
    requestAnimationFrame(() => requestAnimationFrame(applyGap));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(applyGap);
  }

  function alignFoundationGap(flow) {
    [...flow.querySelectorAll(".book-sheet")].forEach((sheet) => {
      const root = sheet.shadowRoot;
      if (!root) return;
      const box = [...root.querySelectorAll("div")].find((el) => (el.textContent || "").trim() === "기초 학업역량 평가" && (el.getAttribute("style") || "").includes("border") && !el.closest(".grade-track"));
      const row = box && box.parentElement;
      const col = row && [...row.children].find((el) => el !== box);
      const subject = col && col.querySelector(".text-small");
      if (!box || !col || !subject || box.dataset.sized) return;
      box.dataset.sized = "1";
      const apply = () => {
        subject.style.marginBottom = "0";
        box.style.boxSizing = "border-box";
        box.style.paddingTop = "0";
        box.style.paddingBottom = "0";
        box.style.height = "auto";
        const colH = col.getBoundingClientRect().height;
        if (colH > 0) box.style.height = `${colH}px`;
      };
      apply();
      if (typeof ResizeObserver !== "undefined") new ResizeObserver(apply).observe(col);
    });
  }

  function alignChapters(flow, chapter) {
    flow.querySelectorAll(".info-chapter").forEach((node) => node.remove());
    if (!chapter) return;
    let index = 0;
    let previous = "";
    flow.querySelectorAll(".info-sub").forEach((node) => {
      if (node.closest(".info-card, .qa-card, .feature-card, .stat-card")) return;
      const raw = node.textContent.replace(/\s+/g, " ").trim();
      const matched = raw.match(/^\d+\s*[-.]\s*\d+\s*[.)]?\s*(.+)$/);
      if (!matched) return;
      const title = matched[1].trim();
      if (title !== previous) {
        index += 1;
        previous = title;
      }
      node.textContent = `${chapter}-${index}. ${title}`;
    });
  }

  return { render, mount };
})();
