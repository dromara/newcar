import { Widget } from '@newcar/core'
import { Canvas, CanvasKit, Paint, RRect } from 'canvaskit-wasm'

export class Arc extends Widget {
  paint: Paint
  rect: RRect

  constructor(public radius: number, options?: {}) {
    super()
  }
  
  override predraw(ckNamespace: CanvasKit): void {
    this.paint = new ckNamespace.Paint()
    this.rect = ckNamespace.LTRBRect(
      -this.radius,
      -this.radius,
      this.radius,
      this.radius,
    )
  }
  
  override draw(canvas: Canvas, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'radius': {
        // ...
        break
      }
      case 'color': {
        // ...
        break
      }
    }    
  }
}
