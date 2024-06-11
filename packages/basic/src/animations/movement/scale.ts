import type { Widget } from '@newcar/core'
import { changeProperty } from '@newcar/core'

/**
 * Scale the widget
 */
export const scale = changeProperty<Widget>(w => [w.style.scaleX, w.style.scaleY])
