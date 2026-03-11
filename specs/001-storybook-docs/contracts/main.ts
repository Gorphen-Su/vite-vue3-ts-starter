# Storybook 主配置文件模板

**用途**: `.storybook/main.ts` 配置参考

```ts
import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  // Stories 文件匹配模式
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/widgets/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],

  // 启用的插件
  addons: [
    // 基础插件包 (包含 Docs, Actions, Controls 等)
    '@storybook/addon-essentials',
    // 链接导航插件
    '@storybook/addon-links',
    // 交互测试插件
    '@storybook/addon-interactions',
    // 主题切换插件
    '@storybook/addon-themes',
  ],

  // 框架配置
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // Vue 3 特定配置
      docgen: 'vue-docgen-api'
    }
  },

  // 静态资源目录
  staticDirs: ['../public'],

  // 文档配置
  docs: {
    autodocs: 'tag' // 使用 'tag' 模式自动生成文档
  },

  // 核心配置
  core: {
    disableTelemetry: false, // 是否禁用遥测
    disableWhatsNewNotifications: false // 是否禁用更新通知
  },

  // Vite 配置自定义 (在 Storybook 配置后执行)
  async viteFinal(config) {
    return mergeConfig(config, {
      // 复用项目的别名配置
      resolve: {
        alias: {
          '@': '/src'
        }
      },
      // CSS 预处理配置
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "@/styles/element-variables.scss" as *;`
          }
        }
      }
    })
  }
}

export default config
```

---

## 配置说明

### stories 字段

定义 Stories 文件的搜索路径：

```ts
stories: [
  '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',  // 组件 Stories
  '../src/widgets/**/*.stories.@(js|jsx|mjs|ts|tsx)'      // Widgets Stories
]
```

### addons 字段

推荐插件组合：

| 插件 | 用途 |
|------|------|
| `@storybook/addon-essentials` | 基础插件包 (Docs, Actions, Controls, Viewport 等) |
| `@storybook/addon-links` | 故事间链接导航 |
| `@storybook/addon-interactions` | 交互测试工具 |
| `@storybook/addon-a11y` | 无障碍访问测试 |
| `@storybook/addon-themes` | 主题切换 |

### viteFinal 钩子

用于在 Storybook 初始化后自定义 Vite 配置：

```ts
async viteFinal(config) {
  return mergeConfig(config, {
    // 添加项目特定的 Vite 配置
  })
}
```
