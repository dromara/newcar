import type { Canvas, CanvasKit, RRect } from 'canvaskit-wasm'
import { str2BlendMode } from '@newcar/core'
import type { FigureOptions } from './figure'
import { Figure } from './figure'

export class Arc extends Figure {
  private rect: RRect

  constructor(
    public radius: number,
    public from: number,
    public to: number,
    options?: FigureOptions,
  ) {
    super(options)
  }

  init(ck: CanvasKit): void {
    // Stroke
    this.strokePaint = new ck.Paint()
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setStrokeWidth(this.style.borderWidth)
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)

    try {
      const dash = ck.PathEffect.MakeDash(
        this.style.interval,
        this.style.offset,
      )
      this.strokePaint.setPathEffect(dash)
    }
    catch {}

    // Fill
    this.fillPaint = new ck.Paint()
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))

    this.rect = ck.LTRBRect(
      -this.radius,
      -this.radius,
      this.radius,
      this.radius,
    )
  }

  predraw(ck: CanvasKit, propertyChanged?: string): void {
    switch (propertyChanged) {
      case 'radius': {
        this.rect.set([-this.radius, -this.radius, this.radius, this.radius])
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
      case 'style.offset':
      case 'style.interval': {
        this.strokePaint.setPathEffect(
          ck.PathEffect.MakeDash(this.style.interval, this.style.offset),
        )
        break
      }
      case 'style.blendMode': {
        // Blend Mode
        this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
        this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
        break
      }
    }
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)
  }

  draw(canvas: Canvas): void {
    if (this.style.border) {
      canvas.drawArc(
        this.rect,
        this.from,
        this.to * this.progress,
        false,
        this.strokePaint,
      )
    }
    if (this.style.fill) {
      canvas.drawArc(
        this.rect,
        this.from,
        this.to * this.progress,
        false,
        this.fillPaint,
      )
    }
  }

  isIn(x: number, y: number): boolean {
    const dx = x - this.x // x轴方向上的距离
    const dy = y - this.y // y轴方向上的距离
    const distance = Math.sqrt(dx * dx + dy * dy) // 与圆心的距离

    // 判断是否在圆内
    return distance <= this.radius
  }
}
