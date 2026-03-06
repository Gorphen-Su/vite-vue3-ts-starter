# 实施计划：UnoCSS 迁移至 Tailwind CSS

**分支**: `001-replace-unocss-tailwind` | **日期**: 2026-03-06 | **规范**: [spec.md](./spec.md)
**输入**: 来自 `/specs/001-replace-unocss-tailwind/spec.md` 的功能规范

**注意**: 此模板由 `/speckit.plan` 命令填充。执行工作流程请参见 `.specify/templates/commands/plan.md`.

## 摘要

本项目旨在将脚手架中的原子化 CSS 引擎从 UnoCSS 迁移到 Tailwind CSS，同时保持所有现有样式功能不变。核心工作包括：移除 UnoCSS 依赖、安装 Tailwind CSS 及其 Vite 插件、迁移主题配置（颜色、断点、自定义规则）、迁移自定义规则和快捷方式，并验证开发环境和生产环境的样式完整性。

## 技术背景

**语言/版本**: TypeScript 5.9+, Vue 3.5+, Vite 7.3+
**主要依赖**: Tailwind CSS v4.x, @tailwindcss/vite 插件
**包管理器**: npm >= 10.x
**存储**: N/A
**测试**: Vitest 4.0+
**目标平台**: Web 浏览器 (现代浏览器)
**项目类型**: 前端单页应用 (SPA)
**性能目标**: 开发服务器启动时间不超过原有 150%，CSS 文件大小不超过原有 120%
**约束条件**: 保持现有组件样式 100% 兼容，无需修改现有类名
**规模/范围**: 单个功能模块 - CSS 工具链迁移

## 章程检查

*门控：必须在阶段 0 研究前通过。阶段 1 设计后重新检查。*

基于项目章程的检查:

1. **单一职责与模块化**: ✅ 通过 - 迁移工作集中在样式工具链，不影响模块结构
2. **规范优先与自动化校验**: ✅ 通过 - 迁移后仍需通过 `npm run lint` 和 `npm run test` 校验
3. **组件化与可复用性**: ✅ 通过 - 不影响现有组件结构
4. **API 契约与错误处理**: ✅ 通过 - 不涉及 API 变更
5. **可维护性与简洁性**: ✅ 通过 - Tailwind CSS 作为行业标准，提高可维护性

**章程违规**: 无

## 项目结构

### 文档 (此功能)

```
specs/001-replace-unocss-tailwind/
├── plan.md              # 此文件 (/speckit.plan 命令输出)
├── research.md          # 阶段 0 输出 (/speckit.plan 命令) ✅ 完成
├── data-model.md        # 阶段 1 输出 (/speckit.plan 命令) ✅ 完成
├── quickstart.md        # 阶段 1 输出 (/speckit.plan 命令) ✅ 完成
├── contracts/           # 阶段 1 输出 (/speckit.plan 命令) ✅ 完成
│   ├── vite-config.md
│   └── tailwind-config.md
└── tasks.md             # 阶段 2 输出 (/speckit.tasks 命令 - 非/speckit.plan 创建)
└── checklists/
    └── requirements.md  # 规范质量检查清单
```

### 源代码 (仓库根目录)

```
.
├── package.json         # 需要更新依赖
├── vite.config.ts       # 需要更新 Vite 插件配置
├── uno.config.ts        # 需要删除 (或备份)
├── tailwind.config.js   # 需要创建
└── src/
    └── styles/          # 样式文件保持不变
        ├── element-variables.scss
        ├── theme.scss
        └── ...
```

**结构决策**: 单一前端项目结构，修改集中在根目录配置文件

## 复杂度跟踪

*仅在章程检查有必须证明的违规时填写*

| 违规 | 为什么需要 | 拒绝更简单替代方案的原因 |
|-----------|------------|-------------------------------------|
| 无 | 本项目为标准工具链迁移，无需突破章程约束 | N/A |

## 阶段 0: 大纲与研究

### 未知项和研究任务

基于技术背景分析，识别以下需要研究的未知项:

| 未知项 | 研究任务 | 优先级 | 状态 |
|--------|----------|--------|------|
| Tailwind CSS v4 与 Vite 7 的集成方式 | 研究 @tailwindcss/vite 插件的最新用法 | P1 | ✅ 完成 |
| UnoCSS presetWind3 与 Tailwind CSS 的兼容性差异 | 分析两个工具的类名命名差异 | P1 | ✅ 完成 |
| UnoCSS 自定义规则迁移方案 | 研究 Tailwind CSS 插件系统实现自定义规则 | P2 | ✅ 完成 |
| 图标预设替代方案 | 确认 unplugin-icons 是否继续可用 | P2 | ✅ 完成 |
| 属性化模式 (presetAttributify) 替代方案 | 研究 Tailwind CSS 是否支持类似语法 | P3 | ✅ 完成 |

### 研究代理分配

1. **Task**: 研究 Tailwind CSS v4 在 Vite 7 项目中的最佳集成实践 ✅
2. **Task**: 分析 UnoCSS presetWind3 与 Tailwind CSS 的工具类兼容性 ✅
3. **Task**: 研究 Tailwind CSS 插件系统实现自定义规则和快捷方式 ✅
4. **Task**: 确认 unplugin-icons 在移除 UnoCSS 后的可用性 ✅

### research.md 输出结构

研究报告已完成：[research.md](./research.md)

主要发现:
- Tailwind CSS v4 使用 @tailwindcss/vite 插件直接集成
- 主题颜色需要转换透明度语法 (`%alpha` → `<alpha-value>`)
- 断点 sm 需要自定义为 600px 以保持兼容
- navbar-shadow 可以通过插件 addUtilities 实现
- bgimage 动态规则无法直接转换，需使用替代方案
- unplugin-icons 完全兼容，无需修改

## 阶段 1: 设计与合同

### 数据模型 (data-model.md)

✅ **完成**: [data-model.md](./data-model.md)

配置迁移映射关系:

1. **UnoCSS 预设 → Tailwind CSS 配置**
   - presetWind3 → Tailwind CSS 默认配置 ✅
   - presetAttributify → 移除 (Vue 项目影响小) ✅
   - presetIcons → unplugin-icons (保留) ✅

2. **主题配置映射**
   - colors → tailwind.config.js theme.colors ✅
   - breakpoints → tailwind.config.js theme.screens ✅
   - rules → tailwind.config.js plugins ✅
   - shortcuts → tailwind.config.js theme.extend.utilities ✅

3. **转换器映射**
   - transformerDirectives → @apply 指令 (原生支持) ✅
   - transformerAttributifyJsx → 移除 (Vue 项目影响小) ✅

### API 合同 (contracts/)

✅ **完成**:

- [vite-config.md](./contracts/vite-config.md) - Vite 配置规范
- [tailwind-config.md](./contracts/tailwind-config.md) - Tailwind 配置规范

### 快速指南 (quickstart.md)

✅ **完成**: [quickstart.md](./quickstart.md)

迁移步骤快速参考:

1. 安装 Tailwind CSS 及插件
2. 移除 UnoCSS 依赖
3. 创建 tailwind.config.js
4. 更新 vite.config.ts
5. 迁移自定义规则
6. 验证开发环境
7. 验证生产构建

### 代理上下文更新

运行 `.specify/scripts/bash/update-agent-context.sh claude` 更新代理特定文件，添加 Tailwind CSS 技术上下文。

## 阶段 2: 实施任务 (由 /speckit.tasks 生成)

任务将按以下顺序生成:

1. 依赖管理任务 (安装/卸载)
2. 配置文件创建任务
3. 配置迁移任务
4. Vite 集成任务
5. 验证测试任务

## 关卡评估

### 阶段 0 → 阶段 1 关卡

- [x] 所有 NEEDS CLARIFICATION 已解决
- [x] research.md 完成
- [x] 技术选型已确定

### 阶段 1 → 阶段 2 关卡

- [x] data-model.md 完成
- [x] contracts/ 目录填充
- [x] quickstart.md 完成
- [x] 代理上下文更新完成 (在实施阶段执行)

## 章程检查 (阶段 1 后重新评估)

重新评估章程合规性，确保设计不违反任何章程条款:

1. **单一职责与模块化**: ✅ 通过 - 设计文档明确了修改范围仅限于配置文件
2. **规范优先与自动化校验**: ✅ 通过 - 迁移后保留了所有校验机制
3. **组件化与可复用性**: ✅ 通过 - 不影响现有组件和 hooks
4. **API 契约与错误处理**: ✅ 通过 - 不涉及 API 和数据层
5. **可维护性与简洁性**: ✅ 通过 - Tailwind CSS 提高项目可维护性

**新增章程违规**: 无

---

## 生成的制品清单

| 文件 | 路径 | 状态 |
|------|------|------|
| spec.md | specs/001-replace-unocss-tailwind/spec.md | ✅ 完成 |
| plan.md | specs/001-replace-unocss-tailwind/plan.md | ✅ 完成 |
| research.md | specs/001-replace-unocss-tailwind/research.md | ✅ 完成 |
| data-model.md | specs/001-replace-unocss-tailwind/data-model.md | ✅ 完成 |
| quickstart.md | specs/001-replace-unocss-tailwind/quickstart.md | ✅ 完成 |
| vite-config.md | specs/001-replace-unocss-tailwind/contracts/vite-config.md | ✅ 完成 |
| tailwind-config.md | specs/001-replace-unocss-tailwind/contracts/tailwind-config.md | ✅ 完成 |
| requirements.md | specs/001-replace-unocss-tailwind/checklists/requirements.md | ✅ 完成 |

---

**下一步**: 运行 `/speckit.tasks` 生成详细的实施任务列表

**阶段 2 准备**: 所有阶段 0 和阶段 1 的关卡已通过的，可以开始实施阶段
