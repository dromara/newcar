import type { Point } from "@newcar/utils";
import { Color, arrows } from "@newcar/utils";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import { Line } from "../figures/line";
import { Polygon } from "../figures/polygon";
import type { TextOption } from "../text";
import { Text } from "../text";

export type Trender = (n: number) => string;
export interface Trend {
  trender: Trender;
  options: TextOption;
}
export type TrendType =
  | Partial<Trend> // NOTICE: `{}` for empty options
  | Trender // trender only
  | TextOption // options only
  | null // no trend
  | undefined; // default trend

export function solve(
  trend: TrendType,
  defaultOption: TextOption = { y: 16, size: 16 },
): Trend | null {
  if (trend == null) {
    return null;
  }
  let trender: Trender = String;
  const options: TextOption = { ...defaultOption }; // shallow copy
  if (trend === undefined) {
    // use default value.
  } else if ("trender" in trend || "options" in trend) {
    trender = trend.trender ?? trender;
    Object.assign(options, trend.options ?? {});
  } else if (trend instanceof Function) {
    trender = trend;
  } else {
    Object.assign(options, trend);
  }

  return { trender, options };
}

export enum NumberAxisStyle {
  Axis = 1,
  Arrow = 2,
  Tick = 4,
  Trend = 8,
  All = Axis | Arrow | Tick | Trend,
}

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
  axisWidth?: number;
  tickWidth?: number;
  tickHeight?: number | [number, number];
  tickRotation?: number;
  tickColor?: Color;
  color?: Color;
  arrow?: Point[] | null;
  trend?: TrendType;
}

/**
 * The number axis object.
 */
export class NumberAxis extends Carobj implements NumberAxisOption {
  unit: number;
  interval: number;
  axisWidth: number;
  tickWidth: number;
  #tickHeight: [number, number];
  tickRotation: number;
  tickColor: Color;
  color: Color;
  arrow: Point[] | null;
  #trend: Trend | null;

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
    this.axisWidth = options.axisWidth ?? 2;
    this.tickWidth = options.tickWidth ?? 2;
    this.tickHeight = options.tickHeight ?? 10;
    this.tickRotation = options.tickRotation ?? Math.PI / 2;
    this.tickColor = options.tickColor ?? Color.GREY;
    this.color = options.color ?? Color.WHITE;
    this.arrow = options.arrow === undefined ? arrows.triangle : options.arrow;
    this.trend = options.trend;
  }

  override draw(
    context: CanvasRenderingContext2D,
    style: NumberAxisStyle = NumberAxisStyle.All,
  ): void {
    const showAxis = style & NumberAxisStyle.Axis;
    const showArrow = style & NumberAxisStyle.Arrow;
    const showTick = style & NumberAxisStyle.Tick;
    const showTrend = style & NumberAxisStyle.Trend;

    context.save();

    if (showTick || showTrend) {
      for (let i = this.min; i <= this.max; i += this.interval) {
        const offset = i * this.unit;
        if (showTick && this.tickWidth) {
          new Line([this.tickHeight[0], 0], [-this.tickHeight[1], 0], {
            x: offset,
            lineWidth: this.tickWidth,
            rotation: this.tickRotation,
            color: this.tickColor,
            progress: this.progress,
          }).update(context);
        }
        if (showTrend && this.trend) {
          new Text(this.trend.trender(this.reverse ? -i : i), {
            ...this.trend.options,
            x: offset + (this.trend.options.x ?? 0),
          }).update(context);
        }
      }
      // Draw ticks and numbers.
    }

    if (showAxis) {
      new Line([this.from * this.unit, 0], [this.to * this.unit, 0], {
        lineWidth: this.axisWidth,
        color: this.color,
        progress: this.progress,
      }).update(context);
    }

    if (showArrow && this.arrow) {
      if (this.reverse) {
        context.scale(-1, 1);
      }
      new Polygon(this.arrow, {
        borderWidth: 0,
        fillColor: this.color,
        x: (this.reverse ? -1 : 1) * this.to * this.unit,
      }).update(context);
      if (this.reverse) {
        context.scale(-1, 1);
      }
    }

    context.restore();
  }

  set tickHeight(height: number | [number, number]) {
    this.#tickHeight = Array.isArray(height) ? height : [height, height];
  }

  get tickHeight(): [number, number] {
    return this.#tickHeight;
  }

  set trend(trend: TrendType) {
    this.#trend = solve(trend);
  }

  get trend(): Trend | null {
    return this.#trend;
  }

  get reverse(): boolean {
    return this.to < this.from;
  }

  get min(): number {
    return Math.min(this.from, this.to);
  }

  get max(): number {
    return Math.max(this.from, this.to);
  }
}
