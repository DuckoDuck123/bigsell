// showcases/portal.js — R&M｜Portal 套装. Dialogue + the moon-landing physics tie-in.
import { figSlot } from "../ui.js";

const SCRIPT = [
  { who: "morty", name: "Morty", t: "Rick，桌上这两本砖头一样的破书，真得读吗？" },
  { who: "rick", name: "Rick", t: "*嗝* 必须的，Morty。这俩是地基。地基不牢，地动山摇。" },
  { who: "morty", name: "Morty", t: "可为什么偏偏是力学和电磁学？宇宙这么大，凭什么就这两门最基础？" },
  { who: "rick", name: "Rick", t: "因为……唉，老子懒得讲。喂——对，就是你，盯着这个破网站看的那个。你来解释，反正你不就是想卖这套书么？", fourth: true },
];

const PILLARS = [
  {
    k: "力学 · MECHANICS",
    src: "《自然哲学之数学原理》· 牛顿",
    b: "三大定律加万有引力，回答「东西怎么动、怎么受力」。从苹果落地、行星绕日，到任何一次碰撞与反冲——整个宏观世界的运动，全归它管。",
  },
  {
    k: "电磁学 · ELECTROMAGNETISM",
    src: "《电动力学导论》· Griffiths（英文原版）",
    b: "麦克斯韦方程组把电、磁、光拧成同一回事。你身边几乎所有「非引力」的相互作用——电路、信号、化学键、屏幕发光——骨子里都是电磁。",
  },
];

// Apollo Lunar Module (Eagle) — public model embedded via Sketchfab
const LM_UID = "c495d75f2a89496a89d92e92e42a4694";

function avatar(who, name) {
  return `<span class="scr-av scr-av--${who}">
    <img class="scr-av__img" src="assets/img/illustrations/portal-${who}.png" alt="${name}" data-av>
    <span class="scr-av__fb">${name[0]}</span>
  </span>`;
}

export function render() {
  return `
  <div class="sc sc--portal">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / PORTAL KIT</p>
        <h2 class="sc__headline">整个宏观世界，<br>其实就架在两根柱子上。</h2>
        <p class="sc__dek lead">经典物理看似千头万绪，骨架却异常简单：一根管「东西怎么动」，一根管「东西怎么相互作用」。这一包，就是这两根柱子的原典——外加一副不太正经的扑克。</p>
      </header>

      <section class="scr" data-reveal>
        <p class="sc__act-no mono">插一段 · 车库里的对话</p>
        <div class="scr__layout">
          <div class="scr__feed">
            ${SCRIPT.map((l) => `
              <div class="scr-line scr-line--${l.who}${l.fourth ? " scr-line--fourth" : ""}">
                ${avatar(l.who, l.name)}
                <div class="scr-bubble">
                  <span class="scr-bubble__name mono">${l.name}</span>
                  <p class="scr-bubble__t">${l.t}</p>
                </div>
              </div>`).join("")}
          </div>
          <figure class="scr__cast sc-figslot sc-figslot--art">
            <div class="sc-figslot__frame" style="--ratio:4/3">
              <img class="sc-figslot__img" src="assets/img/illustrations/portal-cast.png" alt="Rick and Morty" loading="lazy" data-figslot>
              <div class="sc-figslot__ph" aria-hidden="true">
                <span class="sc-figslot__ph-mark">◇</span>
                <span class="sc-figslot__ph-name mono">portal-cast.png</span>
                <span class="sc-figslot__ph-desc">把你发的那张 R&M 透明图存成这个名字放进 illustrations/</span>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">导购 · 接过话筒</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">好吧，Rick 不讲，<br>我来讲。</h3>
          <p class="sc__body">为什么是这两门？因为经典物理的宏观世界，基本就架在两根柱子上：一根管<strong>运动</strong>，一根管<strong>相互作用</strong>。把它们读透，你眼里的世界会突然变得「讲道理」——再复杂的现象，也能拆回这两套语言。</p>
        </div>
      </section>

      <section class="scr-pillars" data-reveal>
        ${PILLARS.map((p) => `
          <div class="scr-pillar">
            <p class="scr-pillar__k mono">${p.k}</p>
            <p class="scr-pillar__b">${p.b}</p>
            <p class="scr-pillar__src mono">↳ ${p.src}</p>
          </div>`).join("")}
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT III — 当年真有人靠它们上了月球</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">1969 年，<br>这两门基础物理把人送上了月亮。</h3>
          <p class="sc__body">阿波罗 11 号的登月舱「鹰号」，全程就是牛顿与麦克斯韦的合奏：<strong>力学</strong>算轨道、算下降推力、算上升逃逸——每一次点火，都是三大定律在解微分方程；<strong>电磁学</strong>撑起了无线电通讯、雷达测距，和那台用磁芯存储编程的阿波罗导航计算机。少了这两门，鹰号落不下去，更飞不回来。</p>
        </div>
      </section>

      <section class="scr-3d" data-reveal>
        <p class="sc__act-no mono">登月舱「鹰号」· 拖动旋转看看</p>
        <div class="scr-embed">
          <iframe title="Apollo Lunar Module"
            src="https://sketchfab.com/models/${LM_UID}/embed?ui_theme=dark&dnt=1&autospin=0.2&ui_infos=0&ui_hint=0&ui_watermark=0"
            frameborder="0" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen loading="lazy"></iframe>
        </div>
        <p class="scr-embed__cite mono">3D 模型经 Sketchfab 嵌入 · 公开来源（CC）·
          <a href="https://sketchfab.com/3d-models/apollo-lunar-module-${LM_UID}" target="_blank" rel="noopener">原模型 →</a></p>
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">我们，<br>月球再见</h2>
        <p class="sc__dek lead">现在就订购 Portal 套装，成为人类的先行者吧！</p>
      </section>

      ${figSlot("assets/img/illustrations/portal-moon.jpg", "月面 · 宽幅配图", "你来找：月球表面 / 月平线 宽幅大图，深色调最佳", { ratio: "21/9", wide: true })}

    </div>
  </div>`;
}

export function init(root) {
  root.querySelectorAll(".scr-av").forEach((av) => {
    const img = av.querySelector("img");
    const ok = () => av.classList.add("is-loaded");
    const bad = () => av.classList.remove("is-loaded");
    if (img.complete) (img.naturalWidth > 0 ? ok : bad)();
    img.addEventListener("load", ok);
    img.addEventListener("error", bad);
  });
}
