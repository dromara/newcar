import type { Point, Vector } from "@newcar/utils";
import { toVector } from "@newcar/utils";
import type { Canvas, CanvasKit, Paint } from "canvaskit-wasm";

import type { FigureOption } from "./figure";
import { Figure } from "./figure";

/**
 * The polygon options.
 * @param lineCap The line cap style of the polygon.
 * @param lineJoin The line join style of the polygon.
 * @see FigureOption
 * @see Polygon
 */
export interface PolygonOption extends FigureOption {
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;
}

/**
 * The polygon object.
 */
export class Polygon extends Figure implements PolygonOption {
  #points: Vector[];
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;

  /**
   * @param points The points of the polygon.
   * @param options The options of the object.
   * @see PolygonOption
   */
  constructor(points: Point[], options?: PolygonOption) {
    super((options ??= {}));
    this.points = points;
    this.lineCap = options.lineCap ?? "butt";
    this.lineJoin = options.lineJoin ?? "miter";
  }

  draw(
    paint: Paint,
    canvas: Canvas,
    canvaskit: CanvasKit,
    _element: HTMLCanvasElement,
    ..._args: any[]
  ): void {
    paint.setStrokeWidth(this.borderWidth);
    const path = new canvaskit.Path();
    for (const [index, point] of this.points.entries()) {
      if (index === 0) {
        path.moveTo(...point);
      } else {
        path.lineTo(...point);
      }
    }
    // Fill
    paint.setStyle(canvaskit.PaintStyle.Fill);
    canvas.drawPath(path, paint);
    // Stroke
    paint.setStyle(canvaskit.PaintStyle.Stroke);
    canvas.drawPath(path, paint);
  }

  // override draw(context: CanvasRenderingContext2D): void {
  //   context.strokeStyle = this.borderColor.toString();
  //   context.lineWidth = this.borderWidth;
  //   context.lineCap = this.lineCap;
  //   context.lineJoin = this.lineJoin;
  //   context.beginPath();
  //   for (const [index, point] of this.points.entries()) {
  //     if (index === 0) {
  //       context.moveTo(...point);
  //     } else {
  //       context.lineTo(...point);
  //     }
  //   }
  //   context.closePath();
  //   context.stroke();
  //   if (this.fillColor) {
  //     context.fillStyle = this.fillColor.toString();
  //     context.fill();
  //   }
  // }

  set points(points: Point[]) {
    this.#points = points.map(toVector);
  }

  get points(): Vector[] {
    return this.#points;
  }
}
