# 实施计划：Storybook 组件文档管理

**分支**: `001-storybook-docs` | **日期**: 2026-03-11 | **规范**: [spec.md](./spec.md)
**输入**: 来自 `/specs/001-storybook-docs/spec.md` 的功能规范

## 摘要

为 Vite 7.x + Vue 3.5.x 项目集成 Storybook 8.x 组件开发环境，提供独立的组件文档管理和案例演示系统。基于当前项目的 Tailwind CSS 4.x 和 Element Plus 2.x 技术栈，配置 Storybook 以支持 Composition API 和 `<script setup>` 语法，为 `src/components/` 和 `src/widgets/` 目录下的组件提供 Stories 编写规范和文档展示能力。

## 技术上下文

**语言/版本**: TypeScript 5.9.x, Vue 3.5.26
**主要依赖**: Vite 7.3.x, Element Plus 2.13.0, Tailwind CSS 4.2.x
**存储**: N/A (纯前端组件文档系统)
**测试**: Vitest 4.0.x (项目现有测试框架)
**目标平台**: 现代浏览器 (Chrome/Firefox/Edge/Safari)
**项目类型**: 单一 Web 前端项目
**性能目标**: Storybook 启动时间 < 10 秒，构建产物 < 5MB (gzip 后)
**约束条件**: 不影响现有 Vite 开发服务器配置，复用项目 TypeScript 和样式配置
**规模/范围**: 当前 1 个组件 (IconFont)，预期扩展至 10+ 个基础组件

## 章程检查

*门控：必须在阶段 0 研究前通过。阶段 1 设计后重新检查。*

### 章程符合性检查清单

| 章程条款 | 是否符合 | 说明 |
|---------|----------|------|
| I. 单一职责与模块化 | 符合 | Storybook 配置集中在 `.storybook/` 目录，组件 Stories 在各组件目录内 |
| II. 规范优先与自动化校验 | 符合 | 将添加 Storybook 构建命令到 lint 流程，新增代码需要测试覆盖 |
| III. 组件化与可复用性 | 符合 | Storybook 本身就是促进组件复用和文档化的工具 |
| IV. 测试覆盖与质量保证 | 符合 | Stories 本身可作为组件的可视化测试用例 |
| V. 基础组件文件结构规范 | 符合 | 不改变现有组件结构，仅添加 `.stories.ts` 文件 |
| VI. API 契约与错误处理 | N/A | 不涉及 HTTP 请求 |
| VII. 可维护性与简洁性 | 符合 | 使用 Storybook 标准配置，避免过度抽象 |

### 章程关卡评估

- **TypeScript 检查**: 符合 - 项目已统一使用 TypeScript
- **Lint 检查**: 符合 - 将 Storybook 文件纳入 ESLint 检查范围
- **测试要求**: 符合 - Stories 可作为可视化测试，后续可添加交互测试
- **样式规范**: 符合 - 复用现有 Tailwind CSS 和 Element Plus 样式系统

**关卡状态**: 通过 - 无违规项

## 项目结构

### 文档 (此功能)

```
specs/001-storybook-docs/
├── plan.md              # 此文件
├── research.md          # 阶段 0 输出
├── data-model.md        # 阶段 1 输出 (如适用)
├── quickstart.md        # 阶段 1 输出
├── contracts/           # 阶段 1 输出 (如适用)
└── tasks.md             # 阶段 2 输出
```

### 源代码 (仓库根目录)

```
# 项目结构：单一 Web 前端项目
vite-vue3-ts-starter/
├── .storybook/                  # Storybook 配置目录 (新增)
│   ├── main.ts                  # 主配置文件
│   ├── preview.ts               # 全局预览配置
│   └── manager.ts               # 管理器配置 (可选)
├── src/
│   ├── components/
│   │   └── IconFont/
│   │       ├── index.vue
│   │       ├── interface.ts
│   │       ├── helpers.ts
│   │       ├── __tests__/
│   │       │   └── IconFont.spec.ts
│   │       └── IconFont.stories.ts  # 组件 Stories (新增)
│   └── widgets/                 # 未来扩展
├── package.json                 # 添加 Storybook 依赖
└── vite.config.ts               # 现有配置 (复用)
```

**结构决策**: 采用单一项目结构，Storybook 配置集中在 `.storybook/` 目录，每个组件的 Stories 文件放在组件同级目录下，遵循项目现有的模块化组织方式。

## 复杂度跟踪

*仅在章程检查有必须证明的违规时填写*

| 违规 | 为什么需要 | 拒绝更简单替代方案的原因 |
|-----------|------------|-------------------------------------|
| N/A | - | - |

---

## 阶段 0 完成报告

**状态**: 已完成 | **日期**: 2026-03-11

### 生成的制品

- [x] `research.md` - 技术方案研究报告
  - Storybook 8.x 与 Vite 7 + Vue 3.5 兼容性确认
  - Tailwind CSS 4.x 集成方案
  - Element Plus 2.x 支持方案
  - Stories 文件组织方式
  - Vite 配置复用机制

### 关键决策

1. **Storybook 版本**: 8.6.x (最新稳定版，官方支持 Vite 7 和 Vue 3.5)
2. **配置文件位置**: `.storybook/main.ts` 和 `.storybook/preview.ts`
3. **Stories 位置**: 组件目录下 `ComponentName.stories.ts`
4. **样式处理**: 在 `preview.ts` 中导入主项目样式文件

---

## 阶段 1 完成报告

**状态**: 已完成 | **日期**: 2026-03-11

### 生成的制品

- [x] `data-model.md` - 配置结构和元数据定义
  - StorybookConfig 主配置实体
  - Meta 故事元数据
  - ArgType 参数类型
  - Story 故事案例
  - Decorator 装饰器

- [x] `quickstart.md` - 快速入门指南
  - 安装步骤
  - 配置说明
  - 第一个 Stories 示例
  - 常见问题排查

- [x] `contracts/` - 配置文件模板
  - `main.ts` - Storybook 主配置模板
  - `preview.ts` - 预览配置模板
  - `ComponentName.stories.ts` - Stories 文件模板

### 章程重新检查 (阶段 1 后)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 章程符合性 | 通过 | 所有条款均符合，无违规 |
| 技术决策合理性 | 通过 | 基于官方文档和行业最佳实践 |
| 配置可维护性 | 通过 | 复用主项目配置，避免冗余 |
| 测试覆盖 | 通过 | Stories 可作为可视化测试，符合章程 IV 要求 |
| 文件结构规范 | 通过 | `.stories.ts` 与组件同级，符合章程 V 要求 |

**评估结果**: 通过 - 可进入阶段 2 (实施任务生成)

---

## 下一阶段

执行 `/speckit.tasks` 生成可执行的任务清单
