import { Widget, WidgetOptions, $sourcesLoaded } from '@newcar/core'
import { Canvas, CanvasKit } from 'canvaskit-wasm'

export interface ImageWidgetOptions extends WidgetOptions {}

export class ImageWidget extends Widget {
  private image: any = null
  private ready = false

  constructor(public name: string, options?: ImageWidgetOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    try {
      const imageData = $sourcesLoaded[this.name]
      this.image = ck.MakeImageFromEncoded(imageData)
      this.ready = true
    } catch (error) {
      console.error('Failed to load image:', this.name, error)
    }
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'src': {
        this.ready = false
        this.init(ck)
      }
    }
  }

  draw(canvas: Canvas): void {
    if (this.ready) {
      canvas.drawImage(this.image, 0, 0, null)
    }
  }
}
