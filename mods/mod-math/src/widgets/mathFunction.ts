import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import type { Shader } from '@newcar/utils'
import { Color } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'
import type { Domain } from '../utils/domain'
import type { Range } from '../utils/range'

export interface MathFunctionOptions extends WidgetOptions {
  divisionY?: number
  divisionX?: number
  lineWidth?: number
  style?: MathFunctionStyle
  numberRange?: Range
}

export interface MathFunctionStyle extends WidgetStyle {
  color?: Color
  shader?: Shader
  width?: number
}

export class MathFunction extends Widget {
  declare style: MathFunctionStyle
  private path: Path
  private paint: Paint
  numberRange: Range
  lineWidth: number
  divisionX: number
  divisionY: number

  constructor(
    public fn: (x: number) => number,
    public domain: Domain,
    options?: MathFunctionOptions,
  ) {
    options ??= {}
    super(options)
    this.numberRange = options.numberRange ?? [
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ]
    this.divisionX = options.divisionX ?? 50
    this.divisionY = options.divisionY ?? 50
    options.style ??= {}
    this.style.width = options.style.width ?? 2
    this.style.color = options.style.color ?? Color.WHITE
    this.style.shader = options.style.shader
  }

  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.paint.setColor(this.style.color!.toFloat4())
    this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
    this.paint.setStyle(ck.PaintStyle.Stroke)
    this.paint.setStrokeWidth((this.style.width! / this.divisionX) * 2)
    this.path = new ck.Path()
    this.path.moveTo(this.domain[0], this.fn(this.domain[0]))
    for (
      let x = this.domain[0];
      x <= this.domain[0] + (this.domain[1] - this.domain[0]) * this.progress;
      x += 1 / this.divisionX
    ) {
      const value = this.fn(x)
      this.path.lineTo(x, value)
    }
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'fn':
      case 'divisionX':
      case 'divisionY':
      case 'lineWidth':
      case 'range':
      case 'domain': {
        this.path.reset()
        this.path.moveTo(this.domain[0], this.fn(this.domain[0]))
        for (
          let x = this.domain[0];
          x
          <= this.domain[0] + (this.domain[1] - this.domain[0]) * this.progress;
          x += 1 / this.divisionX
        ) {
          const value = this.fn(x)
          this.path.lineTo(x, value)
        }
        break
      }
      case 'style.width': {
        this.paint.setStrokeWidth((this.style.width! / this.divisionX) * 2)
        break
      }
      case 'style.color': {
        this.paint.setColor(this.style.color!.toFloat4())
        break
      }
      case 'style.shader': {
        this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
        break
      }
    }
  }

  draw(canvas: Canvas): void {
    canvas.scale(this.divisionX, this.divisionY)
    canvas.drawPath(this.path, this.paint)
  }

  isIn(x: number, y: number): boolean {
    const { x: dx, y: dy } = this.transformedPoint(x, y)
    return super.isIn(x, y) || this.path.contains(dx, dy)
  }
}
