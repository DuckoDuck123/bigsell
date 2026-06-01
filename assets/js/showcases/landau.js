// showcases/landau.js — 理论物理的十诫. Meme story + a clickable "ascend to godhood" ladder.

const SCALE = [
  { v: 0.5, name: "爱因斯坦", sub: "0.5 级", side: "up" },
  { v: 2.0, name: "朗道（自评）", sub: "2 级 · 还嫌自己高了", side: "down" },
  { v: 4.0, name: "多数物理学家", sub: "4 级", side: "up" },
];

// the ladder: each click reads more of L&L and unlocks an absurd, on-sale capability
const STEPS = [
  { lv: 4.5, tier: "入门", chip: "拆封", txt: "撕开塑封。十卷在手——物理系的成人礼，正式开始。" },
  { lv: 4.0, tier: "学徒", chip: "平衡", txt: "读完《力学》，你解锁了「平衡」。配套那台体感平衡车，从此优雅地不摔倒。" },
  { lv: 3.3, tier: "进阶", chip: "磁场", txt: "读完《连续介质电动力学》，万磁王之力初现——金属开始听话（暂限漫画分镜里）。" },
  { lv: 2.7, tier: "高手", chip: "魔法", txt: "读完《微积分的力量》，你学会了真魔法：挥一挥魔杖，抛物线下的面积自己就算出来了。" },
  { lv: 2.0, tier: "追平朗道", chip: "登月", txt: "读完《光学》，8×42 望远镜在手，月球近在眼前。你已与朗道平起平坐。" },
  { lv: 1.4, tier: "宗师", chip: "财富", txt: "读完《国富论》，你看懂了「看不见的手」。创造财富，从此是基本操作。" },
  { lv: 0.8, tier: "传说", chip: "传送", txt: "读完《场论》，时空开始松动。传送枪的草图，已在你脑中成形。" },
  { lv: 0.5, tier: "追平爱因斯坦", chip: "多元宇宙", txt: "读完《统计物理学》，多元宇宙的门缝被你推开。你，追平了爱因斯坦。" },
  { lv: 0.2, tier: "近神", chip: "断生死", txt: "顺手翻完《洗冤集录》，你已能洞悉生死——宋代法医绝学，不过是你的副本。" },
  { lv: 0.02, tier: "无限接近 0", chip: "全知", txt: "十卷读尽，万物归一。你的等级正无限接近 0——那是上帝的坐标。" },
];

const COMMANDMENTS = [
  { v: "卷一 · 力学", t: "你以为你懂经典力学。翻开第一章，谦虚就回来了。" },
  { v: "卷二 · 场论", t: "时间和空间，从这一卷起，正式开始不听话。" },
  { v: "卷三 · 量子力学", t: "薛定谔的猫在这里既活着，又在劝你别读了。" },
  { v: "卷四 · 相对论量子力学", t: "把相对论和量子缝在一起，缝合处叫「头疼」。" },
  { v: "卷五 · 统计物理学 I", t: "一个粒子讲不清的事，一万亿个反而讲清了。" },
  { v: "卷六 · 流体力学", t: "看起来在讲水，其实在预演你学不下去时的眼泪。" },
  { v: "卷七 · 弹性理论", t: "关于「弯而不折」——很适合形容此刻的你。" },
  { v: "卷八 · 连续介质电动力学", t: "电磁学的硬核续集，主角换成了物质本身。" },
  { v: "卷九 · 统计物理学 II", t: "上一部还没缓过来，它就出了续集。" },
  { v: "卷十 · 物理动理学", t: "终章。能读到这里的人，朗道会勉强承认你的存在。" },
];

export function render() {
  return `
  <div class="sc sc--landau">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / COURSE OF THEORETICAL PHYSICS</p>
        <h2 class="sc__headline">朗道-栗弗席兹，十卷。<br>物理系的成人礼。</h2>
        <p class="sc__dek lead">传说级难度，物理系的顶点。多数人买它，是为了摆在书架上「打算」读。不过你应该高兴——这正是为什么，你能买到这么新的二手书。</p>
      </header>

      <section class="lg-scale-sec" data-reveal>
        <p class="sc__act-no mono">朗道天才等级 · 一直点，一直爬</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">朗道给物理学家<br>排了个对数等级表。</h3>
          <p class="sc__body">他按贡献把物理学家分级，<strong>每级相差十倍</strong>，等级越低越神。爱因斯坦 0.5，他谦虚地给自己 2。你起步是 5——但下面这个按钮，能让你一路往 0 爬。</p>
        </div>

        <div class="lg-scale">
          <div class="lg-scale__rail">
            <span class="lg-scale__end mono lg-scale__end--l">0 · 神</span>
            <span class="lg-scale__end mono lg-scale__end--r">5 · 凡人</span>
            ${SCALE.map((m) => `
              <div class="lg-mark lg-mark--${m.side}" style="left:${m.v / 5 * 100}%">
                <span class="lg-mark__dot"></span>
                <span class="lg-mark__lbl"><b>${m.name}</b><em>${m.sub}</em></span>
              </div>`).join("")}
            <div class="lg-mark lg-mark--you lg-mark--down" id="lg-you" style="left:100%">
              <span class="lg-mark__dot"></span>
              <span class="lg-mark__lbl"><b>你</b></span>
            </div>
          </div>

          <div class="lg-ladder">
            <div class="lg-ladder__lv">
              <span class="lg-ladder__lv-l mono">你的天才等级</span>
              <span class="lg-ladder__lv-n num" id="lg-lv">5.0</span>
              <span class="lg-ladder__tier mono" id="lg-tier">凡人 · 起步</span>
            </div>
            <p class="lg-ladder__txt" id="lg-unlock">提示：99% 的进步，发生在拆开塑封的那一刻。</p>
            <div class="lg-chips" id="lg-chips" aria-hidden="true"></div>
            <button class="btn btn--accent" id="lg-step">拆封，开始攀登 →</button>
          </div>
        </div>
      </section>

      <section class="lg-ten" data-reveal>
        <p class="sc__act-no mono">理论物理的十诫 · 全十卷</p>
        <h3 class="sc__act-title">十卷书，十道坎。</h3>
        <ol class="lg-ten__list">
          ${COMMANDMENTS.map((c, i) => `
            <li class="lg-cmd">
              <span class="lg-cmd__i mono">${String(i + 1).padStart(2, "0")}</span>
              <span class="lg-cmd__v">${c.v}</span>
              <span class="lg-cmd__t">${c.t}</span>
            </li>`).join("")}
        </ol>
      </section>

      <section class="lg-barrier" data-reveal>
        <p class="lg-barrier__n display">≈ <span data-countup="43" data-dur="1500">0</span></p>
        <p class="lg-barrier__t">历史上，通过朗道「理论物理最低标准」全部口试的人，总共只有约 <strong>43 位</strong>。这套书，就是那道「朗道势垒」的实体版。你不必跨过去——摆着，也很唬人。</p>
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾 · 还有副护目镜</p>
        <h2 class="sc__headline">读不读得完两说，<br>但你得先看起来像。</h2>
        <p class="sc__dek lead">所以这一包还附一副复古黄铜护目镜。戴上它站在书架前，至少在拍照那一刻，你就是那个即将推翻物理学的疯子。原价合计六百多，仅拆封——打包带走。</p>
      </section>

    </div>
  </div>`;
}

export function init(root) {
  const you = root.querySelector("#lg-you");
  const lvEl = root.querySelector("#lg-lv");
  const tierEl = root.querySelector("#lg-tier");
  const txtEl = root.querySelector("#lg-unlock");
  const chips = root.querySelector("#lg-chips");
  const btn = root.querySelector("#lg-step");
  if (!btn) return;
  let i = -1, cur = 5.0;

  const animateLv = (to) => {
    const from = cur; cur = to;
    const t0 = performance.now(), dur = 600;
    const frame = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const v = from + (to - from) * (1 - Math.pow(1 - t, 3));
      lvEl.textContent = v.toFixed(2).replace(/0$/, "");
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    setTimeout(() => { lvEl.textContent = to < 0.05 ? "→ 0" : String(to); }, dur + 60);
  };

  btn.addEventListener("click", () => {
    if (i >= STEPS.length - 1) {            // already a god → only one thing left
      document.querySelector(".pricecard [data-contact]")?.click();
      return;
    }
    i++;
    const s = STEPS[i];
    you.style.left = (s.lv / 5 * 100) + "%";
    animateLv(s.lv);
    tierEl.textContent = s.tier;
    txtEl.textContent = s.txt;
    const chip = document.createElement("span");
    chip.className = "lg-chip"; chip.textContent = s.chip;
    chips.appendChild(chip);

    if (i === STEPS.length - 1) {
      you.classList.add("lg-mark--god");
      tierEl.textContent = "无限接近 0 · 神";
      txtEl.innerHTML = "<strong>你已无限接近 0——上帝的坐标。</strong> 而你和成神之间，只差……一次购买。";
      btn.textContent = "只差最后一步 · 购买 →";
      btn.classList.add("lg-step--final");
    } else {
      btn.textContent = "继续读 →";
    }
  });
}
