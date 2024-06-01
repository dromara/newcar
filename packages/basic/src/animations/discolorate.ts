import { changeProperty, defineAnimation } from '@newcar/core'
import { type Color, getByChain } from '@newcar/utils'
import type { Figure } from '../widgets'

/**
 * Change the color.
 */
export const discolorate = defineAnimation<Figure>({
  init(widget, startAt, duration, _ck, params: {
    from?: Color
    to?: Color
    colorAttr?: string
  }) {
    const colorAttr: string = params.colorAttr ?? 'fillColor'
    const changedProps = [
      [`style`, colorAttr, `red`],
      [`style`, colorAttr, `green`],
      [`style`, colorAttr, `blue`],
      [`style`, colorAttr, `alpha`],
    ]
    widget.animate(changeProperty(changedProps.map(c => c.join('.'))), startAt, duration, {
      from: [
        params.from?.red ?? getByChain(changedProps[0], widget),
        params.from?.green ?? getByChain(changedProps[1], widget),
        params.from?.blue ?? getByChain(changedProps[2], widget),
        params.from?.alpha ?? getByChain(changedProps[3], widget),
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
