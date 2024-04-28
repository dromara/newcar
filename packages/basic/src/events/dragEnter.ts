import { Widget, defineEvent } from '@newcar/core'

export const dragEnter = defineEvent({
  operation(widget, effect, element) {
    element.addEventListener('dragenter', (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const absoluteX = event.clientX - rect.left
      const absoluteY = event.clientY - rect.top
      const { x, y } = Widget.absoluteToRelative(widget, absoluteX, absoluteY)
      const isIn = widget.isIn(x, y)
      if (isIn)
        effect(widget, x, y)
    })
  },
})
