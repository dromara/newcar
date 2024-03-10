import type { Point, Vector } from "@newcar/utils";
import { Color, toVector } from "@newcar/utils";
import type { Canvas, CanvasKit, Paint } from "canvaskit-wasm";

import type { CarObjectOption } from "../carobj";
import { CarObject } from "../carobj";

/**
 * The line options.
 * @param color The color of the line.
 * @param lineWidth The width of the line.
 * @see CarObjectOption
 * @see Line
 */
export interface LineOption extends CarObjectOption {
  color?: Color;
  lineWidth?: number;
}

/**
 * The line object.
 */
export class Line extends CarObject implements LineOption {
  color: Color;
  lineWidth: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;

  /**
   * @param from The start point of the line.
   * @param to The end point of the line.
   * @param options The options of the object.
   * @see LineOption
   */
  constructor(from: Point, to: Point, options?: LineOption) {
    super((options ??= {}));
    this.from = from;
    this.to = to;
    this.color = options.color ?? Color.WHITE;
    this.lineWidth = options.lineWidth ?? 2;
  }

  draw(
    paint: Paint,
    canvas: Canvas,
    canvaskit: CanvasKit,
    _element: HTMLCanvasElement,
    ..._args: any[]
  ): void {
    paint.setStyle(canvaskit.PaintStyle.Stroke);
    paint.setStrokeWidth(this.lineWidth);
    canvas.drawLine(
      this.fromX,
      this.fromY,
      this.fromX + (this.toX - this.fromX) * this.progress,
      this.fromY + (this.toY - this.fromY) * this.progress,
      paint,
    );
  }

  // override draw(context: CanvasRenderingContext2D): void {
  //   context.beginPath();
  //   context.strokeStyle = this.color.toString();
  //   context.lineWidth = this.lineWidth;
  //   context.moveTo(this.fromX, this.fromY);
  //   context.lineTo(
  //     this.fromX + (this.toX - this.fromX) * this.progress,
  //     this.fromY + (this.toY - this.fromY) * this.progress,
  //   );
  //   context.stroke();
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
