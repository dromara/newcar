import { Carobj, CarobjOption } from "../carobj";
import type { Point } from "./line"

export interface BraceOptions extends CarobjOption {
  direction?: "up" | "under";
}

export class Brace extends Carobj {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  direction: "up" | "under";
  constructor(start: Point, end: Point, options?: BraceOptions) {
    super((options ??= {}));
    [this.startX, this.startY] = start;
    [this.endX, this.endY] = end;
    this.direction = options.direction!;
  }

  override draw(context: CanvasRenderingContext2D) {
    const font = 20
    const length = Math.sqrt(Math.abs(this.startX - this.endX) + Math.abs(this.startY - this.endY));
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("{", this.x, this.y);
  }
}
