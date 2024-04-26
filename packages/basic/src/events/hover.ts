import { Widget, defineEvent } from '@newcar/core'

export const hover = defineEvent({
  operation(widget, effect, element) {
    element.addEventListener('mouseover', (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const absoluteX = event.clientX - rect.left
      const absoluteY = event.clientY - rect.top
      const { x, y } = Widget.absoluteToRelative(widget, absoluteX, absoluteY)
      effect(widget, x, y)
    })
  },
})
