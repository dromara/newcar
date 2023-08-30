// TODO: Use the paths of iamges.

import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";

export class Image extends Carobj {
  #image: HTMLImageElement;
  #path: string;

  constructor(path: string, datas: carobject) {
    super(datas);
    const image = document.createElement("img");
    this.#image = image;
    this.#path = path;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    super.onDraw(ctx);
    this.#image.src = this.#path;
    ctx.drawImage(this.#image, this.x, this.y);

    return ctx;
  }

  get image() {
    return this.#image;
  }

  get path() {
    return this.#path;
  }

  set path(value: string) {
    this.#path = value;
  }
}
