import type { Canvas, CanvasKit, RRect } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'
import type { PathOptions, PathStyle } from './path.ts'
import { Path } from './path.ts'

export interface RectOptions extends PathOptions {
  style?: RectStyle
}

export interface RectStyle extends PathStyle {
  /**
   * The corner radius of the rectangle.
   * @default 0
   * @description
   * The corner radius can be a single number, in which case all corners will have the same radius.
   * It can also be an array of 2 numbers, in which case the first number will be the radius of the top-left and top-right corners, and the second number will be the radius of the bottom-left and bottom-right corners.
   * It can also be an array of 4 numbers, in which case the first number will be the radius of the top-left corner, the second number will be the radius of the top-right corner, the third number will be the radius of the bottom-right corner, and the fourth number will be the radius of the bottom-left corner.
   * It can also be an array of 8 numbers, in which case in order, the numbers will be radiusX, radiusY for upper-left, upper-right, lower-right, lower-left.
   */
  radius?: number
  | [number, number]
  | [number, number, number, number]
  | [number, number, number, number, number, number, number, number]
}

export class Rect extends Path {
  declare style: RectStyle
  rect: RRect
  radius: [number, number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0, 0]

  constructor(public from: Vector2, public to: Vector2, options?: RectOptions) {
    options ??= {}
    super(options)
    this.style ??= {}
    this.style.radius = options.style?.radius ?? 0
    this.mapRadius()
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.rect = new Float32Array([
      this.from[0],
      this.from[1],
      this.to[0] * this.progress,
      this.to[1] * this.progress,
      ...this.radius,
    ])

    this.path.addRRect(this.rect)
  }

  draw(canvas: Canvas): void {
    this.path.rewind()

    this.rect = new Float32Array([
      this.from[0],
      this.from[1],
      this.to[0] * this.progress,
      this.to[1] * this.progress,
      ...this.radius,
    ])

    this.path.addRRect(this.rect)

    super.draw(canvas)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    super.predraw(ck, propertyChanged)
    switch (propertyChanged) {
      case 'style.radius': {
        this.mapRadius()
        break
      }
    }
  }

  mapRadius() {
    if (typeof this.style.radius === 'number') {
      this.radius.fill(this.style.radius, 0, 8)
    }
    else if (this.style.radius.length === 2) {
      this.radius.fill(this.style.radius[0], 0, 4)
        .fill(this.style.radius[1], 4, 8)
    }
    else if (this.style.radius.length === 4) {
      this.radius.fill(this.style.radius[0], 0, 2)
        .fill(this.style.radius[1], 2, 4)
        .fill(this.style.radius[2], 4, 6)
        .fill(this.style.radius[3], 6, 8)
    }
    else {
      this.radius = this.style.radius
    }
  }
}
