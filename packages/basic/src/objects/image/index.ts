// TODO: Use the paths of iamges.

import { Carobj } from "../Carobj";
import type { carobject } from "../Carobj/input_type";

export class Image extends Carobj {
  #image: HTMLImageElement;
  #path: string;

  constructor(path: string, data?: carobject) {
    data = data ?? {};
    super(data);
    const image = document.createElement("img");
    this.#image = image;
    this.#path = path;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    super.onDraw(ctx);
    this.#image.src = this.#path;
    ctx.drawImage(this.#image, -0.5 * this.#image.width, -0.5 * this.#image.height);

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
