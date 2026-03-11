import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入主项目样式
import '../src/styles/index.scss'

// 导入图标库 SVG Sprite
import '../src/assets/fonts/iconfont.js'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    docs: {
      description: {
        component: '组件文档说明'
      }
    },

    layout: 'padded',

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#1a1a1a'
        },
        {
          name: 'gray',
          value: '#f5f5f5'
        }
      ]
    }
  }
}

// Vue 应用初始化 (用于全局插件注册)
setup((app) => {
  // 注册 Element Plus
  app.use(ElementPlus)
})

export default preview
