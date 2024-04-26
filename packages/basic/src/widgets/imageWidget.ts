import type { WidgetOptions } from '@newcar/core'
import { Widget } from '@newcar/core'
import type { Canvas, CanvasKit, Image, Paint } from 'canvaskit-wasm'

export interface ImageWidgetOptions extends WidgetOptions {}

export class ImageWidget extends Widget {
  private image: Image
  paint: Paint

  constructor(public imageArray: ArrayBuffer, options?: ImageWidgetOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.paint.setAlphaf(this.style.transparency)
    try {
      this.image = ck.MakeImageFromEncoded(this.imageArray)
    } catch (error) {}
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
      x >= 0 &&
      x <= 0 + this.image.width() &&
      y >= 0 &&
      y <= 0 + this.image.height()
    )
  }
}
