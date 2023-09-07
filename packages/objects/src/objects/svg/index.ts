/* eslint-disable prefer-template */
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { ITextEditable } from "../text/interface";

export class Svg extends Carobj implements ITextEditable {
  #text: string;
  #img: HTMLImageElement = document.createElement("img");
  #DOMURL = window.URL || window.webkitURL || window;

  constructor(text: string, data?: carobject) {
    data = data ?? {};
    super(data);
    this.#text = text;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    ctx.drawImage(this.#img, -0.5 * this.#img.width, -0.5 * this.#img.height);

    return ctx;
  }

  override onSet(): void {
    // Before the animation running, it needs to load the iamge before.
    // otherwise it only on run in Firefox, if it runs in Chrome, Chrome will throw the ERROR: Image NOT FOUND
    const svg = new Blob([this.#text], { type: "image/svg+xml;charset=utf-8" });
    this.#img.src = this.#DOMURL.createObjectURL(svg);
  }

  get text() {
    return this.#text;
  }

  set text(value: string) {
    this.#text = value;
    this.onSet();
  }
}
