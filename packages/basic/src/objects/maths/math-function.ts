import { Color } from "@newcar/utils/src";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export type MathFunc = (x: number) => number;

/**
 * The math function options.
 * @param color The color of the math function.
 * @param lineWidth The line width of the math function.
 * @param divisionX The number of horizontal divisions.
 * @param divisionY The number of vertical divisions.
 * @see CarobjOption
 * @see Text
 */
export interface MathFunctionOption extends CarobjOption {
  color?: Color;
  lineWidth?: number;
  divisionX?: number;
  divisionY?: number;
}

/**
 * The math function object.
 */
export class MathFunction extends Carobj {
  func: MathFunc;
  start: number;
  end: number;
  color: Color;
  lineWidth: number;
  divisionX: number;
  divisionY: number;

  /**
   * @param func The function.
   * @param start The start value.
   * @param end The end value.
   * @param options The options of the object.
   * @see CarobjOption
   */
  constructor(
    func: MathFunc,
    start: number,
    end: number,
    options?: MathFunctionOption,
  ) {
    super((options ??= {}));
    this.func = func;
    this.start = start;
    this.end = end;
    this.color = options.color ?? Color.WHITE;
    this.lineWidth = options.lineWidth ?? 2;
    this.divisionX = options.divisionX ?? 50;
    this.divisionY = options.divisionY ?? 50;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.color.toString();
    context.lineWidth = (this.lineWidth / this.divisionX) * 2;
    context.beginPath();
    context.scale(this.divisionX, this.divisionY);
    context.moveTo(this.start, this.func(this.start));
    for (let x = this.start; x <= this.end; x += 1 / this.divisionX) {
      const value = this.func(x);
      context.lineTo(x, value);
    }
    context.stroke();
  }
}
