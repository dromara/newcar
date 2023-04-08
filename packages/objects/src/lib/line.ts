import { Carobj } from "./carobj";
import { type Point } from "./point";
import { type carobject } from "./carobj";
import { IPositionedMut } from "src/interfaces/Positioned";

export type lineobject = { points: Point[] };

export class Line extends Carobj implements IPositionedMut {
  #point1: Point;
  #point2: Point;

  constructor(datas: lineobject & carobject) {
    super(datas);
    this.#point1 = datas.points[0];
    this.#point2 = datas.points[1];
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.primaryPoints[0].x, this.primaryPoints[0].y);
    ctx.lineTo(this.primaryPoints[1].x, this.primaryPoints[1].y);
    ctx.stroke();
    return ctx;
  }

  get primaryPoints() {
    return [this.#point1, this.#point2];
  }

  set startX(value: number) {
    this.#point1.x = value;
  }

  set startY(value: number) {
    this.#point1.y = value;
  }

  set endX(value: number) {
    this.#point2.x = value;
  }

  set endY(value: number) {
    this.#point2.y = value;
  }
}
