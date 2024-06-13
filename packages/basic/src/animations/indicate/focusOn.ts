import type { Widget } from '@newcar/core'
import { withHook } from '@newcar/core'
import { Color } from '@newcar/utils'
import { Circle } from '../../widgets'
import { scale } from '../'

/**
 * Create a circle come from around.
 * Input a `origin` to set the radius of the circle.
 * The `origin`'s default value is `1000`.
 */
export function focusOn() {
  return withHook<Widget, { origin?: number, color?: Color, transparency?: number }>({
    animate() {},

    before({ widget, duration, origin, color, transparency, by }) {
      widget.add(
        new Circle(origin ?? 1000, {
          style: {
            fillColor: color ?? Color.WHITE,
            transparency: transparency ?? 0.3,
          },
        }).animate(scale().withAttr({
          from: [1, 1],
          to: [0, 0],
          duration,
          by: by ?? ((x: number) => x),
        })),
      )
    },
  })
}
