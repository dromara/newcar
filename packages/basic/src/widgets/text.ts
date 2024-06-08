import type { WidgetRange } from '@newcar/core'
import { $source } from '@newcar/core'
import type { TextAlign, TextBaseline } from '@newcar/utils'
import { Color, str2BlendMode, str2TextAlign, str2TextBaseline } from '@newcar/utils'
import type {
  Canvas,
  CanvasKit,
  FontMgr,
  FontStyle,
  LineMetrics,
  Paint,
  Paragraph,
  ParagraphBuilder,
  TextStyle as ckTextStyle,
} from 'canvaskit-wasm'
import type { ConvertToProp } from '../../../core/src/prop'
import { changed, changedMany } from '../../../core/src/prop'
import { Figure, type FigureOptions, type FigureStyle } from './figures/figure'

export interface TextOptions extends FigureOptions {
  style?: TextStyle
  width?: number
  /**
   * The alignment of the text within its container.
   */
  textAlign?: TextAlign
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
  declare style: ConvertToProp<TextStyle>
  private builder: ParagraphBuilder
  private manager: FontMgr
  private paragraph: Paragraph
  width: number
  textAlign: TextAlign

  backgroundPaint: Paint
  textStyle: ckTextStyle

  constructor(public text: string, options?: TextOptions) {
    options ??= {}
    super({
      ...options,
      style: {
        ...options?.style,
        borderColor: options?.style?.foregroundColor ?? Color.WHITE,
        fillColor: options?.style?.foregroundColor ?? Color.WHITE,
      },
    })
    this.width = options.width ?? 100
    options.style ??= {}
    this.textAlign = options.textAlign ?? 'left'
    this.style.backgroundColor.value = options.style.backgroundColor ?? Color.TRANSPARENT
    this.style.color.value = options.style.color ?? Color.WHITE
    this.style.decoration.value = options.style.decoration
    this.style.decorationColor.value = options.style.decorationColor ?? Color.TRANSPARENT
    this.style.decorationThickness.value = options.style.decorationThickness
    this.style.fontFamilies.value = options.style.fontFamilies
    this.style.fontSize.value = options.style.fontSize
    this.style.fontStyle.value = options.style.fontStyle
    this.style.foregroundColor.value = options.style.foregroundColor ?? Color.WHITE
    this.style.heightMultiplier.value = options.style.heightMultiplier
    this.style.halfLeading.value = options.style.halfLeading
    this.style.letterSpacing.value = options.style.letterSpacing
    this.style.locale.value = options.style.locale
    this.style.textBaseline.value = options.style.textBaseline ?? 'alphabetic'
    this.style.wordSpacing.value = options.style.wordSpacing
  }

  init(ck: CanvasKit): void {
    super.init(ck)
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.value.toFloat4())
    this.strokePaint.setShader(this.style.borderShader.value.toCanvasKitShader(ck) ?? null)
    this.strokePaint.setStrokeWidth(this.style.borderWidth.value)
    this.strokePaint.setAlphaf(this.style.transparency.value * this.style.borderColor.value.alpha)
    this.strokePaint.setAntiAlias(this.style.antiAlias.value)
    const dash = ck.PathEffect.MakeDash(
      this.style.interval.value,
      this.style.offset.value,
    )
    this.strokePaint.setPathEffect(dash)

    // Fill
    this.fillPaint.setColor(this.style.fillColor.value.toFloat4())
    this.fillPaint.setShader(this.style.fillShader.value.toCanvasKitShader(ck) ?? null)
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setAlphaf(this.style.transparency.value * this.style.fillColor.value.alpha)
    this.fillPaint.setAntiAlias(this.style.antiAlias.value)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode.value))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode.value))

    this.backgroundPaint = new ck.Paint()
    this.backgroundPaint.setColor(this.style.backgroundColor.value.toFloat4())

    this.manager = ck.FontMgr.FromData(...$source.fonts)
    this.textStyle = new ck.TextStyle(
      {
        ...Object.values(this.style).map(v => v.value),
        backgroundColor: this.style.backgroundColor.value.toFloat4(),
        color: this.style.color.value.toFloat4(),
        decorationColor: this.style.decorationColor.value.toFloat4(),
        foregroundColor: this.style.foregroundColor.value.toFloat4(),
        textBaseline: str2TextBaseline(ck, this.style.textBaseline.value),
      },
    )

    this.builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle({
        textAlign: str2TextAlign(ck, this.textAlign),
        textStyle: {
          color: this.style.foregroundColor.value.toFloat4(),
        },
      }),
      this.manager,
    )
    this.builder.pushPaintStyle(this.textStyle, this.style.border ? this.strokePaint : this.fillPaint, this.backgroundPaint)
    this.builder.addText(this.text.toString())
    this.paragraph = this.builder.build()
    this.paragraph.layout(this.width)

    changed(this.style.offset, (offset) => {
      const dash = ck.PathEffect.MakeDash(
        this.style.interval.value,
        offset.value,
      )
      this.strokePaint.setPathEffect(dash)
    })
    changed(this.style.interval, (interval) => {
      const dash = ck.PathEffect.MakeDash(
        interval.value,
        this.style.offset.value,
      )
      this.strokePaint.setPathEffect(dash)
    })

    changedMany(
      [this.textStyle, this.style.border],
      ([textStyle, border]) => {
        this.builder.reset()
        this.builder.pushPaintStyle(textStyle.value, border.value ? this.strokePaint : this.fillPaint, this.backgroundPaint)
        this.builder.addText(this.text.toString())
        this.paragraph = this.builder.build()
        this.paragraph.layout(this.width)
      },
    )
  }

  draw(canvas: Canvas): void {
    canvas.drawParagraph(this.paragraph, 0, 0)
  }

  predraw(ck: CanvasKit, propertyChanged: string) {
    super.predraw(ck, propertyChanged)
    switch (propertyChanged) {
      case 'style.interval':
      case 'style.offset':
      {
        const dash = ck.PathEffect.MakeDash(
          this.style.interval,
          this.style.offset,
        )
        this.strokePaint.setPathEffect(dash)
      }
    }

    this.builder.reset()
    this.builder.pushPaintStyle(this.textStyle, this.style.border ? this.strokePaint : this.fillPaint, this.backgroundPaint)
    this.builder.addText(this.text.toString())
    this.paragraph = this.builder.build()
    this.paragraph.layout(this.width)
  }

  calculateIn(x: number, y: number): boolean {
    const range = this.calculateRange()
    return x >= range[0]
      && y >= range[1]
      && x <= range[2]
      && y <= range[3]
  }

  calculateRange(): WidgetRange {
    const lineMetrics = this.paragraph?.getLineMetrics()
    if (lineMetrics === undefined)
      return [0, 0, this.width, 0]
    return [
      Math.min(...lineMetrics.map(line => line.left)),
      0,
      Math.max(...lineMetrics.map(line => line.width + line.left)),
      this.paragraph.getHeight(),
    ]
  }

  getLineMetrics(): LineMetrics[] {
    return this.paragraph?.getLineMetrics()
  }
}
