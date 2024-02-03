import type { CarObjectOption } from "./carobj";
import { CarObject } from "./carobj";

/**
 * The image object.
 */
export class Image extends CarObject {
  #url: string;
  protected ready: boolean;
  readonly image: HTMLImageElement = document.createElement("img");

  /**
   * @param url The url of the image.
   * @param options The options of the object.
   * @see CarObjectOption
   */
  constructor(url: string, options?: CarObjectOption) {
    super(options);
    this.url = url;
  }

  override draw(context: CanvasRenderingContext2D): void {
    if (this.ready) {
      context.drawImage(this.image, this.x, this.y);
    }
  }

  get url(): string {
    return this.#url;
  }

  set url(url: string) {
    this.#url = url;
    this.ready = false;
    this.image.src = url;
    this.image.onload = () => {
      this.ready = true;
    };
  }
}
