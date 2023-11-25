import { Color } from "@newcar/utils/src";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export type Point = [number, number];
export type Position = Point | { x: number; y: number };

export function solve(point: Position): Point {
  if (Array.isArray(point)) {
    return point;
  }

  return [point.x, point.y];
}

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
  constructor(from: Position, to: Position, options?: LineOption) {
    super((options ??= {}));
    this.from = from;
    this.to = to;
    this.color = options.color ?? Color.WHITE;
    this.lineWidth = options.lineWidth ?? 2;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.strokeStyle = this.color.toString();
    context.lineWidth = this.lineWidth;
    context.moveTo(this.fromX, this.fromY);
    context.lineTo(this.toX, this.toY);
    context.stroke();
  }

  set from(point: Position) {
    [this.fromX, this.fromY] = solve(point);
  }

  get from(): Point {
    return [this.fromX, this.fromY];
  }

  set to(point: Position) {
    [this.toX, this.toY] = solve(point);
  }

  get to(): Point {
    return [this.toX, this.toY];
  }
}
