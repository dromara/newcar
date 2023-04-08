import { Carobj } from "./carobj";
import { IPositionedMut } from "src/interfaces/Positioned";
import { type carobject } from "./carobj";

export type pointobject = {
  x: number;
  y: number;
};

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
