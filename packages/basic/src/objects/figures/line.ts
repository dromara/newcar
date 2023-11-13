import { Color } from "@newcar/utils/src";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export type Point = [number, number];

/**
 * The line options.
 * @param color The color of the line.
 * @param lineWidth The width of the line.
 * @see CarobjOption
 * @see Line
 */
export interface LineOption extends CarobjOption {
  color?: Color;
  lineWidth?: number;
}

/**
 * The line object.
 */
export class Line extends Carobj implements LineOption {
  color: Color;
  lineWidth: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;

  /**
   * @param startPoint The start point of the line.
   * @param endPoint The end point of the line.
   * @param options The options of the object.
   * @see LineOption
   */
  constructor(startPoint: Point, endPoint: Point, options?: LineOption) {
    super((options ??= {}));
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.color = options.color ?? Color.WHITE;
    this.lineWidth = options.lineWidth ?? 2;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.strokeStyle = this.color.toString();
    context.lineWidth = this.lineWidth;
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.stroke();
  }

  set startPoint(point: Point) {
    [this.startX, this.startY] = point;
  }

  get startPoint(): Point {
    return [this.startX, this.startY];
  }

  set endPoint(point: Point) {
    [this.endX, this.endY] = point;
  }

  get endPoint(): Point {
    return [this.endX, this.endY];
  }
}
