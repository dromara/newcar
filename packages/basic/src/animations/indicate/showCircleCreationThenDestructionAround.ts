import { withHook } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Figure } from '../../widgets'
import { Circle } from '../../widgets'

/**
 * Create a rectangle that grows and shrinks around the center of the widget
 * and then destroys itself.
 */
// eslint-disable-next-line antfu/top-level-function
export const showCircleCreationThenDestructionAround = () => {
  let circle: Circle
  let c: number

  return withHook<Figure, { color?: Color, width?: number }>({
    animate({ process }) {
      circle.show()
      if (process < 0.5) {
        circle.style.interval.value = [c * process * 2, c - c * process * 2]
      }
      else if (process > 0.5) {
        circle.style.interval.value = [c * (1 - process) * 2, c - c * (1 - process) * 2]
      }
    },

    before({ widget, color, width }) {
      circle = new Circle(Math.sqrt(((widget.singleRange[2] - widget.singleRange[0]) / 2) ** 2
      + ((widget.singleRange[3] - widget.singleRange[1]) / 2) ** 2), {
        x: (widget.singleRange[2] - widget.singleRange[0]) / 2,
        y: (widget.singleRange[3] - widget.singleRange[1]) / 2,
        style: {
          fill: false,
          border: true,
          borderColor: color ?? Color.WHITE,
          borderWidth: width ?? 2,
        },
      })
      c = Math.abs(widget.range[2] - widget.range[0] + 10) * 2
      + Math.abs(widget.range[3] - widget.range[1] + 10) * 2
      circle.hide()
      widget.add(circle)
    },

    after() {
      circle.remove()
    },
  })
}
