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
    canvas.drawRect4f(this.fromX, this.fromY, this.toX, this.toY, paint);

    // Fill
    paint.setStyle(canvaskit.PaintStyle.Fill);
    canvas.drawRect4f(this.fromX, this.fromY, this.toX, this.toY, paint);
  }

  // override draw(context: CanvasRenderingContext2D): void {
  //   context.lineWidth = this.borderWidth;
  //   context.lineJoin = this.lineJoin;
  //   context.strokeStyle = this.borderColor.toString();
  //   context.beginPath();
  //   context.moveTo(this.fromX, this.fromX);
  //   context.lineTo(
  //     this.fromX + (this.toX - this.fromX) * this.progress,
  //     this.fromX,
  //   );
  //   context.lineTo(
  //     this.fromX + (this.toX - this.fromX) * this.progress,
  //     this.fromY + (this.toY - this.fromY) * this.progress,
  //   );
  //   context.lineTo(
  //     this.fromX,
  //     this.fromY + (this.toY - this.fromY) * this.progress,
  //   );
  //   context.lineTo(this.fromX, this.fromX);
  //   context.closePath();
  //   context.stroke();
  //   if (this.fillColor) {
  //     context.fillStyle = this.fillColor.toString();
  //     context.fill();
  //   }
  // }

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
