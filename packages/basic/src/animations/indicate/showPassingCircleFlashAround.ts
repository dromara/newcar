import { withHook } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Widget } from '@newcar/core'
import { Circle } from '../../widgets'

/**
 * Show a line which pass around the widget.
 */
export function showPassingCircleFlashAround() {
  let circle: Circle
  let c: number
  return withHook<Widget, { color?: Color, width?: number }>({
    animate({ by, process }) {
      circle.show()
      process = by ? by(process) : process
      circle.style.offset.value = c * process
      if (process < 0.5)
        circle.style.interval.value = [100 * process * 2, c - 100 * process * 2]
      else if (process > 0.5)
        circle.style.interval.value = [100 * (1 - process) * 2, c - 100 * (1 - process) * 2]
    },

    before({ widget, color, width }) {
      circle = new Circle(
        Math.sqrt(((widget.singleRange[2] - widget.singleRange[0]) / 2) ** 2
        + ((widget.singleRange[3] - widget.singleRange[1]) / 2) ** 2),
        {
          x: (widget.singleRange[2] - widget.singleRange[0]) / 2,
          y: (widget.singleRange[3] - widget.singleRange[1]) / 2,
          style: {
            fill: false,
            border: true,
            borderColor: color ?? Color.WHITE,
            borderWidth: width ?? 2,
          },
        },
      )
      c = Math.abs(widget.singleRange[2] - widget.singleRange[0] + 10) * 2
      + Math.abs(widget.singleRange[3] - widget.singleRange[1] + 10) * 2
      widget.add(circle)
      circle.hide()
    },

    after() {
      circle.remove()
    },
  })
}
