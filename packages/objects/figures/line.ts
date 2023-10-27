import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export type Point = [number, number];

/**
 * Line options.
 * @param color The color of the line.
 * @param lineWidth The width of the line.
 * @see CarobjOption
 * @see Line
 */
export interface LineOption extends CarobjOption {
  color?: Color;
  lineWidth?: number;
}

export class Line extends Carobj {
  color: Color;
  lineWidth: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;

  /**
   * Line object.
   * @param startPoint The fill color of the text.
   * @param endPoint The border color of the text.
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
