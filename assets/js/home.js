// home.js — render the landing page from the store.
import { loadStore, money, STATE_LABEL } from "./store.js";
import { initReveal, coverMarkup, esc, openContact, decodeReveal } from "./ui.js";

const grid = document.getElementById("grid");
const filtersEl = document.getElementById("filters");

(async function main() {
  let site, listings;
  try {
    ({ site, listings } = await loadStore());
  } catch (err) {
    grid.innerHTML = `<p class="grid__loading mono">数据加载失败：${esc(err.message)}<br>请通过本地服务器或 GitHub Pages 打开（不能直接双击 html）。</p>`;
    return;
  }

  hydrateSite(site);
  renderSteps(site);
  renderChannels(site);
  renderGrid(listings, site, "all");
  wireFilters(listings, site);
  initReveal();
  const heroTitle = document.querySelector(".hero__title");
  heroTitle?.classList.add("is-in"); // make it visible *before* decoding (was scrambling while opacity:0)
  decodeReveal(heroTitle);
})();

/* fill any [data-site] / [data-site-html] placeholders from site.json */
function hydrateSite(site) {
  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.dataset.site;
    const val = key === "contactNote" ? site.contact?.note : site[key];
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll("[data-site-html]").forEach((el) => {
    const raw = site[el.dataset.siteHtml] || "";
    el.innerHTML = esc(raw).replace(/\n/g, "<br>");
  });
}

function renderGrid(listings, site, filter) {
  const items = listings.filter((l) => {
    if (filter === "all") return true;
    if (filter === "available") return l.state !== "sold";
    return l.type === filter;
  });

  if (!items.length) {
    grid.innerHTML = `<p class="grid__loading mono">这个分类暂时空着～</p>`;
    return;
  }

  grid.innerHTML = items.map((l, i) => card(l, site, i)).join("");
  initReveal(grid);
}

function card(l, site, i) {
  const sold = l.state === "sold";
  const href = l.customPage || `listing.html?id=${encodeURIComponent(l.id)}`;
  const delay = `--reveal-delay:${(i % 3) * 0.08}s`;
  const priceBlock = sold
    ? `<span class="card__sold-label serif">已售出</span>`
    : !l.priceKnown
    ? `<span class="card__tbd mono">价格待定 · 私聊</span>`
    : `<div class="card__price-row">
         <span class="card__price num">${money(l.asking, l.currency)}</span>
         ${l.discountPct > 0 ? `<span class="card__save mono">省 ${l.discountPct}%</span>` : ""}
       </div>
       ${l.originalKnown ? `<span class="card__was num">原价 ${money(l.originalTotal, l.currency)}</span>` : ""}`;

  return `
  <a class="card ${sold ? "is-sold" : ""}" href="${href}" style="--accent:${l.accent};--tint:${l.tint};${delay}" data-reveal data-type="${l.type}" data-state="${l.state}">
    <div class="card__cover">
      ${coverMarkup(l)}
      <span class="badge badge--${l.state} card__badge"><span class="dot"></span>${STATE_LABEL[l.state]}</span>
      ${l.type === "bundle" ? `<span class="card__kind mono">捆绑 · ${l.itemCount} 件</span>` : `<span class="card__kind mono">单卖</span>`}
    </div>
    <div class="card__body">
      <p class="card__theme mono">${esc(l.theme)}</p>
      <h3 class="card__title">${esc(l.title)}</h3>
      <p class="card__tagline">${esc(l.tagline)}</p>
      <div class="card__foot">
        <div class="card__pricing">${priceBlock}</div>
        <span class="card__go" aria-hidden="true">→</span>
      </div>
    </div>
  </a>`;
}

function wireFilters(listings, site) {
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filtersEl.querySelectorAll(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
    renderGrid(listings, site, btn.dataset.filter);
  });
}

function renderSteps(site) {
  const ol = document.getElementById("steps");
  ol.innerHTML = (site.howItWorks || [])
    .map(
      (s, i) => `
      <li class="step" data-reveal style="--reveal-delay:${i * 0.07}s">
        <span class="step__num mono">${esc(s.step)}</span>
        <h3 class="step__title">${esc(s.title)}</h3>
        <p class="step__body">${esc(s.body)}</p>
      </li>`
    )
    .join("");
}

function renderChannels(site) {
  const c = site.contact || {};
  const wrap = document.getElementById("channels");
  const rows = [`<button class="btn btn--accent channel-cta" data-contact-home>联系我买下 <span class="arrow">→</span></button>`];
  if (c.wechat) rows.push(channel("微信 WeChat · 推荐", c.wechat));
  if (c.email) rows.push(channel("邮件 Email", c.email));
  if (c.xiaohongshu) rows.push(channel("小红书", c.xiaohongshu));
  wrap.innerHTML = rows.join("");
  wrap.querySelectorAll("[data-contact-home]").forEach((b) => b.addEventListener("click", () => openContact(site, null)));
}

function channel(label, value) {
  return `<button class="channel" data-contact-home><span class="channel__label mono">${esc(label)}</span><span class="channel__value">${esc(value)}</span><span class="channel__go">→</span></button>`;
}
