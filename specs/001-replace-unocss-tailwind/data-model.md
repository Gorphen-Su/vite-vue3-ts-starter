# 数据模型：UnoCSS 迁移至 Tailwind CSS 配置映射

**创建时间**: 2026-03-06
**功能分支**: 001-replace-unocss-tailwind

## 配置实体映射

### 1. 主题颜色映射

| 实体名称 | UnoCSS 源 | Tailwind CSS 目标 | 转换规则 |
|---------|----------|------------------|---------|
| primary | `#3c40c6` | `#3c40c6` | 直接复制 |
| success | `rgba(82, 196, 26, %alpha)` | `rgb(82 196 26 / <alpha-value>)` | 转换透明度语法 |
| warning | `rgba(250, 173, 20, %alpha)` | `rgb(250 173 20 / <alpha-value>)` | 转换透明度语法 |
| danger | `rgba(250, 85, 85, %alpha)` | `rgb(250 85 85 / <alpha-value>)` | 转换透明度语法 |
| info | `rgba(144, 147, 153, %alpha)` | `rgb(144 147 153 / <alpha-value>)` | 转换透明度语法 |

### 2. 断点映射

| 实体名称 | UnoCSS 源 | Tailwind CSS 默认 | Tailwind CSS 目标 |
|---------|----------|------------------|------------------|
| sm | `600px` | `640px` | `600px` (自定义) |

### 3. 自定义规则映射

#### 3.1 navbar-shadow

| 属性 | 值 |
|-----|-----|
| 名称 | navbar-shadow |
| 类型 | 静态工具类 |
| CSS 属性 | box-shadow |
| 值 | `0 1px 4px rgb(0 21 41 / 8%)` |
| 迁移方式 | Tailwind 插件 addUtilities |

#### 3.2 bgimage 动态规则

| 属性 | 值 |
|-----|-----|
| 名称 | bgimage-{dir}-{name}.{ext} |
| 类型 | 动态工具类 |
| CSS 属性 | background-image |
| 迁移方式 | ⚠️ 不支持动态规则，需使用替代方案 |

**替代方案**:

```scss
// 方案 1: 使用 SCSS 变量
.bg-image-hero {
  background-image: url('@/assets/images/hero.svg');
}

// 方案 2: 使用内联样式
<div :style="{ backgroundImage: `url(${imageUrl})` }">
```

### 4. 预设映射

| UnoCSS 预设 | Tailwind CSS 等效 | 操作 |
|------------|------------------|------|
| presetWind3 | 核心功能 | ✅ 自动兼容 |
| presetAttributify | 无 | ⚠️ 移除 (Vue 项目影响小) |
| presetIcons | unplugin-icons | ✅ 保留原有配置 |

### 5. 转换器映射

| UnoCSS 转换器 | Tailwind CSS 等效 | 操作 |
|--------------|------------------|------|
| transformerDirectives | @apply | ✅ 原生支持 |
| transformerAttributifyJsx | 无 | ⚠️ 移除 (Vue 项目影响小) |

## 依赖关系图

```
UnoCSS 配置                    Tailwind CSS 配置
┌─────────────────┐           ┌──────────────────┐
│  presets:       │           │  theme:          │
│  - presetWind3  │──────────▶│  - colors        │
│  - presetIcons  │     ✗     │  - screens       │
│  - presetAttrib │           │  plugins:        │
├─────────────────┤           │  - navbar-shadow │
│  transformers:  │           └──────────────────┘
│  - directives   │──────────▶  @tailwindcss/vite
│  - attributify  │     ✗     (Vite Plugin)
└─────────────────┘
```

## 验证规则

### 颜色验证

- 所有主题颜色必须可以在 `text-{color}`、`bg-{color}`、`border-{color}` 中使用
- 透明度修饰符必须正常工作，如 `bg-primary/50`

### 断点验证

- `sm:` 断点必须在 600px 触发
- 响应式前缀必须与原来一致：`sm:`、`md:`、`lg:`、`xl:`、`2xl:`

### 自定义规则验证

- `.navbar-shadow` 类必须应用正确的阴影效果
- 自定义类必须在所有支持的工具类前缀下工作

## 状态转换

```
[UnoCSS 配置]
      │
      ▼
[解析配置] ──▶ [提取颜色] ──▶ [转换格式] ──▶ [Tailwind 配置]
      │              │
      │              └──▶ [提取断点] ──▶ [自定义配置]
      │
      └──▶ [提取规则] ──▶ [创建插件] ──▶ [addUtilities]
```

## 文件结构关系

```
uno.config.ts                 tailwind.config.js
├── presets                   ├── theme
│   ├── presetWind3()         │   ├── colors
│   ├── presetAttributify()   │   │   ├── primary
│   └── presetIcons()         │   │   └── ...
├── transformers              │   └── screens
├── theme                     │       └── sm
│   ├── breakpoints           ├── plugins
│   └── colors                │   └── navbar-shadow
└── rules                     └── content
    ├── navbar-shadow             └── ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]
    └── bgimage-*
```
