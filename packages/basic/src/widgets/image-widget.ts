import { Widget, WidgetOptions } from '@newcar/core'
import type { Canvas, CanvasKit, Paint } from 'canvaskit-wasm'
export interface ImageWidgetOptions extends WidgetOptions {}

export class ImageWidget extends Widget {
  paint: Paint
  private image: HTMLImageElement = document.createElement('img')
  private ready = false
  private offscreenCanvas: HTMLCanvasElement = document.createElement('canvas')
  private context: CanvasRenderingContext2D =
    this.offscreenCanvas.getContext('2d')
  private skImage: any

  constructor(public src: string, options?: ImageWidgetOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    this.image.src = this.src
    this.image.onload = () => {
      this.offscreenCanvas.width = this.image.width
      this.offscreenCanvas.height = this.image.height
      this.context.clearRect(
        0,
        0,
        this.offscreenCanvas.width,
        this.offscreenCanvas.height,
      )
      this.context.drawImage(this.image, 0, 0)
      document.body.appendChild(this.offscreenCanvas)
      this.skImage = ck.MakeImageFromCanvasImageSource(this.offscreenCanvas)
      this.ready = true
    }
    this.paint = new ck.Paint()
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    if (propertyChanged === 'src') {
      this.ready = false
      this.init(ck)
    }
  }

  draw(canvas: Canvas): void {
    if (this.ready) {
      canvas.drawImage(this.skImage, 0, 0, this.paint)
    }
  }
}
