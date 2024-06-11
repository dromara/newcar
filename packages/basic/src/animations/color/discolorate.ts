import { bind, changeProperty } from '@newcar/core'
import type { Figure } from '../../widgets/figures/figure'

/**
 * Change the color.
 */
export const discolorate = changeProperty<Figure>(w => [
  bind(w.style.fillColor, 'red'),
  bind(w.style.fillColor, 'green'),
  bind(w.style.fillColor, 'blue'),
  bind(w.style.fillColor, 'alpha'),
])
