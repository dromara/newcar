import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export interface CircleOption extends CarobjOption {
  startAngle?: number;
  endAngle?: number;
  borderColor?: Color;
  borderWidth?: number;
  fillColor?: Color;
}

export class Circle extends Carobj {
  radius: number;
  startAngle: number;
  endAngle: number;
  borderColor: Color;
  borderWidth: number;
  fillColor?: Color;

  constructor(radius: number, options?: CircleOption) {
    super((options ??= {}));
    this.radius = radius;
    this.startAngle = options.startAngle ?? 0;
    this.endAngle = options.endAngle ?? 2 * Math.PI;
    this.borderColor = options.borderColor ?? Color.WHITE;
    this.borderWidth = options.borderWidth ?? 2;
    this.fillColor = options.fillColor;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.borderWidth;
    context.beginPath();
    context.arc(0, 0, this.radius, this.startAngle, this.endAngle);
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
      context.fill();
    }
    context.strokeStyle = this.borderColor.toString();
    context.stroke();
  }
}
