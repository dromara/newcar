import { timeline, withHook } from '@newcar/core'
import type { Figure } from '../../widgets'
import { Circle } from '../../widgets'
import { fadeIn, fadeOut, scale } from '../'

/**
 * Show a circle and then it hides
 * Input a `scale` value, it will scale from around and ripple outward.
 */
export function circleIndicate() {
  let circle: Circle
  return withHook<Figure, { scale?: number }>({
    animate() {
      circle.show()
    },

    before({ widget, duration, scale: scaleV }) {
      circle = new Circle(
        Math.sqrt(((widget.singleRange[2] - widget.singleRange[0]) / 2) ** 2
        + ((widget.singleRange[3] - widget.singleRange[1]) / 2) ** 2),
        {
          style: {
            fill: false,
            border: true,
          },
          x: (widget.singleRange[2] - widget.singleRange[0]) / 2,
          y: (widget.singleRange[3] - widget.singleRange[1]) / 2,
        },
      )
      circle.animate(fadeIn.withAttr({ duration: duration / 2 - duration / 6 }))
      circle.animate(timeline(
        [0, duration / 2 - duration / 6, fadeIn],
        [duration / 2 + duration / 3, duration / 2 - duration / 6, fadeOut],
      ))
      if (scaleV) {
        circle.animate(timeline(
          [0, duration / 2 - duration / 6, scale.withAttr({
            from: [scaleV, scaleV],
            to: [1, 1],
          })],
          [duration / 2 + duration / 3, duration / 2 - duration / 6, scale.withAttr({
            to: [scaleV, scaleV],
            by: p => 1 - p,
          })],
        ))
      }
      circle.hide()
      widget.add(circle)
    },
  })
}
