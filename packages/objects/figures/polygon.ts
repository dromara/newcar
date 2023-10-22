import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import type { Positional } from "../interface";
import type { Point } from "./line";
import { toPoint } from "./line";

export interface PolygonOption extends CarobjOption {
  borderColor?: Color;
  fillColor?: Color;
  borderWidth?: number;
  lineJoin?: CanvasLineJoin;
}

export class Polygon extends Carobj {
  points: Positional[] = [];
  borderColor: Color;
  borderWidth: number;
  fillColor?: Color;
  lineJoin: CanvasLineJoin;

  constructor(points: Point[], options?: PolygonOption) {
    super((options ??= {}));
    for (const point of points) {
      this.points.push(toPoint(point));
    }
    this.borderColor = options.borderColor ?? Color.WHITE;
    this.borderWidth = options.borderWidth ?? 2;
    this.fillColor = options.fillColor;
    this.lineJoin = options.lineJoin ?? "miter";
  }

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.borderColor.toString();
    context.lineWidth = this.borderWidth;
    context.lineJoin = this.lineJoin;
    context.beginPath();
    for (const [index, point] of this.points.entries()) {
      (index ? context.lineTo : context.moveTo)(point.x, point.y);
    }
    context.closePath();
    context.stroke();
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
      context.fill();
    }
  }
}
