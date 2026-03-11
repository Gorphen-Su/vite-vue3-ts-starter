# Vite Vue3 TS Starter 项目章程

## 核心原则

### I. 单一职责与模块化

所有功能按领域进行拆分（User、Main、Result 等），每个模块在路由、store、组件、API 上保持内聚、低耦合。  
模块对外通过清晰的公共接口（路由入口、store 导出、API 函数）暴露能力，禁止跨模块直接“乱引用”内部实现。

### II. 规范优先与自动化校验

统一使用 TypeScript、ESLint、Stylelint、Prettier 和 Husky 进行规范约束，所有变更必须通过 `npm run lint` 和 `npm run test`（如配置）后才能合并。  
禁止在 CI/husky 中关闭规则绕过校验，如需放宽规则必须经过评审并在文档中说明原因。

### III. 组件化与可复用性

优先编写通用组件（如 `ModalDialog`、表单控件、布局组件），抽离到 `components` / `widgets` 中复用。
页面级组件只负责拼装布局和业务流程，不直接堆积复杂逻辑，复杂逻辑优先抽到 hooks（如 `useXXX`）或 store 中。

### IV. 测试覆盖与质量保证

所有新增或修改的代码必须编写对应的单元测试用例：
- **Components 组件**：`src/components/**` 下的所有组件需在各自目录的 `__tests__` 文件夹中编写 `.spec.ts` 测试文件
- **Widgets 组件**：`src/widgets/**` 下的所有组件需在各自目录的 `__tests__` 文件夹中编写 `.spec.ts` 测试文件
- **纯函数工具**：`src/utils/**` 及其他模块中的纯函数需在同级目录的 `__tests__` 文件夹中编写 `.spec.ts` 测试文件
- **测试文件命名**：统一使用 `<组件名>.spec.ts` 或 `<函数名>.spec.ts` 格式
- **测试内容**：至少覆盖正常输入、边界条件、错误处理三种场景

测试文件目录结构示例：
```
src/components/
  ExampleComponent/
    index.vue
    __tests__/
      ExampleComponent.spec.ts
src/utils/
  helper.ts
  __tests__/
    helper.spec.ts
```

### V. 基础组件文件结构规范

`src/components/` 下的基础组件统一遵循以下文件组织和代码规范：

**标准目录结构：**
```
src/components/ComponentName/
  index.vue       # 或 index.tsx - 组件主文件，仅负责暴露组件给外部使用
  interface.ts    # 组件内部使用的所有类型定义（interface、type、enum 等）
  helpers.ts      # 组件专用的工具函数存放于此
  __tests__/
    ComponentName.spec.ts  # 组件测试文件
```

**各文件职责说明：**
- **index.vue | index.tsx**：组件主文件，只负责组件模板、样式和对外接口定义，避免堆积复杂业务逻辑
- **interface.ts**：集中管理组件相关的类型定义，包括 Props、Emits、内部状态类型、常量枚举等
- **helpers.ts**：存放组件内部使用的纯工具函数，确保函数可测试、无副作用

**代码示例：**
```
src/components/ModalDialog/
  index.vue
  interface.ts    // 导出 ModalDialogProps, ModalDialogEmits 等
  helpers.ts      // 导出 calculatePosition, formatContent 等
```

### VI. API 契约与错误处理

所有 HTTP 请求通过统一的 `utils/request.ts` 封装，返回类型使用 `RespData<T>` 明确约束。  
接口调用必须显式处理 `error`、`msg` 字段，对用户友好展示错误信息，同时避免在页面中散落裸 `axios` 调用。

### VII. 可维护性与简洁性

优先选择简单、可读性强的实现方式，避免过早抽象和不必要的封装。  
任何“技巧性”实现都需要配有说明性注释或文档，并尽量保持替换/重构成本可控。

## 质量与非功能要求

- **测试覆盖**：新增代码测试覆盖率不低于 80%，核心组件和工具函数必须覆盖所有分支路径。
- **性能**：首屏加载控制在合理体积内，公共依赖（Vue、Element Plus、ECharts 等）通过按需加载或拆分路由懒加载管理。
- **样式规范**：全局样式集中在 `src/styles` 下管理，遵循约定的变量（`theme.scss`、`element-variables.scss`），禁止在组件内写大段未命名的魔法值。
- **国际化**：文案统一通过 locales 管理，新增/修改文案时同步更新语言包与对应的 `Translations` 使用。
- **安全性**：认证相关（token、用户信息）统一通过 store / Cookie 管理，不在组件中随意读写浏览器存储。

## 开发流程与评审流程

- **分支策略**：  
  - 主干分支：`main` 只接受通过 PR 合并，不直接在 `main` 上开发。  
  - 功能分支：统一使用 `feat/...`、`fix/...`、`chore/...` 等前缀从 `main` 拉分支。  

- **提交规范**：  
  - 每次提交前必须通过 husky 的 lint 检查，修复后再 `git add` + `commit`。  
  - 建议遵循约定式提交（如 `feat: xxx`、`fix: yyy`）方便后续生成变更日志。

- **代码评审**：  
  - 所有合并到 `main` 的变更必须经至少一名开发者 Review。  
  - 评审关注点包括：业务逻辑正确性、类型安全、边界处理、样式一致性、是否有可复用抽象机会。

## 治理

项目章程优先于个人习惯，当实现与章程冲突时，以章程为准。  
任何需要突破现有约束的修改，必须在 PR 说明中写明理由和替代方案评估，通过评审后方可执行。  
章程的修改通过 PR 进行：更新本文件，说明变更原因和影响范围，经团队确认后合并。

**版本**: 1.0.0 | **批准日期**: 2026-03-05 | **最后修正**: 2026-03-11