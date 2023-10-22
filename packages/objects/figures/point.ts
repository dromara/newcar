import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export interface PointOption extends CarobjOption {
  size?: number;
  color?: Color;
}

export class Point extends Carobj {
  color: Color;
  size: number;

  constructor(options?: PointOption) {
    super((options ??= {}));
    this.color = options.color ?? Color.WHITE;
    this.size = options.size ?? 4;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color.toString();
    context.beginPath();
    context.arc(0, 0, this.size, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
}
