import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'
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
  declare style: LineStyle

  constructor(public from: Vector2, public to: Vector2, options?: LineOptions) {
    options ??= {}
    super({
      style: {
        border: true,
        borderWidth: options.style.width ?? 2,
        ...options.style,
      },
      ...options,
    })
    options.style ??= {}
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.path.moveTo(this.from[0], this.from[1])
    this.path.lineTo(this.to[0], this.to[1])
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    super.predraw(ck, propertyChanged)
    switch (propertyChanged) {
      case 'style.width': {
        this.style.borderWidth = this.style.width
        break
      }
    }
  }

  draw(canvas: Canvas): void {
    this.path.rewind()
    this.path.moveTo(this.from[0], this.from[1])
    this.path.lineTo(
      this.from[0] + (this.to[0] - this.from[0]) * this.progress,
      this.from[1] + (this.to[1] - this.from[1]) * this.progress,
    )

    super.draw(canvas)
  }
}
