# Agent.md — 理性清仓 / Liquidation 2026

> 给协作的 AI 与未来的自己看的简明说明：目标、调性、约定、进度。

## 🎯 目标
Simba（在开封上学）去美国留学前清仓。纯静态、GitHub Pages：
- 浏览主题捆绑包 / 单卖；每件展示**原价**，贵的附**购买截图**；
- 看到喜欢的**联系卖家**（微信 / 邮件）；
- 卖出后**只改一个小 JSON** 标「已售」。

## 🎨 调性（v2，重要）
**深色科技 / Sci-Fi —— R&M × SpaceX × Apple。** 不是文艺，是工程感：近黑底、精密细线网格、等宽技术标签（FIG.00 / LOADOUT / MSRP）、克制的辉光与视差。
- 字体：**Space Grotesk**（拉丁大标题）+ **Inter**（正文）+ **JetBrains Mono**（标签/数字）+ **PingFang SC**（中文，跟苹果一致）。
- 冷幽默在**搭配本身**（正经书 × 离谱道具），通用文案保持干冷克制；**具体的梗放进每个捆绑包的 showcase / customPage**。
- 实拍图电影级，直接当封面。

## 🗂 数据约定
| 文件 | 改动频率 | 作用 |
|---|---|---|
| `data/site.json` | 很少 | 卖家、品牌、联系方式、首页文案 |
| `data/inventory.json` | 填商品时 | 所有捆绑 / 单卖的完整信息 |
| `data/status.json` | **经常（卖出时）** | 每个 id 一行：`available` / `reserved` / `sold` |

> 卖出后**只动 `status.json`**。价格留 `null` → 显示「价格待定·私聊」；填数字 → 折扣/立省自动算。

### listing 字段
```jsonc
{
  "id": "bundle-evolution-specimens",
  "type": "bundle",                 // "bundle" | "single"
  "title": "...", "theme": "...", "tagline": "...",
  "accent": "#D8A24A",              // 主题色（详情页换肤+辉光），在深色上要够亮
  "cover": "assets/img/covers/xxx.png",  // 留空则程序生成渐变占位
  "summary": "...",
  "askingPrice": 199,               // null = 待定
  "showcase": "evolution",          // ★ 填模块名 → 加载定制故事区；留空则无
  "items": [ { "name": "...", "kind": "book|item", "originalPrice": 88, "proof": "", "note": "" } ],
  "customPage": ""                  // 填路径则卡片直接跳到手写独立页（暂未用）
}
```

## 🧩 详情页结构（listing.html）
`hero → overview(简介 + 极简清单 LOADOUT) → showcase(定制) → 价目表/Spec → 价格卡`

### Showcase 系统（这就是「独立页面」）
- listing 的 `showcase: "<name>"` → listing.js 动态加载 `assets/js/showcases/<name>.js`。
- 模块导出 `render(listing)`（返回 HTML 字符串）和可选 `init(root)`（绑交互）。
- 样式在 `assets/css/showcase.css`，提供通用积木（`.sc__headline / .sc__act / .sc-tl 时间线 / .sc-jar 翻转卡`）。
- **每个捆绑包的 showcase 内容可以完全不同**，故事要讲好，可加小互动。
- 已做：
  - `evolution.js`：达尔文→基因→说服你在家摆一套；含**可点时间线**；三罐标本内敛版（静态卡，只标 大脑/心脏/其他）。
  - `drone.js`：Apple 风 Mini 3 Pro 产品页（规格条 + DJI 官方说法 + 「含」清单 + **两个痛点点击展开「秘籍解法」**）。用 `assets/img/illustrations/DJI-Mini-3-Pro.jpg` 官方图。
  - `wealth.js`（国富论）：斯密生平/开创 + **可拖动的供求「看不见的手」互动图**（拖价格→实时短缺/过剩/出清）+ 多处引用斯密原话 + 收尾点题练功钞。
  - `forensics.js`（洗冤集录）：**全篇半文言**，引原文序 +**断案三问互动题**（聚蝇验镰/焚尸辨生死/缢痕辨真伪，皆书中且今验为真）+ 引出 书·察微 / 面·诘奸 / 剑·正法 三件套。
  - `calculus.js`（微积分）：**一步步互动**重走阿基米德穷竭法（含「关键引理」启发式），逐层补三角形、比值收敛到 4/3；图已美化（发光抛物线 + 阴影弓形 + 进度条）+ 收尾魔杖梗。
  - `magneto.js`（万磁王）：MAGNETO 出身故事 + **磁场互动**（鼠标移过去，铁屑/磁针全部转向你这个「磁极」）+ 三张配图位 + 压迫感收尾引出平衡车。
  - `cards.js`（大师典藏）：以 Touch V4 切入讲花切为何这么贵，附**官方数据格**（全球限量 2500 / 设计 Alex Matencio / USPCC / crushed stock / Swivelbox）+ 收尾引出菜鸟飞牌。
  - `portal.js`（R&M）：**剧本对话体**（Morty 想造传送枪 → Rick 让先读基础 → Rick 打破第四面墙甩锅给导购）+ 导购解释力学/电磁两大支柱；头像用 `portal-rick/morty.png`（缺图显示 R/M 字母）。
  - `telescope.js`（望远镜）：**手绘 SVG 光路图**（物镜聚焦→实像→目镜放大→眼）+「8×42 ED」**可点拆解器**（倍率/口径/ED/出瞳）+ 维基色散图位 + 收尾引书。
  - `politics.js`（How To）：门罗/xkcd 介绍（带官网链接）→「脑洞 × 政治哲学」→ **摄像头/上传照片 → 一键生成竞选海报**，三风格（希腊古典 / 美国红蓝 / 中国赤诚），canvas 本地处理不上传。
- **配图占位系统**：`ui.figSlot()` 生成带「文件名 + 建议描述」的虚线占位框；把对应图片放进 `assets/img/illustrations/` 即自动替换（`hydrateFigSlots`）。
- **联系弹窗 / 凭据灯箱**：均已随页面主题色换肤（accent 一致）；灯箱重做成带标题栏的精致卡片。

## 🖼 图片约定
- `images/` = Simba 的原始拍摄文件夹（中文名，原封不动，含 `单卖5本书.heic`）。
- `assets/img/covers/` = 网页用图，ASCII 文件名（从 images/ 复制）。`bundle-touch-cards.png` 已逆时针转 90°。
- 贵价物购买截图放 `assets/img/proofs/`（如 `dji-mini-3-pro.jpg`），填到 item 的 `proof` → 详情页出现 📷 可点开放大。
- `assets/img/illustrations/` = showcase 里用的额外配图（如官方宣传图 `DJI-Mini-3-Pro.jpg`）。

## 🧱 技术
纯 HTML/CSS/原生 JS（ES Modules），零构建。JS：`store.js`（载入+合并status+算价/折扣/TBD）、`ui.js`（渐显/占位封面/灯箱/mailto）、`home.js`、`listing.js`（+ 动态 showcase 加载）、`showcases/*.js`。
本地预览：`python3 -m http.server 4321`（不能直接双击 html）。

## ✅ 进度
- [x] v1 骨架 → **v2 深色科技风重构**（tokens/home/listing 全改，新字体）
- [x] 详情页改成 overview → showcase → 价目表 结构
- [x] Showcase 系统：**进化论 / 无人机 / 国富论 / 洗冤集录 / 微积分** 五个定制故事页（含各自互动）
- [x] **联系方式弹窗**：所有「联系我买下」按钮 → 丝滑弹窗（微信优先 + 一键复制，邮箱次之），见 `ui.js` openContact + `tokens.css` .cmodal
- [x] 无人机购买截图已接（`assets/img/proofs/dji-mini-3-pro.jpg`，📷 可点开）；官方图入 `assets/img/illustrations/`
- [x] Showcase 再扩三个：**R&M(portal) / 望远镜(telescope) / How To(politics)**；弹窗/灯箱随页面 accent 换肤
- [x] **R&M 重写**（开场不提传送枪、对话只一段更流畅）；**朗道 showcase**（天才等级互动 + 十诫 + 朗道势垒，有梗）
- [x] **数学/物理图全部重做成 Brilliant 风**：清爽面板 + 粗圆描边 + 友好配色 + 去辉光；供求图改成**可直接拖动**（拖价格看短缺/过剩，粉/蓝/绿区分）
- [x] **单卖改成 4 个真实书**（题解上下册/普通化学/马赫力学/物理学的进化），竖版书封 + 「单卖」样式与捆绑区分；价格按 ~4 折取整（12/20/10/8）
- [x] 朗道(279)、望远镜购买截图已接（📷）；新单卖封面已挂
- [x] **单卖卡更内敛**（9px 直角、暗底、灰「单卖」标，和捆绑明显区分）；**首页 hero 加极光辉光 + 渐变标题**（更酷、仍高级）
- [x] **朗道长梯**：一直点 → 逐级解锁（平衡车/万磁王/魔杖/望远镜/国富论/传送/多元宇宙/法医/全知），等级 5→0 超越爱因斯坦，终局「只差购买」
- [x] **Apple 风数字 count-up**（`ui.initCountUp` + `[data-countup]`）：朗道势垒 43、Touch 限量 2500、朗道天才等级 0.02 等做成大号渐变滚动数字
- [x] R&M 加两张立绘位 + 朗道护目镜合成图位（占位框待补图）
- [x] **首页记忆点动画**：大标题进场「解码渐显」——逐字从物理术语乱码（量子/熵/场/引力…）解析为白→强调色渐变，每字落定带微辉光（`ui.decodeReveal`）。注：标题原本 `data-reveal` 起始 opacity:0 导致动画「没效果」，已在 home.js 解码前先加 `is-in` 修复
- [x] R&M：删掉「演员表」立绘位；对话右侧放 `portal-cast.png`（你的 R&M 透明图，已就位）；新增 **ACT III 登月物理 + Sketchfab 嵌入登月舱 3D 模型 + 底部宽幅月面图位** `portal-moon.jpg`
- [x] 删掉朗道护目镜合成图位（`landau-goggles.png`）
- [x] How To 海报机重排：**预览 + 操作同一行**（左预览右面板：①选风格 ②拍/选照片），更精致；LIVE 角标、分段式风格选择
- [x] **品牌改名「Simba 的仓库」** + 动画 S 图标（光迹沿 S 流动、悬停加速发光，`.topbar__logo`，reduced-motion 降级）
- [x] 解码标题加**萤光感**（强调色辉光 + 闪烁 + 落定白芯爆闪）
- [x] **竞选海报滤镜升级为真·色调分离**（canvas posterize 四色：美国=Obama HOPE 海军蓝/红/浅蓝/米；中国=黑/深红/红/金；希腊=四阶暖棕版画），不再只是变色
- [x] 望远镜「8×42 ED」解码器改成 **Apple 分段控件**（滑动指示丸 + 大号渐变数值）
- [x] 数字滚动 `ui.initCountUp`（朗道 43、Touch 2500 等，进视口 count-up）
- [x] **移动端复查**：全页 0 横向溢出。修了首页页脚邮箱长串撑宽 + hero 极光模糊外溢（`html{overflow-x:clip}`）
- [ ] 部署 GitHub Pages（随时可传）
- [x] 已确定价格：进化论69 / 无人机2399 / 国富论25 / 洗冤59 / 微积分69 / 万磁王399 / 大师典藏99 / **R&M79 / 望远镜599 / How To32**
- [x] 新增捆绑包：**朗道十卷 + 疯狂科学家护目镜**（价格待定）；平衡车购买截图已接（灯箱）
- [ ] **填 showcase 配图**：把图片放进 `assets/img/illustrations/`（文件名见占位框 / 下方清单）
- [ ] **Simba 确认其余价格**（朗道待定；其余已按你给的数确定）
- [ ] 望远镜购买截图 → `assets/img/proofs/` + 填 `proof`
- [ ] 单卖 5 本：书名 + 原价 + 把合影裁成 5 张封面
- [ ] 余下捆绑包按需写 showcase（朗道十诫 / 单卖各本）

## 🖼 待补配图清单（放进 `assets/img/illustrations/`，文件名照抄）
| 文件名 | 用在哪 | 建议内容 / 比例 |
|---|---|---|
| `magneto-1-hero.jpg` | 万磁王 主视觉 | 头盔特写 / 红黑电影感，宽幅 21:9 |
| `magneto-2-origin.jpg` | 万磁王 出身 | 少年 Erik / 铁丝网 / 沉郁褐调，4:3 |
| `magneto-3-power.jpg` | 万磁王 收尾压迫 | 悬浮、金属环绕、仰视，宽幅 21:9 |
| `cards-1-hero.jpg` | 大师典藏 主视觉 | Touch V4 扇牌/切牌，深色高反差，宽幅 21:9 |
| `cards-2-detail.jpg` | 大师典藏 细节 | Swivelbox / 牌背斜纹特写，4:3 |
| `forensics-1-court.jpg` | 洗冤集录 | 古衙 / 宋慈像 / 法医图卷，暗调，宽幅 21:9 |
| `portal-rick.png` / `portal-morty.png` | R&M 对话头像 | 头像，**透明背景 PNG**，方形（自动裁圆） |
| `portal-rick-art.png` / `portal-morty-art.png` | R&M 演员表立绘 | **透明背景 PNG** 全身/半身立绘，竖版（contain 不裁） |
| `landau-goggles.png` | 朗道戴护目镜 | 朗道肖像 P 上本包那副护目镜的合成图，4:3 |
| `telescope-dispersion.png` | 望远镜 色散图 | 维基「三棱镜色散白光」(Dispersive_prism)，横版，深底更佳 |
> 不放也不报错——会显示一个带文件名与描述的占位框。说明：`wealth-1-smith.jpg` / `calculus-archimedes.jpg` 已按要求删除；`politics` 不用配图（互动海报为主）。
- [ ] 部署 GitHub Pages

## 🚀 部署
新建仓库 → push → Settings → Pages → Source 选 `main` 根目录。（已含 `.nojekyll`。）

## 📝 待确认
- 各书目/物品的**确切名称、成色、原价**（现按实拍图猜 + 估价）
- 还想给哪些捆绑包做 showcase / 玩什么梗
