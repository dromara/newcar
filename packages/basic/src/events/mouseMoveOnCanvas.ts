import { Widget, defineEvent } from '@newcar/core'

export const mouseMoveOnCanvas = defineEvent({
  operation(widget, effect, element) {
    element.addEventListener('mousemove', (event) => {
      const rect = element.getBoundingClientRect()
      const absoluteX = event.clientX - rect.left
      const absoluteY = event.clientY - rect.top
      const { x, y } = Widget.absoluteToRelative(widget, absoluteX, absoluteY)
      effect(widget, x, y)
      event.preventDefault()
    })
  },
})
