import type { Widget } from '@newcar/core'
import { changeProperty } from '@newcar/core'

/**
 * The widget fades out
 */
export const fadeOut = changeProperty<Widget>(w => w.style.transparency)
  .withAttr({ from: 1, to: 0 })
