# 留帧 · 电影片库

[在线片库](https://liyichao0215-pixel.github.io/film-stills-gallery/)

一个用 Astro 构建的静态电影剧照库。首页提供导演、地区、年代组合筛选，单片页沿用底座的相册和全屏看图。筛选会写入网址，复制链接即可复现。封面和剧照按展示顺序编号，色卡在构建时自动提取画面中最多五种主色，单片页显示 HEX 色值。

## 本地预览

使用 Node.js 22 或更高版本。在项目目录运行：

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

打开 http://127.0.0.1:4321/。本机有 Bun 时也可以用 `bun install --no-save` 和 `bun run dev --host 127.0.0.1`。

`npm test` 运行底座测试。`npm run build` 生成 `dist/`，用 `npm run preview` 预览生产构建。

## 新增一部电影

在 `src/content/photos/` 下为影片建一个目录，目录名用于生成单片网址。把可用于本站的图片和一份 `index.md` 放在一起。可以复制现有条目的格式：

```yaml
---
title: 片名
caption: 一句话简介
cover: 01.jpg
film:
  originalTitle: Original Title
  directors: [导演姓名]
  regions: [法国, 英国]
  year: 2018
photos:
  - file: 01.jpg
    title: 镜头标题
    alt: 对画面内容的简短描述
---

写在剧照集上方的场景笔记。
```

- `film.directors` 和 `film.regions` 可填多项。年代根据 `film.year` 自动计算。
- `featured: true` 放在 `film` 下，可指定首页精选。多条同时启用时采用片单排序最靠前的一部。
- `demo: true` 放在 `film` 下会标记示例内容。`draft: true` 放在顶层会隐藏整部影片。
- 每部至少放一张图。`cover` 和 `photos` 中的文件名必须对应目录里的实际图片。图片支持 JPEG、PNG、WebP、AVIF。

## 在 GitHub 上维护

在[影片目录](https://github.com/liyichao0215-pixel/film-stills-gallery/tree/main/src/content/photos)打开影片的 `index.md`，点铅笔图标即可编辑片名、导演、年份和画面说明。在影片目录使用 **Add file → Upload files** 添加剧照。新增影片时，把图片和 `index.md` 一起提交到新目录。

提交到 `main` 后，[部署流程](https://github.com/liyichao0215-pixel/film-stills-gallery/actions)会自动测试、构建并发布到 GitHub Pages。

本地模拟项目子路径：

```sh
BASE_PATH=/film-stills-gallery/ npm run build
BASE_PATH=/film-stills-gallery/ npm run preview
```

## 来源和示例内容

底座为 [Arthur Soares 的 simple-photo-gallery](https://github.com/arthursoares/simple-photo-gallery)，代码沿用 MIT 许可证。片单和详情交互参考了[野果子](https://yeguozi.com/films)和 [Movie-Gallery](https://kesh1354.github.io/Movie-Gallery/)。

标有示例标记的影片和画面为虚构内容，使用内置 imagegen 生成。来自 Wikimedia Commons 的剧照按影片页列出的各自许可使用。

<details>
<summary>示例剧照生成提示词</summary>

Generate one photorealistic cinematic contact sheet for an original fictional film still archive. Exactly 3 columns by 4 rows, twelve equal rectangles, edge-to-edge aligned on exact thirds and quarters, with no gutters, borders or labels. Overall canvas landscape 4:3, each tile widescreen approximately 16:9. Each cell is a self-contained widescreen composition with no spanning objects. Row 1 left to right: (1) solitary woman at window in dark moss-green vintage Japanese listening room with an amber desk lamp, (2) close shot of wet leaves against ribbed glass and a cup in the same room, (3) windy Brittany coastal road with pale blue ocean and a small weathered stone house. Row 2: (4) woman in red coat on the same gray coast at dusk, (5) 1990s Hong Kong alley, burgundy signage glow and a lone walker in rain, (6) Hong Kong apartment warm amber lamp and city lights through half closed blinds. Row 3: (7) pastel yellow apartment interior in southern France with sunlight and peaches on a table, (8) close detail of open pale yellow shutters and soft afternoon shadows, (9) quiet snowy Japanese train stop at blue hour, lit warm windows and telegraph poles. Row 4: (10) empty seat inside a Japanese local train in winter with soft blue window light, (11) Taiwan urban rooftop, 1980s architecture, warm terracotta and fading pink sky, (12) old Taiwan stairwell with terracotta walls and a partly open window. Restrained editorial 35mm film photography with natural grain, rich shadows, distinct color palettes. Exactly 12 distinct images, no logos, no typography, no watermarks, no titles, no references to actual films.

</details>
