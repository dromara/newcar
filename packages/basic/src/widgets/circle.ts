import { changed, def, defineWidgetBuilder } from '@newcar/core'
import type { Arc, ArcOptions } from './arc'
import { createArc } from './arc'

export interface Circle extends Arc {}

export function createCircle(radius: number, options?: ArcOptions) {
  return defineWidgetBuilder((ck) => {
    options ??= {}
    options.style ??= {}
    const arc = createArc(radius, 0, 360, options)(ck)
    const radiusProp = def(radius)

    changed(radiusProp, (v) => {
      arc.radius.value = v.value
    })

    return {
      ...arc,
      radius: radiusProp,
    }
  })
}
