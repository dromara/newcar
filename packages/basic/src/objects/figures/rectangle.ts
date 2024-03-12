import type { Point, Vector } from "@newcar/utils";
import { toVector } from "@newcar/utils";
import type { Canvas, CanvasKit, Paint } from "canvaskit-wasm";

import type { FigureOption } from "./figure";
import { Figure } from "./figure";

/**
 * The rectangle options.
 * @param lineJoin The line join style of the rectangle.
 * @see FigureOption
 * @see Rectangle
 */
export interface RectangleOption extends FigureOption {
  lineJoin?: CanvasLineJoin;
}

/**
 * The rectangle object.
 */
export class Rectangle extends Figure implements RectangleOption {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  lineJoin: CanvasLineJoin;

  /**
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   * @param options The options of the object.
   * @see RectangleOption
   */
  constructor(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    options?: RectangleOption,
  ) {
    super((options ??= {}));
    this.fromX = fromX;
    this.toX = toX;
    this.fromY = fromY;
    this.toY = toY;
    this.lineJoin = options.lineJoin ?? "miter";
  }

  draw(
    paint: Paint,
    canvas: Canvas,
    canvaskit: CanvasKit,
    _element: HTMLCanvasElement,
    ..._args: any[]
  ): void {
    // Stroke
    paint.setStyle(canvaskit.PaintStyle.Stroke);
    paint.setStrokeWidth(this.borderWidth);
    paint.setColor(this.borderColor.toFloat4());
    canvas.drawRect4f(
      this.fromX,
      this.fromY,
      this.toX * this.progress,
      this.toY * this.progress,
      paint,
    );

    // Fill
    if (this.fillColor) {
      paint.setStyle(canvaskit.PaintStyle.Fill);
      paint.setColor(this.fillColor.toFloat4());
      canvas.drawRect4f(
        this.fromX,
        this.fromY,
        this.toX * this.progress,
        this.toY * this.progress,
        paint,
      );
    }
  }

  set from(point: Point) {
    [this.fromX, this.fromY] = toVector(point);
  }

  get from(): Vector {
    return [this.fromX, this.fromY];
  }

  set to(point: Point) {
    [this.toX, this.toY] = toVector(point);
  }

  get to(): Vector {
    return [this.toX, this.toY];
  }
}
