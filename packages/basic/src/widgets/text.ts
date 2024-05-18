import type {
  WidgetOptions,
  WidgetRange,

  WidgetStyle,
} from '@newcar/core'
import {
  $source,
  Widget,
} from '@newcar/core'
import {
  Color,
  deepMerge,
  isString,
  isUndefined,
  str2BlendMode,
  str2TextAlign,
  str2TextBaseline,
  str2TextDirection,
  str2TextHeightBehavior,
} from '@newcar/utils'
import type {
  Canvas,
  CanvasKit,
  FontMgr,
  FontStyle,
  Paint,
  ParagraphBuilder,
  StrutStyle,
  Paragraph as ckParagraph,
} from 'canvaskit-wasm'
import type {
  Shader,
  TextAlign,
  TextBaseline,
  TextDirection,

  TextHeightBehavior,
} from '@newcar/utils'

export interface InputItem {
  text: string
  style: TextItemStyle
}
/**
 * Represents the style properties that can be applied to a text item.
 */
export interface TextItemStyle {
  /**
   * The background color of the text item.
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

/**
 * Represents options that can be applied to a text widget.
 */
export interface TextOptions extends WidgetOptions {
  /**
   * The style properties to be applied to the text.
   */
  style?: TextStyle
}

/**
 * Represents the style properties that can be applied to text.
 */
export interface TextStyle extends WidgetStyle {
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
  /**
   * The width of the text.
   */
  width?: number
}

export class Text extends Widget {
  private text: InputItem[] = []
  private fontManager: FontMgr
  declare style: TextStyle
  private builder: ParagraphBuilder
  private paragraph: ckParagraph
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

  strokePaint: Paint
  fillPaint: Paint

  /**
   * Create a `Text` widget
   * @param text The text group/
   * @param inputOptions the options
   */
  constructor(
    text: (string | InputItem)[],
    private inputOptions?: TextOptions,
  ) {
    inputOptions ??= {}
    super(inputOptions)
    inputOptions.style ??= {}
    this.disableHinting = inputOptions.style.disableHinting ?? false
    this.ellipsis = inputOptions.style.ellipsis ?? null
    this.heightMultiplier = inputOptions.style.heightMultiplier ?? 1.0
    this.maxLines = inputOptions.style.maxLines ?? null
    this.replaceTabCharacters = inputOptions.style.replaceTabCharacters ?? true
    // this.strutStyle = inputOptions.style.strutStyle ?? null
    this.applyRoundingHack = inputOptions.style.applyRoundingHack ?? false
    this.style.width = inputOptions.style.width ?? 200
    this.style.borderColor = inputOptions.style.borderColor ?? Color.WHITE
    this.style.borderShader = inputOptions.style.borderShader
    this.style.borderWidth = inputOptions.style.borderWidth ?? 2
    this.style.fillColor = inputOptions.style.fillColor ?? Color.WHITE
    this.style.fillShader = inputOptions.style.fillShader
    this.style.fill = inputOptions.style.fill ?? true
    this.style.border = inputOptions.style.border ?? false
    this.style.interval = inputOptions.style.interval ?? [1, 0]
    this.style.offset = inputOptions.style.offset ?? 0
    for (const item of text) {
      if (isString(item)) {
        this.text.push({
          text: item.toString(),
          style: {
            fontSize: 50,
          },
        })
      }
      else {
        this.text.push(item as InputItem)
      }
    }
  }

  init(ck: CanvasKit) {
    // Stroke
    this.strokePaint = new ck.Paint()
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
    this.fillPaint = new ck.Paint()
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)
    this.fillPaint.setAntiAlias(this.style.antiAlias)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))

    this.textAlign = this.inputOptions.style.textAlign ?? 'left'
    this.textDirection = this.inputOptions.style.textDirection ?? 'ltr'
    this.textHeightBehavior
      = this.inputOptions.style.textHeightBehavior ?? 'all'
    this.fontManager = ck.FontMgr.FromData(...$source.fonts)
    this.builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle(
        deepMerge(
          {
            textAlign: str2TextAlign(ck, this.textAlign),
            textDirection: str2TextDirection(ck, this.textDirection),
            textHeightBehavior: str2TextHeightBehavior(
              ck,
              this.textHeightBehavior,
            ),
            textStyle: {
              color: ck.WHITE,
            },
          },
          this.style,
        ),
      ),
      this.fontManager,
    )
    for (const item of this.text) {
      const style = new ck.TextStyle(
        deepMerge(
          {
            backgroundColor: isUndefined(item.style.backgroundColor)
              ? ck.Color4f(1, 1, 1, 0)
              : item.style.backgroundColor.toFloat4(),
            color: isUndefined(item.style.color)
              ? ck.Color4f(1, 1, 1, 1)
              : item.style.color.toFloat4(),
            decorationColor: isUndefined(item.style.decorationColor)
              ? ck.Color4f(1, 1, 1, 0)
              : item.style.decorationColor.toFloat4(),
            foregroundColor: isUndefined(item.style.foregroundColor)
              ? ck.Color4f(1, 1, 1, 1)
              : item.style.foregroundColor.toFloat4(),
            textBaseline: isUndefined(item.style.textBaseline)
              ? ck.TextBaseline.Alphabetic
              : str2TextBaseline(ck, item.style.textBaseline),
          },
          item.style,
        ),
      )
      const bg = new ck.Paint()
      bg.setColor(style.backgroundColor)
      this.builder.pushPaintStyle(style, this.style.border ? this.strokePaint : this.fillPaint, bg)

      this.builder.addText(item.text)
      // TODO: Stroke and Fill
    }

    this.paragraph = this.builder.build()
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'style.borderColor': {
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        break
      }
      case 'style.borderShader': {
        this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
        break
      }
      case 'style.borderWidth': {
        this.strokePaint.setStrokeWidth(this.style.borderWidth)
        break
      }
      case 'style.fillColor': {
        this.fillPaint.setColor(this.style.fillColor.toFloat4())
        break
      }
      case 'style.fillShader': {
        this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
        break
      }
      case 'style.offset':
      case 'style.interval': {
        this.strokePaint.setPathEffect(
          ck.PathEffect.MakeDash(this.style.interval, this.style.offset),
        )
        this.predraw(ck, 'progress')
        break
      }
      case 'disableHinting':
      case 'ellipsis':
      case 'heightMultiplier':
      case 'maxLines':
      case 'replaceTabCharacters':
      case 'strutStyle':
      case 'textAlign':
      case 'textDirection':
      case 'textHeightBehavior':
      case 'applyRoundingHack':
      case 'textStyle': {
        this.builder = ck.ParagraphBuilder.Make(
          new ck.ParagraphStyle(
            deepMerge(this.style, {
              textAlign: str2TextAlign(ck, this.textAlign),
              textDirection: str2TextDirection(ck, this.textDirection),
              textHeightBehavior: str2TextHeightBehavior(
                ck,
                this.textHeightBehavior,
              ),
            }),
          ),
          this.fontManager,
        )
        break
      }
      case 'progress': {
        const totalLength = this.text.reduce((sum, item) => sum + item.text.length, 0)
        const charsToShow = Math.floor(this.progress * totalLength)
        let currentLength = 0

        this.builder.reset() // 清除现有的builder内容

        for (const item of this.text) {
          if (currentLength >= charsToShow)
            break

          const remainingChars = charsToShow - currentLength
          const textPart = remainingChars >= item.text.length ? item.text : item.text.substring(0, remainingChars)

          const style = new ck.TextStyle(
            deepMerge({
              color: ck.Color4f(1, 1, 1, 1),
            }, item.style as TextStyle),
          )
          // console.log(style)
          const bg = new ck.Paint()
          bg.setColor(style.backgroundColor)
          this.builder.pushPaintStyle(
            style,
            this.style.border ? this.strokePaint : this.fillPaint,
            bg,
          )
          this.builder.addText(textPart)

          currentLength += item.text.length
        }

        this.paragraph = this.builder.build()
        this.paragraph.layout(this.style.width)
        break
      }
    }
  }

  draw(canvas: Canvas): void {
    this.paragraph.layout(this.style.width)
    canvas.drawParagraph(this.paragraph, 0, 0)
  }

  calculateIn(x: number, y: number): boolean {
    return x >= 0
      && x <= this.style.width
      && y >= 0
      && y <= this.paragraph.getHeight()
  }

  calculateRange(): WidgetRange {
    return [
      0,
      0,
      this.style.width,
      this.paragraph.getHeight(),
    ]
  }

  // TODO: Stroke and Fill Mode
}
