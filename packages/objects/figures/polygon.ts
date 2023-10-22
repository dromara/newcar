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

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = this.borderColor.toString();
    ctx.lineWidth = this.borderWidth;
    ctx.lineJoin = this.lineJoin;
    ctx.beginPath();
    for (const [index, point] of this.points.entries()) {
      (index ? ctx.lineTo : ctx.moveTo)(point.x, point.y);
    }
    ctx.closePath();
    ctx.stroke();
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor.toString();
      ctx.fill();
    }
  }
}
