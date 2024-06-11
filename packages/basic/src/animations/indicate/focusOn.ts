import { defineAnimation } from '@newcar/core'
import { Color } from '@newcar/utils'
import { Circle } from '../widgets'
import { scale } from './scale'

/**
 * Create a circle come from around.
 * Input a `origin` to set the radius of the circle.
 * The `origin`'s default value is `1000`.
 */
export const focusOn = defineAnimation({
  act(_widget, _elapsed, _process, _duration, _ck, _params) {},

  init(widget, startAt, duration, _ck, params) {
    widget.add(
      new Circle(params.origin ?? 1000, {
        style: {
          fillColor: params.color ?? Color.WHITE,
          transparency: params.transparency ?? 0.3,
        },
      }).animate(scale, startAt, duration, {
        from: [1, 1],
        to: [0, 0],
        by: params.by ?? ((x: number) => x),
      }),
    )
  },
})
