/**
 * IconFont 组件相关的类型定义
 */

/**
 * IconFont 组件的 Props 类型
 */
export interface IconFontProps {
  /** 图标名称 */
  icon: string
  /** 是否添加阴影效果 */
  shadow?: boolean
  /** 是否垂直居中 */
  verticalCenter?: boolean
  /** 是否显示鼠标指针为手型 */
  cursor?: boolean
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * IconFont 组件的 Emits 类型
 */
export interface IconFontEmits {
  /** 点击事件 */
  (e: 'click'): void
}
