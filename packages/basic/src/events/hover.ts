import { Widget, defineEvent } from "@newcar/core"

export const hover = defineEvent({
  operation(widget, effect, element) {
    element.addEventListener('mouseover', (event: MouseEvent) => {
      // 获取元素的位置和大小信息
      const rect = element.getBoundingClientRect()
      // 计算鼠标相对于元素的绝对坐标
      const absoluteX = event.clientX - rect.left
      const absoluteY = event.clientY - rect.top
      // 将绝对坐标转换为相对坐标
      const { x, y } = Widget.absoluteToRelative(widget, absoluteX, absoluteY)
      // 触发效果
      effect(widget, x, y)
    })
  }
})