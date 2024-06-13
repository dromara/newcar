import { delay, parallel, sequence, withHook } from '@newcar/core'
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

    before({ widget, duration, scale: scaleV, by }) {
      circle = new Circle(
        Math.sqrt(((widget.singleRange[2] - widget.singleRange[0]) / 2) ** 2
        + ((widget.singleRange[3] - widget.singleRange[1]) / 2) ** 2),
        {
          style: {
            fill: false,
            border: true,
          },
          x: 0,
          y: 0,
        },
      )
      circle.animate(sequence(
        parallel(
          fadeIn().withAttr({
            duration: duration / 2 - duration / 3,
            by,
          }),
          scale().withAttr({
            from: [scaleV ?? 1.5, scaleV ?? 1.5],
            to: [1, 1],
            duration: duration / 2 - duration / 3,
            by,
          }),
        ),
        delay(2 / 3 * duration),
        parallel(
          fadeOut().withAttr({
            duration: duration / 2 - duration / 3,
            by,
          }),
          scale().withAttr({
            to: [scaleV ?? 1.5, scaleV ?? 1.5],
            from: [1, 1],
            duration: duration / 2 - duration / 3,
            by,
          }),
        ),
      ))
      circle.hide()
      widget.add(circle)
    },
  })
}
