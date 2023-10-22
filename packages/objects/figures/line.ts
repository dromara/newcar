import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import type { Positional } from "../interface";

export type Point = Positional | [number, number];

export function toPoint(point: Point): Positional {
  if (Array.isArray(point)) {
    return { x: point[0], y: point[1] };
  }

  return point;
}

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

  constructor(startPoint: Point, endPoint: Point, options?: LineOption) {
    super((options ??= {}));
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.color = options.color ?? Color.WHITE;
    this.lineWidth = options.lineWidth ?? 2;
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = this.color.toString();
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }

  set startPoint(value: Point) {
    const point = toPoint(value);
    this.startX = point.x;
    this.startY = point.y;
  }

  get startPoint(): Positional {
    return { x: this.startX, y: this.startY };
  }

  set endPoint(value: Point) {
    const point = toPoint(value);
    this.endX = point.x;
    this.endY = point.y;
  }

  get endPoint(): Positional {
    return { x: this.endX, y: this.endY };
  }
}
