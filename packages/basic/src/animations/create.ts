import { changeProperty } from '@newcar/core'

/**
 * Create animation
 * It makes the progress props of widgets from 0 to 1
 */
export const create = changeProperty('progress', 0, 1)
