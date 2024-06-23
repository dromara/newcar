import type { ConvertToProp, Ref, WidgetRange } from '@newcar/core'
import { $source, normalize, reactive, ref } from '@newcar/core'
import type { Shader, TextAlign, TextDirection, TextHeightBehavior } from '@newcar/utils'
import { Color, str2BlendMode, str2TextAlign, str2TextBaseline, str2TextDirection, str2TextHeightBehavior } from '@newcar/utils'
import type { Canvas, CanvasKit, FontMgr, LineMetrics, Paragraph, ParagraphBuilder, StrutStyle } from 'canvaskit-wasm'
import { Figure, type FigureOptions, type FigureStyle } from './figure'
import type { Text } from './text'

export interface TextGroupOptions extends FigureOptions {
  style?: TextGroupStyle
  width?: number
}

export interface TextGroupStyle extends FigureStyle {
  /**
   * The offset of the text.
   */
  offset?: number
  /**
   * The interval for the text.
   */
  interval?: number[]
  /**
   * Specifies whether the text should be filled.
   */
  fill?: boolean
  /**
   * Specifies whether to draw a border around the text.
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

export class TextGroup extends Figure {
  declare style: ConvertToProp<TextGroupStyle>
  private builder: ParagraphBuilder
  private manager: FontMgr
  private paragraph: Paragraph
  width: Ref<number>
  disableHinting?: Ref<boolean>
  ellipsis?: Ref<string>
  heightMultiplier?: Ref<number>
  maxLines?: Ref<number>
  replaceTabCharacters?: Ref<boolean>
  strutStyle?: StrutStyle
  textAlign?: Ref<TextAlign>
  textDirection?: Ref<TextDirection>
  textHeightBehavior?: Ref<TextHeightBehavior>
  applyRoundingHack?: Ref<boolean>
  offset?: Ref<number>
  interval?: Ref<number[]>

  constructor(public texts: Text[], options?: TextGroupOptions) {
    options ??= {}
    super(options)
    this.width = ref(options.width ?? 100)
    options.style ??= {}
    this.style.color = reactive(options.style.color)
    this.style.heightMultiplier = ref(options.style.heightMultiplier)
    this.textAlign = ref(options.style.textAlign ?? 'left')
    this.textDirection = ref(options.style.textDirection ?? 'ltr')
    this.textHeightBehavior = ref(options.style.textHeightBehavior ?? 'all')
    this.disableHinting = ref(options.style.disableHinting ?? false)
    this.ellipsis = ref(options.style.ellipsis ?? null)
    this.heightMultiplier = ref(options.style.heightMultiplier ?? 1.0)
    this.maxLines = ref(options.style.maxLines ?? null)
    this.replaceTabCharacters = ref(options.style.replaceTabCharacters ?? true)
    // this.strutStyle = ref(inputOptions.style.strutStyle ?? null)
    this.applyRoundingHack = ref(options.style.applyRoundingHack ?? false)
    this.style.borderColor = reactive(options.style.borderColor ?? Color.WHITE)
    this.style.borderShader = reactive(options.style.borderShader)
    this.style.borderWidth = ref(options.style.borderWidth ?? 2)
    this.style.fillColor = reactive(options.style.fillColor ?? Color.WHITE)
    this.style.fillShader = reactive(options.style.fillShader)
    this.style.fill = ref(options.style.fill ?? true)
    this.style.border = ref(options.style.border ?? false)
    this.style.interval = ref(options.style.interval ?? [1, 0])
    this.style.offset = ref(options.style.offset ?? 0)
  }

  init(ck: CanvasKit): void {
    super.init(ck)
    this.manager = ck.FontMgr.FromData(...$source.fonts)

    this.builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle(
        {
          ...normalize(this.style),
          textAlign: str2TextAlign(ck, this.textAlign.value),
          textDirection: str2TextDirection(ck, this.textDirection.value),
          textHeightBehavior: str2TextHeightBehavior(
            ck,
            this.textHeightBehavior.value,
          ),
          textStyle: {
            color: Color.WHITE.toFloat4(),
          },
        },
      ),
      this.manager,
    )

    for (const text of this.texts) {
      const style = new ck.TextStyle(
        {
          ...normalize(text.style),
          backgroundColor: text.style.backgroundColor.toFloat4(),
          color: text.style.color.toFloat4(),
          decorationColor: text.style.decorationColor.toFloat4(),
          foregroundColor: text.style.foregroundColor.toFloat4(),
          textBaseline: str2TextBaseline(ck, text.style.textBaseline.value),
        },
      )
      const bg = new ck.Paint()
      bg.setColor(style.backgroundColor)

      // this.builder.pushStyle(style)
      const paint = new ck.Paint()
      paint.setStyle(text.style.border ? ck.PaintStyle.Stroke : ck.PaintStyle.Fill)
      paint.setColor(text.style.borderColor.toFloat4())
      paint.setShader(text.style.borderShader?.toCanvasKitShader(ck) ?? null)
      paint.setStrokeWidth(text.style.borderWidth.value)
      paint.setAlphaf(text.style.transparency.value * this.style.borderColor.alpha)
      paint.setAntiAlias(text.style.antiAlias.value)
      paint.setBlendMode(str2BlendMode(ck, this.style.blendMode.value))
      if (text.style.border) {
        const dash = ck.PathEffect.MakeDash(
          text.style.interval.value,
          text.style.offset.value,
        )
        paint.setPathEffect(dash)
      }

      paint.setColor(style.color)
      this.builder.pushPaintStyle(style, paint, bg)
      this.builder.addText(text.text.value)
      // TODO: Stroke and Fill
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
