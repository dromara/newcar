import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export interface RectangleOption extends CarobjOption {
  borderWidth?: number;
  borderColor?: Color;
  fillColor?: Color;
  lineJoin?: CanvasLineJoin;
}

export class Rectangle extends Carobj {
  width: number;
  height: number;
  borderWidth: number;
  borderColor: Color;
  fillColor?: Color;
  lineJoin: CanvasLineJoin;

  constructor(width: number, height: number, options?: RectangleOption) {
    super((options ??= {}));
    this.width = width;
    this.height = height;
    this.borderColor = options.borderColor ?? Color.WHITE;
    this.borderWidth = options.borderWidth ?? 2;
    this.lineJoin = options.lineJoin ?? "miter";
    this.fillColor = options.fillColor;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.borderWidth;
    context.lineJoin = this.lineJoin;
    context.strokeStyle = this.borderColor.toString();
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
      context.fill();
    }
    context.beginPath();
    context.moveTo(-0.5 * this.width, -0.5 * this.height);
    context.lineTo(0.5 * this.width, -0.5 * this.height);
    context.lineTo(0.5 * this.width, 0.5 * this.height);
    context.lineTo(-0.5 * this.width, 0.5 * this.height);
    context.closePath();
    context.stroke();
  }
}
