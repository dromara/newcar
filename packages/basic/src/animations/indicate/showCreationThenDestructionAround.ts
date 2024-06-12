import { withHook } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Figure } from '../../widgets'
import { Rect } from '../../widgets'

/**
 * Create a rectangle that grows and shrinks around the center of the widget
 * and then destroys itself.
 */
// eslint-disable-next-line antfu/top-level-function
export const showCreationThenDestructionAround = () => {
  let rect: Rect
  let c: number

  return withHook<Figure, { color?: Color, width?: number }>({
    animate({ process }) {
      rect.show()
      if (process < 0.5) {
        rect.style.interval.value = [c * process * 2, c - c * process * 2]
      }
      else if (process > 0.5) {
        rect.style.interval.value = [c * (1 - process) * 2, c - c * (1 - process) * 2]
      }
    },

    before({ widget, color, width }) {
      rect = new Rect(Math.abs(widget.range[2] - widget.range[0]) + 20, Math.abs(widget.range[3] - widget.range[1]) + 20, {
        x: widget.coordinateParentToChild(widget.range[0], widget.range[1]).x - 10,
        y: widget.coordinateParentToChild(widget.range[0], widget.range[1]).y - 10,
        style: {
          fill: false,
          border: true,
          borderColor: color ?? Color.WHITE,
          borderWidth: width ?? 2,
        },
      })
      c = Math.abs(widget.range[2] - widget.range[0] + 10) * 2
      + Math.abs(widget.range[3] - widget.range[1] + 10) * 2
      rect.hide()
      widget.add(rect)
    },

    after() {
      rect.remove()
    },
  })
}
