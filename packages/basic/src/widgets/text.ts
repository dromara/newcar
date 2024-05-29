import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { $source, Widget } from '@newcar/core'
import type { Color, TextBaseline } from '@newcar/utils'
import { deepMerge, isUndefined, str2BlendMode, str2TextBaseline } from '@newcar/utils'
import type { Canvas, CanvasKit, FontMgr, FontStyle, Paragraph, ParagraphBuilder } from 'canvaskit-wasm'
import { Figure, type FigureOptions, type FigureStyle } from './figures/figure'

export interface TextOptions extends FigureOptions {
  style?: TextStyle
  width?: number
}

export interface TextStyle extends FigureStyle {
  /**
   * The background color of the text this.
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
   * The foreground color of the text.
   */
  foregroundColor?: Color
  /**
   * Multiplier for height adjustment of the text.
   */
  heightMultiplier?: number
  /**
   * Specifies whether to use half leading for the text.
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
   * The baseline alignment of the text.
   */
  textBaseline?: TextBaseline
  /**
   * The spacing between words in the text.
   */
  wordSpacing?: number
}

export class Text extends Figure {
  declare style: TextStyle
  private builder: ParagraphBuilder
  private manager: FontMgr
  private paragraph: Paragraph
  width: number

  constructor(public text: string, options?: TextOptions) {
    options ??= {}
    super(options)
    this.width = options.width ?? 100
    options.style ??= {}
    this.style.backgroundColor = options.style.backgroundColor
    this.style.color = options.style.color
    this.style.decoration = options.style.decoration
    this.style.decorationColor = options.style.decorationColor
    this.style.decorationThickness = options.style.decorationThickness
    this.style.fontFamilies = options.style.fontFamilies
    this.style.fontSize = options.style.fontSize
    this.style.fontStyle = options.style.fontStyle
    this.style.foregroundColor = options.style.foregroundColor
    this.style.heightMultiplier = options.style.heightMultiplier
    this.style.halfLeading = options.style.halfLeading
    this.style.letterSpacing = options.style.letterSpacing
    this.style.locale = options.style.locale
    this.style.textBaseline = options.style.textBaseline
    this.style.wordSpacing = options.style.wordSpacing
  }

  init(ck: CanvasKit): void {
    super.init(ck)
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
    this.strokePaint.setStrokeWidth(this.style.borderWidth)
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)
    this.strokePaint.setAntiAlias(this.style.antiAlias)
    const dash = ck.PathEffect.MakeDash(
      this.style.interval,
      this.style.offset,
    )
    this.strokePaint.setPathEffect(dash)

    // Fill
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)
    this.fillPaint.setAntiAlias(this.style.antiAlias)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.manager = ck.FontMgr.FromData(...$source.fonts)
    const style = new ck.TextStyle(
      deepMerge(
        {
          backgroundColor: isUndefined(this.style.backgroundColor)
            ? ck.Color4f(1, 1, 1, 0)
            : this.style.backgroundColor.toFloat4(),
          color: isUndefined(this.style.color)
            ? ck.Color4f(0, 0, 0, 1)
            : this.style.color.toFloat4(),
          decorationColor: isUndefined(this.style.decorationColor)
            ? ck.Color4f(1, 1, 1, 0)
            : this.style.decorationColor.toFloat4(),
          foregroundColor: isUndefined(this.style.foregroundColor)
            ? ck.Color4f(1, 1, 1, 1)
            : this.style.foregroundColor.toFloat4(),
          textBaseline: isUndefined(this.style.textBaseline)
            ? ck.TextBaseline.Alphabetic
            : str2TextBaseline(ck, this.style.textBaseline),
        },
        this.style,
      ),
    )

    this.builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle({
        textStyle: {
          color: ck.WHITE,
        },
      }),
      this.manager,
    )
    const bg = new ck.Paint()
    this.builder.pushPaintStyle(style, this.style.border ? this.strokePaint : this.fillPaint, bg)
    this.builder.addText(this.text.toString())
    this.paragraph = this.builder.build()
    this.paragraph.layout(this.width)
  }

  draw(canvas: Canvas): void {
    canvas.drawParagraph(this.paragraph, 0, 0)
  }
}
