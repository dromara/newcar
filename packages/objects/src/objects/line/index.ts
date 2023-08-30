import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import { Point } from "../point";
import type { lineobject } from "./input_type";

export class Line extends Carobj {
  #startPoint: Point;
  #endPoint: Point;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  color: string = "white";
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  lineWidth: number = 2;

  constructor(
    startPoint: Point | number[],
    endPoint: Point | number[],
    data?: lineobject & carobject,
  ) {
    data = data ?? {};
    super(data);
    this.#startPoint =
      typeof startPoint === "object"
        ? startPoint
        : new Point({
            x: startPoint[0],
            y: startPoint[1],
          });

    this.#endPoint =
      typeof endPoint === "object"
        ? endPoint
        : new Point({
            x: endPoint[0],
            y: endPoint[1],
          });

    if (typeof data.color !== "undefined") {
      this.color = data.color;
    }
    if (typeof data.lineWidth !== "undefined") {
      this.lineWidth = data.lineWidth;
    }
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    ctx.strokeStyle = `${this.color}`;
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.#startPoint.x, this.#startPoint.y);
    ctx.lineTo(this.#endPoint.x, this.#endPoint.y);
    ctx.stroke();

    return ctx;
  }

  get startPoint() {
    return this.#startPoint;
  }

  get startX() {
    return this.#startPoint.x;
  }

  set startX(value: number) {
    this.#startPoint.x = value;
  }

  get startY() {
    return this.#startPoint.y;
  }

  set startY(value: number) {
    this.#startPoint.y = value;
  }

  get endX() {
    return this.#endPoint.x;
  }

  set endX(value: number) {
    this.#endPoint.x = value;
  }

  get endY() {
    return this.#endPoint.y;
  }

  set endY(value: number) {
    this.#endPoint.y = value;
  }
}
