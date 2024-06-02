import type { Shader, StrokeCap, StrokeJoin } from '@newcar/utils'
import { Color, deepMerge, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
import type { WidgetOptions, WidgetStyle } from '../base'
import { createBase } from '../base'
import { def, defineWidgetBuilder } from '../widget'

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

export function createFigure(options: FigureOptions) {
  return defineWidgetBuilder((ck) => {
    const base = createBase(options)(ck)
    const style = {
      border: def(options.style?.border ?? false),
      borderColor: def(options.style?.borderColor ?? options.style?.color ?? Color.WHITE),
      borderShader: def(options.style?.borderShader ?? options.style?.shader),
      borderWidth: def(options.style?.borderWidth ?? 2),
      fill: def(options.style?.fill ?? true),
      fillColor: def(options.style?.fillColor ?? options.style?.color ?? Color.WHITE),
      fillShader: def(options.style?.fillShader ?? options.style?.shader),
      color: def(options.style?.color ?? Color.WHITE),
      shader: def(options.style?.shader ?? options.style?.shader),
      join: def(options.style?.join ?? 'miter'),
      cap: def(options.style?.cap ?? 'butt'),
      offset: def(options.style?.offset ?? 0),
      interval: def(options.style?.interval ?? [1, 0]),
      ...base.style,
    }

    const strokePaint = new ck.Paint()
    const fillPaint = new ck.Paint()
    strokePaint.setColor(style.borderColor.value.toFloat4())
    strokePaint.setStrokeWidth(style.borderWidth.value)
    strokePaint.setShader(style.borderShader.value!.toCanvasKitShader(ck))
    strokePaint.setStyle(ck.PaintStyle.Stroke)
    strokePaint.setStrokeCap(str2StrokeCap(ck, style.cap.value))
    strokePaint.setStrokeJoin(str2StrokeJoin(ck, style.join.value))
    strokePaint.setPathEffect(ck.PathEffect.MakeDash(
      style.interval.value,
      style.offset.value,
    ))
    fillPaint.setColor(style.fillColor.value.toFloat4())
    fillPaint.setShader(style.fillShader.value!.toCanvasKitShader(ck))
    fillPaint.setStyle(ck.PaintStyle.Fill)

    return deepMerge(base, { style })
  })
}
