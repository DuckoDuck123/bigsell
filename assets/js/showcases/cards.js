// showcases/cards.js — Touch V4 (ESCP_THIS 2020) by Cardistry Touch + plastic throwing deck.
// Official deck facts sourced from Cardistry Touch / retailer listings.
import { figSlot } from "../ui.js";

const FACTS = [
  { l: "设计", v: "Alex Matencio" },
  { l: "印厂", v: "USPCC" },
  { l: "纸张工艺", v: "Crushed Stock" },
  { l: "灵感", v: "Techwear / 街头" },
  { l: "包装", v: "Swivelbox 旋转盒" },
  { l: "牌张", v: "54 张 · 51 张同面" },
];

export function render() {
  return `
  <div class="sc sc--cards">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / CARDISTRY TOUCH</p>
        <h2 class="sc__headline">一副扑克，<br>凭什么值两百多？</h2>
        <p class="sc__dek lead">因为它压根不是用来打牌的。Touch V4 是为「花切」而生的收藏品——而花切，是把一副纸牌玩成视觉艺术。</p>
      </header>

      ${figSlot("assets/img/illustrations/cards-1-hero.jpg", "Touch V4 · 主视觉", "建议：Touch V4 牌背扇牌 / 切牌动态，深色高反差，横版宽幅", { ratio: "21/9", wide: true })}

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT I — 花切是什么</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">不藏牌，不变没，<br>纯靠双手切出几何。</h3>
          <p class="sc__body">花切（cardistry）和魔术不同——它不骗你，全部摊在明面上：靠手指把牌切、旋、抛、展成流动的图形。而 Cardistry Touch 这个品牌，做牌只为一件事：让每一次展开、每一道扇形，都拼成连续不断的图案。为此，他们愿意把一副纸牌，做到收藏品的规格。</p>
        </div>
      </section>

      <section class="sc-facts-wrap" data-reveal>
        <p class="sc__act-no mono">官方数据 / THE DECK</p>
        <div class="sc-bignum">
          <span class="sc-bignum__n num" data-countup="2500" data-dur="1600">0</span>
          <span class="sc-bignum__cap">
            <span class="sc-bignum__t">全球限量发行</span>
            <span class="sc-bignum__s mono">售完即绝版 · 每副独立编号</span>
          </span>
        </div>
        <div class="sc-facts">
          ${FACTS.map((f) => `<div class="sc-fact"><p class="sc-fact__l mono">${f.l}</p><p class="sc-fact__v">${f.v}</p></div>`).join("")}
        </div>
        <p class="sc-cite mono">— 数据引自 Cardistry Touch「ESCP_THIS 2020 / Touch V4」官方与零售资料</p>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT II — 贵在设计</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">每一张，<br>都是为「展开」而设计。</h3>
          <p class="sc__body">深色牌背与明亮牌面形成强烈反差，专为切牌的视觉冲击而调；斜向条纹让扇牌时浮现律动的图形；54 张里有 51 张完全相同，确保任何角度的展开都严丝合缝。再装进一只特制的 Swivelbox 旋转盒——从拆盒那一刻起，它就更像一件潮流单品，而不只是一副牌。</p>
        </div>
      </section>

      ${figSlot("assets/img/illustrations/cards-2-detail.jpg", "细节 · 牌面与牌背", "建议：旋转盒 / 牌背斜纹特写，强反差，方版或竖版", { ratio: "4/3" })}

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">正因为太珍贵，<br>你大概舍不得拿它飞牌。</h2>
        <p class="sc__dek lead">所以我给你配了一副「菜鸟武器」：防水、防折、怎么造都不心疼的塑料飞牌，出手凌厉。典藏供着，飞牌造着——各司其职，互不耽误。</p>
      </section>

    </div>
  </div>`;
}
