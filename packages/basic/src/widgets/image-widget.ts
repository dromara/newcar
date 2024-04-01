import {
  Widget,
  WidgetOptions,
  $sourcesLoaded,
  AsyncWidget,
  AsyncWidgetResponse,
} from '@newcar/core'
import { Canvas, CanvasKit, Image } from 'canvaskit-wasm'

export interface ImageWidgetOptions extends WidgetOptions {}

export class ImageWidget extends AsyncWidget {
  private image: Image

  constructor(public src: string, options?: ImageWidgetOptions) {
    options ??= {}
    super(options)
  }

  async init(ck: CanvasKit): Promise<AsyncWidgetResponse> {
    try {
      const response = await fetch(this.src)
      const imageData = await response.arrayBuffer()
      this.image = ck.MakeImageFromEncoded(imageData)
      return {
        status: 'ok',
      }
    } catch (error) {
      return {
        status: 'error',
      }
    }
  }

  async predraw(
    ck: CanvasKit,
    propertyChanged: string,
  ): Promise<AsyncWidgetResponse> {
    switch (propertyChanged) {
      case 'src': {
        const res = await this.init(ck)
        return res
      }
    }
    return {
      status: 'ok',
    }
  }

  draw(canvas: Canvas): void {
    canvas.drawImage(this.image, 0, 0, null)
  }
}
