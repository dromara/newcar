import {
  $ck,
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

export interface inputItem {
  text: string
  style: TextStyle
}

export interface ParagraphOptions extends WidgetOptions {
  style?: ParagraphStyle
}

interface TextStyle {
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

export interface ParagraphStyle extends WidgetStyle {
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
}
export class Paragraph extends Widget {
  private text: inputItem[] = []
  private fontManager: FontMgr
  declare style: ParagraphStyle
  builder: ParagraphBuilder
  paragraph: ckParagraph

  constructor(text: (string | inputItem)[], options?: ParagraphOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.textStyle = new $ck.TextStyle({
      color: $ck.WHITE,
      fontFamilies: ["Roboto"],
      fontSize: 100
    })
    for (const item of text) {
      if (isString(item)) {
        this.text.push({
          text: item.toString(),
          style: {
            fontSize: 50
          }
        })
      } else {
        this.text.push(item as inputItem)
      }
    }
  }

  init(ck: CanvasKit) {
    // const response = await fetch()
    this.fontManager = ck.FontMgr.FromData(...$source.fonts)
    console.log($source.fonts)
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
