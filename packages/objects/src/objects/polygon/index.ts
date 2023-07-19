// TODO: Fix the drawing bug.
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { Point } from "../point";
import type { polygonobject } from "./input_type";

export class Polygon extends Carobj {
  points: Point[] = [];
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  borderColor: string = "white";
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  borderWidth: number = 1;
  fillColor: string | null = null;

  constructor(datas: carobject & polygonobject) {
    super(datas);
    this.points = datas.points;
    if (typeof datas.borderColor !== "undefined") {
      this.borderColor = datas.borderColor;
    }
    if (typeof datas.fillColor !== "undefined") {
      this.fillColor = datas.fillColor;
    }
    if (typeof datas.borderWidth !== "undefined") {
      this.borderWidth = datas.borderWidth;
    }
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    super.onDraw(ctx);
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = `${this.borderColor}`;
    if (this.fillColor !== null) {
      ctx.fillStyle = `${this.fillColor}`;
      ctx.fill();
    }
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.beginPath();
    for (const point of this.points) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.stroke();

    return ctx;
  }
}
