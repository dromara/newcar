import type { Widget } from '@newcar/core'
import { changeProperty } from '@newcar/core'

/**
 * Thw widget fades in
 */
export const fadeIn = changeProperty<Widget>(w => w.style.transparency)
  .withAttr({ from: 0, to: 1 })
