import type { WidgetOptions } from '@newcar/core'
import { Widget } from '@newcar/core'
import type { Canvas, CanvasKit, Image, Paint } from 'canvaskit-wasm'

export interface ImageWidgetOptions extends WidgetOptions {}

/**
 * Image Widget
 * You can via proload a image and use this widget to draw image on canvas.
 */
export class ImageWidget extends Widget {
  private image: Image
  paint: Paint

  /**
   * @param imageArray The proloaded image source.
   * @param options The options.
   */
  constructor(public imageArray: ArrayBuffer, options?: ImageWidgetOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.paint.setAlphaf(this.style.transparency)
    this.paint.setAntiAlias(this.style.antiAlias)
    try {
      this.image = ck.MakeImageFromEncoded(this.imageArray)
    }
    catch (error) {}
  }

  predraw(ck: CanvasKit, propertyChanged: string) {
    switch (propertyChanged) {
      case 'imageArray': {
        this.image = ck.MakeImageFromEncoded(this.imageArray)
        break
      }
      case 'style.transparency': {
        this.paint.setAlphaf(this.style.transparency)
      }
    }
  }

  draw(canvas: Canvas): void {
    canvas.drawImage(this.image, 0, 0, this.paint)
  }

  isIn(x: number, y: number): boolean {
    return (
      x >= 0
      && x <= 0 + this.image.width()
      && y >= 0
      && y <= 0 + this.image.height()
    )
  }
}
