import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Arc, Line } from '@newcar/basic'
import type { CanvasKit, Paint } from 'canvaskit-wasm'
import type { Shader, StrokeCap, StrokeJoin } from '../../../../packages/utils/src'
import { Color, str2StrokeCap, str2StrokeJoin } from '../../../../packages/utils/src'

export interface AngleOptions extends WidgetOptions {
  style?: AngleStyle
  unitSystem?: 'angle' | 'radian'
}

export interface AngleStyle extends WidgetStyle {
  color?: Color
  shader?: Shader
  graduatedArc?: boolean
  join?: StrokeJoin
  cap?: StrokeCap
  width?: number
  gauge?: boolean
  gaugeColor?: Color
  gaugeShader?: Shader
}

export class Angle extends Widget {
  unitSystem: 'angle' | 'radian'
  declare style: AngleStyle
  paint: Paint
  endSide: Line
  private endX: number
  private endY: number
  gauge: Arc
  constructor(
    public basis: Line,
    public value: number,
    public length: number,
    options?: AngleOptions,
  ) {
    options ??= {}
    super(options)
    this.unitSystem = options.unitSystem ?? 'angle'
    options.style ??= {}
    this.style.width = options.style.width ?? 2
    this.style.color = options.style.color ?? Color.WHITE
    this.style.shader = options.style.shader
    this.style.graduatedArc = options.style.graduatedArc ?? true
    this.style.join = options.style.join ?? 'miter'
    this.style.cap = options.style.cap ?? 'square'
    this.style.gaugeColor = options.style.gaugeColor ?? Color.WHITE
    this.style.gaugeShader = options.style.gaugeShader
    this.endX = this.basis.to[0] + length * Math.cos(this.value)
    this.endY = this.basis.to[1] + length * Math.sin(this.value)
    this.endSide = new Line(this.basis.from, [this.endX, this.endY])
    this.gauge = new Arc(50, this.basis.style.rotation, this.value, {
      style: {
        borderColor: this.style.gaugeColor,
        borderShader: this.style.gaugeShader,
        borderWidth: this.style.width,
      },
    })
    this.add(this.basis, this.endSide)
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.paint.setColor(this.style.color!.toFloat4())
    this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
    this.paint.setAlphaf(this.style.transparency * this.style.color.alpha)
    this.paint.setStrokeJoin(str2StrokeJoin(ck, this.style.join!))
    this.paint.setStrokeCap(str2StrokeCap(ck, this.style.cap!))
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'value': {
        this.endX = this.basis.to[0] + length * Math.cos(this.value)
        this.endY = this.basis.to[1] + length * Math.sin(this.value)
        this.endSide.to = [this.endX, this.endY]
        break
      }
    }
  }
}
