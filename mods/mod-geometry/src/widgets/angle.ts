import {
  Line,
  StrokeCap,
  StrokeJoin,
  str2StrokeCap,
  str2StrokeJoin,
} from '@newcar/basic'
import { Widget, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Color } from '@newcar/utils'
import { Canvas, CanvasKit, Paint } from 'canvaskit-wasm'

export interface AngleOptions extends WidgetOptions {
  style?: AngleStyle
  unitSystem?: 'angle' | 'radian'
}

export interface AngleStyle extends WidgetStyle {
  color?: Color
  graduatedArc?: boolean
  join?: StrokeJoin
  cap?: StrokeCap
  width?: number
}

export class Angle extends Widget {
  unitSystem: 'angle' | 'radian'
  declare style: AngleStyle
  paint: Paint
  private endX: number
  private endY: number
  constructor(
    public basis: Line,
    public value: number,
    options?: AngleOptions,
  ) {
    options ??= {}
    super(options)
    this.unitSystem = options.unitSystem ?? 'angle'
    options.style ??= {}
    this.style.width = options.style.width ?? 2
    this.style.color = options.style.color ?? Color.WHITE
    this.style.graduatedArc = options.style.graduatedArc ?? true
    this.style.join = options.style.join ?? 'miter'
    this.style.cap = options.style.cap ?? 'square'
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.paint.setColor(this.style.color!.toFloat4())
    this.paint.setStrokeJoin(str2StrokeJoin(ck, this.style.join!))
    this.paint.setStrokeCap(str2StrokeCap(ck, this.style.cap!))
    this.endX = this.basis[0] + length * Math.cos(this.value)
    this.endY = this.basis[1] + length * Math.sin(this.value)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'value': {
        this.endX = this.basis[0] + length * Math.cos(this.value)
        this.endY = this.basis[1] + length * Math.sin(this.value)
        break
      }
    }
  }

  draw(canvas: Canvas): void {
    canvas.drawLine(...this.basis.from, ...this.basis.to, this.paint)
    canvas.drawLine(...this.basis.from, this.endX, this.endY, this.paint)
  }
}
