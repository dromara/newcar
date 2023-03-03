import { Carobj } from "./carobj";
import { type Point } from "./point";
import { type carobject } from "./carobj";

export type lineobject = { points: Point[] };

export class Line extends Carobj {
  #point1: Point;
  #point2: Point;

  constructor(datas: lineobject & carobject) {
    super(datas);
    this.#point1 = datas.points[0];
    this.#point2 = datas.points[1];
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    // ......
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
