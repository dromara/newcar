import { changeProperty } from '@newcar/core'

/**
 * Scale from 1 to 0
 */
export const zoomOut = changeProperty(w => [w.style.scaleX, w.style.scaleY])
  .withAttr({
    from: [1, 1],
    to: [0, 0],
  })
