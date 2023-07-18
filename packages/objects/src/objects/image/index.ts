// TODO: Use the paths of iamges.

import { Carobj } from "../carobj";
import { carobject } from "../carobj/input_type";

export class Image extends Carobj {
  #image: CanvasImageSource;

  constructor(image: CanvasImageSource, datas: carobject) {
    super(datas);
    this.#image = image;
  }

  override onDraw(ctx: CanvasRenderingContext2D, element?: HTMLElement | undefined): CanvasRenderingContext2D {
    ctx.drawImage(this.#image, this.x ,this.y)
    return ctx;
  }
}
