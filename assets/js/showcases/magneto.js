// showcases/magneto.js — origin story for MAGNETO, with an interactive magnetic field.
import { figSlot } from "../ui.js";

const FEATS = [
  { t: "操控金属", b: "钢铁、磁性合金，无论多重，皆可隔空操纵、扭曲、撕裂。" },
  { t: "磁力护盾", b: "以磁场编织力场，挡下子弹、导弹与大多数物理攻击。" },
  { t: "磁悬浮飞行", b: "借地球磁场悬浮、飞行，永远从高处俯视众生。" },
];

// magnetic-field grid (static positions, oriented by pointer in init)
function fieldNeedles() {
  let s = "";
  for (let y = 38; y <= 242; y += 51) {
    for (let x = 40; x <= 560; x += 52) {
      s += `<g class="mag-needle" data-x="${x}" data-y="${y}"><line x1="${x - 11}" y1="${y}" x2="${x + 11}" y2="${y}"/><circle cx="${x + 11}" cy="${y}" r="2.6"/></g>`;
    }
  }
  return s;
}

export function render() {
  return `
  <div class="sc sc--magneto">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / MAGNETO</p>
        <h2 class="sc__headline">他能弯曲地球的磁场。<br>而这一切，始于一座集中营。</h2>
        <p class="sc__dek lead">万磁王不是天生的反派。他是被历史亲手锻造出来的——一个发誓「绝不重演」的幸存者。读懂他，你才会懂这份压迫感从何而来。</p>
      </header>

      ${figSlot("assets/img/illustrations/magneto-1-hero.jpg", "万磁王 · 主视觉", "建议：万磁王头盔特写 / 红黑电影感，横版宽幅", { ratio: "21/9", wide: true })}

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT I — 出身</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">能力觉醒的那一刻，<br>他正被推离父母。</h3>
          <p class="sc__body">埃里克·兰谢尔（Erik Lehnsherr），生于二战时一个犹太家庭。在奥斯维辛的铁门前，当他被士兵拖走、与父母生离，金属的大门在他的尖叫中扭曲变形——磁力，第一次苏醒。失去一切的少年从此只信一条：力量，才是不被碾碎的唯一办法。</p>
        </div>
      </section>

      ${figSlot("assets/img/illustrations/magneto-2-origin.jpg", "出身 · 二战阴影", "建议：少年 Erik / 铁丝网 / 沉郁褐色调，竖或方版皆可", { ratio: "4/3" })}

      <section class="mag" data-reveal>
        <p class="sc__act-no mono">动手 / 把鼠标移过去</p>
        <h3 class="sc__act-title">磁场所及，万物归位。</h3>
        <p class="mag__lead">铁屑会沿着磁场排列——它们没有选择。把指针移到下面的场里，看看「被支配」是什么感觉。</p>
        <div class="mag__field">
          <svg viewBox="0 0 600 280" role="img" aria-label="磁场互动">
            <defs><filter id="magGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
            ${fieldNeedles()}
            <circle class="mag__pole" id="mag-pole" r="9" filter="url(#magGlow)"/>
          </svg>
        </div>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT II — 信条</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">「绝不重演。」<br>哪怕代价是与世界为敌。</h3>
          <p class="sc__body">他创立了变种人兄弟会，与挚友 X 教授分道扬镳。X 信仰共存，他信仰主宰：要么变种人统治，要么被人类再一次送进焚化炉。你可以不认同他的手段，但很难否认——在所有反派里，他是最难被说成「错」的那一个。</p>
        </div>
      </section>

      <section class="mag-feats" data-reveal>
        ${FEATS.map((f) => `<div class="sc-feat"><p class="sc-feat__t display">${f.t}</p><p class="sc-feat__b">${f.b}</p></div>`).join("")}
      </section>

      ${figSlot("assets/img/illustrations/magneto-3-power.jpg", "施展磁力 · 悬浮压迫", "建议：万磁王悬浮、金属环绕、仰视视角，极具压迫感，横版宽幅", { ratio: "21/9", wide: true })}

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">想和他一样，<br>充满压迫感地登场吗？</h2>
        <p class="sc__dek lead">坏消息：你大概率不会磁悬浮。好消息：你可以踩着这台两轮平衡车，无声地滑进任何房间——重心前压，气场到位。压迫感这种东西，姿态对了就有一半。</p>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  const svg = root.querySelector(".mag__field svg");
  const pole = root.querySelector("#mag-pole");
  if (!svg) return;
  const needles = [...svg.querySelectorAll(".mag-needle")].map((g) => ({ g, x: +g.dataset.x, y: +g.dataset.y }));
  const VB = { w: 600, h: 280 };

  function orient(px, py) {
    needles.forEach((n) => {
      const a = (Math.atan2(py - n.y, px - n.x) * 180) / Math.PI;
      const d = Math.hypot(px - n.x, py - n.y);
      n.g.setAttribute("transform", `rotate(${a.toFixed(1)} ${n.x} ${n.y})`);
      n.g.style.opacity = (0.35 + 0.65 * Math.max(0, 1 - d / 360)).toFixed(2);
    });
  }
  function toVB(e) {
    const r = svg.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * VB.w, ((e.clientY - r.top) / r.height) * VB.h];
  }
  svg.addEventListener("pointermove", (e) => {
    const [px, py] = toVB(e);
    pole.setAttribute("cx", px); pole.setAttribute("cy", py); pole.style.opacity = 1;
    orient(px, py);
  });
  svg.addEventListener("pointerleave", () => { pole.style.opacity = 0; orient(300, 140); });
  orient(300, 140);
}
