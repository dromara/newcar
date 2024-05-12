import type { Canvas, CanvasKit, Path } from 'canvaskit-wasm'
import { str2BlendMode, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
import type { WidgetRange } from '@newcar/core'
import type { Vector2 } from '../../utils/vector2'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'

export interface PolygonOptions extends FigureOptions {
  style?: FigureStyle
}

export interface PolygonStyle extends FigureStyle {}

export class Polygon extends Figure {
  path: Path

  constructor(public points: Vector2[], options?: PolygonOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    this.path = new ck.Path()
    for (const [index, point] of this.points.entries()) {
      if (index === 0)
        this.path.moveTo(...point)
      else this.path.lineTo(...point)
    }
    this.path.close()
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
    // px，py为p点的x和y坐标
    const px = x
    const py = y
    let flag = false

    // 这个for循环是为了遍历多边形的每一个线段
    for (let i = 0, l = this.points.length, j = l - 1; i < l; j = i, i++) {
      const sx = this.points[i][0] // 线段起点x坐标
      const sy = this.points[i][1] // 线段起点y坐标
      const tx = this.points[j][0] // 线段终点x坐标
      const ty = this.points[j][1] // 线段终点y坐标

      // 点与多边形顶点重合
      if ((sx === px && sy === py) || (tx === px && ty === py))
        return true

      // 点的射线和多边形的一条边重合，并且点在边上
      if (
        sy === ty
        && sy === py
        && ((sx > px && tx < px) || (sx < px && tx > px))
      )
        return true

      // 判断线段两端点是否在射线两侧
      if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
        // 求射线和线段的交点x坐标，交点y坐标当然是py
        const x = sx + ((py - sy) * (tx - sx)) / (ty - sy)

        // 点在多边形的边上
        if (x === px)
          return true

        // x大于px来保证射线是朝右的，往一个方向射，假如射线穿过多边形的边界，flag取反一下
        if (x > px)
          flag = !flag
      }
    }

    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return !!flag
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
