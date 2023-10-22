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

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.borderWidth;
    ctx.lineJoin = this.lineJoin;
    ctx.strokeStyle = this.borderColor.toString();
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor.toString();
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(-0.5 * this.width, -0.5 * this.height);
    ctx.lineTo(0.5 * this.width, -0.5 * this.height);
    ctx.lineTo(0.5 * this.width, 0.5 * this.height);
    ctx.lineTo(-0.5 * this.width, 0.5 * this.height);
    ctx.closePath();
    ctx.stroke();
  }
}
