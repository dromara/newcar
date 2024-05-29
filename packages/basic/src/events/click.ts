import { Widget, defineEvent } from '@newcar/core'

export const click = defineEvent({
  operation(
    widget,
    effect: (widget: Widget, x: number, y: number) => any,
    element,
  ) {
    element.addEventListener('click', (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const absoluteX = event.clientX - rect.left
      const absoluteY = event.clientY - rect.top
      const { x, y } = Widget.absoluteToRelative(widget, absoluteX, absoluteY)
      const { x: pX, y: pY } = widget.coordinateChildToParent(x, y)
      const isIn = widget.isIn(pX, pY)
      if (isIn)
        effect(widget, x, y)
      // console.log('www!')
    })
  },
})

// Engine -> App -> Scene -> Widget(root)
