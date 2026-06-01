// listing.js — single bundle / single-item detail page.
// Order: hero → overview(summary + simple loadout) → showcase(bespoke) → price table → contact.
import { getListing, money, STATE_LABEL } from "./store.js";
import { initReveal, coverMarkup, openLightbox, esc, openContact, hydrateFigSlots, initCountUp } from "./ui.js";

const root = document.getElementById("detail");

(async function main() {
  const id = new URLSearchParams(location.search).get("id");
  let data;
  try {
    data = await getListing(id);
  } catch (err) {
    root.innerHTML = `<p class="detail__loading mono wrap">加载失败：${esc(err.message)}</p>`;
    return;
  }
  const { site, listing } = data;

  if (!listing) {
    root.innerHTML = `<div class="wrap detail__empty">
      <p class="eyebrow">ERR · 404</p>
      <h1 class="display">没找到这个商品</h1>
      <a class="btn btn--accent" href="index.html">← 回到清单</a>
    </div>`;
    return;
  }

  document.title = `${listing.title} · Simba 的仓库`;
  render(site, listing);
  initReveal(root);
  loadShowcase(listing); // bespoke section, async & non-blocking
})();

function render(site, l) {
  const sold = l.state === "sold";
  root.style.setProperty("--accent", l.accent);
  root.style.setProperty("--tint", l.tint);
  const idx = (n) => String(n).padStart(2, "0");

  root.innerHTML = `
  <section class="detail__hero">
    <div class="wrap detail__hero-grid">
      <div class="detail__intro">
        <nav class="crumbs mono" data-reveal>
          <a href="index.html">清单</a> <span>/</span> <span>${l.type === "bundle" ? "捆绑包" : "单卖"}</span>
          <span>/</span> <span>${esc(l.id)}</span>
        </nav>
        <p class="detail__theme mono" data-reveal>${esc(l.theme)}</p>
        <h1 class="detail__title" data-reveal>${esc(l.title)}</h1>
        <p class="detail__tagline lead" data-reveal>${esc(l.tagline)}</p>
        <span class="badge badge--${l.state} detail__state" data-reveal><span class="dot"></span>${STATE_LABEL[l.state]}</span>
      </div>
      <figure class="detail__cover" data-reveal>
        ${coverMarkup(l)}
        <figcaption class="detail__cover-cap mono">FIG.00 · ${l.type === "bundle" ? "BUNDLE" : "SINGLE"} · ${idx(l.itemCount)} ${l.itemCount > 1 ? "ITEMS" : "ITEM"}</figcaption>
      </figure>
    </div>
  </section>

  <section class="wrap detail__overview">
    <div class="detail__summary" data-reveal>
      <p class="eyebrow">关于这一${l.type === "bundle" ? "包" : "本"}</p>
      <p class="detail__summary-text">${esc(l.summary)}</p>
    </div>
    <div class="loadout" data-reveal>
      <p class="loadout__label mono">清单 / LOADOUT</p>
      <ul class="loadout__list">
        ${l.items.map((it, i) => `
          <li class="loadout__row">
            <span class="loadout__idx mono">${idx(i + 1)}</span>
            <span class="loadout__name">${esc(it.name)}</span>
            <span class="loadout__kind mono">${it.kind === "book" ? "BOOK" : "ITEM"}</span>
          </li>`).join("")}
      </ul>
    </div>
  </section>

  <section class="showcase-slot" id="showcase" data-showcase="${esc(l.showcase || "")}"></section>

  <section class="wrap detail__body">
    <div class="detail__main">
      <div class="manifest" data-reveal>
        <div class="manifest__head">
          <h2>价目表 / Spec</h2>
          <span class="manifest__hint mono">${l.items.some((it) => it.proof) ? "📷 = 购买截图，点开看" : "原价 / 价格私聊"}</span>
        </div>
        <ul class="manifest__list">
          ${l.items.map((it, i) => itemRow(it, l, i)).join("")}
        </ul>
        <div class="manifest__total">
          <span class="mono">原价合计 / MSRP</span>
          <span class="num">${l.originalKnown ? money(l.originalTotal, l.currency) : "待补充"}</span>
        </div>
      </div>
    </div>

    <aside class="detail__aside">
      <div class="pricecard" data-reveal>
        ${sold
          ? `<p class="pricecard__sold display">已售出</p>
             <p class="pricecard__sold-sub">感谢关注，这件已经找到新主人了。</p>`
          : l.priceKnown
          ? `<p class="pricecard__label mono">${l.type === "bundle" ? "打包价 / BUNDLE" : "单卖价 / PRICE"}</p>
             <p class="pricecard__price num">${money(l.asking, l.currency)}</p>
             <div class="pricecard__compare">
               ${l.originalKnown ? `<span class="num was">原价 ${money(l.originalTotal, l.currency)}</span>` : ""}
               ${l.discountPct > 0 ? `<span class="pricecard__save mono">省 ${l.discountPct}% · 立省 ${money(l.saved, l.currency)}</span>` : ""}
             </div>`
          : `<p class="pricecard__label mono">${l.type === "bundle" ? "打包价 / BUNDLE" : "单卖价 / PRICE"}</p>
             <p class="pricecard__price display pricecard__price--tbd">价格待定</p>
             <p class="pricecard__tbd-sub">还没定价，私聊我，给个公道价。</p>`}
        <div class="pricecard__cta">
          ${sold
            ? `<a class="btn btn--ghost" href="index.html">看看其他的 →</a>`
            : `<button class="btn btn--accent" data-contact>${l.priceKnown ? "联系我买下" : "私聊定个价"} <span class="arrow">→</span></button>
               <p class="pricecard__wechat mono">点开 · 微信 / 邮箱</p>`}
        </div>
        <p class="pricecard__note">${esc(site.contact?.note || "")}</p>
      </div>
    </aside>
  </section>

  <section class="wrap detail__next" data-reveal>
    <a class="btn btn--ghost" href="index.html">← 返回全部商品</a>
  </section>`;

  root.querySelectorAll("[data-proof]").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.proof, btn.dataset.cap || "", l.accent));
  });
  root.querySelector("[data-contact]")?.addEventListener("click", () => openContact(site, l));
}

function itemRow(it, l, i) {
  const priceTag = it.originalPrice ? `<span class="item__price num">${money(it.originalPrice, l.currency)}</span>` : "";
  const proofBtn = it.proof
    ? `<button class="item__proof mono" data-proof="${esc(it.proof)}" data-cap="${esc(it.name)} · 原价截图">📷 截图</button>`
    : "";
  return `
    <li class="item">
      <span class="item__idx mono">${String(i + 1).padStart(2, "0")}</span>
      <div class="item__main">
        <div class="item__top">
          <span class="item__name">${esc(it.name)}</span>
          <span class="item__kind tag">${it.kind === "book" ? "书" : "物品"}</span>
        </div>
        ${it.note ? `<p class="item__note">${esc(it.note)}</p>` : ""}
      </div>
      <div class="item__right">${priceTag}${proofBtn}</div>
    </li>`;
}

/* --- bespoke per-bundle showcase: assets/js/showcases/<slug>.js --------- */
async function loadShowcase(listing) {
  const slot = document.getElementById("showcase");
  const slug = listing.showcase;
  if (!slot || !slug) { if (slot) slot.remove(); return; }
  try {
    const mod = await import(`./showcases/${slug}.js`);
    slot.innerHTML = mod.render(listing);
    if (typeof mod.init === "function") mod.init(slot, listing);
    hydrateFigSlots(slot);
    initCountUp(slot);
    initReveal(slot);
  } catch (err) {
    console.warn("showcase load failed:", slug, err);
    slot.remove();
  }
}
