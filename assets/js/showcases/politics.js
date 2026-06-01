// showcases/politics.js — How To × 当代政治哲学. Ends with a camera→campaign-poster generator.
// All image processing is local (canvas); nothing is uploaded.

export function render() {
  return `
  <div class="sc sc--politics">
    <div class="wrap">

      <header class="sc__open" data-reveal>
        <p class="sc__kicker mono">展示 / HOW TO</p>
        <h2 class="sc__headline">用最不切实际的办法，<br>解决最实际的问题。</h2>
        <p class="sc__dek lead">这本书的副标题，几乎就是一句施政纲领。再配上一本正经的政治哲学——一套「未来领袖养成包」就齐了。</p>
      </header>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT I — 作者是谁</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">兰道尔·门罗：<br>前 NASA 工程师，画漫画的。</h3>
          <p class="sc__body">Randall Munroe，做过 NASA 的机器人工程师，后来成了网络漫画 <a href="https://xkcd.com/" target="_blank" rel="noopener"><em>xkcd</em></a> 的作者。《How To》是他一本正经地用最荒谬的方式解决日常问题：如何靠挖洞给手机充电、如何降落一架你根本不会开的飞机。每个方案都建立在真实的物理与数学上——荒诞，但算得分毫不差。<span class="sc-cite mono">↳ 官网 xkcd.com</span></p>
        </div>
      </section>

      <section class="sc__act" data-reveal>
        <p class="sc__act-no mono">ACT II — 一个大胆的嫁接</p>
        <div class="sc__act-grid">
          <h3 class="sc__act-title">把这种脑洞，<br>接到政治哲学上。</h3>
          <p class="sc__body">《当代政治哲学》负责给你一套严肃的框架：正义、自由、权力、分配。《How To》负责让你敢想任何离谱的解法。两者一旦合体，你就拥有了一种稀有的能力——<strong>用最不切实际的方法，治理最实际的人间</strong>。人类未来的领袖，也许就差这两本书。那么，先从一张海报开始吧。</p>
        </div>
      </section>

      <section class="poster" data-reveal data-mode="idle">
        <p class="sc__act-no mono">大选项 / 生成你的竞选海报</p>
        <h3 class="sc__act-title">来真的：<br>三秒钟，做一张你的竞选海报。</h3>
        <div class="poster__rig">
          <div class="poster__stage">
            <video id="pl-video" playsinline muted></video>
            <canvas id="pl-canvas" aria-label="竞选海报"></canvas>
            <div class="poster__ph">
              <span class="poster__ph-icon">▣</span>
              <p class="poster__ph-t">开启摄像头，或上传一张正脸照<br>剩下的交给「竞选总部」。</p>
              <p class="poster__ph-sec mono" id="pl-msg">照片只在你的浏览器里处理，不上传服务器。</p>
            </div>
            <span class="poster__live mono">● LIVE</span>
          </div>
          <div class="poster__panel">
            <div class="poster__field">
              <p class="poster__field-l mono">① 选风格</p>
              <div class="poster__styles" role="tablist">
                <button class="poster__style is-active" data-style="greece">希腊 · 古典</button>
                <button class="poster__style" data-style="usa">美国 · 红蓝</button>
                <button class="poster__style" data-style="cn">中国 · 赤诚</button>
              </div>
            </div>
            <div class="poster__field">
              <p class="poster__field-l mono">② 拍 / 选照片</p>
              <div class="poster__controls">
                <button class="btn btn--accent" data-act="start">开启摄像头</button>
                <label class="btn btn--ghost poster__upload">上传照片<input id="pl-file" type="file" accept="image/*" hidden></label>
                <button class="btn btn--accent" data-act="shoot">拍照 ✦</button>
                <button class="btn btn--ghost" data-act="retake">重拍</button>
                <button class="btn btn--accent" data-act="download">下载海报 ↓</button>
              </div>
            </div>
            <p class="poster__hint mono">🔒 全程在你本机处理，绝不上传。</p>
          </div>
        </div>
      </section>

      <section class="sc__close" data-reveal>
        <p class="sc__act-no mono">收尾</p>
        <h2 class="sc__headline">海报有了，<br>就差两本书的执政纲领。</h2>
        <p class="sc__dek lead">先把它们读了。等你真的要竞选什么的那天，至少，理论是扎实的。</p>
      </section>

    </div>
  </div>`;
}

/* --------------------------- poster generator -------------------------- */
function drawCover(ctx, src, W, H) {
  const sw = src.videoWidth || src.naturalWidth || src.width;
  const sh = src.videoHeight || src.naturalHeight || src.height;
  const sr = sw / sh, dr = W / H;
  let cw, ch, sx, sy;
  if (sr > dr) { ch = sh; cw = sh * dr; sx = (sw - cw) / 2; sy = 0; }
  else { cw = sw; ch = sw / dr; sx = 0; sy = (sh - ch) / 2; }
  ctx.drawImage(src, sx, sy, cw, ch, 0, 0, W, H);
}
function scrim(ctx, W, H, from, color, start = 0.5) {
  const g = ctx.createLinearGradient(0, H * start, 0, H);
  g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, color);
  ctx.fillStyle = g; ctx.fillRect(0, H * start, W, H * (1 - start));
}
function topScrim(ctx, W, H, color) {
  const g = ctx.createLinearGradient(0, 0, 0, H * 0.3);
  g.addColorStop(0, color); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.3);
}

// posterize: quantize each pixel's luminance into a small palette (screen-print look)
function posterize(ctx, W, H, ramp) {
  const img = ctx.getImageData(0, 0, W, H), d = img.data, N = ramp.length;
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const c = ramp[Math.min(N - 1, (lum * N / 256) | 0)];
    d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2];
  }
  ctx.putImageData(img, 0, 0);
}

const STYLES = {
  greece(ctx, W, H, src) {
    ctx.save(); ctx.filter = "grayscale(1) contrast(1.22) brightness(1.05)"; drawCover(ctx, src, W, H); ctx.restore();
    posterize(ctx, W, H, [[22,15,7], [92,64,34], [158,124,74], [228,208,160]]); // warm 4-tone engraving
    const v = ctx.createRadialGradient(W / 2, H * 0.42, H * 0.18, W / 2, H * 0.5, H * 0.8);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(28,20,8,0.5)");
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    topScrim(ctx, W, H, "rgba(28,20,8,0.5)"); scrim(ctx, W, H, 0.5, "rgba(24,17,7,0.92)", 0.5);
    const gold = "#EAD9A6";
    ctx.textAlign = "center";
    ctx.fillStyle = gold; ctx.font = '600 34px Georgia, "Times New Roman", serif';
    ctx.fillText("ΥΠΟΨΗΦΙΟΣ", W / 2, 92);
    ctx.font = "700 118px Georgia, serif"; ctx.fillText("ΗΓΕΜΩΝ", W / 2, H - 228);
    ctx.font = "600 30px Georgia, serif"; ctx.fillText("Η ΠΟΛΙΣ ΧΡΕΙΑΖΕΤΑΙ ΕΣΕΝΑ", W / 2, H - 168);
    ctx.fillStyle = "rgba(234,217,166,0.72)"; ctx.font = "italic 24px Georgia, serif";
    ctx.fillText("— the city needs you —", W / 2, H - 128);
    ctx.strokeStyle = "rgba(234,217,166,0.85)"; ctx.lineWidth = 3; ctx.strokeRect(26, 26, W - 52, H - 52);
  },
  usa(ctx, W, H, src) {
    ctx.save(); ctx.filter = "grayscale(1) contrast(1.35) brightness(1.05)"; drawCover(ctx, src, W, H); ctx.restore();
    // Obama-HOPE quadtone: shadows→navy, mids→red, lights→light-blue, highlights→cream
    posterize(ctx, W, H, [[10,30,64], [178,32,52], [112,162,192], [238,228,206]]);
    topScrim(ctx, W, H, "rgba(7,26,70,0.55)");
    ctx.fillStyle = "#b41f35"; ctx.fillRect(0, H - 232, W, 232);
    ctx.fillStyle = "#f3f4f7"; ctx.fillRect(0, H - 232, W, 6);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff"; ctx.font = '800 38px "Space Grotesk", Arial, sans-serif';
    ctx.fillText("★   FOR  PRESIDENT   ★", W / 2, 88);
    ctx.font = '900 150px "Space Grotesk", Arial, sans-serif'; ctx.fillText("VOTE", W / 2, H - 96);
    ctx.font = '700 30px "Space Grotesk", Arial, sans-serif'; ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText("A   STRONGER   TOMORROW", W / 2, H - 46);
  },
  cn(ctx, W, H, src) {
    ctx.save(); ctx.filter = "grayscale(1) contrast(1.24) brightness(1.05)"; drawCover(ctx, src, W, H); ctx.restore();
    // propaganda 4-tone: black → deep red → red → gold
    posterize(ctx, W, H, [[18,8,8], [120,16,22], [200,38,44], [244,214,140]]);
    topScrim(ctx, W, H, "rgba(90,8,16,0.55)"); scrim(ctx, W, H, 0.5, "rgba(82,6,14,0.94)", 0.48);
    const gold = "#F4DC92";
    ctx.textAlign = "center"; ctx.fillStyle = gold;
    ctx.font = '600 32px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText("民 之 所 向 · 吾 之 所 往", W / 2, 94);
    ctx.font = '800 132px "PingFang SC", "Microsoft YaHei", sans-serif'; ctx.fillText("一心为民", W / 2, H - 214);
    ctx.font = '700 40px "PingFang SC", "Microsoft YaHei", sans-serif'; ctx.fillStyle = "#FBEFC8";
    ctx.fillText("不负人民　不负重托", W / 2, H - 150);
  },
};

export function init(root) {
  const sec = root.querySelector(".poster");
  if (!sec) return;
  const video = root.querySelector("#pl-video");
  const canvas = root.querySelector("#pl-canvas");
  const fileInput = root.querySelector("#pl-file");
  const msg = root.querySelector("#pl-msg");
  const btn = (a) => root.querySelector(`[data-act="${a}"]`);
  let stream = null, source = null, style = "greece";

  const setMode = (m) => { sec.dataset.mode = m; };

  function render() {
    if (!source) return;
    const W = 900, H = 1200;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    (STYLES[style] || STYLES.greece)(ctx, W, H, source);
  }

  async function start() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 1280, height: 960 } });
      video.srcObject = stream; await video.play();
      setMode("live");
    } catch (e) {
      msg.textContent = "没拿到摄像头权限——没关系，点「上传照片」也一样能做。";
      setMode("nocam");
    }
  }
  function stop() { if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; } }
  function shoot() {
    const w = video.videoWidth, h = video.videoHeight;
    if (!w) return;
    const off = document.createElement("canvas"); off.width = w; off.height = h;
    off.getContext("2d").drawImage(video, 0, 0, w, h);
    source = off; stop(); setMode("shot"); render();
  }
  function fromFile(file) {
    const img = new Image();
    img.onload = () => { source = img; stop(); setMode("shot"); render(); };
    img.src = URL.createObjectURL(file);
  }
  function retake() { source = null; setMode("idle"); msg.textContent = "照片只在你的浏览器里处理，不上传任何服务器。"; }
  function download() {
    const a = document.createElement("a");
    a.download = `竞选海报-${style}.png`; a.href = canvas.toDataURL("image/png"); a.click();
  }

  btn("start").addEventListener("click", start);
  btn("shoot").addEventListener("click", shoot);
  btn("retake").addEventListener("click", retake);
  btn("download").addEventListener("click", download);
  fileInput.addEventListener("change", (e) => { if (e.target.files[0]) fromFile(e.target.files[0]); });
  root.querySelectorAll(".poster__style").forEach((b) => {
    b.addEventListener("click", () => {
      style = b.dataset.style;
      root.querySelectorAll(".poster__style").forEach((x) => x.classList.toggle("is-active", x === b));
      if (source) render();
    });
  });
}
