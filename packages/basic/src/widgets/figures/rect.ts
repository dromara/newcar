import type { Canvas, CanvasKit, Paint, RRect } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'
import { Figure, FigureOptions, FigureStyle } from './figure'
import { str2StrokeCap, str2StrokeJoin } from '../../utils/trans'

export interface RectOptions extends FigureOptions {
  style?: RectStyle
}

export interface RectStyle extends FigureStyle {}

export class Rect extends Figure {
  declare style: RectStyle
  rect: RRect

  constructor(public from: Vector2, public to: Vector2, options?: RectOptions) {
    options ??= {}
    super(options)
    this.style ??= {} 
  }

  init(ck: CanvasKit): void {
    this.rect = ck.LTRBRect(this.from[0], this.from[1], this.to[0] * this.progress, this.to[1] * this.progress)
    this.strokePaint = new ck.Paint()
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setAlphaf(this.style.transparency)
    this.strokePaint.setStrokeWidth(this.style.borderWidth)
    this.strokePaint.setStrokeJoin(str2StrokeJoin(ck, this.style.join))
    this.strokePaint.setStrokeCap(str2StrokeCap(ck, this.style.cap))
    try {
      const dash = ck.PathEffect.MakeDash(
        this.style.interval,
        this.style.offset,
      )
      this.strokePaint.setPathEffect(dash)
    } catch {}
    this.fillPaint = new ck.Paint()
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setAlphaf(this.style.transparency)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
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
      case 'style.borderColor': {
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        break
      }
      case 'style.borderWidth': {
        this.strokePaint.setStrokeWidth(this.style.borderWidth)
        break
      }
      case 'style.fillColor': {
        this.fillPaint.setColor(this.style.fillColor.toFloat4())
        break
      }
      case 'style.join': {
        this.strokePaint.setStrokeJoin(str2StrokeJoin(ck, this.style.join))
        break
      }
      case 'style.cap': {
        this.strokePaint.setStrokeCap(str2StrokeCap(ck, this.style.cap))
        break
      }
      case 'style.offset':
      case 'style.interval': {
        this.strokePaint.setPathEffect(
          ck.PathEffect.MakeDash(this.style.interval, this.style.offset),
        )
      }
    }
    this.strokePaint.setAlphaf(this.style.transparency)
    this.fillPaint.setAlphaf(this.style.transparency)
  }

  draw(canvas: Canvas): void {
    if (this.style.border) {
      canvas.drawRect(this.rect, this.strokePaint)
    }
    if (this.style.fill) {
      canvas.drawRect(this.rect, this.fillPaint)
    }
  }
}
