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
    if (this.ready) {
      context.drawImage(this.image, this.x, this.y);
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
