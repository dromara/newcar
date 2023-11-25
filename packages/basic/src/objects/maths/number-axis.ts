import { Color } from "@newcar/utils/src";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import { Text } from "../text";

export type Direction = "left" | "right";
export type Trend = (n: number) => Text;

/**
 * The number axis options.
 * @param arrow Show arrows or not.
 * @param point Show points or not.
 * @param number Show number or not.
 * @param interval The unit width of the number axis.
 * @param color The color of the number axis.
 * @param direction The direction of the number axis.
 * @see CarobjOption
 * @see NumberAxis
 */
export interface NumberAxisOption extends CarobjOption {
  arrow?: boolean;
  point?: boolean;
  number?: boolean;
  interval?: number;
  color?: Color;
  direction?: Direction;
  trend?: Trend;
}

/**
 * The number axis object.
 */
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

  /**
   * @param min The minimum of the number axis.
   * @param max The maximum of the number axis.
   * @param options The options for construct the object.
   * @see CarobjOption
   */
  constructor(min: number, max: number, options?: NumberAxisOption) {
    super((options ??= {}));
    this.min = min;
    this.max = max;
    this.arrow = options.arrow ?? true;
    this.point = options.point ?? true;
    this.number = options.number ?? true;
    this.interval = options.interval ?? 50;
    this.color = options.color ?? Color.RGB(255, 255, 255);
    this.direction = options.direction ?? "right";
    this.trend = options.trend ?? ((n: number) => new Text(String(n)));
  }

  override draw(context: CanvasRenderingContext2D): void {
    if (this.min > 0) {
      throw new Error("Parameter `min` cannot be greater than 0");
    }
    if (this.max < 0) {
      throw new Error("Parameter `max` cannot be less than 0");
    }

    if (this.direction === "left") {
      context.scale(-1, 1);
    }

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = this.color.toString();
    context.moveTo(this.min, 0);
    context.lineTo(this.max, 0);
    context.stroke();

    if (this.arrow) {
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(this.max, 0);
      context.lineTo(this.max - 6, 6);
      context.moveTo(this.max, 0);
      context.lineTo(this.max - 6, -6);
      context.stroke();
    }

    // Draw pointS.
    if (this.point) {
      context.strokeStyle = this.color.toString();
      context.lineWidth = 2;
      for (let i = 0; i <= this.max; i += this.interval) {
        context.moveTo(i, 10);
        context.lineTo(i, -10);
      }
      for (let i = 0; i >= this.min; i -= this.interval) {
        context.moveTo(i, 10);
        context.lineTo(i, -10);
      }
      context.stroke();
    }

    if (this.direction === "left") {
      context.scale(-1, 1);
    }

    // Draw numbers.
    let number;
    if (this.number) {
      number = 0;
      for (let i = 0; i <= this.max; i += this.interval) {
        const text = this.trend(number);
        text.x = i;
        text.y = 20;
        text.size = 20;
        text.update(context);
        number += 1;
      }
      number = 0;
      for (let i = 0; i >= this.min; i -= this.interval) {
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
