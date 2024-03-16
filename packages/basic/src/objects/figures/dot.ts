import { Color } from "@newcar/utils";
import type { Canvas, CanvasKit, Paint } from "canvaskit-wasm";

import type { CarObjectOption } from "../carobj";
import { CarObject } from "../carobj";

/**
 * The dot options.
 * @param color The color of the dot.
 * @param radiusValue The circumference of the dot.
 * @see CarObjectOption
 * @see Dot
 */
export interface DotOption extends CarObjectOption {
  color?: Color;
  circleCenterX: number;
  circleCenterY: number;
  radiusValue: number;
}

/**
 * The dot object.
 */
export class Dot extends CarObject implements DotOption {
  color?: Color;
  circleCenterX: number;
  circleCenterY: number;
  radiusValue: number;

  /**
   * @param circleCenterY The X of the dot centre.
   * @param circleCenterY The Y of the dot centre.
   * @param options The options of the object.
   * @see DotOption
   */

  draw(
    paint: Paint,
    canvas: Canvas,
    canvaskit: CanvasKit,
    _element: HTMLCanvasElement,
    ..._args: any[]
  ): void {
    paint.setStyle(canvaskit.PaintStyle.Fill);
    paint.setColor(this.color.toFloat4());
    canvas.drawCircle(
      this.circleCenterX,
      this.circleCenterY,
      this.radiusValue,
      paint,
    );
  }
}
