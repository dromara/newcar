import { withHook } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Widget } from '@newcar/core'
import { Rect } from '../../widgets'

/**
 * Show a line which pass around the widget.
 */
export function showPassingFlashAround() {
  let rect: Rect
  let c: number
  return withHook<Widget, { color?: Color, width?: number }>({
    animate({ by, process }) {
      rect.show()
      process = by ? by(process) : process
      rect.style.offset.value = c * process
      if (process < 0.5)
        rect.style.interval.value = [100 * process * 2, c - 100 * process * 2]
      else if (process > 0.5)
        rect.style.interval.value = [100 * (1 - process) * 2, c - 100 * (1 - process) * 2]
    },

    before({ widget, color, width }) {
      rect = new Rect(
        widget.singleRange[2] - widget.singleRange[0] + 20,
        widget.singleRange[3] - widget.singleRange[1] + 20,
        {
          x: -10,
          y: -10,
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
      widget.add(rect)
      rect.hide()
    },

    after() {
      rect.remove()
    },
  })
}
