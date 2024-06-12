import type { CanvasKit } from 'canvaskit-wasm'
import type { Reactive } from '@newcar/core'
import { changed, reactive } from '@newcar/core'
import type { Vector2 } from '../utils/vector2.ts'
import type { PathOptions, PathStyle } from './path.ts'
import { Path } from './path.ts'

export interface PolygonOptions extends PathOptions {
  style?: PolygonStyle
}

export interface PolygonStyle extends PathStyle {}

export class Polygon extends Path {
  points: Reactive<Vector2[]>

  constructor(points: Vector2[], options?: PolygonOptions) {
    options ??= {}
    super(options)

    this.points = reactive(points)
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.path.addPoly(this.points.flat(), true)

    changed(this.points, (points) => {
      this.path.moveTo(0, 0)
      for (const [index, point] of points.entries()) {
        if (index === 0)
          this.path.moveTo(...point)
        else this.path.lineTo(...point)
      }
      this.path.close()
    })
  }
}
