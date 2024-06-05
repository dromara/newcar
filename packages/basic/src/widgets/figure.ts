import type { Shader, StrokeCap, StrokeJoin } from '@newcar/utils'
import { Color, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
import type { Base, BaseOptions, BaseStyle, ConvertToProp } from '@newcar/core'
import { changed, createBase, def, defineWidgetBuilder } from '@newcar/core'
import type { Paint } from 'canvaskit-wasm'

export interface FigureStyle extends BaseStyle {
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

export interface FigureOptions extends BaseOptions {
  style?: FigureStyle
}

export interface Figure extends Base {
  style: ConvertToProp<FigureStyle>
  fillPaint: Paint
  strokePaint: Paint
}

export function createFigure(options?: FigureOptions) {
  return defineWidgetBuilder<Figure>((ck) => {
    options ??= {}
    options.style ??= {}
    const base = createBase(options)(ck)
    const style = {
      ...base.style,
      color: def(options.style.color ?? Color.WHITE),
      shader: def(options.style.shader ?? null),
      border: def(options.style.border ?? false),
      borderColor: def(options.style.borderColor ?? options.style.color ?? Color.WHITE),
      borderShader: def(options.style.borderShader ?? options.style.shader),
      borderWidth: def(options.style.borderWidth ?? 2),
      fill: def(options.style.fill ?? true),
      fillColor: def(options.style.fillColor ?? options.style.color ?? Color.WHITE),
      fillShader: def(options.style.fillShader ?? options.style?.shader),
      join: def(options.style.join ?? 'miter'),
      cap: def(options.style.cap ?? 'butt'),
      offset: def(options.style.offset ?? 0),
      interval: def(options.style.interval ?? [1, 0]),
    }

    const strokePaint = new ck.Paint()
    const fillPaint = new ck.Paint()
    strokePaint.setStyle(ck.PaintStyle.Stroke)
    strokePaint.setColor(style.borderColor.value.toFloat4())
    strokePaint.setShader(style.borderShader.value?.toCanvasKitShader(ck) ?? null)
    strokePaint.setStrokeWidth(style.borderWidth.value)
    strokePaint.setStrokeCap(str2StrokeCap(ck, style.cap.value))
    strokePaint.setStrokeJoin(str2StrokeJoin(ck, style.join.value))
    strokePaint.setPathEffect(ck.PathEffect.MakeDash(
      style.interval.value,
      style.offset.value,
    ))
    strokePaint.setAntiAlias(style.antiAlias.value)
    strokePaint.setAlphaf(style.transparency.value * style.borderColor.value.alpha)

    fillPaint.setStyle(ck.PaintStyle.Fill)
    fillPaint.setColor(style.fillColor.value.toFloat4())
    fillPaint.setShader(style.fillShader.value?.toCanvasKitShader(ck) ?? null)
    fillPaint.setAntiAlias(style.antiAlias.value)
    fillPaint.setAlphaf(style.transparency.value * style.fillColor.value.alpha)

    changed(style.antiAlias, (v) => {
      strokePaint.setAntiAlias(v.value)
      fillPaint.setAntiAlias(v.value)
    })
    changed(style.borderWidth, (v) => {
      strokePaint.setStrokeWidth(v.value)
    })
    changed(style.cap, (v) => {
      strokePaint.setStrokeCap(str2StrokeCap(ck, v.value))
    })
    changed(style.join, (v) => {
      strokePaint.setStrokeJoin(str2StrokeJoin(ck, v.value))
    })
    changed(style.borderColor, (v) => {
      strokePaint.setColor(v.value.toFloat4())
    })
    changed(style.fillColor, (v) => {
      fillPaint.setColor(v.value.toFloat4())
    })
    changed(style.color, (v) => {
      strokePaint.setColor(style.borderColor.value?.toFloat4() ?? v.value.toFloat4())
      fillPaint.setColor(style.fillColor.value?.toFloat4() ?? v.value.toFloat4())
    })
    changed(style.borderShader, (v) => {
      strokePaint.setShader(v.value?.toCanvasKitShader(ck) ?? null)
    })
    changed(style.fillShader, (v) => {
      fillPaint.setShader(v.value?.toCanvasKitShader(ck) ?? null)
    })
    changed(style.shader, (v) => {
      strokePaint.setShader(style.borderShader.value?.toCanvasKitShader(ck) ?? v.value?.toCanvasKitShader(ck) ?? null)
      fillPaint.setShader(style.fillShader.value?.toCanvasKitShader(ck) ?? v.value?.toCanvasKitShader(ck) ?? null)
    })
    changed(style.interval, (v) => {
      strokePaint.setPathEffect(ck.PathEffect.MakeDash(
        v.value,
        style.offset.value,
      ))
    })
    changed(style.offset, (v) => {
      strokePaint.setPathEffect(ck.PathEffect.MakeDash(
        style.interval.value,
        v.value,
      ))
    })
    changed(style.transparency, (v) => {
      strokePaint.setAlphaf(v.value * style.borderColor.value.alpha)
      fillPaint.setAlphaf(v.value * style.fillColor.value.alpha)
    })
    changed(style.antiAlias, (v) => {
      strokePaint.setAntiAlias(v.value)
      fillPaint.setAntiAlias(v.value)
    })

    return {
      ...base,
      style,
      strokePaint,
      fillPaint,
    }
  })
}
