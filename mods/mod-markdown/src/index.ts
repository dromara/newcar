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
      this.buildParagraph(ck)
  }

  private buildParagraph(ck: CanvasKit) {
    const paragraphStyle = new ck.ParagraphStyle({
      textStyle: this.textStyle,
    })
    const builder = ck.ParagraphBuilder.Make(
      paragraphStyle,
      ck.FontMgr.FromData(...$source.fonts)!,
    )
    this.parseMarkdown(this.text, builder, ck)
    this.paragraph = builder.build()
    this.paragraph.layout(this.width)
  }

  private parseMarkdown(
    text: string,
    builder: ParagraphBuilder,
    ck: CanvasKit,
  ) {
    const lines = text.split('\n')
    lines.forEach((line) => {
      if (line.match('# ')) {
        builder.pushStyle(
          new ck.TextStyle({
            fontSize: 24,
            color: this.textStyle.color,
          }),
        )

        builder.addText(line.slice(2))
        builder.pop()
      }
      else if (line.match('## ')) {
        builder.pushStyle(
          new ck.TextStyle({
            fontSize: 20,
            color: this.textStyle.color,
          }),
        )
        builder.addText(line.slice(3))
        builder.pop()
      }
      else if (line.match('### ')) {
        builder.pushStyle(
          new ck.TextStyle({
            fontSize: 18,
            color: this.textStyle.color,
          }),
        )
        builder.addText(line.slice(4))
        builder.pop()
      }
      else if (line.match('#### ')) {
        builder.pushStyle(
          new ck.TextStyle({
            fontSize: 16,
            color: this.textStyle.color,
          }),
        )
        builder.addText(line.slice(4))
        builder.pop()
      }
      else if (line.match('##### ')) {
        builder.pushStyle(
          new ck.TextStyle({
            fontSize: 13,
            color: this.textStyle.color,
          }),
        )
        builder.addText(line.slice(4))
        builder.pop()
      }
      else if (line.match('#### ')) {
        builder.pushStyle(
          new ck.TextStyle({
            fontSize: 10,
            color: this.textStyle.color,
          }),
        )
        builder.addText(line.slice(4))
        builder.pop()
      }
      else if (
        line.match('- ') !== null
        || line.match(/\* /) !== null
        || line.match(/\+/) !== null
      ) {
        builder.addText(`• ${line.slice(2)}`)
      }
      else if (line.match(/\!\[/)) {
        this.handleImage(line, builder, ck)
      }
      else if (line.match(/\[/)) {
        builder.pushStyle(
          new ck.TextStyle({
            color: ck.BLUE,
          }),
        )
        builder.addText(
          line.replace(/\[/, '').replace(/\]/, '').replace(/(.+)/, ''),
        )
        builder.pop()
      }
      else if (line.match(/`.+`/)) {
        builder.pushStyle(
          new ck.TextStyle({
            backgroundColor: ck.Color(211, 211, 211, 1),
          }),
        )
      }
      else {
        builder.addText(line)
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
      // 示例中不包含如何在CanvasKit中处理图像，这里只是一个占位符
      // 实际应用中可能需要加载图像并创建一个图像着色器
      builder.addText(`[Image: ${altText} at ${imageUrl}]`)
    }
  }
}
