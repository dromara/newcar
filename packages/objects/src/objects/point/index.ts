import { Color } from "@newcar/utils";

import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { IPositionedMut } from "../carobj/interface";
import type { pointobject } from "./input_type";

export class Point extends Carobj implements IPositionedMut {
  #color: Color;
  #size: number;

  constructor(data?: pointobject & carobject) {
    data = data ?? {};
    super(data);
    this.#color = data.color ?? Color.rgb(255, 255, 255);
    this.#size = data.size ?? 4;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.fillStyle = `${this.#color.toString()}`;
    ctx.beginPath();
    ctx.arc(0, 0, this.#size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    return ctx;
  }
}
