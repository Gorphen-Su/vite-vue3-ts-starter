# vite-vue3-ts-starter 开发指南

基于所有功能计划自动生成。最后更新时间：2026-03-11

## 活跃技术

- Storybook 10.x - 组件开发环境和文档系统
- Vue 3.5.x - 渐进式前端框架
- Vite 7.x - 下一代前端构建工具
- Element Plus 2.x - Vue 3 组件库
- Tailwind CSS 4.x - 实用优先的 CSS 框架
- TypeScript 5.9.x - JavaScript 超集
- Vitest 4.x - Vite 原生测试框架

## 项目结构

```
vite-vue3-ts-starter/
├── .storybook/              # Storybook 配置目录
│   ├── main.ts              # Storybook 主配置
│   ├── preview.ts           # 全局预览配置
│   └── vitest.setup.ts      # Vitest 测试设置
├── src/
│   ├── components/          # 基础组件
│   │   └── IconFont/
│   │       ├── index.vue
│   │       ├── interface.ts
│   │       ├── helpers.ts
│   │       ├── IconFont.stories.ts
│   │       └── __tests__/
│   ├── modules/             # 功能模块
│   ├── router/              # 路由配置
│   ├── stores/              # Pinia 状态管理
│   ├── styles/              # 全局样式
│   └── utils/               # 工具函数
├── specs/                   # 功能规范文档
└── storybook-static/        # Storybook 构建产物
```

## 命令

```bash
# 开发
npm run dev              # 启动 Vite 开发服务器
npm run storybook        # 启动 Storybook 开发服务器 (端口 6006)

# 构建
npm run build            # 构建生产版本
npm run build-storybook  # 构建 Storybook 静态站点

# 测试
npm run test             # 运行 Vitest 测试
npm run test:coverage    # 运行测试并生成覆盖率报告

# 代码质量
npm run lint             # 运行 ESLint 检查
npm run lint:fix         # 自动修复 ESLint 问题
npm run stylelint        # 运行 Stylelint 检查
npm run stylelint:fix    # 自动修复 Stylelint 问题
```

## 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- Vue 组件使用 `<script setup>` 语法
- Stories 文件使用 CSF 3.0 格式
- 组件文件结构：`index.vue` + `interface.ts` + `helpers.ts` + `*.stories.ts`

## Storybook 使用指南

### 创建组件 Stories

```ts
// src/components/YourComponent/YourComponent.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YourComponent from './index.vue'

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  argTypes: {
    // 定义属性控制
  }
} satisfies Meta<typeof YourComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
```

### Stories 目录结构

```
src/components/ComponentName/
├── index.vue              # 组件主文件
├── interface.ts           # 类型定义
├── helpers.ts             # 工具函数
├── ComponentName.stories.ts
└── __tests__/
    └── ComponentName.spec.ts
```

## 最近变更

- 001-storybook-docs: 完成 Storybook 集成
  - 创建 `.storybook/` 配置目录
  - 添加 IconFont 组件 Stories (5 个案例)
  - 创建 `interface.ts` 和 `helpers.ts`
  - 配置 ESLint 忽略 specs 目录
  - 运行 `build-storybook` 验证构建成功

<!-- 手动添加内容开始 -->
<!-- 手动添加内容结束 -->
