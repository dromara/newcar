import type { Canvas, CanvasKit, RRect } from 'canvaskit-wasm'
import type { ConvertToProp } from '@newcar/core'
import { changed, ref } from '@newcar/core'
import { deepMerge } from '@newcar/utils'
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
  declare style: ConvertToProp<RectStyle>
  rect: RRect
  radius: [number, number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0, 0]

  constructor(public width: number, public height: number, options?: RectOptions) {
    options ??= {}
    super(options)
    this.style ??= {}
    this.style.radius = ref(options.style?.radius ?? 0)
    this.mapRadius()
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.rect = new Float32Array([
      -this.width / 2,
      -this.height / 2,
      this.width * this.progress.value - this.width / 2,
      this.height * this.progress.value - this.height / 2,
      ...this.radius,
    ])

    this.path.addRRect(this.rect)

    changed(this.style.radius, (_) => {
      this.mapRadius()
    })
  }

  draw(canvas: Canvas): void {
    this.path.rewind()

    this.rect = new Float32Array([
      0,
      0,
      this.width * this.progress.value,
      this.height * this.progress.value,
      ...this.radius,
    ])

    this.path.addRRect(this.rect)

    super.draw(canvas)
  }

  static fromLTRB(l: number, t: number, r: number, b: number, options?: RectOptions) {
    return new Rect(r - l, b - t, {
      ...options,
    })
  }

  static fromWH(w: number, h: number, options?: RectOptions) {
    return new Rect(w, h, deepMerge(
      options,
      {
        x: w / 2,
        y: h / 2,
      },
    ))
  }

  mapRadius() {
    if (typeof this.style.radius.value === 'number') {
      this.radius.fill(this.style.radius.value, 0, 8)
    }
    else if (this.style.radius.value.length === 2) {
      this.radius.fill(this.style.radius.value[0], 0, 4)
        .fill(this.style.radius.value[1], 4, 8)
    }
    else if (this.style.radius.value.length === 4) {
      this.radius.fill(this.style.radius.value[0], 0, 2)
        .fill(this.style.radius.value[1], 2, 4)
        .fill(this.style.radius.value[2], 4, 6)
        .fill(this.style.radius.value[3], 6, 8)
    }
    else {
      this.radius = this.style.radius.value
    }
  }
}
