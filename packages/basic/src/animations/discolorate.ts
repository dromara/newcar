import { changeProperty, defineAnimation } from '@newcar/core'
import type { Color } from '@newcar/utils'
import type { Figure } from '../widgets'

export const discolorate = defineAnimation<Figure>({
  init(widget, startAt, duration, _ck, params: {
    from?: Color
    to?: Color
  }) {
    widget.animate(changeProperty('style.color.red'), startAt, duration, {
      from: params.from.red ?? widget.style.color.red,
      to: params.to.red,
    })
    widget.animate(changeProperty('style.color.green'), startAt, duration, {
      from: params.from.green ?? widget.style.color.green,
      to: params.to.green,
    })
    widget.animate(changeProperty('style.color.blue'), startAt, duration, {
      from: params.from.blue ?? widget.style.color.blue,
      to: params.to.blue,
    })
    widget.animate(changeProperty('style.color.alpha'), startAt, duration, {
      from: params.from.alpha ?? widget.style.color.alpha,
      to: params.to.alpha,
    })
  },

  act(_widget, _elapsed, _process, _duration, _ck, _params) {

  },
})
