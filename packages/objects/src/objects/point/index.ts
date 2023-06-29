import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { IPositionedMut } from "../interfaces/Positioned";
import type { pointobject } from "./input_type";

export class Point extends Carobj implements IPositionedMut {
  constructor(datas: pointobject & carobject) {
    super(datas);
    this.x = datas.x;
    this.y = datas.y;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);

    return ctx;
  }
}
