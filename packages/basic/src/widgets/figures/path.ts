import type { Canvas, CanvasKit, Path as ckPath } from 'canvaskit-wasm'
import type { WidgetRange } from '@newcar/core'
import { str2BlendMode, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
import { changed } from '@newcar/core'
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
    this.strokePaint.setColor(this.style.borderColor.value.toFloat4())
    this.strokePaint.setShader(this.style.borderShader.value?.toCanvasKitShader(ck) ?? null)
    this.strokePaint.setAlphaf(this.style.transparency.value * this.style.borderColor.value.alpha)
    this.strokePaint.setStrokeWidth(this.style.borderWidth.value)
    this.strokePaint.setStrokeJoin(str2StrokeJoin(ck, this.style.join.value))
    this.strokePaint.setStrokeCap(str2StrokeCap(ck, this.style.cap.value))
    this.strokePaint.setAntiAlias(this.style.antiAlias.value)
    try {
      const dash = ck.PathEffect.MakeDash(
        this.style.interval.value,
        this.style.offset.value,
      )
      this.strokePaint.setPathEffect(dash)
    }
    catch {}
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setColor(this.style.fillColor.value.toFloat4())
    this.fillPaint.setShader(this.style.fillShader?.value.toCanvasKitShader(ck) ?? null)
    this.fillPaint.setAlphaf(this.style.transparency.value * this.style.fillColor.value.alpha)
    this.fillPaint.setAntiAlias(this.style.antiAlias.value)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode.value))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode.value))

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

    changed(this.style.borderShader, (borderShader) => {
      this.strokePaint.setShader(borderShader.value.toCanvasKitShader(ck) ?? null)
    })

    changed(this.style.borderWidth, (borderWidth) => {
      this.strokePaint.setStrokeWidth(borderWidth.value)
    })

    changed(this.style.fillShader, (fillShader) => {
      this.fillPaint.setShader(fillShader.value.toCanvasKitShader(ck) ?? null)
    })

    changed(this.style.join, (join) => {
      this.strokePaint.setStrokeJoin(str2StrokeJoin(ck, join.value))
    })

    changed(this.style.cap, (cap) => {
      this.strokePaint.setStrokeCap(str2StrokeCap(ck, cap.value))
    })

    const makeDashUpdate = (i: number[], o: number) => {
      this.strokePaint.setPathEffect(
        ck.PathEffect.MakeDash(i, o),
      )
    }
    changed(this.style.offset, offset => makeDashUpdate(this.style.interval.value, offset.value))
    changed(this.style.interval, interval => makeDashUpdate(interval.value, this.style.offset.value))

    changed(this.style.blendMode, (blendMode) => {
      this.strokePaint.setBlendMode(str2BlendMode(ck, blendMode.value))
      this.fillPaint.setBlendMode(str2BlendMode(ck, blendMode.value))
    })

    changed(this.style.transparency, (transparency) => {
      this.strokePaint.setAlphaf(transparency.value * this.style.borderColor.value.alpha)
      this.fillPaint.setAlphaf(transparency.value * this.style.fillColor.value.alpha)
    })
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
