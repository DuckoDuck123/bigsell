// ui.js — shared UI utilities: scroll reveal, procedural covers, lightbox.

/* ---- scroll reveal: staggers children with [data-reveal] into view ---- */
export function initReveal(root = document) {
  const els = root.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---- procedural cover: deterministic gradient + motif when no image ---- */
export function coverMarkup(listing) {
  if (listing.cover) {
    return `<img class="cover__img" src="${esc(listing.cover)}" alt="${esc(listing.title)}" loading="lazy">`;
  }
  const a = listing.accent || "#A8432A";
  const seed = hash(listing.id || listing.title || "x");
  const angle = 95 + (seed % 60);
  const initial = (listing.title || "?").trim().charAt(0);
  return `
    <div class="cover__gen" style="--a:${a};--ang:${angle}deg" aria-hidden="true">
      <span class="cover__glyph display">${esc(initial)}</span>
      <span class="cover__count mono">${listing.itemCount} 件</span>
    </div>`;
}

/* ----------------------------- lightbox -------------------------------- */
let _lb;
export function initLightbox() {
  if (_lb) return;
  _lb = document.createElement("div");
  _lb.className = "lightbox";
  _lb.innerHTML = `
    <figure class="lightbox__frame">
      <button class="lightbox__close" aria-label="关闭">✕</button>
      <img class="lightbox__img" alt="">
      <figcaption class="lightbox__bar">
        <span class="lightbox__cap mono"></span>
        <span class="lightbox__hint mono">点击空白处 / ESC 关闭</span>
      </figcaption>
    </figure>`;
  document.body.appendChild(_lb);
  const close = () => _lb.classList.remove("is-open");
  _lb.addEventListener("click", (e) => { if (e.target === _lb || e.target.closest(".lightbox__close")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}
export function openLightbox(src, caption = "", accent = "") {
  initLightbox();
  if (accent) _lb.style.setProperty("--accent", accent);
  _lb.querySelector(".lightbox__img").src = src;
  _lb.querySelector(".lightbox__cap").textContent = caption;
  void _lb.offsetWidth;
  _lb.classList.add("is-open");
}

/* ----- image slot: graceful placeholder until the real file exists ----- */
export function figSlot(src, caption = "", desc = "", opts = {}) {
  const cls = "sc-figslot" + (opts.wide ? " sc-figslot--wide" : "");
  const style = opts.ratio ? ` style="--ratio:${opts.ratio}"` : "";
  return `
  <figure class="${cls}" data-reveal>
    <div class="sc-figslot__frame"${style}>
      <img class="sc-figslot__img" src="${esc(src)}" alt="${esc(caption)}" loading="lazy" data-figslot>
      <div class="sc-figslot__ph" aria-hidden="true">
        <span class="sc-figslot__ph-mark">◇</span>
        <span class="sc-figslot__ph-name mono">${esc(src)}</span>
        ${desc ? `<span class="sc-figslot__ph-desc">${esc(desc)}</span>` : ""}
      </div>
    </div>
    ${caption ? `<figcaption class="sc-figslot__cap mono">${esc(caption)}</figcaption>` : ""}
  </figure>`;
}
export function hydrateFigSlots(root) {
  root.querySelectorAll("[data-figslot]").forEach((img) => {
    const fig = img.closest(".sc-figslot");
    const ok = () => fig.classList.add("is-loaded");
    const bad = () => fig.classList.remove("is-loaded");
    if (img.complete) (img.naturalWidth > 0 ? ok : bad)();
    img.addEventListener("load", ok);
    img.addEventListener("error", bad);
  });
}

/* ----- decode reveal: headline resolves from scrambled glyphs ----------- */
const DECODE_POOL = "量子熵能场波粒积分矩阵算子涨落守恒对称奇点引力時空混沌";
export function decodeReveal(el, { perChar = 55, settle = 420, flicker = 58 } = {}) {
  if (!el) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lines = el.innerHTML.split(/<br\s*\/?>/i);
  const finals = [];
  el.innerHTML = lines
    .map((line) => [...line].map((ch) => {
      if (ch.trim() === "") return ch;
      finals.push(ch);
      return `<span class="hd-c">${ch}</span>`;
    }).join(""))
    .join("<br>");
  const spans = [...el.querySelectorAll(".hd-c")];
  const finalize = () => spans.forEach((s, i) => { s.textContent = finals[i]; s.classList.remove("is-scr"); });
  if (reduce || document.hidden) { finalize(); return; }

  spans.forEach((s) => s.classList.add("is-scr"));
  const t0 = performance.now();
  const total = settle + spans.length * perChar;
  let lastFlip = 0;
  const tick = (now) => {
    const el2 = now - t0;
    const flip = now - lastFlip > flicker; if (flip) lastFlip = now;
    let done = true;
    spans.forEach((s, i) => {
      if (el2 >= settle + i * perChar) {
        if (s.classList.contains("is-scr")) { s.textContent = finals[i]; s.classList.remove("is-scr"); s.classList.add("hd-c--lock"); }
      } else { done = false; if (flip) s.textContent = DECODE_POOL[(Math.random() * DECODE_POOL.length) | 0]; }
    });
    if (!done && el2 < total + 200) requestAnimationFrame(tick); else finalize();
  };
  requestAnimationFrame(tick);
  setTimeout(finalize, total + 300); // guarantee final text even if rAF is throttled
}

/* ----- Apple-style count-up: animates [data-countup] into view --------- */
export function initCountUp(root = document) {
  const els = root.querySelectorAll("[data-countup]");
  if (!els.length) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (v, dec) => v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const run = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseFloat(el.dataset.countup);
    const dec = el.dataset.dec != null ? +el.dataset.dec : (String(el.dataset.countup).split(".")[1] || "").length;
    const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    const dur = +(el.dataset.dur || 1300);
    const finalText = pre + fmt(target, dec) + suf;
    if (reduce) { el.textContent = finalText; return; }
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const frame = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      el.textContent = pre + fmt(target * ease(t), dec) + suf;
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    setTimeout(() => { el.textContent = finalText; }, dur + 80); // guarantee final value
  };

  if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.45 });
  els.forEach((el) => io.observe(el));
}

/* ------------------------------- utils --------------------------------- */
export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

/* --------------------------- contact modal ----------------------------- */
let _cm;
function ensureContactModal() {
  if (_cm) return;
  _cm = document.createElement("div");
  _cm.className = "cmodal";
  document.body.appendChild(_cm);
  _cm.addEventListener("click", (e) => {
    if (e.target === _cm || e.target.closest("[data-close]")) closeContact();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeContact(); });
}
export function closeContact() { _cm && _cm.classList.remove("is-open"); }

export function openContact(site, listing) {
  ensureContactModal();
  if (listing?.accent) _cm.style.setProperty("--accent", listing.accent);
  else _cm.style.removeProperty("--accent");
  const c = site.contact || {};
  const title = listing ? `想要「${esc(listing.title)}」` : "想要这些，私聊我";
  _cm.innerHTML = `
    <div class="cmodal__backdrop" data-close></div>
    <div class="cmodal__card" role="dialog" aria-modal="true" aria-label="联系方式">
      <button class="cmodal__x" data-close aria-label="关闭">✕</button>
      <p class="cmodal__kicker mono">联系 / CONTACT</p>
      <h3 class="cmodal__title">${title}</h3>
      <p class="cmodal__sub">加微信最快，报上名字就行；邮箱我也看，但回得慢一点。</p>
      <div class="cmodal__rows">
        ${c.wechat ? `
        <div class="cmodal__row cmodal__row--primary">
          <div class="cmodal__rowmain"><span class="cmodal__label mono">微信 · WeChat · 推荐</span><span class="cmodal__value num">${esc(c.wechat)}</span></div>
          <button class="cmodal__copy" data-copy="${esc(c.wechat)}">复制</button>
        </div>` : ""}
        ${c.email ? `
        <div class="cmodal__row">
          <div class="cmodal__rowmain"><span class="cmodal__label mono">邮箱 · Email</span><span class="cmodal__value">${esc(c.email)}</span></div>
          <a class="cmodal__mail" href="${contactHref(site, listing)}">发邮件 →</a>
        </div>` : ""}
      </div>
      ${c.note ? `<p class="cmodal__note">${esc(c.note)}</p>` : ""}
    </div>`;
  _cm.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try { await navigator.clipboard.writeText(text); } catch (_) { /* ignore */ }
      const orig = btn.textContent;
      btn.textContent = "已复制 ✓"; btn.classList.add("is-done");
      setTimeout(() => { btn.textContent = orig; btn.classList.remove("is-done"); }, 1600);
    });
  });
  void _cm.offsetWidth; // flush styles so the open transition plays
  _cm.classList.add("is-open");
}

/** Build a mailto link with a helpful prefilled subject/body. */
export function contactHref(site, listing) {
  const email = site.contact?.email || "";
  const subj = encodeURIComponent(listing ? `想要：${listing.title}` : "你好，我想买你的东西");
  const body = encodeURIComponent(
    listing
      ? `你好 ${site.seller}，\n我对「${listing.title}」感兴趣，请问还在吗？\n\n（我的称呼 / 同城还是快递：）`
      : `你好 ${site.seller}，\n我对你出的东西感兴趣～`
  );
  return `mailto:${email}?subject=${subj}&body=${body}`;
}
