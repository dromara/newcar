import type { ConvertToProp, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget, changed, reactive, ref } from '@newcar/core'
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
    this.style.color = reactive(options.style.color ?? Color.WHITE)
    this.style.borderColor = reactive(options.style.borderColor ?? options.style.color ?? Color.WHITE)
    this.style.borderShader = reactive(options.style.borderShader ?? options.style.shader)
    this.style.borderWidth = ref(options.style.borderWidth ?? 2)
    this.style.fillColor = reactive(options.style.fillColor ?? options.style.color ?? Color.WHITE)
    this.style.fillShader = reactive(options.style.fillShader ?? options.style.shader)
    this.style.shader = reactive(options.style.shader)
    this.style.fill = ref(options.style.fill ?? true)
    this.style.border = ref(options.style.border ?? false)
    this.style.join = ref(options.style.join ?? 'miter')
    this.style.cap = ref(options.style.cap ?? 'square')
    this.style.offset = ref(options.style.offset ?? 0)
    this.style.interval = reactive(options.style.interval ?? [1, 0])
  }

  init(ck: CanvasKit): void {
    this.strokePaint = new ck.Paint()
    this.fillPaint = new ck.Paint()

    changed(this.style.color, (color) => {
      this.style.borderColor ??= color
      this.style.fillColor ??= color
      this.strokePaint.setColor(this.style.borderColor.toFloat4())
      this.fillPaint.setColor(this.style.fillColor.toFloat4())
    })

    changed(this.style.shader, (shader) => {
      this.style.borderShader ??= shader
      this.style.fillShader ??= shader
      this.strokePaint.setShader(this.style.borderShader.toCanvasKitShader(ck))
      this.fillPaint.setShader(this.style.fillShader.toCanvasKitShader(ck))
    })

    changed(this.style.borderColor, (borderColor) => {
      this.strokePaint.setColor(borderColor.toFloat4())
    })

    changed(this.style.fillColor, (fillColor) => {
      this.fillPaint.setColor(fillColor.toFloat4())
    })
  }
}
