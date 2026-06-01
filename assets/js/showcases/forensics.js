// showcases/forensics.js — bespoke story for 《洗冤集录》, written in semi-classical Chinese.
// Interactive: 断案三问 (three validated forensic methods from the book).
import { figSlot } from "../ui.js";

const QUESTIONS = [
  {
    tag: "其一 · 聚蝇验镰",
    q: "盛夏，田畔有人被镰刀所杀。讯得近旁刈稻者数十，各持一镰，皆濯之净，不见血痕。于众镰之中，何以辨出杀人之器？",
    opts: [
      "逐一验其刃之利钝，最利者即凶器。",
      "令众人列镰于地，静候之——蝇必聚于一镰。",
      "察众人神色，面有惧色者，其镰即凶。",
    ],
    correct: 1,
    explain: "血腥之气，濯之不尽，肉眼虽不见，蝇能知之。须臾，群蝇独集于一镰，持镰者面如死灰，遂伏。今之法医，验微量血迹亦本此理——古人之智，暗合千年之后。",
  },
  {
    tag: "其二 · 焚尸辨生死",
    q: "得焚尸一具。欲知其人，乃生前为火所焚，抑或既死而后投于火？当验何处，方为切要？",
    opts: [
      "口鼻之内，有无烟灰——生者临火，必曾吸入。",
      "皮肉焦黑之深浅，深者必死于火。",
      "量其骨殖之长短，以推先后。",
    ],
    correct: 0,
    explain: "生者临火，惊惧喘息，烟灰随气入于喉肺；既死者，气绝息止，口鼻必净。验烟灰之有无，死生先后立判。此即今所谓『生活反应』，洗冤一书，早已言之。",
  },
  {
    tag: "其三 · 缢痕辨真伪",
    q: "梁下悬一尸，索痕宛然。然欲辨其自缢而亡，抑或被人勒毙、再悬之以惑众，当审索痕作何形状？",
    opts: [
      "痕绕颈一周，平而深匀，其色青紫，乃自缢之征。",
      "痕高近颔，斜而向上，脑后留空而不相交（八字不交），乃自缢之征。",
      "索痕深浅，原与生死无干，不足为凭。",
    ],
    correct: 1,
    explain: "自缢者，身重下坠，痕必高、必斜向上、脑后留空而『八字不交』；若是被勒，则痕低而平、绕颈一周。一斜一平，自他之分，了然于颈。此辨痕之法，至今犹用。",
  },
];

const TRIAD = [
  { t: "书 · 察微", b: "《洗冤集录》司检验。验伤、辨毒、聚蝇、验骨，使死者能言。" },
  { t: "面 · 诘奸", b: "判官之面司审讯。坐堂诘问，察言观色，使生者吐实。" },
  { t: "剑 · 正法", b: "龙泉之剑司决断。检验既明、罪证既确，则正法以彰。" },
];

export function render() {
  return `
  <div class="sc sc--forensics">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / 洗冤集录 · 一一四七年</p>
        <figure class="fx-source">
          <blockquote>狱事莫重于大辟，大辟莫重于初情，初情莫重于检验。盖死生出入之权舆，幽枉屈伸之机括，于是乎决。</blockquote>
          <figcaption class="mono">— 宋慈《洗冤集录·序》原文</figcaption>
        </figure>
        <p class="sc__dek lead">宋慈此言，掷地有声：人命关天，关键全在「检验」二字。换作今日的话——<strong>要呼唤正义，必先呼唤方法。</strong>八百年前，他便把断案立在了证据与检验之上。</p>
      </header>

      <section class="fx-quiz" data-reveal>
        <p class="sc__act-no mono">断案三问 · 点选你的判断</p>
        <h3 class="sc__act-title">这三道，皆出自书中，<br>且历千年而其理不谬。</h3>
        <div class="fx-quiz__list">
          ${QUESTIONS.map((Q, qi) => `
            <div class="fq" data-correct="${Q.correct}" style="--d:${qi * 0.05}s">
              <p class="fq__no mono">${Q.tag}</p>
              <p class="fq__q">${Q.q}</p>
              <div class="fq__opts">
                ${Q.opts.map((o, i) => `
                  <button class="fq__opt" data-i="${i}">
                    <span class="fq__key mono">${"甲乙丙"[i]}</span>
                    <span class="fq__opt-text">${o}</span>
                    <span class="fq__mark" aria-hidden="true"></span>
                  </button>`).join("")}
              </div>
              <div class="fq__explain"><p>${Q.explain}</p></div>
            </div>`).join("")}
        </div>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">承上 · 不止于检验</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">然则，洗一桩冤，<br>岂止于验尸一事？</h3>
          <p class="sc__body">检验明其真伪，是为「察微」；然真凶未必肯认，尚须坐堂诘问，是为「审讯」；罪证既确，终须正法以谢天下，是为「行刑」。一案之雪，三事缺一不可。故此一套，除书之外，另备二物——非为凑数，实乃断案之全璧。</p>
        </div>
        ${figSlot("assets/img/illustrations/forensics-1-court.jpg", "古衙断案 · 配图（可选）", "建议：古代衙门 / 法医图卷 / 宋慈像，暗调古风，横版", { ratio: "21/9", wide: true })}
      </section>

      <section class="fx-triad" data-reveal>
        ${TRIAD.map((t) => `
          <div class="fx-card">
            <p class="fx-card__t display">${t.t}</p>
            <p class="fx-card__b">${t.b}</p>
          </div>`).join("")}
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">书以察微，面以诘奸，<br>剑以正法。</h2>
        <p class="sc__dek lead">三者既备于一室，沉冤可雪，公道可彰。摆在案头，亦自有一股不怒而威的肃气。</p>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  root.querySelectorAll(".fq").forEach((fq) => {
    const correct = +fq.dataset.correct;
    const opts = [...fq.querySelectorAll(".fq__opt")];
    opts.forEach((opt) => {
      opt.addEventListener("click", () => {
        if (fq.classList.contains("is-answered")) return;
        fq.classList.add("is-answered");
        const i = +opt.dataset.i;
        opts[correct].classList.add("is-correct");
        if (i !== correct) opt.classList.add("is-wrong");
        fq.classList.add("show-explain");
      });
    });
  });
}
