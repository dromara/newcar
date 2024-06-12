import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { ConvertToProp } from '@newcar/core'
import { changed } from '@newcar/core'
import type { Vector2 } from '../utils/vector2.ts'
import type { PathOptions, PathStyle } from './path.ts'
import { Path } from './path.ts'

export interface LineOptions extends PathOptions {
  style?: LineStyle
}

export interface LineStyle extends PathStyle {

  /**
   * The line width of this line.
   */
  width?: number
}

export class Line extends Path {
  declare style: ConvertToProp<LineStyle>

  constructor(public from: Vector2, public to: Vector2, options?: LineOptions) {
    options ??= {}
    super({
      ...options,
      style: {
        border: true,
        ...options.style,
        borderWidth: options.style?.width ?? 2,
      },
    })
    options.style ??= {}
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.path.moveTo(this.from[0], this.from[1])
    this.path.lineTo(this.to[0], this.to[1])

    changed(this.style.width, (width) => {
      this.style.borderWidth.value = width.value
    })
  }

  draw(canvas: Canvas): void {
    this.path.rewind()
    this.path.moveTo(this.from[0], this.from[1])
    this.path.lineTo(
      this.from[0] + (this.to[0] - this.from[0]) * this.progress.value,
      this.from[1] + (this.to[1] - this.from[1]) * this.progress.value,
    )

    super.draw(canvas)
  }
}
