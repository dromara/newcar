import { Color } from "@newcar/utils/src";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import { Text } from "../text";

export type Trend = (n: number) => Text;
const defaultTrend: Trend = (n: number) => new Text(String(n));

export interface NumberAxisOption extends CarobjOption {
  arrow?: boolean;
  point?: boolean;
  number?: boolean;
  reverse?: boolean;
  interval?: number;
  color?: Color;
  trend?: Trend;
}

export class NumberAxis extends Carobj {
  arrow: boolean;
  point: boolean;
  number: boolean;
  reverse: boolean;
  interval: number;
  color: Color;
  trend: Trend;

  constructor(
    public from: number,
    public to: number,
    options?: NumberAxisOption,
  ) {
    super((options ??= {}));
    this.arrow = options.arrow ?? true;
    this.point = options.point ?? true;
    this.number = options.number ?? true;
    this.reverse = options.reverse ?? false;
    this.interval = options.interval ?? 50;
    this.color = options.color ?? Color.WHITE;
    this.trend = options.trend ?? defaultTrend;
  }

  override draw(context: CanvasRenderingContext2D): void {
    if (this.reverse) {
      context.scale(-1, 1);
    }

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = this.color.toString();
    context.moveTo(this.from, 0);
    context.lineTo(this.to, 0);
    context.stroke();

    if (this.arrow) {
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(this.to, 0);
      context.lineTo(this.to - 6, 6);
      context.moveTo(this.to, 0);
      context.lineTo(this.to - 6, -6);
      context.stroke();
    }

    // Draw pointS.
    if (this.point) {
      context.strokeStyle = this.color.toString();
      context.lineWidth = 2;
      for (let i = 0; i <= this.to; i += this.interval) {
        context.moveTo(i, 10);
        context.lineTo(i, -10);
      }
      for (let i = 0; i >= this.from; i -= this.interval) {
        context.moveTo(i, 10);
        context.lineTo(i, -10);
      }
      context.stroke();
    }

    if (this.reverse) {
      context.scale(-1, 1);
    }

    // Draw numbers.
    let number;
    if (this.number) {
      number = 0;
      for (let i = 0; i <= this.to; i += this.interval) {
        const text = this.trend(number);
        text.x = i;
        text.y = 20;
        text.size = 20;
        text.update(context);
        number += 1;
      }
      number = 0;
      for (let i = 0; i >= this.from; i -= this.interval) {
        const text = this.trend(number);
        text.x = i;
        text.y = 20;
        text.size = 20;
        text.update(context);
        number -= 1;
      }
    }
  }
}
