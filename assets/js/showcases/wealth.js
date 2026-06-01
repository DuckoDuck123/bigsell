// showcases/wealth.js — bespoke story for 《国富论》. Quotes Adam Smith liberally.
// Includes an interactive supply & demand ("invisible hand") model.

// --- plot geometry (data → SVG coords) ---
const X0 = 58, Y0 = 24, PW = 558, PH = 344;
const xFor = (Q) => X0 + (Q / 100) * PW;
const yFor = (P) => Y0 + (1 - P / 10) * PH;
// Demand: Qd = 100 - 10P ; Supply: Qs = 10P ; equilibrium P=5, Q=50
const D1 = [xFor(90), yFor(1)], D2 = [xFor(10), yFor(9)];
const S1 = [xFor(10), yFor(1)], S2 = [xFor(90), yFor(9)];
const EQ = [xFor(50), yFor(5)];

export function render() {
  const yTicks = [2, 4, 6, 8];
  const grid =
    [20, 40, 60, 80].map((Q) => `<line class="sd__grid" x1="${xFor(Q)}" y1="${Y0}" x2="${xFor(Q)}" y2="${Y0 + PH}"/>`).join("") +
    yTicks.map((P) => `<line class="sd__grid" x1="${X0}" y1="${yFor(P)}" x2="${X0 + PW}" y2="${yFor(P)}"/>`).join("");
  const yLabels = yTicks.map((P) => `<text class="sd__tick mono" x="${X0 - 9}" y="${yFor(P) + 4}" text-anchor="end">¥${P}</text>`).join("");
  return `
  <div class="sc sc--wealth">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / THE WEALTH OF NATIONS</p>
        <h2 class="sc__headline">1776 年，一本书<br>第一次把「市场」讲明白了。</h2>
        <p class="sc__dek lead">同一年，大洋彼岸有人签了《独立宣言》。而在格拉斯哥，亚当·斯密出版了《国富论》——现代经济学，从这本书开始。</p>
      </header>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT I — 它开创了什么</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">在它之前，<br>没有人系统地问过「财富从哪来」。</h3>
          <p class="sc__body">斯密给的答案是：分工。一根针的制造拆成十八道工序，产量能翻上千倍。财富不靠国库里的黄金，而靠所有人各自劳动、再彼此交换。他还顺手回答了一个更尖锐的问题——是什么让这些素不相识的人，心甘情愿地为你服务？</p>
        </div>
      </section>

      <figure class="sc-quote" data-reveal>
        <blockquote>我们能吃上晚饭，并非出于屠夫、酿酒师或面包师的恩惠，而是出于他们对自身利益的考量。</blockquote>
        <figcaption class="mono">— 亚当·斯密《国富论》</figcaption>
      </figure>

      <section class="sc-lab" data-reveal>
        <p class="sc__act-no mono">动手 / 看不见的手怎么动</p>
        <h3 class="sc__act-title">拖动价格，看市场自己找平衡。</h3>
        <p class="sc-lab__lead">没有人指挥，可一旦价格定偏，短缺或过剩就会逼着它回到那个唯一让买卖两清的点。斯密把这只手，叫做「看不见的手」。</p>

        <div class="sd">
          <div class="sd__chart">
            <svg viewBox="0 0 640 392" role="img" aria-label="供给与需求曲线">
              <defs><filter id="sdGlow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
              ${grid}
              <line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0 + PH}" class="sd__axis"/>
              <line x1="${X0}" y1="${Y0 + PH}" x2="${X0 + PW}" y2="${Y0 + PH}" class="sd__axis"/>
              ${yLabels}
              <text x="${X0 - 9}" y="${Y0 - 7}" class="sd__axlabel mono" text-anchor="end">价格</text>
              <text x="${X0 + PW}" y="${Y0 + PH + 30}" class="sd__axlabel mono" text-anchor="end">数量 →</text>
              <line class="sd__eqguide" x1="${EQ[0]}" y1="${EQ[1]}" x2="${EQ[0]}" y2="${Y0 + PH}"/>
              <line class="sd__eqguide" x1="${X0}" y1="${EQ[1]}" x2="${EQ[0]}" y2="${EQ[1]}"/>
              <line x1="${D1[0]}" y1="${D1[1]}" x2="${D2[0]}" y2="${D2[1]}" class="sd__demand"/>
              <line x1="${S1[0]}" y1="${S1[1]}" x2="${S2[0]}" y2="${S2[1]}" class="sd__supply"/>
              <text x="${D2[0]}" y="${D2[1] - 10}" class="sd__curvelabel sd__curvelabel--d mono" text-anchor="middle">需求 D</text>
              <text x="${S2[0]}" y="${S2[1] - 10}" class="sd__curvelabel sd__curvelabel--s mono" text-anchor="middle">供给 S</text>
              <line id="sd-gap" class="sd__gap"/>
              <line id="sd-priceline" class="sd__priceline" x1="${X0}" x2="${X0 + PW}"/>
              <circle cx="${EQ[0]}" cy="${EQ[1]}" r="5" class="sd__eq" id="sd-eq" filter="url(#sdGlow)"/>
              <circle id="sd-dotD" class="sd__dot sd__dot--d" r="7"/>
              <circle id="sd-dotS" class="sd__dot sd__dot--s" r="7"/>
              <circle id="sd-knob" class="sd__knob" cx="${X0}" r="11"/>
            </svg>
          </div>
          <div class="sd__panel">
            <div class="sd__readout">
              <div class="sd__stat"><span class="sd__stat-l mono">价格 P</span><span class="sd__stat-n num" id="sd-p">—</span></div>
              <div class="sd__stat"><span class="sd__stat-l mono">需求量 Qd</span><span class="sd__stat-n num" id="sd-qd">—</span></div>
              <div class="sd__stat"><span class="sd__stat-l mono">供给量 Qs</span><span class="sd__stat-n num" id="sd-qs">—</span></div>
            </div>
            <p class="sd__status" id="sd-status" data-state="">—</p>
            <input class="sd__slider" id="sd-slider" type="range" min="1" max="9" step="0.5" value="2.5" aria-label="价格" />
            <p class="sd__hint mono">← 低价 · 拖动 · 高价 →</p>
          </div>
        </div>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT II — 它为什么重要</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">价格，是一种<br>没人写、却人人都读的语言。</h3>
          <p class="sc__body">短缺时价格上涨，像是在喊「这里需要更多」；过剩时价格下跌，像是在说「够了，去别处」。千百万人只顾各自的小算盘，却被价格悄悄协调成了一整个有序的经济。没有中央指挥，没有人统筹全局——这正是斯密最惊人的洞见，也是自由市场至今的底层逻辑。</p>
        </div>
      </section>

      <figure class="sc-quote" data-reveal>
        <blockquote>他被一只看不见的手引导着，去促成一个并非他本意要达成的目的。</blockquote>
        <figcaption class="mono">— 亚当·斯密《国富论》</figcaption>
      </figure>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">手握钞票读《国富论》，<br>总是令人满足的。</h2>
        <p class="sc__dek lead">但少了这本书里的那些基础——分工、交换、价格、那只看不见的手——再厚的一沓钞票，也不过是一沓更高级的练功钞。这一包，正好两样都给你。</p>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  const $ = (id) => root.querySelector(id);
  const slider = $("#sd-slider");
  const svg = root.querySelector(".sd__chart svg");
  const priceline = $("#sd-priceline"), dotD = $("#sd-dotD"), dotS = $("#sd-dotS"), gap = $("#sd-gap"), knob = $("#sd-knob");
  const pEl = $("#sd-p"), qdEl = $("#sd-qd"), qsEl = $("#sd-qs"), statusEl = $("#sd-status");
  if (!slider) return;

  function update(P) {
    const Qd = 100 - 10 * P;
    const Qs = 10 * P;
    const y = yFor(P);
    priceline.setAttribute("y1", y); priceline.setAttribute("y2", y);
    dotD.setAttribute("cx", xFor(Qd)); dotD.setAttribute("cy", y);
    dotS.setAttribute("cx", xFor(Qs)); dotS.setAttribute("cy", y);
    knob.setAttribute("cy", y);
    gap.setAttribute("x1", xFor(Qd)); gap.setAttribute("y1", y);
    gap.setAttribute("x2", xFor(Qs)); gap.setAttribute("y2", y);

    pEl.textContent = "¥" + P.toFixed(1);
    qdEl.textContent = Qd.toFixed(0);
    qsEl.textContent = Qs.toFixed(0);

    let state, text;
    if (Math.abs(P - 5) < 0.01) {
      state = "eq"; text = "市场出清 · 买卖两清，这就是「看不见的手」找到的点。";
    } else if (P < 5) {
      state = "short"; text = `价偏低：想买的 ${Qd} > 能卖的 ${Qs}，短缺 ${Qd - Qs}。买家会抬价，价格被推着往上走。`;
    } else {
      state = "surplus"; text = `价偏高：能卖的 ${Qs} > 想买的 ${Qd}，过剩 ${Qs - Qd}。卖家得降价，价格被压着往下走。`;
    }
    statusEl.textContent = text;
    statusEl.dataset.state = state;
    root.querySelector(".sd").dataset.state = state;
  }

  slider.addEventListener("input", () => update(parseFloat(slider.value)));

  // drag anywhere on the chart to set the price (Brilliant-style)
  function priceFromEvent(e) {
    const r = svg.getBoundingClientRect();
    const yv = ((e.clientY - r.top) / r.height) * 392;
    let P = (1 - (yv - Y0) / PH) * 10;
    return Math.max(1, Math.min(9, Math.round(P * 2) / 2));
  }
  let dragging = false;
  const onMove = (e) => { if (!dragging) return; const P = priceFromEvent(e); slider.value = P; update(P); };
  svg.addEventListener("pointerdown", (e) => { dragging = true; try { svg.setPointerCapture(e.pointerId); } catch (_) {} const P = priceFromEvent(e); slider.value = P; update(P); });
  svg.addEventListener("pointermove", onMove);
  svg.addEventListener("pointerup", () => { dragging = false; });
  svg.addEventListener("pointercancel", () => { dragging = false; });

  update(parseFloat(slider.value));
}
