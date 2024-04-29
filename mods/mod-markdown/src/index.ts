import type {
  Canvas,
  CanvasKit,
  ParagraphBuilder,
  TextStyle,
} from 'canvaskit-wasm'
import type { WidgetOptions } from '@newcar/core'
import { $source, Widget } from '@newcar/core'
import { Color } from '@newcar/utils'

export interface MarkdownOptions extends WidgetOptions {
  textStyle?: TextStyle
  width?: number // 宽度用于布局和换行
}

export class Markdown extends Widget {
  private paragraph: any // 这将是CanvasKit的Paragraph对象
  private textStyle: TextStyle
  private width: number

  constructor(public text: string, options: MarkdownOptions) {
    super(options)
    this.textStyle = options.textStyle || {
      color: Color.WHITE.toFloat4(),
      fontSize: 16,
    }
    this.width = options.width || 500 // 默认宽度
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
    // 重新构建段落当文本或样式更改
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
        // 如果没有找到更多匹配，添加剩余的文本
        builder.addText(line.substring(startIndex))
        return
      }

      // 添加匹配之前的文本
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
        styleUpdate.backgroundColor = ck.Color(211, 211, 211, 1)

      // 应用当前匹配的样式
      builder.pushStyle(new ck.TextStyle(styleUpdate))
      builder.addText(matchedText)
      builder.pop()

      // 递归处理剩余的文本
      parseInline(line, currentStyle, ck, builder, match.index + match[0].length + startIndex)
    }

    const lines = text.split('\n')
    lines.forEach((line) => {
      if (line.startsWith('# ')) {
      // 应用标题样式
        const titleStyle = { fontSize: 24, color: this.textStyle.color }
        builder.pushStyle(new ck.TextStyle(titleStyle))
        parseInline(line.slice(2), titleStyle, ck, builder) // 传递修剪掉‘# ’的line部分
        builder.pop()
      }
      else {
      // 应用正常文本样式
        parseInline(line, this.textStyle, ck, builder)
      }
      builder.addText('\n') // 每行后添加换行符
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
      // 示例中不包含如何在CanvasKit中处理图像，这里只是一个占位符
      // 实际应用中可能需要加载图像并创建一个图像着色器
      builder.addText(`[Image: ${altText} at ${imageUrl}]`)
    }
  }
}
