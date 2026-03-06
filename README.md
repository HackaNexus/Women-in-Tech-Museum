# Women in Tech Museum

An online museum celebrating women pioneers who shaped science, technology, engineering, and mathematics across 4,000 years of history.

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **动画**: Framer Motion, Lenis 平滑滚动

---

## 项目架构

```
Herstory/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── layout.tsx          # 根布局 (Header, Footer, SmoothScroll)
│   │   ├── page.tsx            # 首页
│   │   ├── about/page.tsx      # 关于页
│   │   ├── timeline/page.tsx   # 时间线页
│   │   └── exhibitions/        # 展览馆
│   │       ├── page.tsx        # 展览馆总览
│   │       └── [field]/        # 按领域
│   │           ├── page.tsx    # 领域列表
│   │           └── [slug]/page.tsx  # 先驱详情
│   │
│   ├── components/
│   │   ├── home/               # 首页区块
│   │   │   ├── Hero.tsx        # 首屏 (视差、Da Vinci 线条)
│   │   │   ├── DaVinciLines.tsx # SVG 构造线描边动画
│   │   │   ├── FeaturedCarousel.tsx  # 精选先驱轮播
│   │   │   ├── FieldGrid.tsx   # 展览馆书架
│   │   │   └── StatsSection.tsx # 数据统计
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── shared/             # 共享组件
│   │       ├── FieldCard.tsx   # 领域卡片 (照片封面)
│   │       ├── Shelf.tsx       # 书架容器 (网格布局)
│   │       ├── SmoothScroll.tsx # Lenis 平滑滚动
│   │       ├── ScrollSection.tsx # 滚动驱动交叉淡入
│   │       └── ParallaxFloat.tsx # 视差浮动装饰元素
│   │
│   ├── data/                   # 数据
│   │   ├── fields.json         # 领域定义
│   │   └── pioneers/           # 先驱主数据 (按领域拆分)
│   │
│   └── lib/
│       ├── data.ts             # 数据读取与查询
│       └── types.ts            # TypeScript 类型
│
├── public/                     # 静态资源
├── scripts/                    # 构建/数据处理脚本
└── package.json
```

### 核心模块说明

| 模块 | 作用 |
|------|------|
| `SmoothScroll` | Lenis 平滑滚动，包裹整个应用 |
| `ScrollSection` | 区块滚动交叉淡入过渡 (Shopify 风格) |
| `DaVinciLines` | 首屏 SVG 构造线描边动画 |
| `ParallaxFloat` | 科学公式/图标视差浮动装饰 |
| `Shelf` + `FieldCard` | 展览馆书架网格 + 领域卡片 |
| `FieldCard` | 统一领域卡片样式 (照片封面、渐变遮罩) |

### 数据流

- `fields.json`：领域列表 (id, name, slug, color, count 等)
- `pioneers/*.json`：先驱列表 (按领域拆分，name, field, bio, image 等)
- `lib/data.ts`：聚合 pioneers 并导出 `getPioneersByField`, `getFieldBySlug`, `getFeaturedPioneers` 等

---

## 使用说明

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

启动后访问 [http://localhost:3000](http://localhost:3000)。

### 构建

```bash
npm run build
```

### 生产运行

```bash
npm run start
```

### 代码检查

```bash
npm run lint
```

---

## 页面路由

| 路径 | 说明 |
|------|------|
| `/` | 首页 (Hero + 精选 + 展览馆书架 + 统计) |
| `/exhibitions` | 展览馆总览 (10 领域书架) |
| `/exhibitions/[field]` | 某领域下的先驱列表 |
| `/exhibitions/[field]/[slug]` | 先驱详情页 |
| `/timeline` | 时间线 |
| `/about` | 关于 |

---

## 自定义与扩展

- **新增领域**：编辑 `src/data/fields.json`
- **新增先驱**：编辑 `src/data/pioneers/[领域].json`（如 `computer-science.json`）
- **修改主题色**：在 `src/app/globals.css` 的 `@theme` 中调整 `--color-museum-*`
- **修改领域封面图**：在 `src/components/shared/FieldCard.tsx` 的 `fieldImages` 中配置
