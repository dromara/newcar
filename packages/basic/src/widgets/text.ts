import type {
  Base,
  BaseOptions,
  BaseStyle,
  ConvertToProp,
} from '@newcar/core'
import {
  $resources,
  changed,
  createBase,
  def,
  defineWidgetBuilder,
} from '@newcar/core'
import type { BlendMode, Shader, TextAlign, TextBaseline } from '@newcar/utils'
import { Color, str2BlendMode, str2TextAlign, str2TextBaseline } from '@newcar/utils'
import type { Canvas, FontStyle, Paint, TextStyle as ckTextStyle } from 'canvaskit-wasm'

export interface TextOptions extends BaseOptions {
  style?: TextStyle
  width?: number
}

export interface TextStyle extends BaseStyle {
  border?: boolean
  shader?: Shader
  borderWidth?: number
  transparency?: number
  antiAlias?: boolean
  blendMode?: BlendMode
  /**
   * The background color of the text
   */
  backgroundColor?: Color
  /**
   * The color of the text.
   */
  color?: Color
  /**
   * The decoration style to be applied to the text.
   */
  decoration?: number
  /**
   * The color of the decoration applied to the text.
   */
  decorationColor?: Color
  /**
   * The thickness of the decoration applied to the text.
   */
  decorationThickness?: number
  /**
   * An array of font families to be used for rendering the text.
   */
  fontFamilies?: string[]
  /**
   * The size of the font used for the text.
   */
  fontSize?: number
  /**
   * The style of the font used for the text (e.g., normal, italic).
   */
  fontStyle?: FontStyle
  /**
   * The foreground color of the text (for the text fill and stroke).
   */
  foregroundColor?: Color
  /**
   * Multiplier for height adjustment of the text.
   */
  heightMultiplier?: number
  /**
   * Specifies whether to use half-leading for the text.
   */
  halfLeading?: boolean
  /**
   * The spacing between characters in the text.
   */
  letterSpacing?: number
  /**
   * The locale to be used for the text.
   */
  locale?: string
  /**
   * The alignment of the text within its container.
   */
  textAlign?: TextAlign
  /**
   * The baseline alignment of the text.
   */
  textBaseline?: TextBaseline
  /**
   * The spacing between words in the text.
   */
  wordSpacing?: number
}

export interface Text extends Base {
  style: ConvertToProp<TextStyle>
  text: ReturnType<typeof def<string>>
  paint: Paint
  backgroundPaint: Paint
  textStyle: ckTextStyle
}

export function createText(text: string, options?: TextOptions) {
  return defineWidgetBuilder<Text>((ck) => {
    options ??= {}
    options.style ??= {}
    const base = createBase(options)(ck)
    const textProp = def(text)

    const width = def(options.width ?? Number.POSITIVE_INFINITY)

    const style = {
      ...base.style,
      border: def(options.style.border ?? false),
      shader: def(options.style.shader),
      borderWidth: def(options.style.borderWidth ?? 2),
      backgroundColor: def(options.style.backgroundColor ?? Color.TRANSPARENT),
      color: def(options.style.color ?? Color.WHITE),
      decoration: def(options.style.decoration ?? 0),
      decorationColor: def(options.style.decorationColor ?? Color.TRANSPARENT),
      decorationThickness: def(options.style.decorationThickness ?? 0),
      fontFamilies: def(options.style.fontFamilies ?? []),
      fontSize: def(options.style.fontSize ?? 50),
      fontStyle: def(options.style.fontStyle ?? {}),
      foregroundColor: def(options.style.foregroundColor ?? Color.WHITE),
      halfLeading: def(options.style.halfLeading ?? false),
      heightMultiplier: def(options.style.heightMultiplier ?? 1),
      letterSpacing: def(options.style.letterSpacing ?? 0),
      locale: def(options.style.locale ?? ''),
      textAlign: def(options.style.textAlign ?? 'left'),
      textBaseline: def(options.style.textBaseline ?? 'alphabetic'),
      wordSpacing: def(options.style.wordSpacing ?? 0),
    }

    const backgroundPaint = new ck.Paint()
    backgroundPaint.setColor(style.backgroundColor.value.toFloat4())

    const manager = ck.FontMgr.FromData(...$resources.fonts)

    const inputStyle = {}
    for (const s in style)
      (inputStyle as Record<string, any>)[s] = (style as Record<string, any>)[s].value
    const textStyle = new ck.TextStyle(
      {
        ...inputStyle,
        backgroundColor: style.backgroundColor.value.toFloat4(),
        color: style.color.value.toFloat4(),
        decorationColor: style.decorationColor.value.toFloat4(),
        foregroundColor: style.foregroundColor.value.toFloat4(),
        textBaseline: str2TextBaseline(ck, style.textBaseline.value),
      },
    )

    const paint = new ck.Paint()
    paint.setStyle(style.border.value ? ck.PaintStyle.Stroke : ck.PaintStyle.Fill)
    paint.setColor(style.foregroundColor.value.toFloat4())
    paint.setShader(style.shader.value?.toCanvasKitShader(ck) ?? null)
    paint.setStrokeWidth(style.borderWidth.value)
    paint.setAlphaf(style.transparency.value * style.foregroundColor.value.alpha)
    paint.setAntiAlias(style.antiAlias.value)
    paint.setBlendMode(str2BlendMode(ck, style.blendMode.value))

    const builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle({
        textAlign: str2TextAlign(ck, style.textAlign.value),
        textStyle: {
          color: style.foregroundColor.value.toFloat4(),
        },
      }),
      manager,
    )
    builder.pushPaintStyle(textStyle, paint, backgroundPaint)
    builder.addText(textProp.value)
    const paragraph = builder.build()
    paragraph.layout(width.value)

    changed(style.backgroundColor, (v) => {
      backgroundPaint.setColor(v.value.toFloat4())
      textStyle.backgroundColor = v.value.toFloat4()
    })
    changed(style.color, (v) => {
      textStyle.color = v.value.toFloat4()
    })
    changed(style.decoration, (v) => {
      textStyle.decoration = v.value
    })
    changed(style.decorationColor, (v) => {
      textStyle.decorationColor = v.value.toFloat4()
    })
    changed(style.decorationThickness, (v) => {
      textStyle.decorationThickness = v.value
    })
    changed(style.fontFamilies, (v) => {
      textStyle.fontFamilies = v.value
    })
    changed(style.fontSize, (v) => {
      textStyle.fontSize = v.value
    })
    changed(style.fontStyle, (v) => {
      textStyle.fontStyle = v.value
    })
    changed(style.foregroundColor, (v) => {
      textStyle.foregroundColor = v.value.toFloat4()
      paint.setColor(v.value.toFloat4())
    })
    changed(style.halfLeading, (v) => {
      textStyle.halfLeading = v.value
    })
    changed(style.heightMultiplier, (v) => {
      textStyle.heightMultiplier = v.value
    })
    changed(style.letterSpacing, (v) => {
      textStyle.letterSpacing = v.value
    })
    changed(style.locale, (v) => {
      textStyle.locale = v.value
    })
    changed(style.textAlign, (_v) => {
      // Don't support textAlign for changing
    })
    changed(style.textBaseline, (v) => {
      textStyle.textBaseline = str2TextBaseline(ck, v.value)
    })
    changed(style.wordSpacing, (v) => {
      textStyle.wordSpacing = v.value
    })

    function render(canvas: Canvas) {
      builder.reset()
      builder.pushPaintStyle(textStyle, paint, backgroundPaint)
      builder.addText(textProp.value)
      const paragraph = builder.build()
      paragraph.layout(width.value)
      canvas.drawParagraph(paragraph, 0, 0)
    }

    return {
      ...base,
      text: textProp,
      style,
      paint,
      backgroundPaint,
      textStyle,
      width,
      render,
    }
  })
}
