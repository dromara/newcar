import { Color } from "@newcar/utils/src/color";
import { arrows } from "@newcar/utils/src/constants";
import type { Point } from "@newcar/utils/src/point";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import { Polygon } from "../figures/polygon";
import type { TextOption } from "../text";
import { Text } from "../text";

export type Trend = (n: number) => Text;

const trend = (options?: TextOption) => (n: number) =>
  new Text(String(n), { y: 16, size: 16, ...options });

/**
 * The number axis options.
 * @param unit The unit width of the number axis.
 * @param interval The width of interval between ticks.
 * @param tick The height of ticks, zero for no tick.
 * @param color The color of the number axis.
 * @param arrow A array of `Point`, `null` for no arrow.
 * @param trend A `function` or `TextOption`, `null` for no trend.
 * @see CarobjOption
 * @see NumberAxis
 */
export interface NumberAxisOption extends CarobjOption {
  unit?: number;
  interval?: number;
  tick?: number;
  color?: Color;
  arrow?: Point[] | null;
  trend?: Trend | TextOption | null;
}

/**
 * The number axis object.
 */
export class NumberAxis extends Carobj implements NumberAxisOption {
  unit: number;
  interval: number;
  tick: number;
  color: Color;
  arrow: Point[] | null;
  trend: Trend | null;

  /**
   * @param from The starting unit of the number axis.
   * @param to The ending unit of the number axis.
   * @param options The options for construct the object.
   * @see CarobjOption
   */
  constructor(
    public from: number,
    public to: number,
    options?: NumberAxisOption,
  ) {
    super((options ??= {}));
    this.unit = options.unit ?? 50;
    this.interval = options.interval ?? 1;
    this.tick = options.tick ?? 10;
    this.color = options.color ?? Color.WHITE;
    this.arrow = options.arrow === undefined ? arrows.triangle : options.arrow;
    this.trend =
      typeof options.trend === "function" || options.trend === null
        ? options.trend
        : trend(options.trend);
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.translate(((this.from + this.to) / 2) * -this.unit, 0);
    const reverse: boolean = this.to < this.from;
    if (reverse) {
      [this.from, this.to] = [this.to, this.from];
    }

    context.beginPath();
    context.strokeStyle = this.color.toString();
    context.moveTo(this.from * this.unit, 0);
    context.lineTo(this.to * this.unit, 0);
    context.stroke();

    // Draw arrows.
    if (this.arrow) {
      const arrow = new Polygon(this.arrow, {
        fillColor: this.color,
        x: this.to * this.unit,
      });
      if (reverse) {
        context.scale(-1, 1);
        arrow.update(context);
        context.scale(-1, 1);
      } else {
        arrow.update(context);
      }
    }

    // Draw ticks and numbers.
    for (let i = this.from; i <= this.to; i += this.interval) {
      const offset = i * this.unit;
      if (this.tick) {
        context.moveTo(offset, this.tick);
        context.lineTo(offset, -this.tick);
        context.stroke();
      }
      if (this.trend) {
        const text = this.trend(reverse ? -i : i);
        text.x += offset;
        text.update(context);
      }
    }

    if (reverse) {
      [this.from, this.to] = [this.to, this.from];
    }
  }
}
