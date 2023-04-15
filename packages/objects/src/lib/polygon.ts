import { Carobj } from "./carobj";
import { type carobject } from "./carobj";
import { type Point } from "./point";

type polygonobject = {
  points: Point[];
};

export class Polygon extends Carobj {
  #points: Point[] = [];

  constructor(datas: carobject & polygonobject) {
    super(datas);
    this.#points = datas.points;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    ctx.moveTo(this.#points[0].x, this.#points[0].y);
    ctx.beginPath();
    this.#points.forEach((point, index) => {
      if (index === 0) return;
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(this.#points[0].x, this.#points[0].y);
    return ctx;
  }
}
