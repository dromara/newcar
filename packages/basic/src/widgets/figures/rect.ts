import type { Canvas, CanvasKit, RRect } from 'canvaskit-wasm'
import { $ck } from '@newcar/core'
import type { Vector2 } from '../../utils/vector2'
import type { PathOptions, PathStyle } from './path.ts'
import { Path } from './path.ts'

export interface RectOptions extends PathOptions {
  style?: RectStyle
}

export interface RectStyle extends PathStyle {}

export class Rect extends Path {
  declare style: RectStyle
  rect: RRect

  constructor(public from: Vector2, public to: Vector2, options?: RectOptions) {
    options ??= {}
    super(options)
    this.style ??= {}
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.rect = ck.LTRBRect(
      this.from[0],
      this.from[1],
      this.to[0] * this.progress,
      this.to[1] * this.progress,
    )

    this.path.addRRect(this.rect)
  }

  draw(canvas: Canvas): void {
    this.path.rewind()

    this.rect = $ck.LTRBRect(
      this.from[0],
      this.from[1],
      this.to[0] * this.progress,
      this.to[1] * this.progress,
    )

    this.path.addRRect(this.rect)

    super.draw(canvas)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    super.predraw(ck, propertyChanged)
    switch (propertyChanged) {
      case 'from' || 'to': {
        this.rect.set([
          this.from[0],
          this.from[1],
          this.to[0] * this.progress,
          this.to[1] * this.progress,
        ])
        break
      }
    }
  }
}
