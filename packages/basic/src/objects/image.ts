import type { CarobjOption } from "./carobj";
import { Carobj } from "./carobj";

/**
 * The image object.
 */
export class Image extends Carobj {
  url: string;
  protected ready = false;
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
<<<<<<< HEAD
    if (this.ready) {
      context.drawImage(this.image, this.image.width, this.image.height);
=======
    if (this.#isload) {
      context.drawImage(this.image, this.x, this.y);
>>>>>>> 9e5e3b36668b9567a3e01908450c4e258460b9f9
    }
  }

  init(): void {
    this.ready = false;
    this.image.src = this.url;
    this.image.onload = () => {
      this.ready = true;
    };
  }
}
