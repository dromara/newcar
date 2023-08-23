import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { coordinate_systemobject } from "./input_type";
import type { ILimitofAxisX, ILimitofAxisY, ISystemDirection } from "./interface";

export class CoordinateSystem
  extends Carobj
  implements ILimitofAxisX, ILimitofAxisY, ISystemDirection
{
  #x_max: number;
  #y_max: number;
  #x_min: number;
  #y_min: number;
  #x_direction: "left" | "right";
  #y_direction: "top" | "bottom";
  #color: string;
  x_point_interval: number;
  y_point_interval: number;
  x_division: number;
  y_division: number;
  arrow: boolean;
  interval: boolean;
  x_width: number;
  y_width: number;

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
    this.x_point_interval = datas.x_point_interval ?? 50;
    this.y_point_interval = datas.y_point_interval ?? 50;
    this.x_division = datas.x_division ?? 1;
    this.y_division = datas.y_division ?? 1;
    this.x_width = datas.x_width ?? 2;
    this.y_width = datas.y_width ?? 2;
    this.arrow = datas.arrow ?? true;
    this.interval = datas.interval ?? true;
    this.#color = datas.color ?? "white";
    if (this.#x_min > 0) {
      throw new Error("Parameter `x_min` cannot be greater than 0");
    }
    if (this.#x_max < 0) {
      throw new Error("Parameter `x_max` cannot be less than 0");
    }
    if (this.#y_min > 0) {
      throw new Error("Parameter `y_min` cannot be greater than 0");
    }
    if (this.#y_max < 0) {
      throw new Error("Parameter `y_max` cannot be less than 0");
    }
  }

  get x_max() {
    return this.#x_max;
  }

  set x_max(value: number) {
    this.#x_max = value;
    if (this.#x_max < 0) {
      throw new Error("Parameter `x_max` cannot be less than 0");
    }
  }

  get x_min() {
    return this.#x_min;
  }

  set x_min(value: number) {
    this.#x_min = value;
    if (this.#x_min > 0) {
      throw new Error("Parameter `x_min` cannot be greater than 0");
    }
  }

  get y_max() {
    return this.#y_max;
  }

  set y_max(value: number) {
    this.#y_max = value;
    if (this.#y_max < 0) {
      throw new Error("Parameter `y_max` cannot be less than 0");
    }
  }

  get y_min() {
    return this.#y_min;
  }

  set y_min(value: number) {
    this.#y_min = value;
    if (this.#y_min > 0) {
      throw new Error("Parameter `y_min` cannot be greater than 0");
    }
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
    // draw grid
    ctx.beginPath();
    ctx.lineWidth = 1;
    for (let x = this.#x_min; x <= this.#x_max; x += this.x_point_interval) {
      ctx.moveTo(x, this.#y_max);
      ctx.lineTo(x, this.#y_min);
    }
    for (let y = this.#y_min; y <= this.#y_max; y += this.y_point_interval) {
      ctx.moveTo(this.#x_max, y);
      ctx.lineTo(this.#x_min, y);
    }
    ctx.stroke();
    // draw axis X
    ctx.beginPath();
    ctx.lineWidth = this.x_width;
    ctx.moveTo(this.#x_min, 0);
    ctx.lineTo(this.#x_max, 0);
    if (this.arrow) {
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, 6);
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, -6);
    }
    ctx.stroke();
    // draw axis Y
    ctx.beginPath();
    ctx.lineWidth = this.y_width;
    ctx.moveTo(0, this.#y_min);
    ctx.lineTo(0, this.#y_max);
    if (this.arrow) {
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(6, this.#y_max - 6);
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(-6, this.#y_max - 6);
    }
    ctx.stroke();
    // Draw number point;
    ctx.beginPath();
    if (this.interval) {
      ctx.lineWidth = 2;
      for (let x = 0; x <= this.#x_max; x += this.x_point_interval) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      for (let x = 0; x >= this.#x_min; x -= this.x_point_interval) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      for (let y = 0; y <= this.#y_max; y += this.y_point_interval) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      for (let y = 0; y >= this.#y_min; y -= this.y_point_interval) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
    }
    ctx.stroke();

    return ctx;
  }
}
