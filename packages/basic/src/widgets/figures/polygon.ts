import type { CanvasKit } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'
import type { PathOptions, PathStyle } from './path.ts'
import { Path } from './path.ts'

export interface PolygonOptions extends PathOptions {
  style?: PolygonStyle
}

export interface PolygonStyle extends PathStyle {}

export class Polygon extends Path {
  constructor(public points: Vector2[], options?: PolygonOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.path.addPoly(this.points.flat(), true)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    super.predraw(ck, propertyChanged)

    switch (propertyChanged) {
      case 'points': {
        this.path.moveTo(0, 0)
        for (const [index, point] of this.points.entries()) {
          if (index === 0)
            this.path.moveTo(...point)
          else this.path.lineTo(...point)
        }
        this.path.close()
        break
      }
    }
  }
}
