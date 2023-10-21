import { Color } from "@newcar/utils";

import { Carobj } from "../Carobj";
import type { carobject } from "../Carobj/input_type";
import { Text } from "../text";
import type { number_axisobject } from "./input_type";
import type { INumberAxisLimit } from "./interface";

export class NumberAxis extends Carobj implements INumberAxisLimit {
  #max: number;
  #min: number;

  #color: Color;
  #direction: "left" | "right";
  #interval: number;
  #arrow: boolean;
  #displayPoint: boolean;
  number: boolean;
  trend: (arg0: number) => Text;

  constructor(max: number, min: number, data?: number_axisobject & carobject) {
    data = data ?? {};
    super(data);
    this.#max = max;
    this.#min = min;
    this.#color = data.color ?? Color.rgb(255, 255, 255);
    this.#direction = data.direction ?? "right";
    this.#interval = data.interval ?? 50;
    this.#arrow = data.arrow ?? true;
    this.#displayPoint = data.displayPoint ?? true;
    this.number = data.number ?? true;
    this.trend = data.trend ?? ((n: number) => new Text(String(n), { x: 0, y: 0 }));
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);

    if (this.#max < 0) {
      throw new Error("Parameter `max` cannot be less than 0");
    }
    if (this.#min > 0) {
      throw new Error("Parameter `min` cannot be greater than 0");
    }

    if (this.#direction === "left") {
      ctx.scale(-1, 1);
    }

    ctx.beginPath();
    ctx.lineWidth = 2;
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

    // Draw number point.
    if (this.#displayPoint) {
      ctx.strokeStyle = `${this.#color}`;
      ctx.lineWidth = 2;
      for (let i = 0; i <= this.#max; i += this.#interval) {
        ctx.moveTo(i, 10);
        ctx.lineTo(i, -10);
      }
      for (let i = 0; i >= this.#min; i -= this.#interval) {
        ctx.moveTo(i, 10);
        ctx.lineTo(i, -10);
      }
      ctx.stroke();
    }

    // Draw numbers.
    if (this.#direction === "left") {
      ctx.scale(-1, 0);
    }

    let numberCount = 0;

    if (this.number) {
      numberCount = 0;
      for (let i = 0; i <= this.#max; i += this.#interval) {
        const text = this.trend(numberCount);
        text.x = i;
        text.y = 20;
        text.size = 20;
        text.align = "center";
        text.onUpdate(ctx);
        numberCount += 1;
      }
      numberCount = 0;
      for (let i = 0; i >= this.#min; i -= this.#interval) {
        const text = this.trend(numberCount);
        text.x = i;
        text.y = 20;
        text.size = 20;
        text.align = "center";
        text.onUpdate(ctx);
        numberCount -= 1;
      }
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

  set color(value: Color) {
    this.#color = value;
  }

  get direction() {
    return this.#direction;
  }

  set direction(value: "left" | "right") {
    this.#direction = value;
  }

  get interval() {
    return this.#interval;
  }

  set interval(value: number) {
    this.#interval = value;
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
