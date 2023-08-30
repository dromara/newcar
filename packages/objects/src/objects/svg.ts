import { Carobj } from "./carobj";
import type { carobject } from "./carobj/input_type";
import { Canvg } from "canvg";

export class Svg extends Carobj {
  #canva: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #svg: string;
  #canvg?: Canvg;
  #width: number;
  #height: number;

  constructor(svg: string, width: number, height: number, data: carobject) {
    super(data);
    this.#svg = svg;
    this.#width = width;
    this.#height = height;
    this.#canva = document.createElement("canvas");
    this.#ctx = this.#canva.getContext("2d")!;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);

    if (!this.#canvg) {
      Canvg.from(this.#ctx, this.#svg).then((canvg) => {
        canvg.resize(this.#width, this.#height);
        this.#canvg = canvg;
        this.#canvg.render();
      });
    }

    ctx.drawImage(this.#canva, this.x, this.y);

    return ctx;
  }
}
