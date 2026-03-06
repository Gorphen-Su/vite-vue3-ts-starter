# Vite 配置规范 (Tailwind CSS)

**创建时间**: 2026-03-06
**功能分支**: 001-replace-unocss-tailwind

## 配置结构

### 迁移前 (UnoCSS)

```typescript
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    // ... 其他插件
  ]
})
```

### 迁移后 (Tailwind CSS)

```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    // ... 其他插件
  ]
})
```

## 配置要点

### 1. 插件导入

```typescript
// ❌ 错误：使用错误的包名
import tailwindcss from 'tailwindcss'

// ✅ 正确：使用 Vite 插件包
import tailwindcss from '@tailwindcss/vite'
```

### 2. 插件位置

Tailwind CSS 插件应该在其他 Vite 插件之前加载（推荐在 vue() 之前）:

```typescript
plugins: [
  tailwindcss(),
  vue(),
  AutoImport({ /* ... */ }),
  Components({ /* ... */ })
]
```

### 3. 与其他插件的兼容性

#### unplugin-auto-import

```typescript
AutoImport({
  imports: ['vue', 'vue-router'],
  // ... 其他配置
})
```

✅ 完全兼容，无需修改

#### unplugin-vue-components

```typescript
Components({
  resolvers: [
    ElementPlusResolver({
      importStyle: 'sass'
    })
  ]
})
```

✅ 完全兼容，Element Plus 样式独立配置

#### unplugin-icons

```typescript
UnpluginIcons({
  autoInstall: true,
  compiler: 'vue3',
  scale: 1.2
})
```

✅ 完全兼容，图标处理不受影响

## 完整配置示例

```typescript
import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnpluginIcons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadEnv } from 'vite'
import packageJson from './package.json'

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml (html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>${packageJson.name}</title>`
      )
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_ROUTER_MODE === 'hash' ? '' : '/',
    plugins: [
      tailwindcss(),  // Tailwind CSS 插件
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue\??/
        ],
        imports: [
          'vue',
          'vue-router',
          {
            'vue': ['createVNode', 'render'],
            'vue-router': ['createRouter', 'createWebHistory', 'createWebHashHistory', 'useRouter', 'useRoute'],
            'uuid': [['v4', 'uuidv4']],
            'lodash-es': [['*', '_']]
          },
          {
            from: 'vue',
            imports: ['App', 'VNode', 'ComponentPublicInstance', 'ComponentPublicInstanceCostom', 'ComponentInternalInstance'],
            type: true
          },
          {
            from: 'vue-router',
            imports: ['RouteRecordRaw', 'RouteLocationRaw', 'LocationQuery', 'RouteParams', 'RouteLocationNormalizedLoaded', 'RouteRecordName', 'NavigationGuard'],
            type: true
          }
        ],
        resolvers: mode === 'development' ? [] : [ElementPlusResolver()],
        dirs: ['./src/hooks'],
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        vueTemplate: true
      }),
      Components({
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        resolvers: [
          IconsResolver({
            prefix: 'AutoIcon'
          }),
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      UnpluginIcons({
        autoInstall: true,
        compiler: 'vue3',
        scale: 1.2,
        defaultStyle: '',
        defaultClass: 'unplugin-icon'
      }),
      htmlPlugin()
    ],
    esbuild: {
      drop: ['console', 'debugger']
    },
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    define: {
      'process.env.VITE_ROUTER_MODE': JSON.stringify(env.VITE_ROUTER_MODE)
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `@use '@/styles/element-variables.scss' as *;`
        }
      }
    },
    test: {
      globals: true,
      dir: '__tests__',
      environment: 'jsdom',
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    }
  }
})
```

## 验证清单

- [ ] UnoCSS 导入已移除
- [ ] @tailwindcss/vite 已导入
- [ ] tailwindcss() 插件已添加到 plugins 数组
- [ ] 插件顺序正确 (在 vue() 之前)
- [ ] 其他插件配置保持不变
- [ ] resolve.alias 配置保持不变
- [ ] css.preprocessorOptions 配置保持不变

## 常见问题

### Q: 是否需要配置 content 数组？

A: Tailwind CSS v4 自动检测源文件，无需手动配置 content 数组。

### Q: 是否需要 postcss.config.js？

A: 不需要，@tailwindcss/vite 插件直接处理 CSS 处理。

### Q: 是否需要在全局样式中导入 Tailwind？

A: Tailwind CSS v4 自动注入基础样式，无需在 CSS 文件中写 `@tailwind` 指令。
