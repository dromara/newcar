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
  x_color: string;
  x_point_interval: number;
  y_point_interval: number;
  x_division: number;
  y_division: number;
  arrow: boolean;
  displayPoint: boolean;
  x_width: number;
  y_width: number;
  y_color: string;
  grid_color: string;
  grid: boolean;

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
    this.displayPoint = datas.displayPoint ?? true;
    this.grid = datas.grid ?? true;
    this.x_color = datas.x_color ?? "white";
    this.y_color = datas.y_color ?? "white";
    this.grid_color = datas.grid_color ?? "white";
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

    // draw grid
    if (this.grid) {
      ctx.beginPath();
      ctx.strokeStyle = `${this.grid_color}`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= this.#x_max; x += this.x_point_interval) {
        ctx.moveTo(x, this.#y_max);
        ctx.lineTo(x, this.#y_min);
      }
      for (let x = 0; x >= this.#x_min; x -= this.x_point_interval) {
        ctx.moveTo(x, this.#y_max);
        ctx.lineTo(x, this.#y_min);
      }
      for (let y = 0; y <= this.#y_max; y += this.y_point_interval) {
        ctx.moveTo(this.#x_max, y);
        ctx.lineTo(this.#x_min, y);
      }
      for (let y = 0; y >= this.#y_min; y -= this.y_point_interval) {
        ctx.moveTo(this.#x_max, y);
        ctx.lineTo(this.#x_min, y);
      }
      ctx.stroke();
    }
    // draw axis X
    ctx.beginPath();
    ctx.strokeStyle = `${this.x_color}`;
    ctx.lineWidth = this.x_width;
    ctx.moveTo(this.#x_min, 0);
    ctx.lineTo(this.#x_max, 0);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, 6);
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, -6);
    }
    ctx.stroke();

    // draw axis Y
    ctx.beginPath();
    ctx.strokeStyle = `${this.y_color}`;
    ctx.lineWidth = this.y_width;
    ctx.moveTo(0, this.#y_min);
    ctx.lineTo(0, this.#y_max);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(6, this.#y_max - 6);
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(-6, this.#y_max - 6);
    }
    ctx.stroke();

    // Draw number point;
    if (this.displayPoint) {
      ctx.beginPath();
      ctx.strokeStyle = `${this.x_color}`;
      ctx.lineWidth = 2;
      for (let x = 0; x <= this.#x_max; x += this.x_point_interval) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      for (let x = 0; x >= this.#x_min; x -= this.x_point_interval) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `${this.y_color}`;
      ctx.lineWidth = 2;
      for (let y = 0; y <= this.#y_max; y += this.y_point_interval) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      for (let y = 0; y >= this.#y_min; y -= this.y_point_interval) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      ctx.stroke();
    }

    return ctx;
  }
}
