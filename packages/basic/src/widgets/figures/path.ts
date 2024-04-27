import type { Canvas, CanvasKit, Path as ckPath } from 'canvaskit-wasm'
import { $ck } from '@newcar/core'
import { str2StrokeCap, str2StrokeJoin } from '../../../../core/src/utils/trans'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'

export interface PathOptions extends FigureOptions {
  style?: PathStyle
}

export interface PathStyle extends FigureStyle {}

export class Path extends Figure {
  path: ckPath = new $ck.Path()

  constructor(options?: PathOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
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
      case 'path': {
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

  addPathFromSVGString(svg: string) {
    this.path.addPath($ck.Path.MakeFromSVGString(svg))

    return this
  }

  addPathFromOptions(one: ckPath, two: ckPath, options: any) {
    this.path.addPath($ck.Path.MakeFromOp(one, two, options))

    return this
  }

  addFromPathInterpolation(start: ckPath, end: ckPath, weight: number) {
    this.path.addPath($ck.Path.MakeFromPathInterpolation(start, end, weight))

    return this
  }

  draw(canvas: Canvas): void {
    // console.log(this.path);
    if (this.style.border) canvas.drawPath(this.path, this.strokePaint)

    if (this.style.fill) canvas.drawPath(this.path, this.fillPaint)
  }
}
