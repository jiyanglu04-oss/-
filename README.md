# 陆机阳 · 个人作品集

**在线地址：<https://jiyanglu04-oss.github.io/>**

一个 Neo-Brutalism 风格的个人网站，包含关于、经历、项目、作品集、优势、规划六个区块。
作品集是一本可以翻页的 CSS 3D 书，项目区是可拖动 / 点击切换的 3D 转盘，每张卡都能点开一页完整案例。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | React 19 + TypeScript + Vite |
| 样式 | 手写 CSS（`src/neo-brutalism.css`）+ Tailwind v4 工具类 |
| 3D | Three.js（点缀用的 WebGL 模型）+ CSS 3D（书页 / 转盘） |
| 图标 | lucide-react |
| 部署 | GitHub Actions → GitHub Pages |

## 本地运行

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # 产物输出到 dist/
npm run preview  # 本地预览产物
npm run lint     # tsc --noEmit
```

## 部署

推送到 `main` 会自动触发 `.github/workflows/deploy.yml` 构建并发布到 GitHub Pages。
`vite.config.ts` 里的 `base` 按仓库名自动推导：用户站仓库（`<owner>.github.io`）走域名根，其余仓库走 `/<仓库名>/`，所以换仓库不用改配置。

## 目录

```
src/
├── components/          # 各区块组件；*3D.tsx 是轻量外壳，*Scene.tsx 是 WebGL 场景（异步 chunk）
├── three/               # Three.js 舞台、材质、模型
├── data.ts              # 全站文案与项目 / 经历数据（改内容基本只动这里）
├── types.ts
└── neo-brutalism.css    # 主题：配色、描边、硬阴影、书页与转盘
public/                  # 图片、视频、字体（已转 WebP，缩略图与原图分离）
```
