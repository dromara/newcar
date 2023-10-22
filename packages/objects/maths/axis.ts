import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import { Text } from "../text";

export type Direction = "left" | "right";
export type Trend = (numberCount: number) => Text;

export interface NumberAxisOption extends CarobjOption {
  arrow?: boolean;
  point?: boolean;
  number?: boolean;
  interval?: number;
  color?: Color;
  direction?: Direction;
  trend?: Trend;
}

export class NumberAxis extends Carobj {
  min: number;
  max: number;
  arrow: boolean;
  point: boolean;
  number: boolean;
  interval: number;
  color: Color;
  direction: Direction;
  trend: Trend;

  constructor(max: number, min: number, options?: NumberAxisOption) {
    options = options ?? {};
    super(options);
    this.max = max;
    this.min = min;
    this.color = options.color ?? Color.RGB(255, 255, 255);
    this.direction = options.direction ?? "right";
    this.interval = options.interval ?? 50;
    this.arrow = options.arrow ?? true;
    this.point = options.point ?? true;
    this.number = options.number ?? true;
    this.trend =
      options.trend ?? ((n: number) => new Text(String(n), { x: 0, y: 0 }));
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    if (this.max < 0) {
      throw new Error("Parameter `max` cannot be less than 0");
    }
    if (this.min > 0) {
      throw new Error("Parameter `min` cannot be greater than 0");
    }

    if (this.direction === "left") {
      ctx.scale(-1, 1);
    }

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color.toString();
    ctx.moveTo(this.min, 0);
    ctx.lineTo(this.max, 0);
    ctx.stroke();

    if (this.arrow) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(this.max, 0);
      ctx.lineTo(this.max - 6, 6);
      ctx.moveTo(this.max, 0);
      ctx.lineTo(this.max - 6, -6);
      ctx.stroke();
    }

    // Draw number point.
    if (this.point) {
      ctx.strokeStyle = this.color.toString();
      ctx.lineWidth = 2;
      for (let i = 0; i <= this.max; i += this.interval) {
        ctx.moveTo(i, 10);
        ctx.lineTo(i, -10);
      }
      for (let i = 0; i >= this.min; i -= this.interval) {
        ctx.moveTo(i, 10);
        ctx.lineTo(i, -10);
      }
      ctx.stroke();
    }

    // Draw numbers.
    if (this.direction === "left") {
      ctx.scale(-1, 0);
    }

    let numberCount;
    if (this.number) {
      numberCount = 0;
      for (let i = 0; i <= this.max; i += this.interval) {
        const text = this.trend(numberCount);
        text.x = i;
        text.y = 20;
        text.size = 20;
        text.align = "center";
        text.update(ctx);
        numberCount += 1;
      }
      numberCount = 0;
      for (let i = 0; i >= this.min; i -= this.interval) {
        const text = this.trend(numberCount);
        text.x = i;
        text.y = 20;
        text.size = 20;
        text.align = "center";
        text.update(ctx);
        numberCount -= 1;
      }
    }
  }
}
