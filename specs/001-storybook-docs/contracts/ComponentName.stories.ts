# Stories 文件模板

**用途**: `ComponentName.stories.ts` 配置参考

---

## 基础模板

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import ComponentName from './index.vue'

// 元数据定义
const meta = {
  // 组件在导航中的标题路径
  title: 'Components/ComponentName',

  // 组件引用
  component: ComponentName,

  // 标签 (使用 'autodocs' 自动生成文档)
  tags: ['autodocs'],

  // 参数类型定义
  argTypes: {
    // 示例：字符串参数
    prop1: {
      control: 'text',
      description: '参数 1 说明',
      defaultValue: 'default value',
    },
    // 示例：数字参数
    prop2: {
      control: 'number',
      description: '参数 2 说明',
      defaultValue: 0,
    },
    // 示例：布尔参数
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      defaultValue: false,
    },
    // 示例：颜色参数
    color: {
      control: 'color',
      description: '颜色',
      defaultValue: '#000000',
    },
    // 示例：下拉选择
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '尺寸',
      defaultValue: 'medium',
    },
  },
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

// 默认故事
export const Default: Story = {
  args: {
    prop1: 'Hello',
    prop2: 42,
  },
}

// 自定义故事
export const WithCustomProps: Story = {
  args: {
    prop1: 'Custom Value',
    prop2: 100,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '这是一个自定义故事，展示特定参数组合下的组件效果',
      },
    },
  },
}

// 禁用状态
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

// 加载状态
export const Loading: Story = {
  args: {
    loading: true,
  },
}
```

---

## 带装饰器的模板

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within } from '@storybook/test'
import ComponentName from './index.vue'

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  // 组件级别的装饰器
  decorators: [
    () => ({
      template: '<div style="border: 1px solid #ddd; padding: 16px;"><story/></div>',
    }),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

// 带交互测试的故事
export const Interactive: Story = {
  args: {
    text: 'Click me',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Click button', async () => {
      const button = canvas.getByRole('button')
      await userEvent.click(button)
    })
  },
}
```

---

## 使用 Pinia Store 的模板

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { provideStore } from '@/hooks/useStore'
import ComponentName from './index.vue'

const meta = {
  title: 'Business/ComponentWithStore',
  component: ComponentName,
  tags: ['autodocs'],
  decorators: [
    () => ({
      setup() {
        // 提供 Store 实例
        const store = useStore()
        provideStore(store)
        return { store }
      },
      template: '<story/>',
    }),
  ],
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const WithStore: Story = {
  args: {},
}
```

---

## 参数说明

### control 类型参考

| 类型 | 用途 | 配置项 |
|------|------|--------|
| `text` | 文本输入 | - |
| `number` | 数字输入 | `min`, `max`, `step` |
| `boolean` | 开关 | - |
| `color` | 颜色选择 | - |
| `select` | 下拉选择 | `options` |
| `radio` | 单选 | `options` |
| `object` | JSON 对象 | - |
| `date` | 日期选择 | - |

### tags 参考

| 标签 | 用途 |
|------|------|
| `'autodocs'` | 自动生成文档 |
| `'!autodocs'` | 排除出自动文档 |

### layout 选项

| 值 | 说明 |
|------|------|
| `'centered'` | 居中布局 |
| `'fullscreen'` | 全屏布局 |
| `'padded'` | 带内边距 |
| `'none'` | 无布局样式 |
