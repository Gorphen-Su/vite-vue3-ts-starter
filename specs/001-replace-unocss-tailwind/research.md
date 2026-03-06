# 研究报告：UnoCSS 迁移至 Tailwind CSS

**创建时间**: 2026-03-06
**功能分支**: 001-replace-unocss-tailwind

## 技术选型

### Tailwind CSS 版本选择

**Decision**: 选择 Tailwind CSS v4.x

**Rationale**:
- Tailwind CSS v4 是最新版本，提供更好的性能和更简洁的配置
- v4 版本使用 Rust 编写的 Oxipack 引擎，构建速度更快
- 原生支持 Vite，无需额外的 PostCSS 配置
- 更好的 CSS 变量支持和主题定制能力

**Alternatives considered**:
- Tailwind CSS v3.x: 稳定但性能不如 v4，需要 PostCSS 配置
- 继续使用 UnoCSS: 虽然功能强大但社区生态不如 Tailwind CSS

### Vite 集成方式

**Decision**: 使用 @tailwindcss/vite 插件

**Rationale**:
- Tailwind 官方提供的 Vite 插件
- 配置简单，只需在 vite.config.ts 中添加插件
- 自动处理 CSS 注入和热更新
- 与 Vite 7.x 完全兼容

**Alternatives considered**:
- PostCSS 方式：配置复杂，不推荐用于 Vite 项目
- unocss 保留方案：与迁移目标冲突

## 兼容性分析

### 工具类命名对比

| UnoCSS (presetWind3) | Tailwind CSS | 兼容性 |
|---------------------|--------------|--------|
| text-primary | text-primary | ✅ 完全兼容 |
| bg-success | bg-success | ✅ 完全兼容 (需配置主题色) |
| sm: | sm: | ✅ 兼容 (断点值可能不同) |
| attribution 模式 | 不支持 | ❌ 需要调整写法 |
| 图标类名 | 不支持 | ❌ 由 unplugin-icons 处理 |

**关键发现**:
1. UnoCSS 的 presetWind3 预设基于 Tailwind CSS v3 设计，大部分工具类兼容
2. 主题颜色需要手动配置以保持现有值
3. 断点配置需要检查默认值差异

### 断点配置对比

**当前 UnoCSS 配置**:
```typescript
breakpoints: {
  sm: '600px'
}
```

**Tailwind CSS v4 默认断点**:
- sm: 640px (需要自定义为 600px)
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

**迁移方案**: 在 tailwind.config.js 中自定义 sm 断点为 600px

### 自定义规则迁移方案

**当前 UnoCSS 规则**:

1. `navbar-shadow`: 固定阴影效果
```typescript
['navbar-shadow', { 'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)' }]
```

2. `bgimage-{dir}-{name}.{ext}`: 动态背景图片
```typescript
[/^bgimage-(\w+)-(.+)-(svg|png|jpg|gif)$/, ([, dir, fname, fext]) => {
  return { 'background-image': `url(@/assets/${dir}/${fname}.${fext})` }
}]
```

**Tailwind CSS 迁移方案**:

1. **navbar-shadow**: 使用 Tailwind 插件创建自定义工具类
```javascript
// tailwind.config.js
plugin(function({ addUtilities }) {
  addUtilities({
    '.navbar-shadow': { 'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)' }
  })
})
```

2. **bgimage 规则**: 该动态规则在 Tailwind CSS 中无法直接转换
   - **推荐方案**: 使用 SCSS 变量或内联样式处理动态背景
   - **替代方案**: 为常用的背景图片创建预定义的 utility 类

### 转换器映射

| UnoCSS Transformer | Tailwind CSS 等效 | 状态 |
|-------------------|------------------|------|
| transformerDirectives | @apply 指令 | ✅ 原生支持 |
| transformerAttributifyJsx | 不支持 | ⚠️ 需要调整 JSX 写法 |

**关键发现**:
- @apply 指令在 Tailwind CSS 中原生支持，无需额外配置
- JSX 属性化模式需要改为标准 className 写法（但本项目是 Vue 项目，不受影响）

## 依赖分析

### 需要移除的依赖

```json
{
  "devDependencies": {
    "unocss": "66.5.10"  // 移除
  }
}
```

### 需要添加的依赖

```json
{
  "devDependencies": {
    "@tailwindcss/vite": "^4.x",
    "tailwindcss": "^4.x"
  }
}
```

### 可保留的依赖

以下依赖可以保留，不受迁移影响:

```json
{
  "devDependencies": {
    "unplugin-icons": "^22.5.0",      // 保留 - 图标处理
    "unplugin-auto-import": "^20.3.0", // 保留 - 自动导入
    "unplugin-vue-components": "^30.0.0" // 保留 - 组件自动导入
  }
}
```

## 主题配置迁移

### 当前 UnoCSS 主题色

```typescript
colors: {
  primary: '#3c40c6',
  success: 'rgba(82, 196, 26, %alpha)',
  warning: 'rgba(250, 173, 20, %alpha)',
  danger: 'rgba(250, 85, 85, %alpha)',
  info: 'rgba(144, 147, 153, %alpha)'
}
```

**注意**: UnoCSS 支持 %alpha 占位符，Tailwind CSS 使用不同的透明度语法

### Tailwind CSS 主题色配置

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3c40c6',
        success: 'rgb(82 196 26 / <alpha-value>)',
        warning: 'rgb(250 173 20 / <alpha-value>)',
        danger: 'rgb(250 85 85 / <alpha-value>)',
        info: 'rgb(144 147 153 / <alpha-value>)'
      }
    }
  }
}
```

**关键发现**: Tailwind CSS v4 使用 `<alpha-value>` 占位符代替 `%alpha`

## unplugin-icons 兼容性

**验证结果**: ✅ 完全兼容

unplugin-icons 是独立的图标解决方案，不依赖 UnoCSS：
- 继续在 vite.config.ts 中配置
- 继续使用 AutoIcon 前缀
- 图标源继续使用 @iconify/json

## 包管理器说明

**当前环境**: npm

| 操作 | pnpm 命令 | npm 命令 |
|------|----------|---------|
| 安装依赖 | `pnpm add -D tailwindcss @tailwindcss/vite` | `npm install -D tailwindcss @tailwindcss/vite` |
| 移除依赖 | `pnpm remove unocss` | `npm uninstall unocss` |
| 开发运行 | `pnpm dev` | `npm run dev` |
| 生产构建 | `pnpm build` | `npm run build` |
| 预览构建 | `pnpm preview` | `npm run preview` |
| 代码检查 | `pnpm lint` | `npm run lint` |

## 总结与建议

### 迁移风险

| 风险 | 影响 | 缓解措施 |
|-----|------|---------|
| 断点值差异 | 响应式布局可能变化 | 自定义 sm 断点为 600px |
| 透明度语法差异 | 颜色透明度可能不正确 | 更新为新的 alpha 语法 |
| bgimage 动态规则 | 动态背景图片需重写 | 提供 SCSS 替代方案 |
| presetAttributify | 属性化模式不可用 | 改为标准 class 写法 |

### 推荐迁移步骤

1. 备份当前配置
2. 安装 Tailwind CSS 依赖 (使用 npm)
3. 移除 UnoCSS 依赖 (使用 npm)
4. 创建并配置 tailwind.config.js
5. 更新 vite.config.ts
6. 处理自定义规则
7. 测试开发环境
8. 测试生产构建
9. 视觉回归验证

### 配置文件模板

已准备以下模板文件:
- `contracts/tailwind-config.md` - Tailwind 配置参考
- `contracts/vite-config.md` - Vite 配置参考
- `quickstart.md` - 快速迁移指南 (已更新为 npm 命令)
