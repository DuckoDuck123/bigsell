// showcases/telescope.js — 森林人 8×42 ED. How a telescope works + a spec decoder.
import { figSlot } from "../ui.js";

const PARTS = [
  { tok: "8×", k: "放大倍率 / Magnification", b: "把远处物体在视角上放大 8 倍。倍率越高画面越大，但也越抖、视野越窄——8× 是手持观景 / 观鸟的黄金平衡点。" },
  { tok: "42", k: "物镜口径 / 42 mm", b: "决定进光量。进光量大致正比于口径的平方：口径越大，画面越亮、细节越多。42 mm 属于「全尺寸」双筒。" },
  { tok: "ED", k: "超低色散镜片 / Extra-low Dispersion", b: "普通玻璃会让不同颜色的光聚在不同点，物体边缘泛出紫绿色「色差」；ED 玻璃把各色光拉回同一焦点，画面更通透、更锐利。" },
  { tok: "5.25", k: "出瞳直径 = 42 ÷ 8 (mm)", b: "真正射进你眼睛的光束直径。越接近人眼瞳孔（暗处约 5–7 mm），弱光下越明亮。5.25 mm 意味着黄昏时依然够看。" },
];

export function render() {
  return `
  <div class="sc sc--telescope">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / 8×42 ED</p>
        <h2 class="sc__headline">望远镜，<br>到底是怎么把远处拉近的？</h2>
        <p class="sc__dek lead">不是「放大」那么简单。它其实是先用一片大镜子把光收拢、聚成一个小小的实像，再用另一片镜子把这个像放大送进你的眼睛。</p>
      </header>

      <section class="tel-ray" data-reveal>
        <p class="sc__act-no mono">原理 / 光走过的路</p>
        <div class="tel-ray__chart">
          <svg viewBox="0 0 680 280" role="img" aria-label="开普勒望远镜光路图">
            <defs>
              <filter id="telGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <line class="tel-axis" x1="20" y1="140" x2="660" y2="140"/>
            <!-- rays -->
            <polyline class="tel-ray-l" points="20,80 150,80 350,140 510,200 612,140"/>
            <polyline class="tel-ray-l tel-ray-l--mid" points="20,140 150,140 350,140 510,140 612,140"/>
            <polyline class="tel-ray-l" points="20,200 150,200 350,140 510,80 612,140"/>
            <!-- lenses -->
            <ellipse class="tel-lens" cx="150" cy="140" rx="13" ry="72"/>
            <ellipse class="tel-lens tel-lens--eye" cx="510" cy="140" rx="9" ry="46"/>
            <!-- focal point -->
            <circle class="tel-foc" cx="350" cy="140" r="5" filter="url(#telGlow)"/>
            <!-- eye -->
            <circle class="tel-eye" cx="628" cy="140" r="14"/>
            <circle class="tel-eye-p" cx="628" cy="140" r="5"/>
            <!-- labels -->
            <text class="tel-lbl mono" x="150" y="48" text-anchor="middle">物镜 · Ø42</text>
            <text class="tel-lbl mono" x="350" y="172" text-anchor="middle">实像 · 焦点</text>
            <text class="tel-lbl mono" x="510" y="80" text-anchor="middle">目镜</text>
            <text class="tel-lbl mono" x="628" y="172" text-anchor="middle">眼</text>
            <text class="tel-lbl tel-lbl--dim mono" x="20" y="225" text-anchor="start">远处来的平行光 →</text>
          </svg>
        </div>
        <p class="tel-ray__note">大口径<strong>物镜</strong>把远处来的平行光聚到<strong>焦点</strong>，成一个倒立的实像；<strong>目镜</strong>再像放大镜一样把这个像放大，送进你的眼睛。倒像？双筒里那对棱镜会把它正过来。</p>
      </section>

      ${figSlot("assets/img/illustrations/telescope-dispersion.png", "色散 / 为什么需要 ED 玻璃", "建议：维基百科「三棱镜色散白光」示意图（Dispersive_prism），横版，深色背景更佳", { ratio: "21/9", wide: true })}

      <section class="tel-decode" data-reveal>
        <p class="sc__act-no mono">拆解 / 点一下每个参数</p>
        <h3 class="sc__act-title">「8×42 ED」<br>这串字母，到底说了什么？</h3>
        <div class="tel-seg" id="tel-seg" role="tablist">
          <span class="tel-seg__pill" id="tel-pill"></span>
          ${PARTS.map((p, i) => `<button class="tel-seg__btn${i === 0 ? " is-active" : ""}" data-i="${i}" role="tab" aria-selected="${i === 0}">${p.tok}</button>`).join("")}
        </div>
        <div class="tel-decode__panel" data-tel-panel>
          <span class="tel-decode__val display" id="tel-val">${PARTS[0].tok}</span>
          <div class="tel-decode__txt">
            <p class="tel-decode__k mono" id="tel-k">${PARTS[0].k}</p>
            <p class="tel-decode__b" id="tel-b">${PARTS[0].b}</p>
          </div>
        </div>
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">想知道得更多？<br>书就在同一个包里。</h2>
        <p class="sc__dek lead">这台森林人 8×42 ED（第二代）负责让你「看见」；配套的《新概念物理教程·光学》负责让你「看懂」。两样一起啃完，你就是望远镜圈里那位什么都能讲两句的顶配玩家。</p>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  const panel = root.querySelector("[data-tel-panel]");
  const valEl = root.querySelector("#tel-val"), kEl = root.querySelector("#tel-k"), bEl = root.querySelector("#tel-b");
  const pill = root.querySelector("#tel-pill");
  const btns = [...root.querySelectorAll(".tel-seg__btn")];
  if (!pill || !btns.length) return;

  const movePill = (btn) => { pill.style.left = btn.offsetLeft + "px"; pill.style.width = btn.offsetWidth + "px"; };
  const activeBtn = () => root.querySelector(".tel-seg__btn.is-active") || btns[0];

  const select = (btn, animate) => {
    const p = PARTS[+btn.dataset.i];
    btns.forEach((b) => { const on = b === btn; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
    movePill(btn);
    if (animate) { panel.classList.remove("is-swap"); void panel.offsetWidth; panel.classList.add("is-swap"); }
    valEl.textContent = p.tok; kEl.textContent = p.k; bEl.textContent = p.b;
  };

  btns.forEach((b) => b.addEventListener("click", () => select(b, true)));
  movePill(btns[0]);
  setTimeout(() => movePill(activeBtn()), 80); // reposition once fonts settle
  window.addEventListener("resize", () => movePill(activeBtn()));
}
