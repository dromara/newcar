import { Color } from "@newcar/utils";

import { getAbsoluteCoordinate } from "../../utils/getAbsoluteCoordinate";
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import { Point } from "../point";
import type { lineobject } from "./input_type";

export class Line extends Carobj {
  #startPoint: Point;
  #endPoint: Point;
  color: Color = Color.rgb(255, 255, 255);
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  lineWidth: number = 2;

  constructor(
    startPoint: Point | number[],
    endPoint: Point | number[],
    data?: lineobject & carobject,
  ) {
    data = data ?? {};
    super(data);
    this.#startPoint = Array.isArray(startPoint)
      ? new Point({
          x: startPoint[0],
          y: startPoint[1],
        })
      : startPoint;

    this.#endPoint = Array.isArray(endPoint)
      ? new Point({
          x: endPoint[0],
          y: endPoint[1],
        })
      : endPoint;

    if (typeof data.color !== "undefined") {
      this.color = data.color;
    }
    if (typeof data.lineWidth !== "undefined") {
      this.lineWidth = data.lineWidth;
    }
  }

  override beforeTranslate(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    ctx.strokeStyle = `${this.color.toString()}`;
    ctx.lineWidth = this.lineWidth;
    const startAbusoluteCoordinate = getAbsoluteCoordinate(this.#startPoint);
    const endAbsoluteCoordinate = getAbsoluteCoordinate(this.#endPoint);
    ctx.moveTo(startAbusoluteCoordinate[0], startAbusoluteCoordinate[1]);
    ctx.lineTo(endAbsoluteCoordinate[0], endAbsoluteCoordinate[1]);
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
