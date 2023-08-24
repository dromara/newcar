import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { rectangleobject } from "./input_type";
import type { IRectSize } from "./interface";

export class Rectangle extends Carobj implements IRectSize {
  length: number;
  width: number;
  borderWidth: number;
  borderColor: string;
  fillColor: string;

  constructor(datas: carobject & rectangleobject) {
    super(datas);
    this.length = datas.length;
    this.width = datas.length;
    this.borderColor = datas.borderColor ?? "white";
    this.borderWidth = datas.borderWidth ?? 2;
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-nullish-coalescing
    this.fillColor = datas.fillColor! ?? null;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    super.onDraw(ctx);
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = `${this.borderColor}`;
    if (this.fillColor !== null) {
      ctx.fillStyle = `${this.fillColor}`;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.length, 0);
    ctx.lineTo(this.length, this.width);
    ctx.lineTo(0, this.width);
    ctx.lineTo(0, 0 - 0.5 * this.borderWidth);
    ctx.stroke();

    return ctx;
  }
}
