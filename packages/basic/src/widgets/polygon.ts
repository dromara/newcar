import { changed, def, defineWidgetBuilder } from '@newcar/core'
import { deepMerge } from '@newcar/utils'
import type { Vector2 } from '../utils/vector2'
import { type PathOptions, type PathStyle, createPath } from './path'

export interface PolygonOptions extends PathOptions {
  style?: PolygonStyle
}

export interface PolygonStyle extends PathStyle {}

export function createPolygon(points: Vector2[], options?: PolygonOptions) {
  return defineWidgetBuilder((ck) => {
    const path = createPath(options)(ck)
    const pointsProp = points.map(point => def(point))
    let index = 0

    function reset(points: Vector2[]) {
      path.path.reset()
      for (const point of points) {
        if (index === 0)
          path.path.moveTo(...point)
        else
          path.path.lineTo(...point)
        index += 1
      }
    }

    for (const point of pointsProp) {
      changed(point, _v => reset(pointsProp.map(p => p.value)))
    }

    reset(pointsProp.map(p => p.value))

    return deepMerge(path, {
      points: pointsProp,
    })
  })
}
