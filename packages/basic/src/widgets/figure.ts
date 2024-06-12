import type { ConvertToProp, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget, changed, reactive, ref } from '@newcar/core'
import { Color, str2BlendMode, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
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
    super.init(ck)
    this.strokePaint = new ck.Paint()
    this.fillPaint = new ck.Paint()
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
    this.strokePaint.setAlphaf(this.style.transparency.value * this.style.borderColor.alpha)
    this.strokePaint.setStrokeWidth(this.style.borderWidth.value)
    this.strokePaint.setStrokeJoin(str2StrokeJoin(ck, this.style.join.value))
    this.strokePaint.setStrokeCap(str2StrokeCap(ck, this.style.cap.value))
    this.strokePaint.setAntiAlias(this.style.antiAlias.value)
    try {
      const dash = ck.PathEffect.MakeDash(
        this.style.interval,
        this.style.offset.value,
      )
      this.strokePaint.setPathEffect(dash)
    }
    catch {}
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
    this.fillPaint.setAlphaf(this.style.transparency.value * this.style.fillColor.alpha)
    this.fillPaint.setAntiAlias(this.style.antiAlias.value)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode.value))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode.value))

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

    changed(this.style.borderShader, (borderShader) => {
      this.strokePaint.setShader(borderShader.toCanvasKitShader(ck) ?? null)
    })

    changed(this.style.borderWidth, (borderWidth) => {
      this.strokePaint.setStrokeWidth(borderWidth.value)
    })

    changed(this.style.fillShader, (fillShader) => {
      this.fillPaint.setShader(fillShader.toCanvasKitShader(ck) ?? null)
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
    changed(this.style.offset, offset => makeDashUpdate(this.style.interval, offset.value))
    changed(this.style.interval, interval => makeDashUpdate(interval, this.style.offset.value))

    changed(this.style.blendMode, (blendMode) => {
      this.strokePaint.setBlendMode(str2BlendMode(ck, blendMode.value))
      this.fillPaint.setBlendMode(str2BlendMode(ck, blendMode.value))
    })

    changed(this.style.transparency, (transparency) => {
      this.strokePaint.setAlphaf(transparency.value * this.style.borderColor.alpha)
      this.fillPaint.setAlphaf(transparency.value * this.style.fillColor.alpha)
    })
  }
}
