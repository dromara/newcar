import { Carobj } from "./carobj";
import { type Point } from "./point";
import { type carobject } from "./carobj";
import { IPositionedMut } from "src/interfaces/Positioned";

export type lineobject = {
  startPoint: Point;
  endPoint: Point;
};

export class Line extends Carobj implements IPositionedMut {
  #startPoint: Point;
  #endPoint: Point;

  constructor(datas: lineobject & carobject) {
    super(datas);
    this.#startPoint = datas.startPoint;
    this.#endPoint = datas.endPoint;
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
    return [this.#startPoint, this.#endPoint];
  }

  set startX(value: number) {
    this.#startPoint.x = value;
  }

  set startY(value: number) {
    this.#startPoint.y = value;
  }

  set endX(value: number) {
    this.#endPoint.x = value;
  }

  set endY(value: number) {
    this.#endPoint.y = value;
  }
}
