# 告别书架 · Moving Sale 2026

去美国留学前的二手书 / 物出售站。纯静态，托管在 GitHub Pages。

## 本地预览
```bash
cd things
python3 -m http.server 4321
# 浏览器打开 http://localhost:4321
```
> ⚠️ 必须走本地服务器（或 GitHub Pages）。直接双击 `index.html` 会因为浏览器安全策略读不到 JSON。

## 我要做的三件事
1. **加 / 改商品** → 编辑 [`data/inventory.json`](data/inventory.json)
2. **把卖掉的标成已售** → 编辑 [`data/status.json`](data/status.json)，把对应 id 改成 `"sold"`
3. **改联系方式 / 文案** → 编辑 [`data/site.json`](data/site.json)

字段说明见 [`Agent.md`](Agent.md)。

## 加封面图 / 购买截图
1. 把图片放进 `assets/img/covers/` 或 `assets/img/proofs/`
2. 在 `inventory.json` 里填路径，例如：
   - 封面：`"cover": "assets/img/covers/deep-work.jpg"`
   - 截图：`"proof": "assets/img/proofs/lamy.png"`（item 里）
3. 不填封面也行——系统会自动生成主题色渐变占位。

## 目录结构
```
things/
├── index.html            首页
├── listing.html          通用详情页（?id=xxx）
├── data/                 ← 你主要编辑这里
│   ├── site.json
│   ├── inventory.json
│   └── status.json
├── assets/
│   ├── css/  (tokens / home / listing)
│   ├── js/   (store / ui / home / listing)
│   └── img/  (covers / proofs)
├── Agent.md              目标与进度
└── README.md
```
