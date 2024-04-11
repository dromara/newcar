import { Canvas, CanvasKit, Path as ckPath } from 'canvaskit-wasm'
import { Figure, FigureOptions, FigureStyle } from './figure'
import { str2StrokeJoin } from '../../utils/join'
import { str2StrokeCap } from '../../utils/cap'

export interface PathOptions extends FigureOptions {
  style?: PathStyle
}

export interface PathStyle extends FigureStyle {}

export class Path extends Figure {
  path: ckPath
  private ck: CanvasKit

  constructor(options?: PathOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    this.path = new ck.Path()
    for (const f in this.path) {
      ;(this as Record<string, any>)[f] = (this.path as Record<string, any>)[f]
    }
    this.ck = ck
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
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
    this.path.addPath(this.ck.Path.MakeFromSVGString(svg))
  }

  addPathFromOptions(one: ckPath, two: ckPath, options: any) {
    this.path.addPath(this.ck.Path.MakeFromOp(one, two, options))
  }

  addFromPathInterpolation(start: ckPath, end: ckPath, weight: number) {
    this.path.addPath(this.ck.Path.MakeFromPathInterpolation(start, end, weight))
  }

  draw(canvas: Canvas): void {
    if (this.style.border) {
      canvas.drawPath(this.path, this.strokePaint)
    }
    if (this.style.fill) {
      canvas.drawPath(this.path, this.fillPaint)
    }
  }
}
