# 数据模型：Storybook 配置结构

**功能**: [spec.md](./spec.md) | **日期**: 2026-03-11

---

## 概述

本文档定义 Storybook 集成中使用的配置结构和 Stories 元数据格式。

---

## 实体 1: StorybookConfig (主配置)

**描述**: `.storybook/main.ts` 导出的 Storybook 主配置对象

### 字段定义

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| stories | string[] | 是 | Stories 文件匹配模式数组 |
| addons | AddonEntry[] | 是 | 启用的插件列表 |
| framework | FrameworkConfig | 是 | 框架配置 (vue3-vite) |
| staticDirs | string[] | 否 | 静态资源目录 |
| viteFinal | function | 否 | Vite 配置自定义钩子 |

### 示例结构

```ts
interface StorybookConfig {
  stories: string[]
  addons: (string | { name: string; options?: object })[]
  framework: {
    name: string
    options: object
  }
  viteFinal?: (config: UserConfig) => Promise<UserConfig>
}
```

---

## 实体 2: Meta (故事元数据)

**描述**: 每个 Stories 文件导出的组件元数据定义 (CSF 3.0)

### 字段定义

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 组件在导航中的标题路径 |
| component | VueComponent | 是 | Vue 组件引用 |
| tags | string[] | 否 | 标签数组 (如 'autodocs') |
| argTypes | ArgTypesMap | 否 | 参数类型定义 |
| args | ArgsObject | 否 | 默认参数值 |
| decorators | Decorator[] | 否 | 组件装饰器 |

### 示例结构

```ts
interface Meta<T> {
  title: string
  component: T
  tags?: string[]
  argTypes?: {
    [key: string]: ArgType
  }
  args?: Partial<T>
  decorators?: Decorator[]
}
```

---

## 实体 3: ArgType (参数类型)

**描述**: 定义组件属性的类型、控制和文档说明

### 字段定义

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| control | ControlConfig | 否 | Controls 面板配置 |
| description | string | 否 | 参数说明文档 |
| defaultValue | any | 否 | 默认值 |
| table | TableConfig | 否 | 文档表格配置 |
| options | any[] | 否 | 可选值列表 (用于 select 控制) |

### Control 类型参考

| Control 类型 | 适用场景 |
|-------------|---------|
| 'text' | 字符串输入 |
| 'number' | 数字输入 |
| 'boolean' | 开关切换 |
| 'color' | 颜色选择器 |
| 'select' | 下拉选择 (需 options) |
| 'radio' | 单选按钮 |
| 'object' | JSON 对象编辑 |
| 'function' | 回调函数 |

---

## 实体 4: Story (故事案例)

**描述**: 组件的一个具体使用案例

### 字段定义

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| render | function | 否 | 自定义渲染函数 |
| args | ArgsObject | 否 | 此案例的参数值 |
| decorators | Decorator[] | 否 | 案例专用装饰器 |
| parameters | Parameters | 否 | 案例专用参数 |

### 示例结构

```ts
interface Story<T = {}> {
  render?: (args: T) => {
    components: { story: VueComponent }
    template: string
  }
  args?: Partial<T>
  decorators?: Decorator[]
  parameters?: {
    docs?: { description?: { story?: string } }
    layout?: 'centered' | 'fullscreen' | 'padded'
  }
}
```

---

## 实体 5: Decorator (装饰器)

**描述**: 包裹故事组件的包装器，提供上下文环境

### 类型定义

```ts
type Decorator = (
  story: () => VueComponent,
  context: StoryContext
) => {
  components: { story: VueComponent }
  setup?: () => object
  template: string
}
```

### 常见用途

| 用途 | 示例 |
|------|------|
| 全局样式包装 | `<div class="sb-wrapper"><story/></div>` |
| 主题提供者 | `<el-config-provider><story/></el-config-provider>` |
| 路由上下文 | `<router-provider><story/></router-provider>` |
| Store 提供者 | `<pinia-provider><story/></pinia-provider>` |

---

## 关系图

```
StorybookConfig
  └── stories[] → 匹配多个 Stories 文件
        └── Meta
              ├── component → Vue Component
              ├── argTypes → ArgType[]
              └── decorators[] → Decorator[]
                    └── Story
                          ├── args → ArgType values
                          └── decorators → Decorator[]
```

---

## 验证规则

### Meta 验证

1. `title` 必须是非空字符串
2. `component` 必须是有效的 Vue 组件
3. `tags` 如包含 'autodocs' 则自动生成文档

### ArgType 验证

1. `control.type` 必须与参数实际类型匹配
2. `description` 应该提供清晰的用途说明
3. 必填参数应设置 `table.defaultValue` 为 'required'

### Story 验证

1. 每个 Story 必须有唯一的导出名称
2. `args` 应该提供完整的必要参数
3. 复杂交互应使用 `parameters.docs.description.story`
