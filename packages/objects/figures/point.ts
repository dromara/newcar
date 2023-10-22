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

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
