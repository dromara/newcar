import { Carobj } from "./carobj";
import { type Point } from "./point";
import { type carobject } from "./carobj";
import { IPositionedMut } from "../interfaces/Positioned";

export type lineobject = {
  startPoint: Point;
  endPoint: Point;
  color?: string;
  width?: number;
};

export class Line extends Carobj implements IPositionedMut {
  #startPoint: Point;
  #endPoint: Point;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  color: string = "black";
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  width: number = 1;

  constructor(datas: lineobject & carobject) {
    super(datas);
    this.#startPoint = datas.startPoint;
    this.#endPoint = datas.endPoint;
    if (typeof datas.color !== "undefined") this.color = datas.color;
    if (typeof datas.width !== "undefined") this.width = datas.width;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    ctx.strokeStyle = `${this.color}`;
    ctx.lineWidth = this.width;
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
