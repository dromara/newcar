import type { ConvertToProp, Ref, WidgetRange } from '@newcar/core'
import { $source, changed, reactive, ref } from '@newcar/core'
import type { TextAlign, TextBaseline } from '@newcar/utils'
import { Color, isNull, str2TextAlign, str2TextBaseline } from '@newcar/utils'
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
import { Figure, type FigureOptions, type FigureStyle } from './figure'

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
  fontFamily?: ArrayBuffer
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
  builder: ParagraphBuilder
  private manager: FontMgr
  private paragraph: Paragraph
  width: Ref<number>
  textAlign: TextAlign

  backgroundPaint: Paint
  textStyle: ckTextStyle
  text: Ref<string | null>

  constructor(text: string, options?: TextOptions) {
    options ??= {}
    super({
      ...options,
      style: {
        ...options?.style,
        borderColor: options?.style?.foregroundColor ?? Color.WHITE,
        fillColor: options?.style?.foregroundColor ?? Color.WHITE,
      },
    })
    this.width = ref(options.width ?? Number.POSITIVE_INFINITY)
    options.style ??= {}
    this.textAlign = options.textAlign ?? 'left'
    this.style.backgroundColor = reactive(options.style.backgroundColor ?? Color.TRANSPARENT)
    this.style.color = reactive(options.style.color ?? Color.WHITE)
    this.style.decoration = ref(options.style.decoration ?? 0)
    this.style.decorationColor = reactive(options.style.decorationColor ?? Color.TRANSPARENT)
    this.style.decorationThickness = ref(options.style.decorationThickness ?? 0)
    this.style.fontFamily = reactive(options.style.fontFamily)
    this.style.fontSize = ref(options.style.fontSize ?? 50)
    this.style.fontStyle = reactive(options.style.fontStyle)
    this.style.foregroundColor = reactive(options.style.foregroundColor ?? Color.WHITE)
    this.style.heightMultiplier = ref(options.style.heightMultiplier)
    this.style.halfLeading = ref(options.style.halfLeading)
    this.style.letterSpacing = ref(options.style.letterSpacing)
    this.style.locale = ref(options.style.locale)
    this.style.textBaseline = ref(options.style.textBaseline ?? 'alphabetic')
    this.style.wordSpacing = ref(options.style.wordSpacing)
    this.text = ref(text)
  }

  init(ck: CanvasKit): void {
    super.init(ck)

    this.backgroundPaint = new ck.Paint()
    this.backgroundPaint.setColor(this.style.backgroundColor.toFloat4())

    this.manager = ck.FontMgr.FromData(...[this.style.fontFamily, ...$source.fonts])
    this.textStyle = reactive(new ck.TextStyle(
      {
        backgroundColor: this.style.backgroundColor.toFloat4(),
        color: this.style.color.toFloat4(),
        decorationColor: this.style.decorationColor.toFloat4(),
        foregroundColor: this.style.foregroundColor.toFloat4(),
        textBaseline: str2TextBaseline(ck, this.style.textBaseline.value),
        fontSize: this.style.fontSize.value,
        fontStyle: this.style.fontStyle,
        heightMultiplier: this.style.heightMultiplier.value,
        halfLeading: this.style.halfLeading.value,
        letterSpacing: this.style.letterSpacing.value,
        locale: this.style.locale.value,
        wordSpacing: this.style.wordSpacing.value,
        decoration: this.style.decoration.value,
        decorationThickness: this.style.decorationThickness.value,
      },
    ))

    this.builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle({
        textAlign: str2TextAlign(ck, this.textAlign),
        textStyle: {
          color: this.style.foregroundColor.toFloat4(),
        },
      }),
      this.manager,
    )
    this.builder.pushPaintStyle(this.textStyle, this.style.border.value ? this.strokePaint : this.fillPaint, this.backgroundPaint)
    this.builder.addText(this.text.value)
    this.paragraph = this.builder.build()
    this.paragraph.layout(this.width.value)

    changed(this.style.offset, () => this.rebuildText(ck))
    changed(this.style.interval, () => this.rebuildText(ck))
    changed(this.style.border, () => this.rebuildText(ck))
    changed(this.width, () => this.rebuildText(ck))
    changed(this.style.backgroundColor, () => this.rebuildText(ck))
    changed(this.style.color, () => this.rebuildText(ck))
    changed(this.style.decorationColor, () => this.rebuildText(ck))
    changed(this.style.decorationThickness, () => this.rebuildText(ck))
    changed(this.style.fontFamily, () => this.rebuildText(ck))
    changed(this.style.fontSize, () => this.rebuildText(ck))
    changed(this.style.fontStyle, () => this.rebuildText(ck))
    changed(this.style.heightMultiplier, () => this.rebuildText(ck))
    changed(this.style.halfLeading, () => this.rebuildText(ck))
    changed(this.style.letterSpacing, () => this.rebuildText(ck))
    changed(this.style.locale, () => this.rebuildText(ck))
    changed(this.style.transparency, () => this.rebuildText(ck))
    changed(this.text, () => this.rebuildText(ck))
  }

  rebuildText(ck: CanvasKit) {
    this.builder.reset()
    if (!isNull(this.text.value)) {
      this.textStyle = new ck.TextStyle(
        {
          backgroundColor: this.style.backgroundColor.toFloat4(),
          color: this.style.color.toFloat4(),
          decorationColor: this.style.decorationColor.toFloat4(),
          foregroundColor: this.style.foregroundColor.toFloat4(),
          textBaseline: str2TextBaseline(ck, this.style.textBaseline.value),
          fontSize: this.style.fontSize.value,
          fontStyle: this.style.fontStyle,
          heightMultiplier: this.style.heightMultiplier.value,
          halfLeading: this.style.halfLeading.value,
          letterSpacing: this.style.letterSpacing.value,
          locale: this.style.locale.value,
          wordSpacing: this.style.wordSpacing.value,
          decoration: this.style.decoration.value,
          decorationThickness: this.style.decorationThickness.value,
        },
      )
      this.builder.pushPaintStyle(this.textStyle, this.style.border.value ? this.strokePaint : this.fillPaint, this.backgroundPaint)
      this.builder.addText(this.text.value)
    }
    this.paragraph = this.builder.build()
    this.paragraph.layout(this.width.value)
  }

  draw(canvas: Canvas): void {
    canvas.drawParagraph(this.paragraph, 0, 0)
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
      return [0, 0, this.width.value, 0]
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
