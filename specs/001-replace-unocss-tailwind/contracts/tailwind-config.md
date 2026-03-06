# Tailwind CSS 配置规范

**创建时间**: 2026-03-06
**功能分支**: 001-replace-unocss-tailwind

## 配置结构

### 基础配置模板

```javascript
// tailwind.config.js
import plugin from 'tailwindcss/plugin'

export default {
  content: [],  // v4 自动检测，留空即可
  theme: {
    extend: {
      colors: {
        // 主题颜色
        primary: '#3c40c6',
        success: 'rgb(82 196 26 / <alpha-value>)',
        warning: 'rgb(250 173 20 / <alpha-value>)',
        danger: 'rgb(250 85 85 / <alpha-value>)',
        info: 'rgb(144 147 153 / <alpha-value>)'
      },
      screens: {
        // 自定义断点
        sm: '600px'  // UnoCSS 原配置
      }
    }
  },
  plugins: [
    // 自定义工具类
    plugin(function({ addUtilities }) {
      addUtilities({
        '.navbar-shadow': {
          'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)'
        }
      })
    })
  ]
}
```

## 配置详解

### 1. 主题颜色

#### 原始 UnoCSS 配置

```typescript
colors: {
  primary: '#3c40c6',
  success: 'rgba(82, 196, 26, %alpha)',
  warning: 'rgba(250, 173, 20, %alpha)',
  danger: 'rgba(250, 85, 85, %alpha)',
  info: 'rgba(144, 147, 153, %alpha)'
}
```

#### Tailwind CSS 转换

```javascript
colors: {
  primary: '#3c40c6',  // 直接复制
  success: 'rgb(82 196 26 / <alpha-value>)',  // 新透明度语法
  warning: 'rgb(250 173 20 / <alpha-value>)',
  danger: 'rgb(250 85 85 / <alpha-value>)',
  info: 'rgb(144 147 153 / <alpha-value>)'
}
```

**透明度语法说明**:
- UnoCSS: `%alpha` - 如 `rgba(82, 196, 26, 0.5)` 或 `rgba(82, 196, 26, %alpha)`
- Tailwind v4: `<alpha-value>` - 如 `rgb(82 196 26 / 0.5)` 或 `rgb(82 196 26 / 50%)`

### 2. 断点配置

#### 原始 UnoCSS 配置

```typescript
breakpoints: {
  sm: '600px'
}
```

#### Tailwind CSS 转换

```javascript
screens: {
  sm: '600px'  // 覆盖默认的 640px
}
```

**注意**: 只需定义需要覆盖的断点，未定义的将使用 Tailwind 默认值。

### 3. 自定义规则

#### navbar-shadow

原始 UnoCSS 规则:
```typescript
['navbar-shadow', { 'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)' }]
```

Tailwind CSS 插件:
```javascript
plugin(function({ addUtilities }) {
  addUtilities({
    '.navbar-shadow': {
      'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)'
    }
  })
})
```

#### bgimage 动态规则

原始 UnoCSS 规则:
```typescript
[/^bgimage-(\w+)-(.+)-(svg|png|jpg|gif)$/, ([, dir, fname, fext]) => {
  return { 'background-image': `url(@/assets/${dir}/${fname}.${fext})` }
}]
```

**迁移方案**: 动态规则无法直接转换，提供以下替代方案:

**方案 A: 预定义类**
```javascript
plugin(function({ addUtilities }) {
  addUtilities({
    '.bgimage-hero-main': { 'background-image': 'url(@/assets/hero/main.svg)' },
    '.bgimage-bg-pattern': { 'background-image': 'url(@/assets/bg/pattern.png)' }
  })
})
```

**方案 B: SCSS mixin**
```scss
@mixin bgimage($dir, $name, $ext: 'svg') {
  background-image: url('@/assets/#{$dir}/#{$name}.#{$ext}");
}

.bg-hero {
  @include bgimage('hero', 'main', 'svg');
}
```

**方案 C: 内联样式**
```vue
<template>
  <div :style="{ backgroundImage: `url(${new URL('@/assets/bg/image.svg', import.meta.url).href})` }">
    <!-- 内容 -->
  </div>
</template>
```

### 4. Shortcuts 迁移

原始 UnoCSS shortcuts 为空，如有需要可转换为:

```javascript
plugin(function({ addComponents }) {
  addComponents({
    '.btn-primary': {
      '@apply bg-primary text-white px-4 py-2 rounded': {}
    }
  })
})
```

## 完整配置示例

```javascript
// tailwind.config.js
import plugin from 'tailwindcss/plugin'

export default {
  theme: {
    extend: {
      colors: {
        primary: '#3c40c6',
        success: 'rgb(82 196 26 / <alpha-value>)',
        warning: 'rgb(250 173 20 / <alpha-value>)',
        danger: 'rgb(250 85 85 / <alpha-value>)',
        info: 'rgb(144 147 153 / <alpha-value>)'
      },
      screens: {
        sm: '600px'
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.navbar-shadow': {
          'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)'
        }
      })
    })
  ]
}
```

## 使用示例

### 主题颜色使用

```vue
<template>
  <div class="bg-primary text-white">
    <span class="text-success">成功文本</span>
    <span class="bg-warning/20">半透明背景</span>
  </div>
</template>
```

### 断点使用

```vue
<template>
  <div class="w-full sm:w-1/2 lg:w-1/3">
    <!-- 响应式布局 -->
  </div>
</template>
```

### 自定义规则使用

```vue
<template>
  <nav class="navbar-shadow">
    <!-- 导航栏 -->
  </nav>
</template>
```

## 验证清单

- [ ] tailwind.config.js 已创建
- [ ] 主题颜色已配置 (primary, success, warning, danger, info)
- [ ] sm 断点已自定义为 600px
- [ ] navbar-shadow 自定义工具类已配置
- [ ] bgimage 规则已处理 (替代方案或移除)
- [ ] 透明度语法使用 `<alpha-value>`
- [ ] 配置文件使用 ES Module 语法 (export default)

## 常见问题

### Q: 为什么颜色不能使用 rgba() 语法？

A: Tailwind CSS v4 使用新的颜色语法支持透明度修饰符，如 `bg-primary/50`。使用 `rgb(... / <alpha-value>)` 语法可以正确支持这种特性。

### Q: 可以继续使用 uno.config.ts 中的 shortcuts 吗？

A: 不可以直接使用。需要使用 Tailwind 插件的 `addComponents` 或 `@apply` 指令来替代。

### Q: 配置文件应该放在哪里？

A: `tailwind.config.js` 应该放在项目根目录，与 `package.json` 和 `vite.config.ts` 同级。
