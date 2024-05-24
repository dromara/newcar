import { defineAnimation } from '@newcar/core'
import type { CanvasKit } from 'canvaskit-wasm'
import type { Figure } from '../widgets/figures/figure'
import type { TimingFunction } from '../easingFunctions'

/**
 * Stroke animation
 */
export const stroke = defineAnimation({
  act: (widget: Figure, elapsed: number, process: number, duration: number, ck: CanvasKit, params: {
    origin: number
    by: TimingFunction
  }) => {
    widget.style.interval = [(params.origin ?? 1000) * process, (params.origin ?? 1000) * (1 - process)]
  },
})
