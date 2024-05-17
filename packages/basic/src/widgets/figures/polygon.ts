import type { Canvas, CanvasKit, Path as ckPath } from 'canvaskit-wasm'
import { str2BlendMode, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
import type { WidgetRange } from '@newcar/core'
import { $ck } from '@newcar/core'
import type { Vector2 } from '../../utils/vector2'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'

export interface PolygonOptions extends FigureOptions {
  style?: FigureStyle
}

export interface PolygonStyle extends FigureStyle {}

export class Polygon extends Figure {
  path: ckPath = new $ck.Path()

  constructor(public points: Vector2[], options?: PolygonOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    this.path.addPoly(this.points.flat(), true)
    // Stroke
    this.strokePaint = new ck.Paint()
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
    this.strokePaint.setStrokeWidth(this.style.borderWidth)
    this.strokePaint.setStrokeJoin(str2StrokeJoin(ck, this.style.join))
    this.strokePaint.setStrokeCap(str2StrokeCap(ck, this.style.cap))
    this.strokePaint.setAntiAlias(this.style.antiAlias)
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
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)

    // Alpha
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))

    this.fillPaint.setAntiAlias(this.style.antiAlias)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'points': {
        this.path.moveTo(0, 0)
        for (const [index, point] of this.points.entries()) {
          if (index === 0)
            this.path.moveTo(...point)
          else this.path.lineTo(...point)
        }
        this.path.close()
        break
      }
      case 'style.borderColor': {
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        break
      }
      case 'style.borderShader': {
        this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
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
      case 'style.fillShader': {
        this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
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
        break
      }
      case 'style.blendMode': {
        // Blend Mode
        this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
        this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
      }
    }
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)
  }

  draw(canvas: Canvas): void {
    if (this.style.border)
      canvas.drawPath(this.path, this.strokePaint)

    if (this.style.fill)
      canvas.drawPath(this.path, this.fillPaint)
  }

  /**
   * p :[x,y] ,带判定的P点
   * this.points: [[x0,y0],[x1,y1]......] 多边形的路径
   */
  isIn(x: number, y: number) {
    const { x: dx, y: dy } = this.transformedPoint(x, y)
    return super.isIn(x, y) || this.path.contains(dx, dy)
  }

  get range(): WidgetRange {
    return [
      this.x,
      this.y,
      Math.max(...this.points.map(point => point[0])),
      Math.max(...this.points.map(point => point[1])),
    ]
  }
}
