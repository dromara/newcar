import type { Widget } from '@newcar/core'
import { changeProperty } from '@newcar/core'

/**
 * Rotate the widget
 */
export const rotate = () => changeProperty<Widget>(w => w.style.rotation)
