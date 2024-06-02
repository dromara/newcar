import type { Prop } from '@newcar/core'
import { changed, def, defineWidgetBuilder } from '@newcar/core'
import { deepMerge } from '@newcar/utils'
import type { PathOptions, PathStyle } from './path'
import { createPath } from './path'

export interface ArcOptions extends PathOptions {
  style?: ArcStyle
}

export interface ArcStyle extends PathStyle { }

export function createArc(radius: number, from: number, to: number, options: ArcOptions) {
  return defineWidgetBuilder((ck) => {
    const path = createPath(options ?? {})(ck)
    const rect = ck.LTRBRect(
      -radius,
      -radius,
      radius,
      radius,
    )
    path.path.addArc(rect, from, to)

    const radiusProp = def(radius)
    const fromProp = def(from)
    const toProp = def(to)

    changed(radiusProp, (v: Prop<number>) => {
      rect.set([-v.value, -v.value, v.value, v.value])
    })
    changed(fromProp, (v: Prop<number>) => {
      path.path.reset()
      path.path.addArc(rect, v.value, toProp.value)
    })
    changed(toProp, (v: Prop<number>) => {
      path.path.reset()
      path.path.addArc(rect, fromProp.value, v.value)
    })

    return deepMerge(path, {
      from,
      to,
      radius,
    })
  })
}
