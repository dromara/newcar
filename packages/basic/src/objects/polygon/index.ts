import { Color } from "@newcar/utils";

import { Carobj } from "../Carobj";
import type { carobject } from "../Carobj/input_type";
import type { polygonobject } from "./input_type";

export class Polygon extends Carobj {
  points: { x: number; y: number }[] = [];
  borderColor: Color;
  borderWidth: number;
  fillColor: Color | null;
  lineJoin: CanvasLineJoin;

  constructor(
    points: (
      | number[]
      | {
          x: number;
          y: number;
        }
    )[],
    data?: carobject & polygonobject,
  ) {
    data = data ?? {};
    super(data);
    for (const point of points) {
      this.points.push(
        Array.isArray(point)
          ? {
              x: point[0],
              y: point[1],
            }
          : point,
      );
    }
    this.borderColor = data.borderColor ?? Color.WHITE;
    this.borderWidth = data.borderWidth ?? 2;
    this.fillColor = data.fillColor ?? null;
    this.lineJoin = data.lineJoin ?? "miter";
  }

  onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    super.onDraw(ctx);
    ctx.strokeStyle = this.borderColor.toString();
    ctx.lineWidth = this.borderWidth;
    ctx.lineJoin = this.lineJoin;
    if (this.fillColor !== null) {
      ctx.fillStyle = this.fillColor.toString();
    }
    ctx.beginPath();
    let index = 0;
    for (const point of this.points) {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      }
      ctx.lineTo(point.x, point.y);
      index += 1;
    }
    ctx.closePath();
    ctx.stroke();
    if (this.fillColor !== null) {
      ctx.fill();
    }

    return ctx;
  }
}
