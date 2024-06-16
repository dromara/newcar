import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { ConvertToProp, Ref } from '@newcar/core'
import { changed, ref } from '@newcar/core'
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
  from: Ref<[number, number]>
  to: Ref<[number, number]>
  constructor(from: Vector2, to: Vector2, options?: LineOptions) {
    options ??= {}
    super({
      ...options,
      style: {
        border: true,
        ...options.style,
        borderWidth: options.style?.width ?? 2,
      },
    })
    this.from = ref(from)
    this.to = ref(to)
    options.style ??= {}
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.path.moveTo(this.from.value[0], this.from.value[1])
    this.path.lineTo(this.to.value[0], this.to.value[1])

    changed(this.style.width, (width) => {
      this.style.borderWidth.value = width.value
    })
    changed(this.from, (from) => {
      this.path.rewind()
      this.path.moveTo(from.value[0], from.value[1])
      this.path.lineTo(this.to.value[0], this.to.value[1])
    })
    changed(this.to, (to) => {
      this.path.rewind()
      this.path.moveTo(this.from.value[0], this.from.value[1])
      this.path.lineTo(to.value[0], to.value[1])
    })
  }

  draw(canvas: Canvas): void {
    this.path.rewind()
    this.path.moveTo(this.from.value[0], this.from.value[1])
    this.path.lineTo(
      this.from.value[0] + (this.to.value[0] - this.from.value[0]) * this.progress.value,
      this.from.value[1] + (this.to.value[1] - this.from.value[1]) * this.progress.value,
    )

    super.draw(canvas)
  }
}
