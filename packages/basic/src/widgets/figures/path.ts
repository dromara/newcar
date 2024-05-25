import type { Canvas, CanvasKit, Path as ckPath } from 'canvaskit-wasm'
import type { WidgetRange } from '@newcar/core'
import { str2BlendMode, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
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
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)
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
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)
    this.fillPaint.setAntiAlias(this.style.antiAlias)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))

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

  predraw(ck: CanvasKit, propertyChanged: string): void {
    super.predraw(ck, propertyChanged)

    switch (propertyChanged) {
      case 'path': {
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
    if (this.style.border)
      canvas.drawPath(this.path, this.strokePaint)

    if (this.style.fill)
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
