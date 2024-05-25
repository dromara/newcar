import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { CanvasKit, Paint } from 'canvaskit-wasm'
import type { Shader, StrokeCap, StrokeJoin } from '@newcar/utils'

export interface FigureStyle extends WidgetStyle {
  border?: boolean
  borderColor?: Color
  borderShader?: Shader
  borderWidth?: number
  fill?: boolean
  fillColor?: Color
  fillShader?: Shader
  color?: Color
  shader?: Shader
  join?: StrokeJoin
  cap?: StrokeCap
  offset?: number
  interval?: [number, number]
}

export interface FigureOptions extends WidgetOptions {
  style?: FigureStyle
}

export class Figure extends Widget {
  declare style: FigureStyle
  strokePaint: Paint
  fillPaint: Paint

  constructor(options?: FigureOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.borderColor = options.style.borderColor ?? options.style.color ?? Color.WHITE
    this.style.borderShader = options.style.borderShader ?? options.style.shader
    this.style.borderWidth = options.style.borderWidth ?? 2
    this.style.fillColor = options.style.fillColor ?? options.style.color ?? Color.WHITE
    this.style.fillShader = options.style.fillShader ?? options.style.shader
    this.style.color = options.style.color ?? Color.WHITE
    this.style.shader = options.style.shader
    this.style.fill = options.style.fill ?? true
    this.style.border = options.style.border ?? false
    this.style.join = options.style.join ?? 'miter'
    this.style.cap = options.style.cap ?? 'square'
    this.style.offset = options.style.offset ?? 0
    this.style.interval = options.style.interval ?? [1, 0]
  }

  init(ck: CanvasKit): void {
    this.strokePaint = new ck.Paint()
    this.fillPaint = new ck.Paint()
  }

  predraw(ck: CanvasKit, propertyChanged: string) {
    super.predraw(ck, propertyChanged)
    switch (propertyChanged) {
      case 'style.color':
        this.style.borderColor ??= this.style.color
        this.style.fillColor ??= this.style.color
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        this.fillPaint.setColor(this.style.fillColor.toFloat4())
        break
      case 'style.shader':
        this.style.borderShader ??= this.style.shader
        this.style.fillShader ??= this.style.shader
        this.strokePaint.setShader(this.style.borderShader.toCanvasKitShader(ck))
        this.fillPaint.setShader(this.style.fillShader.toCanvasKitShader(ck))
        break
      case 'style.borderColor':
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        break
      case 'style.fillColor':
        this.fillPaint.setColor(this.style.fillColor.toFloat4())
        break
    }
  }
}
