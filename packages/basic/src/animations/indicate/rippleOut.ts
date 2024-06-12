import { depend, sequence, withHook } from '@newcar/core'
import type { Widget } from '@newcar/core'
import { Color } from '@newcar/utils'
import { Circle } from '../../widgets'
import { scale } from '../../'

/**
 * Create a circle ripple from the center.
 * Input a `origin` to set the most ended radius of the circle.
 */
// eslint-disable-next-line antfu/top-level-function
export const rippleOut = () => {
  return withHook<Widget, { origin?: number, color?: Color, transparency?: number }>({
    animate() { },

    before({ widget, duration, origin, color, transparency, by }) {
      new Circle(origin ?? 1000, {
        style: {
          fillColor: color ?? Color.WHITE,
          transparency: transparency ?? 0.3,
        },
      }).animate(sequence(
        scale.withAttr({
          from: [1, 1],
          to: [0, 0],
          by: by ?? ((x: number) => x),
          duration,
        }),
        depend(c => () => {
          c.widget.display.value = false
          return true
        }),
      ))

      widget.add(
        new Circle(origin ?? 1000, {
          style: {
            fillColor: color ?? Color.WHITE,
            transparency: transparency ?? 0.3,
          },
        }).animate(sequence(
          scale.withAttr({
            from: [0, 0],
            to: [1, 1],
            by: by ?? ((x: number) => x),
            duration,
          }),
          depend(c => () => {
            c.widget.display.value = false
            return true
          }),
        )),
      )
    },
  })
}
