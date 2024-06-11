import type { Widget } from '@newcar/core'
import { changeProperty } from '@newcar/core'

/**
 * Move a widget object, which change its `x` and `y` attribute.
 */
export const move = changeProperty<Widget>(w => [w.x, w.y])
