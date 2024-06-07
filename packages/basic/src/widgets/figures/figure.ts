import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { CanvasKit, Paint } from 'canvaskit-wasm'
import type { Shader, StrokeCap, StrokeJoin } from '@newcar/utils'
import type { ConvertToProp } from '../../../../core/src/prop'
import { changed, ref } from '../../../../core/src/prop'

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
  interval?: number[]
}

export interface FigureOptions extends WidgetOptions {
  style?: FigureStyle
}

export class Figure extends Widget {
  declare style: ConvertToProp<FigureStyle>
  strokePaint: Paint
  fillPaint: Paint

  constructor(options?: FigureOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.borderColor = ref(options.style.borderColor ?? options.style.color ?? Color.WHITE)
    this.style.borderShader = ref(options.style.borderShader ?? options.style.shader)
    this.style.borderWidth = ref(options.style.borderWidth ?? 2)
    this.style.fillColor = ref(options.style.fillColor ?? options.style.color ?? Color.WHITE)
    this.style.fillShader = ref(options.style.fillShader ?? options.style.shader)
    this.style.color = ref(options.style.color ?? Color.WHITE)
    this.style.shader = ref(options.style.shader)
    this.style.fill = ref(options.style.fill ?? true)
    this.style.border = ref(options.style.border ?? false)
    this.style.join = ref(options.style.join ?? 'miter')
    this.style.cap = ref(options.style.cap ?? 'square')
    this.style.offset = ref(options.style.offset ?? 0)
    this.style.interval = ref(options.style.interval ?? [1, 0])
  }

  init(ck: CanvasKit): void {
    this.strokePaint = new ck.Paint()
    this.fillPaint = new ck.Paint()

    changed(this.style.color, (color) => {
      this.style.borderColor ??= color
      this.style.fillColor ??= color
      this.strokePaint.setColor(this.style.borderColor.value.toFloat4())
      this.fillPaint.setColor(this.style.fillColor.value.toFloat4())
    })

    changed(this.style.shader, (shader) => {
      this.style.borderShader ??= shader
      this.style.fillShader ??= shader
      this.strokePaint.setShader(this.style.borderShader.value.toCanvasKitShader(ck))
      this.fillPaint.setShader(this.style.fillShader.value.toCanvasKitShader(ck))
    })

    changed(this.style.borderColor, (borderColor) => {
      this.strokePaint.setColor(borderColor.value.toFloat4())
    })

    changed(this.style.fillColor, (fillColor) => {
      this.fillPaint.setColor(fillColor.value.toFloat4())
    })
  }
}
