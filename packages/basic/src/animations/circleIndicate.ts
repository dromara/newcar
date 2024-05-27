import { changeProperty, changeStyle, defineAnimation } from '@newcar/core'
import { Circle } from '../widgets'
import { scale } from './scale'
import { fadeIn } from './fadeIn'
import { fadeOut } from './fadeOut'

export const circleIndicate = defineAnimation({
  act(_widget, _elapsed, _process, _duration, _ck, _params) {

  },

  init(widget, startAt, duration, _ck, params: {
    scale: number
  }) {
    this.circle = new Circle(
      Math.sqrt(((widget.range[2] - widget.range[0]) / 2) ** 2
      + ((widget.range[3] - widget.range[1]) / 2) ** 2)
      + 10,
      {
        style: {
          fill: false,
          border: true,
        },
      },
    )
    this.circle.animate(
      fadeIn,
      startAt,
      duration / 2,
    )
    this.circle.animate(
      fadeOut,
      startAt + duration / 2,
      duration / 2,
    )
    if (params.scale) {
      this.circle.animate(
        scale,
        startAt,
        duration,
        {
          from: [params.scale, params.scale],
          to: [1, 1],
          by: (x: number) => (2 * (x - 0.5)) ** 2,
        },
      )
    }
    widget.add(this.circle)
  },
})
