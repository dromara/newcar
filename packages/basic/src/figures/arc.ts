import { Widget } from '@newcar/core'
import { Canvas, CanvasKit, Paint, RRect } from 'canvaskit-wasm'

export class Arc extends Widget {
  paint: Paint
  rect: RRect

  constructor(public radius: number, options?: {}) {
    super()
  }
  
  override preUpdate(CanvasKit: CanvasKit, propertyChanged: string): void {
    this.paint = new CanvasKit.Paint()
    this.rect = CanvasKit.LTRBRect(
      -this.radius,
      -this.radius,
      this.radius,
      this.radius,
    )
  }
  
  override draw(canvas: Canvas): void {
    
  }
}
