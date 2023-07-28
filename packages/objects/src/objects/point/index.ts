// TODO: Drawable point.
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { IPositionedMut } from "../carobj/interface";
import type { pointobject } from "./input_type";

export class Point extends Carobj implements IPositionedMut {
  #color: string;
  #size: number;

  constructor(datas: pointobject & carobject) {
    super(datas);
    this.x = datas.x;
    this.y = datas.y;
    this.#color = datas.color ?? "white";
    this.#size = datas.size ?? 2
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.fillStyle = `${this.#color}`
    ctx.beginPath();
    ctx.arc(0, 0, this.#size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill()
    return ctx;
  }
}
