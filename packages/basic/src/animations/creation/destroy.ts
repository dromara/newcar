import type { Widget } from '@newcar/core'
import { changeProperty } from '@newcar/core'

/**
 * Destroy animation
 * Which makes the progress from 1 to 0.
 */
export const destroy = changeProperty<Widget>(w => w.progress)
  .withAttr({ from: 1, to: 0 })
