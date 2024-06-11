import { changeProperty } from '@newcar/core'

/**
 * Scale from 0 to 1
 */
export const roomIn = changeProperty(w => [w.style.scaleX, w.style.scaleY])
  .withAttr({
    from: [0, 0],
    to: [1, 1],
  })
