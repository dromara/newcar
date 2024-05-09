import { changeProperty } from '@newcar/core'

/**
 * Destroy animation
 * Which makes the progress from 1 to 0.
 */
export const destroy = changeProperty('progress', 1, 0)
