# 阶段 0 研究报告：Storybook 集成技术方案

**功能**: [spec.md](./spec.md) | **日期**: 2026-03-11

---

## 研究任务 1: Storybook 与 Vite 7 + Vue 3.5 兼容性

### Decision: 采用 Storybook 8.x

**选择**: Storybook 8.6.x (最新稳定版)

### Rationale

1. **官方兼容性确认**:
   - Storybook 8.x 官方支持 Vite 5-7.x
   - Storybook 8.x 官方支持 Vue 3.x (包括 3.5.x)
   - Storybook 8 开始使用基于 Vite 的默认构建器 (@storybook/builder-vite)

2. **技术依据**:
   - Storybook 8 发布时已将 Vite 支持作为核心功能
   - Vue 3 CSF (Component Story Format) 支持已稳定
   - 支持 `<script setup>` 语法和 Composition API

3. **安装命令**:
   ```bash
   pnpm dlx storybook@latest init
   ```

### Alternatives Considered

| 替代方案 | 评估 | 拒绝原因 |
|---------|------|---------|
| Storybook 7.x | 兼容 Vite 4.x | 项目使用 Vite 7.x，Storybook 8 有更官方支持 |
| VitePress + demo 块 | 可用于文档 | 不是专门的组件开发环境，缺少 Controls/Actions 等插件 |
| 自研文档系统 | 完全可控 | 重复造轮子，维护成本高，功能不如 Storybook 完善 |

---

## 研究任务 2: Tailwind CSS 4.x 集成最佳实践

### Decision: 通过 preview.ts 配置 Tailwind 样式导入

**选择**: 在 `.storybook/preview.ts` 中导入主项目的样式入口文件

### Rationale

1. **Tailwind CSS 4.x 特性**:
   - v4 使用全新的 Rust 引擎
   - 配置方式简化，不需要 `tailwind.config.js`
   - 通过 `@import "tailwindcss"` 自动检测样式

2. **集成方式**:
   ```ts
   // .storybook/preview.ts
   import '../src/styles/main.scss' // 或包含 Tailwind 入口的文件
   ```

3. **注意事项**:
   - 确保 Storybook 的 Vite 配置包含 Tailwind 4 插件
   - 复用主项目的 `vite.config.ts` 中的 CSS 配置

### Alternatives Considered

| 替代方案 | 评估 | 拒绝原因 |
|---------|------|---------|
| 在 main.ts 中添加 styles 数组 | Storybook 7 方式 | Storybook 8 推荐在 preview.ts 中导入 |
| 复制 Tailwind 配置到 .storybook | 可行但冗余 | 应该复用主项目配置，避免维护多份配置 |

---

## 研究任务 3: Element Plus 2.x 支持

### Decision: 使用 @element-plus/icons-vue 和 Element Plus 按需加载

**选择**: 在 preview.ts 中全局注册 Element Plus

### Rationale

1. **Element Plus 与 Storybook 兼容**:
   - Element Plus 是 Vue 3 组件库，可在 Storybook 中正常使用
   - 需要确保样式正确加载（项目使用 Sass）

2. **注册方式**:
   ```ts
   // .storybook/preview.ts
   import ElementPlus from 'element-plus'
   import 'element-plus/dist/index.css'

   export const decorators = [
     (story) => ({
       components: { story },
       template: '<div><story/></div>',
     }),
   ]
   ```

### Alternatives Considered

| 替代方案 | 评估 | 拒绝原因 |
|---------|------|---------|
| 每个 Story 单独导入 | 可行但冗余 | 代码重复，不利于统一主题 |
| 使用 unplugin-vue-components 自动导入 | 与 Storybook 可能有冲突 | Storybook 有自己的预加载机制，建议简化配置 |

---

## 研究任务 4: Stories 文件组织方式

### Decision: 采用 `*.stories.ts` 文件与组件同级存放

**选择**: 组件目录内添加 `ComponentName.stories.ts` 文件

### Rationale

1. **CSF 3.0 标准**:
   ```ts
   // IconFont.stories.ts
   import type { Meta, StoryObj } from '@storybook/vue3'
   import IconFont from './index.vue'

   const meta = {
     title: 'Components/IconFont',
     component: IconFont,
     tags: ['autodocs'],
     argTypes: {
       name: { control: 'text', description: '图标名称' },
       size: { control: 'number', description: '图标大小' },
       color: { control: 'color', description: '图标颜色' },
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
   ```

2. **目录结构**:
   ```
   src/components/IconFont/
   ├── index.vue
   ├── interface.ts
   ├── helpers.ts
   ├── __tests__/IconFont.spec.ts
   └── IconFont.stories.ts
   ```

### Alternatives Considered

| 替代方案 | 评估 | 拒绝原因 |
|---------|------|---------|
| 集中到 `__stories__` 目录 | 可行 | 不利于组件内聚，查找不便 |
| 使用 `*.stories.vue` | SFC 格式 | CSF 3.0 的 `.ts` 格式更标准，类型推导更好 |

---

## 研究任务 5: 主项目 Vite 配置复用

### Decision: Storybook 自动读取主项目 vite.config.ts

**选择**: 使用 Storybook 的 Vite 集成自动复用配置

### Rationale

1. **Storybook Vite 集成机制**:
   - `@storybook/builder-vite` 自动读取项目的 `vite.config.ts`
   - 可通过 `.storybook/main.ts` 的 `viteFinal` 钩子进行自定义

2. **配置示例**:
   ```ts
   // .storybook/main.ts
   import type { StorybookConfig } from '@storybook/vue3-vite'

   const config: StorybookConfig = {
     stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
     addons: [
       '@storybook/addon-essentials',
       '@storybook/addon-links',
       '@storybook/addon-interactions',
     ],
     framework: {
       name: '@storybook/vue3-vite',
       options: {},
     },
     async viteFinal(config) {
       // 可在此处进行额外的 Vite 配置
       return config
     },
   }

   export default config
   ```

### Alternatives Considered

| 替代方案 | 评估 | 拒绝原因 |
|---------|------|---------|
| 完全独立的 Vite 配置 | 可行但冗余 | 需要维护两份配置，容易不同步 |
| 手动导入 vite.config.ts | 不必要 | Storybook 已自动处理 |

---

## 依赖版本建议

基于当前项目依赖，推荐的 Storybook 相关包版本：

```json
{
  "devDependencies": {
    "storybook": "^8.6.0",
    "@storybook/vue3": "^8.6.0",
    "@storybook/vue3-vite": "^8.6.0",
    "@storybook/addon-essentials": "^8.6.0",
    "@storybook/addon-links": "^8.6.0",
    "@storybook/addon-interactions": "^8.6.0",
    "@storybook/test": "^8.6.0"
  }
}
```

---

## 需要澄清的问题 (已解决)

| 问题 | 解决方案 |
|------|---------|
| Storybook 版本选择 | 8.x (官方支持 Vite 7 + Vue 3.5) |
| Tailwind CSS 4 兼容性 | 在 preview.ts 导入主样式文件 |
| Element Plus 集成 | 全局注册，复用项目 Sass 配置 |
| Stories 文件位置 | 组件目录内 `*.stories.ts` |
| 是否需要 CI/CD 部署 | 暂不需要，仅本地开发使用 (来自规范假设) |

---

## 参考资料

1. [Storybook 8 Official Docs - Vue 3](https://storybook.js.org/docs/vue3)
2. [Storybook 8 + Vite Integration](https://storybook.js.org/docs/vue3/get-started/install)
3. [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4)
4. [Element Plus Getting Started](https://element-plus.org/en-US/guide/start.html)
