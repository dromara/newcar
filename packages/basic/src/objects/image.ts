import type { CarobjOption } from "./carobj";
import { Carobj } from "./carobj";

/**
 * The image object.
 */
export class Image extends Carobj {
  url: string;
  readonly image: HTMLImageElement = document.createElement("img");

  /**
   * @param url The url of the image.
   * @param options The options of the object.
   * @see CarobjOption
   */
  constructor(url: string, options?: CarobjOption) {
    super(options);
    this.url = url;
  }

  override draw(context: CanvasRenderingContext2D): void {
    this.image.src = this.url;
    context.drawImage(
      this.image,
      -0.5 * this.image.width,
      -0.5 * this.image.height,
    );
  }
}
