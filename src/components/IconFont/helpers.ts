/**
 * IconFont 组件的工具函数
 */

/**
 * 生成图标的类名
 * @param props 组件 props
 * @returns 类名数组
 */
export function getClassNames(props: {
  verticalCenter?: boolean
  cursor?: boolean
  disabled?: boolean
}): string[] {
  const className: string[] = []

  if (props.verticalCenter) {
    className.push('middle')
  }
  if (props.cursor) {
    className.push('cursor')
  }
  if (props.disabled) {
    className.push('disabled')
  }

  return className
}

/**
 * 获取 SVG 属性
 * @param shadow 是否启用阴影
 * @returns SVG 属性对象
 */
export function getSvgAttrs(shadow?: boolean): Record<string, string> {
  const attrs: Record<string, string> = {}

  if (shadow) {
    attrs.filter = 'url(#drop-shadow)'
  }

  return attrs
}
