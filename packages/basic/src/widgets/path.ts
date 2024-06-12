import type { Canvas, CanvasKit, Path as ckPath } from 'canvaskit-wasm'
import type { WidgetRange } from '@newcar/core'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'

export interface PathOptions extends FigureOptions {
  style?: PathStyle
}

export interface PathStyle extends FigureStyle {}

export class Path extends Figure {
  path: ckPath
  pathData: Array<
    [0, string] // SVG
    | [1, ckPath, ckPath, any] // PathOp
    | [2, ckPath, ckPath, number] // PathInterpolation
  > = []

  constructor(options?: PathOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    super.init(ck)
    this.path = new ck.Path()

    this.pathData.forEach(([type, ...args]) => {
      switch (type) {
        case 0: {
          this.path.addPath(ck.Path.MakeFromSVGString(<string> args[0]))
          break
        }
        case 1: {
          this.path.addPath(ck.Path.MakeFromOp(<ckPath> args[0], args[1], args[2]))
          break
        }
        case 2: {
          this.path.addPath(ck.Path.MakeFromPathInterpolation(<ckPath> args[0], args[1], args[2]))
          break
        }
      }
    })
  }

  addPathFromSVGString(svg: string) {
    this.pathData.push([0, svg])

    return this
  }

  addPathFromOptions(one: ckPath, two: ckPath, options: any) {
    this.pathData.push([1, one, two, options])

    return this
  }

  addFromPathInterpolation(start: ckPath, end: ckPath, weight: number) {
    this.pathData.push([2, start, end, weight])

    return this
  }

  draw(canvas: Canvas): void {
    if (this.style.border.value)
      canvas.drawPath(this.path, this.strokePaint)

    if (this.style.fill.value)
      canvas.drawPath(this.path, this.fillPaint)
  }

  calculateIn(x: number, y: number): boolean {
    return this.path.contains(x, y)
  }

  calculateRange(): WidgetRange {
    const bounds = this.path.computeTightBounds()
    return [...bounds] as WidgetRange
  }
}
