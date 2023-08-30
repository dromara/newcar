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

  constructor(data?: carobject & RectangleObject) {
    data = data ?? {};
    super(data);
    this.length = data.length ?? 300;
    this.width = data.length ?? 200;
    this.borderColor = data.borderColor ?? Color.rgb(255, 255, 255);
    this.borderWidth = data.borderWidth ?? 2;
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
    ctx.moveTo(0, 0);
    ctx.lineTo(this.length, 0);
    ctx.lineTo(this.length, this.width);
    ctx.lineTo(0, this.width);
    ctx.lineTo(0, 0 - 0.5 * this.borderWidth);
    ctx.stroke();

    return ctx;
  }
}
