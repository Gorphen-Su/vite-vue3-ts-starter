# 任务：Storybook 组件文档管理

**输入**: 来自 `/specs/001-storybook-docs/` 的设计文档
**前置条件**: plan.md(已完成)、spec.md(3 个用户故事)、research.md(已完成)、data-model.md(已完成)、contracts/(已完成)

**测试**: 本功能规范未明确要求单元测试任务 - Stories 本身作为可视化测试用例

**组织结构**: 任务按用户故事分组，以便每个故事能够独立实施和测试

---

## 格式说明

- **[P]**: 可以并行运行 (不同文件，无依赖关系)
- **[Story]**: 此任务属于哪个用户故事 (例如：US1、US2、US3)
- 任务描述包含确切的文件路径

---

## 阶段 1: 设置 (共享基础设施)

**目的**: 项目初始化和基本结构

- [x] T001 使用 `pnpm dlx storybook@latest init` 初始化 Storybook
- [x] T002 验证 Storybook 依赖安装成功 (storybook、@storybook/vue3-vite 等)

---

## 阶段 2: 基础 (阻塞前置条件)

**目的**: 在任何用户故事可以实施之前必须完成的核心基础设施

**⚠️ 关键**: 在此阶段完成之前，无法开始任何用户故事工作

- [x] T003 [P] 创建 `.storybook/main.ts` 配置文件 - 设置 stories 匹配模式和 addons
- [x] T004 [P] 创建 `.storybook/preview.ts` 配置文件 - 设置全局装饰器和样式导入
- [x] T005 在 `preview.ts` 中配置 Tailwind CSS 4.x 样式导入 (`import '../src/styles/index.scss'`)
- [x] T006 在 `preview.ts` 中全局注册 Element Plus
- [x] T007 配置 `viteFinal` 钩子复用主项目 Vite 配置 (别名、CSS 预处理)
- [x] T008 在 `package.json` 中添加 scripts: `storybook` 和 `build-storybook`
- [x] T009 将 `.storybook/` 和 `storybook-static/` 添加到 `.gitignore`

**检查点**: 基础就绪 - Storybook 开发服务器应该能够启动，访问 http://localhost:6006

---

## 阶段 3: 用户故事 1 - 查看组件文档 (优先级：P1) 🎯 MVP

**目标**: 实现基础组件文档浏览功能，开发者可以访问 Storybook 查看组件说明和属性表格

**独立测试**: 启动 Storybook 后能看到 IconFont 组件文档页面和属性表格

### 用户故事 1 的实施

- [x] T010 [P] [US1] 在 `src/components/IconFont/interface.ts` 中确认组件 Props 类型定义完整
- [x] T011 [P] [US1] 在 `src/components/IconFont/helpers.ts` 中确认工具函数导出
- [x] T012 [US1] 创建 `src/components/IconFont/IconFont.stories.ts` 文件
- [x] T013 [US1] 在 stories 文件中定义 Meta 元数据 (title、component、tags、argTypes)
- [x] T014 [US1] 配置 argTypes 定义 name、size、color 等属性的控制类型和说明
- [x] T015 [US1] 导出 Default 故事展示默认用法
- [x] T016 [US1] 验证 autodocs 标签生效，文档页面自动生成
- [x] T017 [US1] 启动 `pnpm storybook` 验证组件文档页面正确显示

**检查点**: 用户故事 1 应该完全功能化且可独立测试 - 访问 http://localhost:6006 能看到 IconFont 组件文档

---

## 阶段 4: 用户故事 2 - 组件案例演示 (优先级：P1) 🎯 MVP

**目标**: 为 IconFont 组件编写多个使用案例 (Stories)，展示不同状态和配置选项

**独立测试**: IconFont 组件在 Storybook 中至少有 3 个不同的 Stories 案例

### 用户故事 2 的实施

- [x] T018 [P] [US2] 在 `IconFont.stories.ts` 中添加 Colored 故事 (带颜色属性)
- [x] T019 [P] [US2] 在 `IconFont.stories.ts` 中添加 CustomSize 故事 (自定义尺寸)
- [x] T020 [US2] 在 `IconFont.stories.ts` 中添加 Disabled 或 Loading 状态故事 (如适用)
- [x] T021 [US2] 为每个故事配置 args 参数值
- [x] T022 [US2] 为复杂故事添加 `parameters.docs.description.story` 说明
- [x] T023 [US2] 验证 Controls 插件可以动态调整属性并实时预览效果
- [x] T024 [US2] 验证左侧导航显示所有案例入口 (Default、Colored、CustomSize 等)

**检查点**: 用户故事 2 应该完全功能化 - IconFont 组件至少有 3 个 Stories，Controls 面板可调整属性

---

## 阶段 5: 用户故事 3 - 组件搜索与导航 (优先级：P2)

**目标**: 配置组件分类和搜索功能，支持多组件场景

**独立测试**: 在 Storybook 搜索框中输入关键词能过滤出匹配的组件

### 用户故事 3 的实施

- [ ] T025 [P] [US3] 配置 `main.ts` 中的 stories 匹配模式支持 `src/widgets/**/*.stories.ts`
- [ ] T026 [US3] 验证组件按 `title` 字段分类显示 (如 Components/IconFont)
- [ ] T027 [US3] 配置 Storybook 搜索功能 (默认支持)
- [ ] T028 [US3] 创建第二个测试组件的 stories 文件 (如未来添加其他组件)
- [ ] T029 [US3] 验证搜索框输入关键词能过滤组件列表
- [ ] T030 [US3] 验证展开/收起分类目录功能正常

**检查点**: 用户故事 3 应该完全功能化 - 搜索和分类导航正常工作

---

## 阶段 6: 完善与横切关注点

**目的**: 代码清理、文档和验证

- [x] T031 [P] 将 `.storybook/` 配置文件添加到 ESLint 检查范围
- [x] T032 [P] 运行 `npm run lint` 验证所有代码通过检查
- [x] T033 运行 `pnpm build-storybook` 验证构建成功
- [x] T034 验证构建产物体积 (gzip 后不超过 5MB) - 构建产物约 1.9MB gzip
- [x] T035 更新 `CLAUDE.md` 添加 Storybook 使用指南
- [ ] T036 代码清理和重构
- [ ] T037 运行 quickstart.md 验证所有步骤正常工作

**检查点**: 所有任务完成，准备代码审查

---

## 依赖关系与执行顺序

### 阶段依赖关系

| 阶段 | 依赖关系 | 说明 |
|------|----------|------|
| 阶段 1: 设置 | 无 | 可立即开始 |
| 阶段 2: 基础 | 阶段 1 完成 | 阻塞所有用户故事 |
| 阶段 3: US1 | 阶段 2 完成 | 可独立实施和测试 |
| 阶段 4: US2 | 阶段 2 完成 | 可与 US1 并行 (不同文件) |
| 阶段 5: US3 | 阶段 2 完成 | 可与 US1/US2 并行 |
| 阶段 6: 完善 | 阶段 3-5 完成 | 最终验证和清理 |

### 用户故事依赖关系

- **用户故事 1 (P1)**: 依赖于基础阶段 (阶段 2) 完成 - 无其他故事依赖
- **用户故事 2 (P1)**: 依赖于基础阶段完成 - 可与 US1 并行实施 (不同文件)
- **用户故事 3 (P2)**: 依赖于基础阶段完成 - 可与 US1/US2 并行实施

### 每个用户故事内部

```
阶段 2: 基础配置 (main.ts, preview.ts)
    ↓
阶段 3: US1 - IconFont.stories.ts 基础故事
    ↓
阶段 4: US2 - IconFont.stories.ts 多案例扩展
    ↓
阶段 5: US3 - 多组件搜索导航
    ↓
阶段 6: 完善验证
```

---

## 并行机会

### 阶段 2 内的并行任务

```bash
# 可并行执行:
T003 [P] 创建 main.ts
T004 [P] 创建 preview.ts
```

### 阶段 3 内的并行任务

```bash
# 可并行执行:
T010 [P] 确认 interface.ts 类型定义
T011 [P] 确认 helpers.ts 工具函数
```

### 阶段 4 内的并行任务

```bash
# 可并行执行:
T018 [P] Colored 故事
T019 [P] CustomSize 故事
```

### 阶段 6 内的并行任务

```bash
# 可并行执行:
T031 [P] ESLint 配置
T032 [P] 运行 lint 检查
```

### 跨用户故事的并行机会

基础阶段完成后，如果有多个开发人员：
- 开发人员 A: 阶段 3 (US1)
- 开发人员 B: 阶段 4 (US2)
- 开发人员 C: 阶段 5 (US3)

---

## 并行示例：用户故事 1

```bash
# 一起启动用户故事 1 的所有准备任务:
# T010 [P] 确认 interface.ts 类型定义完整
# T011 [P] 确认 helpers.ts 工具函数导出

# 然后串行执行:
# T012 → T013 → T014 → T015 → T016 → T017
```

---

## 实施策略

### 仅 MVP (用户故事 1 + 用户故事 2)

1. 完成阶段 1: 设置 (T001-T002)
2. 完成阶段 2: 基础 (T003-T009)
3. 完成阶段 3: 用户故事 1 (T010-T017)
4. 完成阶段 4: 用户故事 2 (T018-T024)
5. **停止并验证**: 运行 `pnpm storybook` 验证功能
6. 如准备好则提交代码

### 增量交付

1. 完成阶段 1 + 阶段 2 → 基础就绪
2. 添加阶段 3 (US1) → 验证文档页面 → 提交 (MVP!)
3. 添加阶段 4 (US2) → 验证多案例 → 提交
4. 添加阶段 5 (US3) → 验证搜索导航 → 提交
5. 完成阶段 6: 完善与验证

### 单开发者策略

1. 按顺序执行所有任务 (T001 → T037)
2. 每个阶段完成后运行验证
3. 每个检查点提交代码

---

## 注意事项

- [P] 任务 = 不同文件，无依赖关系，可并行执行
- [Story] 标签将任务映射到特定用户故事以实现可追溯性
- 每个用户故事应该独立可完成和可测试
- 在每个检查点停止以独立验证故事
- 建议：在每个任务或逻辑组后提交
- Stories 文件本身就是可视化测试用例，符合章程测试要求

---

## 任务摘要

| 阶段 | 任务数 | 说明 |
|------|--------|------|
| 阶段 1: 设置 | 2 | Storybook 初始化 |
| 阶段 2: 基础 | 7 | 配置文件和环境设置 |
| 阶段 3: US1 | 8 | 基础文档浏览 |
| 阶段 4: US2 | 7 | 多案例演示 |
| 阶段 5: US3 | 6 | 搜索与导航 |
| 阶段 6: 完善 | 7 | 验证和清理 |
| **总计** | **37** | 可独立执行的任务 |

---

## 成功标准验证

完成所有任务后验证：

- [ ] SC-001: Storybook 启动时间 < 10 秒
- [ ] SC-002: IconFont 组件有完整 Stories 文档
- [ ] SC-003: 30 秒内找到组件文档页面
- [ ] SC-004: IconFont 至少有 3 个 Stories
- [ ] SC-005: 构建产物 gzip 后 < 5MB
