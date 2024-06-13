import type { Widget } from '@newcar/core'
import { changeProperty } from '@newcar/core'

/**
 * The widget fades out
 */
export function fadeOut() {
  return changeProperty<Widget>(w => w.style.transparency)
    .withAttr({ from: 1, to: 0 })
}
