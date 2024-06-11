import { useAnimate } from '@newcar/core'
import type { Figure } from '../../widgets'
/**
 * Stroke animation
 */
export const stroke = useAnimate<Figure, { from: number, to: number }>((x) => {
  x.widget.style.interval[0] = (x.from ?? 1000) * x.process
  x.widget.style.interval[1] = (x.from ?? 1000) * (1 - x.process)
})
