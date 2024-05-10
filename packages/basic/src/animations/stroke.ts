import { defineAnimation } from '@newcar/core'
import type { Figure } from '../widgets/figures/figure'

/**
 * Stroke animation
 */
export const stroke = defineAnimation({
  act: (widget: Figure, elapsed: number, process: number, params: {
    origin: number
  }) => {
    widget.style.interval = [params.origin ?? 1000 * process, params.origin ?? 1000 * (1 - process)]
  },
})
