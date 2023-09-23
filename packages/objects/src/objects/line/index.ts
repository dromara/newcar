import { Color } from "@newcar/utils";

import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { lineobject } from "./input_type";

export class Line extends Carobj {
  #startPoint: { x: number; y: number };
  #endPoint: { x: number; y: number };
  color: Color = Color.rgb(255, 255, 255);
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  lineWidth: number = 2;

  constructor(
    startPoint: Carobj | number[],
    endPoint: Carobj | number[],
    data?: lineobject & carobject,
  ) {
    data = data ?? {};
    super(data);
    this.#startPoint = Array.isArray(startPoint)
      ? {
          x: startPoint[0],
          y: startPoint[1],
        }
      : startPoint;

    this.#endPoint = Array.isArray(endPoint)
      ? {
          x: endPoint[0],
          y: endPoint[1],
        }
      : endPoint;

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
    ctx.strokeStyle = `${this.color.toString()}`;
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.#startPoint.x, this.#startPoint.y);
    ctx.lineTo(this.#endPoint.x, this.#endPoint.y);
    ctx.stroke();

    return ctx;
  }

  get startPoint() {
    return this.#startPoint;
  }

  get endPoint() {
    return this.#endPoint;
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
