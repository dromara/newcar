import { def, defineWidgetBuilder } from '@newcar/core'
import { deepMerge } from '@newcar/utils'
import type { Arc, ArcOptions } from './arc'
import { createArc } from './arc'

export interface Circle extends Arc {}

export function createCircle(radius: number, options?: ArcOptions) {
  return defineWidgetBuilder((ck) => {
    const arc = createArc(radius, 0, 360, options)(ck)
    const radiusProp = def(radius)

    return deepMerge(arc, {
      ...options,
      radius: radiusProp,
    })
  })
}
