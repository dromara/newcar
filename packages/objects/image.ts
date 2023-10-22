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

  override draw(context: CanvasRenderingContext2D): void {
    this.image.src = this.path;
    context.drawImage(
      this.image,
      -0.5 * this.image.width,
      -0.5 * this.image.height,
    );
  }
}
