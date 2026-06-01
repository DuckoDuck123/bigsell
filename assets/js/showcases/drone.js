// showcases/drone.js — bespoke product story for the DJI Mini 3 Pro bundle.
// Specs quoted/paraphrased from DJI's official Mini 3 Pro material (NOT later models).

const SPECS = [
  { n: "<249g", l: "起飞重量" },
  { n: "4K·60", l: "视频 fps" },
  { n: "48MP", l: "1/1.3″ 影像" },
  { n: "47min", l: "长续航电池" },
  { n: "12km", l: "O3 图传" },
];

const FEATURES = [
  { t: "True Vertical Shooting", b: "云台旋转 90°，竖屏内容原生出片，不靠裁切凑数。" },
  { t: "三向避障 · APAS 4.0", b: "前 / 后 / 下方感知，自动绕开障碍继续飞。" },
  { t: "FocusTrack 智能跟随", b: "ActiveTrack、Spotlight、兴趣点环绕——一个人也能把自己拍好。" },
];

const BOX = [
  { n: "DJI Mini 3 Pro 机身", s: "" },
  { n: "DJI RC 带屏遥控器", s: "自带屏幕" },
  { n: "智能飞行电池 Plus", s: "长续航" },
  { n: "收纳箱", s: "" },
  { n: "闪迪 SanDisk 128GB microSD", s: "" },
  { n: "《高等数学》· 秘籍", s: "本包附赠" },
];

const PAINS = [
  {
    q: "电量低或信号弱时，它会自动返航——而返航的这一两分钟，你只能站在原地干等。",
    a: "掏出秘籍，翻到任意一页。这段空窗，正好够你重新看懂半个极限的定义。",
  },
  {
    q: "无人机一起飞就招小孩，最怕的是有人凑过来抢你的带屏遥控器。",
    a: "把遥控器夹进《高等数学》里合上。实测：没有任何小孩会主动靠近一本高数。",
  },
];

export function render(listing) {
  const cover = listing.cover || "";
  return `
  <div class="sc sc--drone">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / MINI 3 PRO</p>
        <h2 class="sc__headline">它几乎什么都好。<br>几乎。</h2>
        <p class="sc__dek lead">DJI Mini 3 Pro 把「专业」塞进了不到 249 克的机身。下面先说它有多好，再说它那两个、正好被一本高数治好的小毛病。</p>
      </header>

      ${cover ? `
      <figure class="sc-shot" data-reveal>
        <img src="assets/img/illustrations/DJI-Mini-3-Pro.jpg" alt="${listing.title}" loading="lazy" />
        <figcaption class="mono">DJI Mini 3 Pro 官方宣传图</figcaption>
      </figure>` : ""}

      <section class="sc-spec" data-reveal>
        ${SPECS.map((s) => `
          <div class="sc-spec__cell">
            <p class="sc-spec__n display">${s.n}</p>
            <p class="sc-spec__l mono">${s.l}</p>
          </div>`).join("")}
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">DJI 当年怎么说</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">用更小的机身，<br>拍更大的世界。</h3>
          <p class="sc__body">这是 DJI 给 Mini 3 Pro 的定位——官方原话是 <em>“fly mini, create big”</em>。1/1.3 英寸传感器、4800 万像素、f/1.7 大光圈，4K/60fps 加 4K HDR；云台旋转 90° 做 True Vertical Shooting，竖屏直接原生出片；再加三向避障和 FocusTrack 智能跟随。<span class="sc-cite mono">— 规格与说法引自 DJI 对 Mini 3 Pro 的官方介绍</span></p>
        </div>
      </section>

      <section class="sc-feats" data-reveal>
        ${FEATURES.map((f) => `
          <div class="sc-feat">
            <p class="sc-feat__t display">${f.t}</p>
            <p class="sc-feat__b">${f.b}</p>
          </div>`).join("")}
      </section>

      <section class="sc-box" data-reveal>
        <p class="sc__act-no mono">含 / WHAT'S INCLUDED</p>
        <ul class="sc-box__list">
          ${BOX.map((b, i) => `
            <li class="sc-box__row">
              <span class="sc-box__i mono">${String(i + 1).padStart(2, "0")}</span>
              <span class="sc-box__n">${b.n}</span>
              ${b.s ? `<span class="sc-box__s mono">${b.s}</span>` : ""}
            </li>`).join("")}
        </ul>
      </section>

      <section class="sc-pains" data-reveal>
        <p class="sc__act-no mono">那两个小毛病 · 点击看解法</p>
        <h3 class="sc__act-title">好归好，它有两个痛点。<br>秘籍正好治。</h3>
        <div class="sc-pains__row">
          ${PAINS.map((p, i) => `
            <button class="sc-pain" data-pain aria-expanded="false" style="--d:${i * 0.06}s">
              <span class="sc-pain__no mono">痛点 0${i + 1}</span>
              <span class="sc-pain__q">${p.q}</span>
              <span class="sc-pain__fix">
                <span class="sc-pain__fix-inner">
                  <span class="sc-pain__fix-label mono">秘籍解法</span>
                  <span class="sc-pain__fix-text">${p.a}</span>
                </span>
              </span>
              <span class="sc-pain__cue mono">点击展开解法 →</span>
            </button>`).join("")}
        </div>
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">一句话</p>
        <h2 class="sc__headline">Mini 3 Pro 负责飞，<br>秘籍负责飞以外的麻烦。</h2>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  root.querySelectorAll("[data-pain]").forEach((p) => {
    p.addEventListener("click", () => {
      const open = p.classList.toggle("is-open");
      p.setAttribute("aria-expanded", open);
    });
  });
}
