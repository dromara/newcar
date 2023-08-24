import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { number_axisobject } from "./input_type";
import type { INumberAxisLimit } from "./interface";

export class NumberAxis extends Carobj implements INumberAxisLimit {
  #max: number;
  #min: number;

  #color: string;
  #direction: "left" | "right";
  #width: number;
  #point_interval: number;
  #arrow: boolean;
  #displayPoint: boolean;

  constructor(max: number, min: number, datas: number_axisobject & carobject) {
    super(datas);
    this.#max = max;
    this.#min = min;
    this.#color = datas.color ?? "white";
    this.#direction = datas.direction ?? "right";
    this.#width = datas.width ?? 2;
    this.#point_interval = datas.point_interval ?? 50;
    this.#arrow = datas.arrow ?? true;
    this.#displayPoint = datas.displayPoint ?? true;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);

    if (this.#direction === "left") {
      ctx.scale(-1, 1);
    }

    ctx.beginPath();
    ctx.lineWidth = this.#width;
    ctx.strokeStyle = `${this.#color}`;
    ctx.moveTo(this.#min, 0);
    ctx.lineTo(this.#max, 0);
    ctx.stroke();

    if (this.#arrow) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(this.#max, 0);
      ctx.lineTo(this.#max - 6, 6);
      ctx.moveTo(this.#max, 0);
      ctx.lineTo(this.#max - 6, -6);
      ctx.stroke();
    }

    if (this.#displayPoint) {
      ctx.strokeStyle = `${this.#color}`;
      ctx.lineWidth = 2;
      for (let i = 0; i <= this.#max; i += this.#point_interval) {
        ctx.moveTo(i, 10);
        ctx.lineTo(i, -10);
      }
      for (let i = 0; i >= this.#min; i -= this.#point_interval) {
        ctx.moveTo(i, 10);
        ctx.lineTo(i, -10);
      }
      ctx.stroke();
    }

    return ctx;
  }

  get max() {
    return this.#max;
  }

  set max(value: number) {
    this.#max = value;
  }

  get min() {
    return this.#min;
  }

  set min(value: number) {
    this.#min = value;
  }

  get color() {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
  }

  get direction() {
    return this.#direction;
  }

  set direction(value: "left" | "right") {
    this.#direction = value;
  }

  get width() {
    return this.#width;
  }

  set width(value: number) {
    this.#width = value;
  }

  get point_interval() {
    return this.#point_interval;
  }

  set point_interval(value: number) {
    this.#point_interval = value;
  }

  get arrow() {
    return this.#arrow;
  }

  set arrow(value: boolean) {
    this.#arrow = value;
  }

  get displayPoint() {
    return this.#displayPoint;
  }

  set displayPoint(value: boolean) {
    this.#displayPoint = value;
  }
}
