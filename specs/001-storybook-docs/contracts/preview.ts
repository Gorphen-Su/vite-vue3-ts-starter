# Storybook 预览配置文件模板

**用途**: `.storybook/preview.ts` 配置参考

```ts
import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入主项目样式 (包含 Tailwind CSS)
import '../src/styles/main.scss'

// 全局样式包装器
const withPadding = (Story: any) => ({
  components: { Story },
  template: '<div style="padding: 20px;"><Story/></div>',
})

// Element Plus 装饰器
const withElementPlus = (Story: any) => ({
  components: { Story, ElConfigProvider },
  template: `
    <el-config-provider :locale="zhCn">
      <Story/>
    </el-config-provider>
  `,
  setup() {
    return { zhCn }
  },
})

// 全局装饰器数组
export const decorators = [
  withPadding,
  withElementPlus,
]

// 预览配置
const preview: Preview = {
  // 全局参数
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: '组件文档说明',
      },
    },
    layout: 'padded', // 'centered' | 'fullscreen' | 'padded' | 'none'
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },

  // 全局参数类型
  argTypes: {
    // 所有组件通用的参数类型配置
  },

  // 全局默认参数值
  args: {},
}

export default preview

// Vue 应用初始化 (用于全局插件注册)
setup((app) => {
  // 注册 Pinia
  const pinia = createPinia()
  app.use(pinia)

  // 注册 Element Plus
  app.use(ElementPlus)

  // 注册其他全局插件...
})

// 全局类型定义
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      title: 'Theme',
      items: [
        { value: 'light', title: 'Light', left: '☀️' },
        { value: 'dark', title: 'Dark', left: '🌙' },
      ],
      dynamicTitle: true,
    },
  },
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'zh-CN',
    toolbar: {
      icon: 'globe',
      title: 'Locale',
      items: [
        { value: 'zh-CN', title: '简体中文', left: '🇨🇳' },
        { value: 'en-US', title: 'English', left: '🇺🇸' },
      ],
      dynamicTitle: true,
    },
  },
}
```

---

## 配置说明

### decorators 字段

装饰器用于包裹故事组件，提供上下文环境：

```ts
export const decorators = [
  // 简单的包装器
  (Story) => ({
    components: { Story },
    template: '<div><Story/></div>',
  }),
  // 带样式的包装器
  (Story) => ({
    components: { Story },
    template: '<div style="padding: 20px;"><Story/></div>',
  }),
]
```

### parameters 字段

配置文档、控件、背景等显示选项：

```ts
parameters: {
  controls: { ... },    // Controls 面板配置
  docs: { ... },        // 文档配置
  layout: 'padded',     // 布局模式
  backgrounds: { ... }  // 背景色配置
}
```

### setup 函数

用于注册全局插件（Pinia、Element Plus 等）：

```ts
setup((app) => {
  app.use(pinia)
  app.use(ElementPlus)
})
```

### globalTypes 字段

定义工具栏中的全局选项（主题、语言等）：

```ts
export const globalTypes = {
  theme: { ... },
  locale: { ... }
}
```
