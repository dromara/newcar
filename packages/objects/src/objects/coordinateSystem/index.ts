import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { coordinate_systemobject } from "./input_type";
import type { ILengthofAxisX, ILengthofAxisY, ISystemDirection } from "./interface";

export class CoordinateSystem
  extends Carobj
  implements ILengthofAxisX, ILengthofAxisY, ISystemDirection
{
  #x_max: number;
  #y_max: number;
  #x_min: number;
  #y_min: number;
  #x_direction: "left" | "right";
  #y_direction: "top" | "bottom";
  #color: string;

  constructor(
    x_max: number,
    y_max: number,
    x_min: number,
    y_min: number,
    datas: coordinate_systemobject & carobject,
  ) {
    super(datas);
    this.#x_max = x_max;
    this.#x_min = x_min;
    this.#y_max = y_max;
    this.#y_min = y_min;
    this.#x_direction = datas.x_direction ?? "right";
    this.#y_direction = datas.y_direction ?? "top";
    this.#color = datas.color ?? "white";
  }

  get x_max() {
    return this.#x_max;
  }

  set x_max(value: number) {
    this.#x_max = value;
  }

  get x_min() {
    return this.#x_min;
  }

  set x_min(value: number) {
    this.#x_min = value;
  }

  get y_max() {
    return this.#y_max;
  }

  set y_max(value: number) {
    this.#y_max = value;
  }

  get y_min() {
    return this.#y_min;
  }

  set y_min(value: number) {
    this.#y_min = value;
  }

  get color() {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
  }

  get x_direction() {
    return this.#x_direction;
  }

  set x_direction(value: "left" | "right") {
    this.#x_direction = value;
  }

  get y_direction() {
    return this.#y_direction;
  }

  set y_direction(value: "top" | "bottom") {
    this.#y_direction = value;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    if (this.#x_direction === "left") {
      ctx.scale(-1, 1);
    }
    if (this.#y_direction === "top") {
      ctx.scale(1, -1);
    }
    ctx.strokeStyle = `${this.#color}`;
    ctx.beginPath();
    // draw axis X
    ctx.moveTo(-this.#x_min, 0);
    ctx.lineTo(this.#x_max, 0);
    ctx.moveTo(this.#x_min, 0);
    ctx.lineTo(this.#x_max - 6, 6);
    ctx.moveTo(this.#x_min, 0);
    ctx.lineTo(this.#x_max - 6, -6);
    // draw axis Y
    ctx.moveTo(0, -this.#y_min);
    ctx.lineTo(0, this.#y_max);
    ctx.moveTo(0, this.#y_max);
    ctx.lineTo(6, this.#y_max - 6);
    ctx.moveTo(0, this.#y_max);
    ctx.lineTo(-6, this.#y_max - 6);
    ctx.stroke();

    return ctx;
  }
}
