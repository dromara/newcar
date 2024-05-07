import type {
  WidgetOptions,
  WidgetStyle,
  // eslint-disable-next-line import/no-duplicates
} from '@newcar/core'
import {
  $source,
  Widget,
  // eslint-disable-next-line import/no-duplicates
} from '@newcar/core'
import { Color, deepMerge, isString, isUndefined } from '@newcar/utils'
import type {
  Canvas,
  CanvasKit,
  DecorationStyle,
  FontMgr,
  FontStyle,
  Paint,
  ParagraphBuilder,
  StrutStyle,
  TextFontFeatures,
  TextFontVariations,
  TextShadow,
  Paragraph as ckParagraph,
} from 'canvaskit-wasm'
import type {
  TextAlign,
  TextBaseline,
  TextDirection,
  TextHeightBehavior,
  // eslint-disable-next-line import/no-duplicates
} from '@newcar/core'
import {
  str2TextAlign,
  str2TextBaseline,
  str2TextDirection,
  str2TextHeightBehavior,
  // eslint-disable-next-line import/no-duplicates
} from '@newcar/core'
// eslint-disable-next-line import/no-duplicates
import { str2BlendMode } from '@newcar/core'

export interface InputItem {
  text: string
  style: TextItemStyle
}
interface TextItemStyle {
  backgroundColor?: Color
  color?: Color
  decoration?: number
  decorationColor?: Color
  decorationThickness?: number
  fontFamilies?: string[]
  fontSize?: number
  fontStyle?: FontStyle
  foregroundColor?: Color
  heightMultiplier?: number
  halfLeading?: boolean
  letterSpacing?: number
  locale?: string
  textBaseline?: TextBaseline
  wordSpacing?: number
}

export interface TextOptions extends WidgetOptions {
  style?: TextStyle
}

export interface TextStyle extends WidgetStyle {
  offset?: number
  interval?: number[]
  fill?: boolean
  border?: boolean
  fillColor?: Color
  borderWidth?: number
  borderColor?: Color
  disableHinting?: boolean
  ellipsis?: string
  heightMultiplier?: number
  maxLines?: number
  replaceTabCharacters?: boolean
  textAlign?: TextAlign
  textDirection?: TextDirection
  textHeightBehavior?: TextHeightBehavior
  applyRoundingHack?: boolean
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
    this.style.borderWidth = inputOptions.style.borderWidth ?? 2
    this.style.fillColor = inputOptions.style.fillColor ?? Color.WHITE
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
      case 'style.borderWidth': {
        this.strokePaint.setStrokeWidth(this.style.borderWidth)
        break
      }
      case 'style.fillColor': {
        this.fillPaint.setColor(this.style.fillColor.toFloat4())
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

  isIn(x: number, y: number): boolean {
    let top = 0
    let bottom = 0

    for (const item of this.text) {
      bottom += item.style.fontSize // Add the height of each line

      // Check if the coordinates (x, y) are within the bounding box of the current line
      if (x >= 0 && x <= this.style.width && y >= top && y <= bottom)
        return true

      top = bottom // Set the top of the next line to the bottom of the current line
    }

    return false
  }

  // TODO: Stroke and Fill Mode
}
