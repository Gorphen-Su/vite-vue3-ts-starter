# Quickstart: Storybook 快速入门指南

**功能**: [spec.md](./spec.md) | **日期**: 2026-03-11

---

## 1. 安装 Storybook

运行以下命令自动初始化 Storybook：

```bash
pnpm dlx storybook@latest init
```

初始化脚本会自动：
- 安装 `@storybook/vue3-vite` 和相关依赖
- 创建 `.storybook/` 配置目录
- 添加 `storybook` 脚本到 `package.json`

---

## 2. 验证安装

启动 Storybook 开发服务器：

```bash
pnpm storybook
```

访问 `http://localhost:6006` 查看 Storybook 界面。

---

## 3. 创建第一个 Story

在 `src/components/IconFont/` 目录下创建 `IconFont.stories.ts`：

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import IconFont from './index.vue'

const meta = {
  title: 'Components/IconFont',
  component: IconFont,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '图标名称',
      defaultValue: 'home'
    },
    size: {
      control: 'number',
      description: '图标大小',
      defaultValue: 24
    },
    color: {
      control: 'color',
      description: '图标颜色',
      defaultValue: '#333333'
    },
  },
} satisfies Meta<typeof IconFont>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
  },
}

export const Colored: Story = {
  args: {
    name: 'setting',
    size: 32,
    color: '#409EFF',
  },
}

export const CustomSize: Story = {
  args: {
    name: 'user',
    size: 48,
  },
}
```

---

## 4. 配置 Tailwind CSS 和 Element Plus

编辑 `.storybook/preview.ts`：

```ts
import type { Preview } from '@storybook/vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '../src/styles/main.scss' // 导入主样式文件

const preview: Preview = {
  decorators: [
    () => ({
      components: { story: () => ({ template: '<story/>' }) },
      template: `<div style="padding: 20px;"><story/></div>`,
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

// 全局注册 Element Plus (在 setup 中)
export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
  },
}
```

---

## 5. 编辑 .storybook/main.ts

确保配置正确：

```ts
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
```

---

## 6. 添加 npm scripts

在 `package.json` 中添加：

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

## 7. Stories 编写规范

### 文件命名

- 使用 `ComponentName.stories.ts` 格式
- 与组件文件放在同一目录

### 标题路径

```ts
const meta = {
  title: 'Components/IconFont',  // 一级分类/组件名
}
```

推荐分类：
- `Components/` - 基础组件
- `Widgets/` - 复合组件
- `Business/` - 业务组件

### 案例命名

```ts
export const Default: Story = { ... }           // 默认用例
export const WithCustomProps: Story = { ... }   // 自定义属性
export const Disabled: Story = { ... }          // 禁用状态
export const Loading: Story = { ... }           // 加载状态
```

---

## 8. 常用 Commands

```bash
# 启动开发服务器
pnpm storybook

# 构建静态站点
pnpm build-storybook

# 预览构建结果
pnpm preview storybook-static
```

---

## 9. 故障排查

### 问题：Stories 未显示

**检查**:
1. 文件命名是否为 `*.stories.ts`
2. `main.ts` 中的 `stories` 模式是否匹配
3. 是否重启过 Storybook 服务器

### 问题：样式未加载

**检查**:
1. `preview.ts` 中是否正确导入样式文件
2. Tailwind CSS 配置是否正确
3. 清除浏览器缓存

### 问题：Element Plus 组件不显示

**检查**:
1. 是否正确安装 Element Plus
2. 是否导入 Element Plus 样式
3. 是否需要全局注册插件

---

## 10. 下一步

- [ ] 为所有基础组件编写 Stories
- [ ] 添加自定义主题配置
- [ ] 配置 CI/CD 自动部署 Storybook
- [ ] 添加交互测试用例

---

## 参考资料

- [Storybook Vue 3 Docs](https://storybook.js.org/docs/vue3)
- [CSF 3.0 Specification](https://storybook.js.org/docs/vue3/api/csf)
- [Element Plus](https://element-plus.org/)
