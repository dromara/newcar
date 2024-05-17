import type { Vector2 } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import type { Shader } from '@newcar/utils'
import { Color } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'

export interface BraceOptions extends WidgetOptions {
  style?: BraceStyle
}

export interface BraceStyle extends WidgetStyle {
  color?: Color
  shader?: Shader
}

export class Brace extends Widget {
  declare style: BraceStyle
  path: Path
  paint: Paint
  parts: Widget

  constructor(
    public from: Vector2,
    public to: Vector2,
    options?: BraceOptions,
  ) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.color = options.style.color ?? Color.WHITE
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.path = new ck.Path()
    this.paint.setStyle(ck.PaintStyle.Stroke)
    this.paint.setColor(this.style.color.toFloat4())
    this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
    this.paint.setAlphaf(this.style.transparency * this.style.color.alpha)
    this.paint.setStrokeWidth(3)
    const length = Math.sqrt((this.to[0] - this.from[0]) ** 2 + (this.to[1] - this.from[1]))

    this.path.moveTo(...this.from)
    this.path.lineTo(this.from[0] + 10, this.from[1] - 10)
    this.path.lineTo(this.from[0] + 10 + (length - 20) / 2, this.from[1] - 10)
    this.path.lineTo(this.from[0] + 20 + (length - 20) / 2, this.from[1] - 20)
    this.path.lineTo(this.from[0] + 30 + (length - 20) / 2, this.from[1] - 10)
    this.path.lineTo(this.from[0] + 30 + length - 20, this.from[1] - 10)
    this.path.lineTo(this.from[0] + 40 + length - 20, this.from[1])
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    // eslint-disable-next-line no-empty
    if (propertyChanged === 'length') {
    }
  }

  draw(canvas: Canvas): void {
    canvas.drawPath(this.path, this.paint)
  }

  isIn(x: number, y: number): boolean {
    const { x: dx, y: dy } = this.transformedPoint(x, y)
    return super.isIn(x, y) || this.path.contains(dx, dy)
  }
}
