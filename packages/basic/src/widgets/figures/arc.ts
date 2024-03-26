import { Widget } from '@newcar/core'
import { Canvas, CanvasKit, Paint, RRect } from 'canvaskit-wasm'

export class Arc extends Widget {
  paint: Paint
  rect: RRect

  constructor(public radius: number, options?: {}) {
    super()
  }

  override init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.paint.setColor(ck.BLACK)
    this.rect = ck.LTRBRect(
      -this.radius,
      -this.radius,
      this.radius,
      this.radius,
    )
    console.log('initial!')
  }

  override predraw(ck: CanvasKit, propertyChanged: string): void {
    this.paint = new ck.Paint()
    this.paint.setColor(ck.BLACK)
    this.rect = ck.LTRBRect(
      -this.radius,
      -this.radius,
      this.radius,
      this.radius,
    )
  }

  override draw(canvas: Canvas): void {
    canvas.translate(this.x, this.y)
    canvas.drawArc(this.rect, 0, 360, false, this.paint)
  }
}
