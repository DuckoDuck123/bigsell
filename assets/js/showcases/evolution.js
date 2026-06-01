// showcases/evolution.js — bespoke product story for the 进化论 bundle.
// Exports render(listing) -> HTML, and init(root) to wire interactions.
import { figSlot } from "../ui.js";

const TIMELINE = [
  { y: "1831", t: "登上小猎犬号", b: "22 岁的达尔文以随船博物学家的身份出海，五年环球，记满了一整箱笔记。" },
  { y: "1835", t: "加拉帕戈斯的雀", b: "相邻岛屿上、喙形却各不相同的雀鸟，在他心里埋下一句危险的话：物种会变。" },
  { y: "1859", t: "《物种起源》", b: "犹豫了二十年才出版，第一版当天售罄。自然选择第一次被摆上台面。" },
  { y: "1865", t: "孟德尔的豌豆", b: "一座修道院里，遗传的规律被精确地算了出来——然后被世界忽视了三十五年。" },
  { y: "1953", t: "DNA 双螺旋", b: "沃森与克里克给出结构。进化论第一次有了分子层面的机制，不再只是推断。" },
  { y: "2003", t: "人类基因组", b: "全序列读完。进化从一个大胆的假设，变成了写在每个细胞里的事实。" },
];

const SPECIMENS = ["大脑", "心脏", "其他"];

function jarSVG() {
  return `
  <svg class="sc-jar__svg" viewBox="0 0 80 116" fill="none" aria-hidden="true">
    <rect x="27" y="3" width="26" height="9" rx="3" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
    <rect x="23" y="11" width="34" height="6" rx="2.5" stroke="currentColor" stroke-width="1.4" opacity="0.7"/>
    <rect x="18" y="17" width="44" height="94" rx="13" stroke="currentColor" stroke-width="1.6"/>
    <path d="M19 70 q21 8 42 0 v28 a13 13 0 0 1 -13 13 h-16 a13 13 0 0 1 -13 -13 z" fill="currentColor" opacity="0.14"/>
    <ellipse class="sc-jar__blob" cx="40" cy="84" rx="11" ry="8" fill="currentColor" opacity="0.4"/>
  </svg>`;
}

export function render() {
  return `
  <div class="sc sc--evolution">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / THE STORY</p>
        <h2 class="sc__headline">在客厅摆一套进化论，<br>讲的是一个从船开始的故事。</h2>
        <p class="sc__dek lead">下面这三本书加三罐标本，是这段故事的实体版本——从一句危险的猜测，到刻进每个细胞的事实。</p>
      </header>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT I — 1831 / 1859</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">一个年轻人，一艘船，<br>和二十年的犹豫。</h3>
          <p class="sc__body">达尔文不是在书房里想出进化论的。他是在晕船、采集、解剖、记笔记的五年里，被加拉帕戈斯那些喙形各异的雀鸟一点点说服的。他很清楚这个想法会捅多大的马蜂窝，于是又压了整整二十年。直到 1859 年《物种起源》出版，自然选择才正式登场。</p>
        </div>
        ${figSlot("assets/img/illustrations/evolution-1-darwin.jpg", "达尔文与小猎犬号 · 配图（可选）", "建议：达尔文肖像 / 加拉帕戈斯雀鸟手稿 / 小猎犬号航线，横版", { ratio: "21/9", wide: true })}
      </section>

      <section class="sc-tl" data-reveal>
        <p class="sc__kicker mono">时间线 / 点一下看细节</p>
        <div class="sc-tl__rail" role="tablist" aria-label="进化论时间线">
          ${TIMELINE.map((d, i) => `
            <button class="sc-tl__node${i === 0 ? " is-active" : ""}" data-i="${i}" role="tab" aria-selected="${i === 0}">
              <span class="sc-tl__dot"></span>
              <span class="sc-tl__y mono">${d.y}</span>
            </button>`).join("")}
        </div>
        <div class="sc-tl__panel" data-tl-panel>
          <p class="sc-tl__pyear mono">${TIMELINE[0].y}</p>
          <h4 class="sc-tl__ptitle">${TIMELINE[0].t}</h4>
          <p class="sc-tl__pbody">${TIMELINE[0].b}</p>
        </div>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT II — 1865 / 今天</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">基因，把进化从「假设」<br>升级成了「事实」。</h3>
          <p class="sc__body">达尔文知道性状会遗传，却不知道怎么遗传。答案藏在被忽视了三十五年的孟德尔，藏在 1953 年的双螺旋里。当基因被读出来，进化论就不再是一个需要辩护的理论——它成了生物学的地基，是解释一切生命现象的那条主线。《基因传》讲的，正是这条主线如何被人类亲手拼出来。</p>
        </div>
      </section>

      <section class="sc-specimens" data-reveal>
        <p class="sc__act-no mono">另附 · 三罐</p>
        <h3 class="sc__act-title">还有三罐标本。</h3>
        <div class="sc-jars__row">
          ${SPECIMENS.map((w, i) => `
            <figure class="sc-jar-s" style="--d:${i * 0.07}s">
              <span class="sc-jar__vis">${jarSVG()}</span>
              <figcaption class="sc-jar-s__word display">${w}</figcaption>
            </figure>`).join("")}
        </div>
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">为什么值得摆出来</p>
        <h2 class="sc__headline">帅，本身就是一种说服力。</h2>
        <p class="sc__dek lead">大多数书架是用来落灰的。这一套不是——当有人拿起其中一本，或者盯着那三罐看上几秒、再回头看你的时候，这场对话你已经赢了。把它摆在客厅，等的就是那个眼神。</p>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  // timeline
  const panel = root.querySelector("[data-tl-panel]");
  const py = root.querySelector(".sc-tl__pyear");
  const pt = root.querySelector(".sc-tl__ptitle");
  const pb = root.querySelector(".sc-tl__pbody");
  root.querySelectorAll(".sc-tl__node").forEach((node) => {
    node.addEventListener("click", () => {
      const d = TIMELINE[+node.dataset.i];
      root.querySelectorAll(".sc-tl__node").forEach((n) => {
        const on = n === node;
        n.classList.toggle("is-active", on);
        n.setAttribute("aria-selected", on);
      });
      if (panel) panel.classList.remove("is-swap");
      void panel?.offsetWidth; // restart anim
      panel?.classList.add("is-swap");
      py.textContent = d.y; pt.textContent = d.t; pb.textContent = d.b;
    });
  });
}
