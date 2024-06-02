import { defineWidgetBuilder } from '@newcar/core'
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

    return deepMerge(path, {
      from,
      to,
      radius,
    })
  })
}
