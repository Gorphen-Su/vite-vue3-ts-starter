import type { Meta, StoryObj } from '@storybook/vue3-vite'
import IconFont from './index.vue'

const meta = {
  title: 'Components/IconFont',
  component: IconFont,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: '图标名称（必填），可用值：iconadd, iconedit, iconsearch, iconset, iconuser-2 等',
      defaultValue: ''
    },
    shadow: {
      control: 'boolean',
      description: '是否添加阴影效果',
      defaultValue: false
    },
    verticalCenter: {
      control: 'boolean',
      description: '是否垂直居中',
      defaultValue: false
    },
    cursor: {
      control: 'boolean',
      description: '是否显示鼠标指针为手型',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      defaultValue: false
    }
  },
  args: {
    icon: 'iconadd'
  }
} satisfies Meta<typeof IconFont>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 默认用法：展示基础图标（使用 iconadd）
 */
export const Default: Story = {
  args: {
    icon: 'iconadd'
  }
}

/**
 * 带阴影效果的图标（使用 iconset）
 */
export const WithShadow: Story = {
  args: {
    icon: 'iconset',
    shadow: true
  }
}

/**
 * 垂直居中的图标（使用 iconuser-2）
 */
export const VerticalCenter: Story = {
  args: {
    icon: 'iconuser-2',
    verticalCenter: true
  }
}

/**
 * 可点击的图标（带手型指针，使用 iconsearch）
 */
export const Clickable: Story = {
  args: {
    icon: 'iconsearch',
    cursor: true,
    verticalCenter: true
  }
}

/**
 * 禁用状态的图标（使用 iconedit）
 */
export const Disabled: Story = {
  args: {
    icon: 'iconedit',
    disabled: true
  }
}
