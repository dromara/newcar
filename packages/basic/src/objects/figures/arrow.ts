import type { Point, Vector } from "@newcar/utils";
import { Color, arrows, toVector } from "@newcar/utils";

import type { CarObjectOption } from "../carobj";
import { CarObject } from "../carobj";
import { Polygon } from "../figures/polygon";

/**
 * The line options.
 * @param color The color of the line.
 * @param lineWidth The width of the line.
 * @see CarObjectOption
 * @see Line
 */
export interface ArrowOption extends CarObjectOption {
  color?: Color;
  lineWidth?: number;
  arrow?: Point[];
}

/**
 * The line object.
 */
export class Arrow extends CarObject implements ArrowOption {
  color: Color;
  lineWidth: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  arrow: Point[];

  /**
   * @param from The start point of the line.
   * @param to The end point of the line.
   * @param options The options of the object.
   * @see LineOption
   */
  constructor(from: Point, to: Point, options?: ArrowOption) {
    super((options ??= {}));
    this.from = from;
    this.to = to;
    this.color = options.color ?? Color.WHITE;
    this.lineWidth = options.lineWidth ?? 2;
    this.arrow = options.arrow === undefined ? arrows.triangle : options.arrow;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.strokeStyle = this.color.toString();
    context.lineWidth = this.lineWidth;
    context.moveTo(this.fromX, this.fromY);
    context.lineTo(this.toX * this.progress, this.toY * this.progress);
    context.stroke();
    context.save();
    context.translate(this.toX, this.toY);
    const rad = Math.atan(
      Math.abs(this.fromY - this.toY) / Math.abs(this.fromX - this.toX),
    );
    if (this.fromX > this.toX) {
      context.scale(-1, 1);
    }
    if (this.fromY > this.toY) {
      context.scale(1, -1);
    }
    context.rotate(rad);
    const arrow = new Polygon(this.arrow, {
      fillColor: this.color,
    });
    arrow.update(context);
    context.restore();
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
