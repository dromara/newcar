import { Widget, WidgetOptions, WidgetStyle } from "@newcar/core";
import { Color } from "@newcar/utils";
import { Vector2 } from "../../utils/vector2d";
import { Canvas, CanvasKit, Paint } from "canvaskit-wasm";

export interface LineOptions extends WidgetOptions {
  style?: LineStyle
}

export interface LineStyle extends WidgetStyle {
  color?: Color
}

export class Line extends Widget {
  paint: Paint;
  declare style: LineStyle

  constructor(public from: Vector2, public to: Vector2, options?: LineOptions) {
    options ??= {}
    super(options)
  }

  override init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
  }

  override predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'style.color': {
        this.paint.setColor(this.style.color.toFloat4())
        break
      }
    }
  }
  
  override draw(canvas: Canvas): void {
    canvas.drawLine(
      this.from[0],
      this.from[1],
      this.from[0] + (this.to[0] - this.from[0]) * this.progress,
      this.from[1] + (this.to[1] - this.from[1]) * this.progress,
      this.paint,
    );
  }
}