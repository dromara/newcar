import { defineAnimation } from '@newcar/core'
import type { CanvasKit } from 'canvaskit-wasm'
import type { Figure } from '../widgets'
import type { TimingFunction } from '../easingFunctions'

/**
 * Stroke animation
 */
export const stroke = defineAnimation({
  init(widget: Figure, _startAt: number, _duration: number, _ck: CanvasKit, _params: {
    origin?: number
    by?: TimingFunction
  }) {
    this.originBorder = widget.style.border
    widget.style.border = true
  },

  act(widget: Figure, _elapsed: number, process: number, _duration: number, _ck: CanvasKit, params: {
    origin: number
    by: TimingFunction
  }) {
    process = params.by ? params.by(process) : process
    widget.style.interval = [(params.origin ?? 1000) * process, (params.origin ?? 1000) * (1 - process)]
  },

  after(widget: Figure, _elapsed: number, _ck: CanvasKit, _params: {
    origin: number
    by: TimingFunction
  }) {
    widget.style.border = this.originBorder
  },
})
