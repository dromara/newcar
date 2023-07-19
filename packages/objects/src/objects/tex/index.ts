import { Carobj } from "../carobj";
import { carobject } from "../carobj/input_type";
import { texobject } from "./input_type";

export class Tex extends Carobj {
  #tex: string;

  constructor(datas: carobject & texobject) {
    super(datas);
    this.#tex = datas.tex;
  }

  override onDraw(ctx: CanvasRenderingContext2D, element?: HTMLElement | undefined): CanvasRenderingContext2D {
    super.onDraw(ctx);
    return ctx;
  }
}
