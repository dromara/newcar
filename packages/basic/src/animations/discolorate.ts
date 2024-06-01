import { changeProperty, defineAnimation } from '@newcar/core'
import type { Color } from '@newcar/utils'
import type { Figure } from '../widgets'

/**
 * Change the color.
 */
export const discolorate = defineAnimation<Figure>({
  init(widget, startAt, duration, _ck, params: {
    from?: Color
    to?: Color
  }) {
    const changedProps = [
      'style.fillColor.red',
      'style.fillColor.green',
      'style.fillColor.blue',
      'style.fillColor.alpha',
    ]
    widget.animate(changeProperty(changedProps), startAt, duration, {
      from: [
        params.from?.red ?? widget.style.fillColor.red,
        params.from?.green ?? widget.style.fillColor.green,
        params.from?.blue ?? widget.style.fillColor.blue,
        params.from?.alpha ?? widget.style.fillColor.alpha,
      ],
      to: [
        params.to.red,
        params.to.green,
        params.to.blue,
        params.to.alpha,
      ],
    })
  },

  act(_widget, _elapsed, _process, _duration, _ck, _params) {

  },
})
