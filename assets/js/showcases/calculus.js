// showcases/calculus.js — 《微积分的力量》: re-derive Archimedes' quadrature of the
// parabola (segment area = 4/3 · inscribed triangle), step by step.

const CX = 320, SX = 262, BY = 322, SY = 252;
const pt = (x) => [+(CX + x * SX).toFixed(1), +(BY - x * x * SY).toFixed(1)];
const MAXD = 6;

function parabPts(x0, x1, n) {
  const a = [];
  for (let i = 0; i <= n; i++) a.push(pt(x0 + ((x1 - x0) * i) / n));
  return a;
}
function parabolaPath() {
  return "M" + parabPts(-1, 1, 60).map((p) => p.join(" ")).join(" L");
}
function segmentPath() {
  // chord (straight, top) + parabola (curved, bottom)
  const arc = parabPts(1, -1, 60).map((p) => "L" + p.join(" ")).join(" ");
  return `M${pt(-1).join(" ")} L${pt(1).join(" ")} ${arc} Z`;
}
function buildTris(a, b, level, acc) {
  const m = (a + b) / 2;
  acc.push({ pts: [pt(a), pt(b), pt(m)], level });
  if (level < MAXD) { buildTris(a, m, level + 1, acc); buildTris(m, b, level + 1, acc); }
  return acc;
}
const ALL_TRIS = buildTris(-1, 1, 0, []);

const FRACS = ["1", "¼", "¼²", "¼³", "¼⁴", "¼⁵", "¼⁶"];
const STEP_TEXT = [
  "想求的是这块弓形的面积——弦与抛物线之间。可它有一条边是弯的，没法直接套公式。",
  "阿基米德的念头：曲边难算，就用算得清的三角形去填。先放最大的一个——以弦为底，顶点取在抛物线上「切线与弦平行」之处。记它的面积为 T。",
  "三角形之外，还剩两道月牙形的缝。各补一个。阿基米德证明了一件漂亮的事：每个小三角形，恰好是 T 的 ⅛——两个合起来，正好 +¼T。",
  "缝更小了，但还在。再补四个。神奇之处在于：这一层新增的总面积，又是上一层的 ¼（即 +1⁄16 T）。",
  "八个。规律已经锁定——每深入一层，新增面积都缩成上一层的四分之一。",
  "十六个。缝隙细得快看不见了，可这串和仍在稳稳地往上爬，逼近一个确定的数。",
  "1 + ¼ + ¼² + ¼³ + … 这条等比数列收敛到 4⁄3。把缝填到无穷小，弓形面积 = 内接三角形的 4⁄3 倍。这，正是「取极限」。",
];

function ratioAt(k) { let s = 0; for (let i = 0; i <= k; i++) s += Math.pow(0.25, i); return s; }

export function render() {
  return `
  <div class="sc sc--calculus">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / INFINITE POWERS</p>
        <h2 class="sc__headline">面积，是怎么被<br>「数」出来的？</h2>
        <p class="sc__dek lead">早在微积分诞生前两千年，阿基米德就求出了抛物线弓形的面积。方法笨拙，却惊人地现代。下面我们一步步重走一遍——你会真的学会它。</p>
      </header>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT I — 一个超前两千年的人</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">没有极限，没有符号，<br>他照样算对了。</h3>
          <p class="sc__body">阿基米德不会写 ∫，也没有「极限」这个词。他靠的是一个朴素到极致的念头：如果我能用一堆算得清的三角形，把这块曲边图形塞满，那它们面积之和，就是答案。问题只剩一个——怎么塞，塞到什么时候为止。</p>
        </div>
      </section>

      <section class="cal" data-reveal>
        <p class="sc__act-no mono">动手 / 跟着点「下一步」</p>
        <h3 class="sc__act-title">把曲线下的面积，<br>一层层「逼」出来。</h3>
        <div class="cal__stage">
          <div class="cal__chart">
            <svg viewBox="0 0 640 360" role="img" aria-label="抛物线弓形与内接三角形">
              <defs>
                <filter id="calGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <path class="cal__seg" d="${segmentPath()}"/>
              <g id="cal-tris"></g>
              <line class="cal__chord" x1="${pt(-1)[0]}" y1="${pt(-1)[1]}" x2="${pt(1)[0]}" y2="${pt(1)[1]}"/>
              <path class="cal__parab" d="${parabolaPath()}" filter="url(#calGlow)"/>
              <circle class="cal__vtx" cx="${pt(-1)[0]}" cy="${pt(-1)[1]}" r="3.5"/>
              <circle class="cal__vtx" cx="${pt(1)[0]}" cy="${pt(1)[1]}" r="3.5"/>
            </svg>
          </div>
          <div class="cal__panel">
            <div class="cal__ratio">
              <span class="cal__ratio-l mono">弓形面积 / 三角形 T</span>
              <span class="cal__ratio-n num" id="cal-ratio">1.000</span>
              <span class="cal__ratio-t mono">目标 = 4⁄3 ≈ 1.3333</span>
            </div>
            <div class="cal__bar"><span class="cal__bar-fill" id="cal-bar"></span></div>
            <p class="cal__series mono" id="cal-series"></p>
            <div class="cal__lemma" id="cal-lemma"><span class="cal__lemma-k mono">关键引理</span><span class="cal__lemma-t">每深入一层，新增的总面积都是上一层的 <b>¼</b>。</span></div>
            <p class="cal__step" id="cal-step">${STEP_TEXT[0]}</p>
            <div class="cal__btns">
              <button class="btn btn--accent" id="cal-next">放第一个三角形 →</button>
              <button class="btn btn--ghost" id="cal-reset">重置</button>
            </div>
          </div>
        </div>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT II — 这就是微积分的内核</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">把曲线，<br>拆成无穷多条直线。</h3>
          <p class="sc__body">你刚刚做的事，有个名字：<strong>穷竭法</strong>。用无穷多个算得清的直边小块去逼近曲边图形，再让小块之和取极限——两千年后，牛顿与莱布尼茨把这套思想形式化，就成了积分。阿基米德差的，只是一个叫「极限」的词。这本《微积分的力量》，讲的正是这个念头如何一路改写了世界。</p>
        </div>
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">想明白了？<br>那就别解释了。</h2>
        <p class="sc__dek lead">这套推理一旦讲全，听者多半已经走神。所以——如果你懒得费口舌，就掏出这支魔杖，轻轻一挥，淡淡地说一句：<br><strong>「我知道了。抛物线下的面积，是它内接三角形的 4⁄3。」</strong></p>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  const g = root.querySelector("#cal-tris");
  const ratioEl = root.querySelector("#cal-ratio");
  const seriesEl = root.querySelector("#cal-series");
  const stepEl = root.querySelector("#cal-step");
  const barEl = root.querySelector("#cal-bar");
  const lemmaEl = root.querySelector("#cal-lemma");
  const nextBtn = root.querySelector("#cal-next");
  const resetBtn = root.querySelector("#cal-reset");
  if (!g) return;
  let k = 0;

  function draw() {
    g.innerHTML = ALL_TRIS
      .filter((t) => t.level <= k)
      .map((t) => `<polygon class="cal__tri" data-lv="${t.level}" points="${t.pts.map((p) => p.join(",")).join(" ")}"/>`)
      .join("");
    const r = ratioAt(k);
    ratioEl.textContent = r.toFixed(k === 0 ? 3 : 4);
    const terms = FRACS.slice(0, k + 1);
    seriesEl.innerHTML = terms.map((t, i) => i === k && k > 0 ? `<b>${t}</b>` : t).join(" + ") + ` = ${r.toFixed(4)}`;
    stepEl.textContent = STEP_TEXT[k];
    barEl.style.width = (r / (4 / 3) * 100).toFixed(1) + "%";
    lemmaEl.classList.toggle("is-on", k >= 2);
    nextBtn.disabled = k >= MAXD;
    nextBtn.textContent = k >= MAXD ? "已逼近 4⁄3" : k === 0 ? "放第一个三角形 →" : "继续填缝 →";
  }
  nextBtn.addEventListener("click", () => { if (k < MAXD) { k++; draw(); } });
  resetBtn.addEventListener("click", () => { k = 0; draw(); });
  draw();
}
