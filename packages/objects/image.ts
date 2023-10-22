import type { CarobjOption } from "./carobj";
import { Carobj } from "./carobj";

export class Image extends Carobj {
  readonly image: HTMLImageElement;
  path: string;

  constructor(path: string, options?: CarobjOption) {
    super(options);
    this.image = document.createElement("img");
    this.path = path;
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    this.image.src = this.path;
    ctx.drawImage(
      this.image,
      -0.5 * this.image.width,
      -0.5 * this.image.height,
    );
  }
}
