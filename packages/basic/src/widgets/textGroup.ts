import type { WidgetRange } from '@newcar/core'
import { $source } from '@newcar/core'
import type { Shader, TextAlign, TextDirection, TextHeightBehavior } from '@newcar/utils'
import { Color, str2BlendMode, str2TextAlign, str2TextBaseline, str2TextDirection, str2TextHeightBehavior } from '@newcar/utils'
import type { Canvas, CanvasKit, FontMgr, LineMetrics, Paragraph, ParagraphBuilder, StrutStyle } from 'canvaskit-wasm'
import { Figure, type FigureOptions, type FigureStyle } from './figures/figure'
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
  declare style: TextGroupStyle
  private builder: ParagraphBuilder
  private manager: FontMgr
  private paragraph: Paragraph
  width: number
  disableHinting?: boolean
  ellipsis?: string
  heightMultiplier?: number
  maxLines?: number
  replaceTabCharacters?: boolean
  strutStyle?: StrutStyle
  textAlign?: TextAlign
  textDirection?: TextDirection
  textHeightBehavior?: TextHeightBehavior
  applyRoundingHack?: boolean
  offset?: number
  interval?: number[]

  constructor(public texts: Text[], options?: TextGroupOptions) {
    options ??= {}
    super(options)
    this.width = options.width ?? 100
    options.style ??= {}
    this.style.color = options.style.color
    this.style.heightMultiplier = options.style.heightMultiplier
    this.textAlign = options.style.textAlign ?? 'left'
    this.textDirection = options.style.textDirection ?? 'ltr'
    this.textHeightBehavior = options.style.textHeightBehavior ?? 'all'
    this.disableHinting = options.style.disableHinting ?? false
    this.ellipsis = options.style.ellipsis ?? null
    this.heightMultiplier = options.style.heightMultiplier ?? 1.0
    this.maxLines = options.style.maxLines ?? null
    this.replaceTabCharacters = options.style.replaceTabCharacters ?? true
    // this.strutStyle = inputOptions.style.strutStyle ?? null
    this.applyRoundingHack = options.style.applyRoundingHack ?? false
    this.style.borderColor = options.style.borderColor ?? Color.WHITE
    this.style.borderShader = options.style.borderShader
    this.style.borderWidth = options.style.borderWidth ?? 2
    this.style.fillColor = options.style.fillColor ?? Color.WHITE
    this.style.fillShader = options.style.fillShader
    this.style.fill = options.style.fill ?? true
    this.style.border = options.style.border ?? false
    this.style.interval = options.style.interval ?? [1, 0]
    this.style.offset = options.style.offset ?? 0
  }

  init(ck: CanvasKit): void {
    super.init(ck)
    this.manager = ck.FontMgr.FromData(...$source.fonts)

    this.builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle(
        {
          ...this.style,
          textAlign: str2TextAlign(ck, this.textAlign),
          textDirection: str2TextDirection(ck, this.textDirection),
          textHeightBehavior: str2TextHeightBehavior(
            ck,
            this.textHeightBehavior,
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
          ...text.style,
          backgroundColor: text.style.backgroundColor.toFloat4(),
          color: text.style.color.toFloat4(),
          decorationColor: text.style.decorationColor.toFloat4(),
          foregroundColor: text.style.foregroundColor.toFloat4(),
          textBaseline: str2TextBaseline(ck, text.style.textBaseline),
        },
      )
      const bg = new ck.Paint()
      bg.setColor(style.backgroundColor)

      // this.builder.pushStyle(style)
      const paint = new ck.Paint()
      paint.setStyle(text.style.border ? ck.PaintStyle.Stroke : ck.PaintStyle.Fill)
      paint.setColor(text.style.borderColor.toFloat4())
      paint.setShader(text.style.borderShader?.toCanvasKitShader(ck) ?? null)
      paint.setStrokeWidth(text.style.borderWidth)
      paint.setAlphaf(text.style.transparency * this.style.borderColor.alpha)
      paint.setAntiAlias(text.style.antiAlias)
      paint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
      if (text.style.border) {
        const dash = ck.PathEffect.MakeDash(
          text.style.interval,
          text.style.offset,
        )
        paint.setPathEffect(dash)
      }

      paint.setColor(style.color)
      this.builder.pushPaintStyle(style, paint, bg)
      this.builder.addText(text.text)
      // TODO: Stroke and Fill
    }

    this.paragraph = this.builder.build()
    this.paragraph.layout(this.width)
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
