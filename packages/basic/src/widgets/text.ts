import {
  $source,
  AsyncWidget,
  AsyncWidgetResponse,
  Widget,
  WidgetOptions,
  WidgetStyle,
} from '@newcar/core'
import { Color, isString, isUndefined } from '@newcar/utils'
import type {
  CanvasKit,
  FontMgr,
  StrutStyle,
  TextAlign,
  TextDirection,
  TextHeightBehavior,
  TextStyle as ckTextStyle,
  ParagraphStyle as ckParagraphStyle,
  DecorationStyle,
  TextFontFeatures,
  FontStyle,
  TextFontVariations,
  TextShadow,
  TextBaseline,
  ParagraphBuilder,
  Canvas,
  Paragraph as ckParagraph,
} from 'canvaskit-wasm'

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
  decorationStyle?: DecorationStyle
  fontFamilies?: string[]
  fontFeatures?: TextFontFeatures[]
  fontSize?: number
  fontStyle?: FontStyle
  fontVariations?: TextFontVariations[]
  foregroundColor?: Color
  heightMultiplier?: number
  halfLeading?: boolean
  letterSpacing?: number
  locale?: string
  shadows?: TextShadow[]
  textBaseline?: TextBaseline
  wordSpacing?: number
}

export interface TextOptions extends WidgetOptions {
  style?: TextStyle
}

export interface TextStyle extends WidgetStyle {
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
  textStyle?: ckTextStyle
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
  textStyle?: ckTextStyle
  width?: number

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
    this.strutStyle = inputOptions.style.strutStyle ?? null
    this.applyRoundingHack = inputOptions.style.applyRoundingHack ?? false
    this.width = inputOptions.style.width ?? 1000
    for (const item of text) {
      if (isString(item)) {
        this.text.push({
          text: item.toString(),
          style: {
            fontSize: 50,
          },
        })
      } else {
        this.text.push(item as InputItem)
      }
    }
  }

  init(ck: CanvasKit) {
    this.style.textStyle =
      this.inputOptions.style.textStyle ?? new ck.TextStyle({})
    this.textAlign = this.inputOptions.style.textAlign ?? ck.TextAlign.Start
    this.textDirection =
      this.inputOptions.style.textDirection ?? ck.TextDirection.LTR
    this.textHeightBehavior =
      this.inputOptions.style.textHeightBehavior ?? ck.TextHeightBehavior.All
    this.fontManager = ck.FontMgr.FromData(...$source.fonts)
    this.builder = ck.ParagraphBuilder.Make(
      new ck.ParagraphStyle(this.style),
      this.fontManager,
    )
    for (const item of this.text) {
      this.builder.pushStyle(
        new ck.TextStyle({
          ...item.style,
          ...{
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
          },
        }),
      )
      this.builder.addText(item.text)
      // TODO: Stroke and Fill
    }

    this.paragraph = this.builder.build()
  }

  draw(canvas: Canvas): void {
    this.paragraph.layout(1000000)
    canvas.drawParagraph(this.paragraph, 0, 0)
  }
}
