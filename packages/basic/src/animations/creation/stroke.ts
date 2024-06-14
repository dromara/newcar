import { useAnimate } from '@newcar/core'
import type { Figure } from '../../widgets'
/**
 * Stroke animation
 */
export function stroke() {
  return useAnimate<Figure, { from?: number }>((x) => {
    x.widget.style.interval.value = [(x.from ?? 1000) * x.process, (x.from ?? 1000) * (1 - x.process)]
  })
}
