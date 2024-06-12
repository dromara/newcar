import type {
  Canvas,
  CanvasKit,
  Paragraph,
  ParagraphBuilder,
  TextStyle,
} from 'canvaskit-wasm'
import type { WidgetOptions } from '@newcar/core'
import { $source, Widget } from '@newcar/core'
import { Color } from '@newcar/utils'

export interface MarkdownOptions extends WidgetOptions {
  textStyle?: TextStyle
  width?: number
}

export class Markdown extends Widget {
  private paragraph: Paragraph
  private textStyle: TextStyle
  private width: number

  constructor(public text: string, options: MarkdownOptions) {
    super(options)
    this.textStyle = options.textStyle || {
      color: Color.WHITE.toFloat4(),
      fontSize: 16,
    }
    this.width = options.width || 500
  }

  init(ck: CanvasKit): void {
    const fontManager = ck.FontMgr.FromData(...$source.fonts)!
    const paragraphStyle = new ck.ParagraphStyle({
      textStyle: {
        fontFamilies: [fontManager.getFamilyName(0)],
        ...this.textStyle,
      },
    })
    const builder = ck.ParagraphBuilder.Make(
      paragraphStyle,
      ck.FontMgr.FromData(...$source.fonts)!,
    )

    this.parseMarkdown(this.text, builder, ck)

    this.paragraph = builder.build()
    this.paragraph.layout(this.width)
  }

  draw(canvas: Canvas): void {
    canvas.drawParagraph(this.paragraph, 0, 0)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    if (propertyChanged === 'text' || propertyChanged.match('textStyle.'))
      this.init(ck)
  }

  private parseMarkdown(
    text: string,
    builder: ParagraphBuilder,
    ck: CanvasKit,
  ) {
    const parseInline = (line: string, currentStyle: TextStyle, ck: CanvasKit, builder: ParagraphBuilder, startIndex: number = 0) => {
      const regex = /\*\*(.*?)\*\*|__(.*?)__|\*(.*?)\*|_(.*?)_|~~(.*?)~~|\+\+(.*?)\+\+|`(.*?)`/
      const match = regex.exec(line.substring(startIndex))

      if (!match) {
        builder.addText(line.substring(startIndex))
        return
      }
      if (match.index + startIndex > startIndex)
        builder.addText(line.substring(startIndex, match.index + startIndex))

      const matchedText = match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? match[6] ?? match[7]
      const styleUpdate = { ...currentStyle }

      if (match[0].startsWith('**') || match[0].startsWith('__'))
        styleUpdate.fontStyle = { ...(styleUpdate.fontStyle || {}), weight: ck.FontWeight.Bold }
      else if (match[0].startsWith('*') || match[0].startsWith('_'))
        styleUpdate.fontStyle = { ...(styleUpdate.fontStyle || {}), slant: ck.FontSlant.Italic }
      else if (match[0].startsWith('~~'))
        styleUpdate.decoration = ck.LineThroughDecoration
      else if (match[0].startsWith('++'))
        styleUpdate.decoration = ck.UnderlineDecoration
      else if (match[0].startsWith('`'))
        styleUpdate.backgroundColor = ck.Color(211, 211, 211, 0.3)
      builder.pushStyle(new ck.TextStyle(styleUpdate))
      builder.addText(matchedText)
      builder.pop()
      parseInline(line, currentStyle, ck, builder, match.index + match[0].length + startIndex)
    }

    const lines = text.split('\n')
    lines.forEach((line) => {
      if (line.startsWith('# ')) {
        const titleStyle = { fontSize: 24, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(titleStyle))
        parseInline(line.slice(2), titleStyle, ck, builder)
        builder.pop()
      }
      else if (line.startsWith('## ')) {
        const titleStyle = { fontSize: 21, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(titleStyle))
        parseInline(line.slice(2), titleStyle, ck, builder)
        builder.pop()
      }
      else if (line.startsWith('### ')) {
        const titleStyle = { fontSize: 18, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(titleStyle))
        parseInline(line.slice(2), titleStyle, ck, builder)
        builder.pop()
      }
      else if (line.startsWith('#### ')) {
        const titleStyle = { fontSize: 15, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(titleStyle))
        parseInline(line.slice(2), titleStyle, ck, builder)
        builder.pop()
      }
      else if (line.startsWith('##### ')) {
        const titleStyle = { fontSize: 12, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(titleStyle))
        parseInline(line.slice(2), titleStyle, ck, builder)
        builder.pop()
      }
      else if (line.startsWith('###### ')) {
        const titleStyle = { fontSize: 9, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(titleStyle))
        parseInline(line.slice(2), titleStyle, ck, builder)
        builder.pop()
      }
      else if (line.match(/( +)?- .+/) || line.match(/( +)? \+.+/) || line.match(/( +)? \* .+/)) {
        const listStyle = { fontSize: 16, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(listStyle))
        parseInline(line.replace(/(.+)?([\-*+])/, '·'), listStyle, ck, builder)
        builder.pop()
      }
      else {
        parseInline(line, this.textStyle, ck, builder)
      }
      builder.addText('\n')
    })
  }

  private handleImage(
    markdownLine: string,
    builder: ParagraphBuilder,
    _ck: CanvasKit,
  ) {
    const regex = /!\[(.*?)\]\((.*?)\)/
    const match = markdownLine.match(regex)
    if (match) {
      const altText = match[1]
      const imageUrl = match[2]
      builder.addText(`[Image: ${altText} at ${imageUrl}]`)
    }
  }
}
