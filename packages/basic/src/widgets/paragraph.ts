import { $ck, AsyncWidget, AsyncWidgetResponse } from '@newcar/core'
import { isString } from '@newcar/utils'
import type { CanvasKit, TextStyle } from 'canvaskit-wasm'

export interface inputItem {
  text: string
  style: TextStyle
}

export interface ParagraphOptions {}

export interface ParagraphStyle {}
export class Paragraph extends AsyncWidget {
  private textMap: Map<string, TextStyle>

  constructor(text: (string | inputItem)[], options?: ParagraphOptions) {
    options ??= {}
    super(options)
    for (const item of text) {
      if (isString(item)) {
        this.textMap.set(item.toString(), new $ck.TextStyle({}))
      } else {
        this.textMap.set(
          (item as inputItem).text,
          new $ck.TextStyle((item as inputItem).style),
        )
      }
    }
  }

  async init(ck: CanvasKit): Promise<AsyncWidgetResponse> {
    // const response = await fetch()
    new ck.ParagraphStyle({})
    return {
      status: 'ok',
    }
  }
}
