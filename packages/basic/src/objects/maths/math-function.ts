import { Color } from "@newcar/utils";
import type { Canvas, CanvasKit, Paint } from "canvaskit-wasm";

import type { CarObjectOption } from "../carobj";
import { CarObject } from "../carobj";

export type MathFunc = (x: number) => number;

/**
 * The math function options.
 * @param color The color of the math function.
 * @param lineWidth The line width of the math function.
 * @param divisionX The number of horizontal divisions.
 * @param divisionY The number of vertical divisions.
 * @see CarObjectOption
 * @see Text
 */
export interface MathFunctionOption extends CarObjectOption {
  color?: Color;
  lineWidth?: number;
  divisionX?: number;
  divisionY?: number;
}

/**
 * The math function object.
 */
export class MathFunction extends CarObject {
  func: MathFunc;
  domain: [number, number];
  color: Color;
  lineWidth: number;
  divisionX: number;
  divisionY: number;

  /**
   * @param func The function.
   * @param fromX The start of domain.
   * @param toX The end of domain.
   * @param fromY The start of range.
   * @param toY The end of range.
   * @param options The options of the object.
   * @see CarObjectOption
   */
  constructor(
    func: MathFunc,
    from: number,
    to: number,
    options?: MathFunctionOption,
  ) {
    super((options ??= {}));
    this.func = func;
    this.domain = [from, to];
    this.color = options.color ?? Color.WHITE;
    this.lineWidth = options.lineWidth ?? 2;
    this.divisionX = options.divisionX ?? 50;
    this.divisionY = options.divisionY ?? 50;
  }

  draw(
    paint: Paint,
    canvas: Canvas,
    canvaskit: CanvasKit,
    _element: HTMLCanvasElement,
    ..._args: any[]
  ): void {
    paint.setStyle(canvaskit.PaintStyle.Stroke);
    paint.setStrokeWidth((this.lineWidth / this.divisionX) * 2);
    paint.setColor(this.color.toFloat4());
    const path = new canvaskit.Path();
    canvas.scale(this.divisionX, this.divisionY);
    path.moveTo(this.domain[0], this.func(this.domain[0]));
    for (
      let x = this.domain[0];
      x <= this.domain[0] + (this.domain[1] - this.domain[0]) * this.progress;
      x += 1 / this.divisionX
    ) {
      const value = this.func(x);
      path.lineTo(x, value);
    }
    canvas.drawPath(path, paint);
  }
}
