import type { Shader, TextAlign, TextDirection, TextHeightBehavior } from '@newcar/utils'
import type { Base, BaseOptions, BaseStyle, ConvertToProp } from '@newcar/core'
import { $resources, createBase, def, defineWidgetBuilder } from '@newcar/core'
import { Color, str2TextAlign, str2TextDirection, str2TextHeightBehavior } from '@newcar/utils'
import type { Canvas } from 'canvaskit-wasm'
import type { Text } from './text.ts'

export interface TextGroupOptions extends BaseOptions {
  style?: TextGroupStyle
  width?: number
}

export interface TextGroupStyle extends BaseStyle {
  /**
   * The offset of the text.
   */
  offset?: number
  /**
   * The interval for the text.
   */
  interval?: number[]
  color?: Color
  shader?: Shader
  /**
   * Specifies whether to draw a border around the text.
   * To be noted that when the border is enabled, the text will not be filled.
   */
  border?: boolean
  /**
   * The color used to fill the text.
   */
  fillColor?: Color
  /**
   * The shader used to fill the text.
   */
  fillShader?: Shader
  /**
   * The width of the border around the text.
   */
  borderWidth?: number
  /**
   * The color of the border around the text.
   */
  borderColor?: Color
  /**
   * The shader used to draw the border around the text.
   */
  borderShader?: Shader
  /**
   * Specifies whether hinting should be disabled for the text.
   */
  disableHinting?: boolean
  /**
   * The ellipsis string to be used for truncating the text.
   */
  ellipsis?: string
  /**
   * Multiplier for height adjustment of the text.
   */
  heightMultiplier?: number
  /**
   * The maximum number of lines for the text.
   */
  maxLines?: number
  /**
   * Specifies whether to replace tab characters with spaces in the text.
   */
  replaceTabCharacters?: boolean
  /**
   * The alignment of the text within its container.
   */
  textAlign?: TextAlign
  /**
   * The direction of the text.
   */
  textDirection?: TextDirection
  /**
   * The behavior of the text regarding its height.
   */
  textHeightBehavior?: TextHeightBehavior
  /**
   * Specifies whether to apply a rounding hack for the text.
   */
  applyRoundingHack?: boolean
}

export interface TextGroup extends Base {
  texts: Text[]
  style: ConvertToProp<TextGroupStyle>
}

export function createTextGroup(texts: Text[], options?: TextGroupOptions) {
  return defineWidgetBuilder<TextGroup>((ck) => {
    options ??= {}
    options.style ??= {}
    const width = def(options.width ?? Number.POSITIVE_INFINITY)

    const base = createBase(options)(ck)
    const style = {
      ...base.style,
      offset: def(options.style.offset ?? 0),
      interval: def(options.style.interval ?? [1, 0]),
      border: def(options.style.border ?? false),
      fillColor: def(options.style.fillColor ?? options.style.color ?? Color.WHITE),
      fillShader: def(options.style.fillShader ?? options.style.shader),
      borderWidth: def(options.style.borderWidth ?? 2),
      borderColor: def(options.style.borderColor ?? options.style.color ?? Color.WHITE),
      borderShader: def(options.style.borderShader ?? options.style.shader),
      disableHinting: def(options.style.disableHinting ?? false),
      ellipsis: def(options.style.ellipsis ?? '…'),
      heightMultiplier: def(options.style.heightMultiplier ?? 1),
      maxLines: def(options.style.maxLines ?? null),
      replaceTabCharacters: def(options.style.replaceTabCharacters ?? true),
      textAlign: def(options.style.textAlign ?? 'left'),
      textDirection: def(options.style.textDirection ?? 'ltr'),
      textHeightBehavior: def(options.style.textHeightBehavior ?? 'all'),
      applyRoundingHack: def(options.style.applyRoundingHack ?? false),
    }

    const manager = ck.FontMgr.FromData(...$resources.fonts)

    const inputParagraphStyle = {}
    for (const s in style)
      (inputParagraphStyle as Record<string, any>)[s] = (style as Record<string, any>)[s].value

    const builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle({
        ...inputParagraphStyle,
        textAlign: str2TextAlign(ck, style.textAlign.value),
        textDirection: str2TextDirection(ck, style.textDirection.value),
        textHeightBehavior: str2TextHeightBehavior(
          ck,
          style.textHeightBehavior.value,
        ),
        textStyle: {
          color: Color.WHITE.toFloat4(),
        },
      }),
      manager,
    )

    texts.forEach((text) => {
      builder.pushPaintStyle(text.textStyle, text.paint, text.backgroundPaint)
      builder.addText(text.text.value)
    })

    const paragraph = builder.build()
    paragraph.layout(width.value)

    function render(canvas: Canvas) {
      builder.reset()
      texts.forEach((text) => {
        builder.pushPaintStyle(text.textStyle, text.paint, text.backgroundPaint)
        builder.addText(text.text.value)
      })
      const paragraph = builder.build()
      paragraph.layout(width.value)
      canvas.drawParagraph(paragraph, 0, 0)
    }

    return {
      ...base,
      texts,
      style,
      render,
    }
  })
}
