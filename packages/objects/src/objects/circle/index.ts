/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { circleobject } from "./input_type";
import type { ICircleAngle, ICircleRadius } from "./interface";

export class Circle extends Carobj implements ICircleAngle, ICircleRadius {
  radius: number;
  #startAngle: number;
  #endAngle: number;
  borderColor: string = "white";
  borderWidth: number = 2;
  fillColor: string | null = null;

  constructor(radius: number, datas: circleobject & carobject) {
    super(datas);
    this.radius = radius;
    this.x = datas.x;
    this.y = datas.y;
    typeof datas.startAngle === "undefined"
      ? (this.#startAngle = 0)
      : (this.#startAngle = datas.endAngle!);
    typeof datas.endAngle === "undefined"
      ? (this.#endAngle = 2 * Math.PI)
      : (this.#endAngle = datas.startAngle!);
    if (typeof datas.borderColor !== "undefined") {
      this.borderColor = datas.borderColor;
    }
    if (typeof datas.borderWidth !== "undefined") {
      this.borderWidth = datas.borderWidth;
    }
    if (typeof datas.fillColor !== "undefined") {
      this.fillColor = datas.fillColor;
    }
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.lineWidth = this.borderWidth;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, this.#startAngle, this.#endAngle);
    if (this.fillColor !== null) {
      ctx.fillStyle = this.fillColor!;
      ctx.fill();
    }
    ctx.strokeStyle = this.borderColor!;
    ctx.stroke();

    return ctx;
  }

  get startAngle() {
    return this.#startAngle;
  }

  set startAngle(value: number) {
    this.#startAngle = value;
  }

  get endAngle() {
    return this.#endAngle;
  }

  set endAngle(value: number) {
    this.#endAngle = value;
  }
}
