import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import type { Shader } from '@newcar/utils'
import { Color, str2BlendMode } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'

export interface LineOptions extends WidgetOptions {
  style?: LineStyle
}

export interface LineStyle extends WidgetStyle {
  color?: Color
  shader?: Shader
  width?: number
}

export class Line extends Figure {
  paint: Paint
  declare style: LineStyle

  constructor(public from: Vector2, public to: Vector2, options?: LineOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.color = options.style.color ?? Color.WHITE
    this.style.shader = options.style.shader
    this.style.width = options.style.width ?? 2
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.paint.setStyle(ck.PaintStyle.Stroke)
    this.paint.setColor(this.style.color.toFloat4())
    this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
    this.paint.setStrokeWidth(this.style.width)
    this.paint.setAlphaf(this.style.transparency * this.style.color.alpha)
    this.paint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.paint.setAntiAlias(this.style.antiAlias)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'style.color': {
        this.paint.setColor(this.style.color.toFloat4())
        break
      }
      case 'style.shader': {
        this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
        break
      }
      case 'style.width': {
        this.paint.setStrokeWidth(this.style.width)
        break
      }
      case 'style.blendMode': {
        // Blend Mode
        this.paint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
        break
      }
    }
    this.paint.setAlphaf(this.style.transparency * this.style.color.alpha)
  }

  draw(canvas: Canvas): void {
    canvas.drawLine(
      this.from[0],
      this.from[1],
      this.from[0] + (this.to[0] - this.from[0]) * this.progress,
      this.from[1] + (this.to[1] - this.from[1]) * this.progress,
      this.paint,
    )
  }

  isIn(x: number, y: number): boolean {
    const slope = (this.to[1] - this.from[1]) / (this.to[0] - this.from[0])
    const yIntercept = this.from[1] - slope * this.from[0]
    const expectedY = slope * x + yIntercept
    return Math.abs(y - expectedY) < Number.EPSILON
  }
}
