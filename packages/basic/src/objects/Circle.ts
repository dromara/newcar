/* eslint-disable @typescript-eslint/no-inferrable-types */
import type { ICircleAngle } from "../interfaces/ICircleAngle";
import type { ICircleRadius } from "../interfaces/ICircleRadius";
import { Color } from "../utils/color";
import type { carobject } from "./Carobj";
import { Carobj } from "./Carobj";

export interface circleobject {
  startAngle?: number;
  endAngle?: number;
  borderColor?: Color;
  borderWidth?: number;
  fillColor?: Color;
}

export class Circle extends Carobj implements ICircleAngle, ICircleRadius {
  radius: number;
  #startAngle: number;
  #endAngle: number;
  borderColor: Color = Color.rgb(255, 255, 255);
  borderWidth: number = 2;
  fillColor: Color | null = null;

  constructor(radius: number, data?: circleobject & carobject) {
    data = data ?? {};
    super(data);
    this.radius = radius;
    typeof data.startAngle === "undefined"
      ? (this.#startAngle = 0)
      : (this.#startAngle = data.endAngle!);
    typeof data.endAngle === "undefined"
      ? (this.#endAngle = 2 * Math.PI)
      : (this.#endAngle = data.startAngle!);
    if (typeof data.borderColor !== "undefined") {
      this.borderColor = data.borderColor;
    }
    if (typeof data.borderWidth !== "undefined") {
      this.borderWidth = data.borderWidth;
    }
    if (typeof data.fillColor !== "undefined") {
      this.fillColor = data.fillColor;
    }
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.lineWidth = this.borderWidth;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, this.#startAngle, this.#endAngle);
    if (this.fillColor !== null) {
      ctx.fillStyle = this.fillColor!.toString();
      ctx.fill();
    }
    ctx.strokeStyle = this.borderColor!.toString();
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
