import { Color } from "@newcar/utils";

import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { IPartialFillable } from "../carobj/interface";
import type { RectangleObject } from "./input_type";
import type { IRectSize } from "./interface";

export class Rectangle extends Carobj implements IRectSize, IPartialFillable {
  length: number;
  width: number;
  borderWidth: number;
  borderColor: Color;
  fillColor: Color;
  fillProgress: number;
  lineJoin: CanvasLineJoin;

  constructor(length: number, width: number, data?: carobject & RectangleObject) {
    data = data ?? {};
    super(data);
    this.length = length;
    this.width = width;
    this.borderColor = data.borderColor ?? Color.WHITE;
    this.borderWidth = data.borderWidth ?? 2;
    this.lineJoin = data.lineJoin ?? "miter";
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-nullish-coalescing
    this.fillColor = data.fillColor! ?? null;
    this.fillProgress = 1;
  }

  partialFill(progress: number): void {
    this.fillProgress = progress;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    super.onDraw(ctx);
    ctx.lineWidth = this.borderWidth;
    ctx.lineJoin = this.lineJoin;
    ctx.strokeStyle = this.borderColor.toString();
    if (this.fillColor !== null) {
      const fillColor = Color.rgba(
        this.fillColor.r,
        this.fillColor.g,
        this.fillColor.b,
        this.fillColor.a * this.fillProgress,
      );
      ctx.fillStyle = fillColor.toString();
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(-0.5 * this.length, -0.5 * this.width);
    ctx.lineTo(0.5 * this.length, -0.5 * this.width);
    ctx.lineTo(0.5 * this.length, 0.5 * this.width);
    ctx.lineTo(-0.5 * this.length, 0.5 * this.width);
    ctx.closePath();
    ctx.stroke();

    return ctx;
  }
}
