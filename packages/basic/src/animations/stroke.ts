import { defineAnimation } from '@newcar/core'
import type { Figure } from '../widgets/figures/figure'

export const stroke = defineAnimation({
  act: (widget: Figure, elapsed: number, process: number) => {
    widget.style.interval = [1000 * process, 1000 * (1 - process)]
  },
})
