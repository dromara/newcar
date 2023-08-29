/* eslint-disable prefer-template */
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { ITextEditable } from "../text/interface";

export class WebView extends Carobj implements ITextEditable {
  #svg_content: string;
  #text: string;
  #img: HTMLImageElement = document.createElement("img");
  #DOMURL = window.URL || window.webkitURL || window;

  constructor(text: string, datas: carobject) {
    super(datas);
    this.#text = text;
    this.#svg_content =
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
      '<foreignObject width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="color: white">' +
      text +
      "</div>" +
      "</foreignObject>" +
      "</svg>";
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    ctx.drawImage(this.#img, 0, 0);

    return ctx;
  }

  override onSet(): void {
    // Before the animation running, it needs to load the iamge before.
    // otherwise it only on run in Firefox, if it runs in Chrome, Chrome will throw the ERROR: Image NOT FOUND
    const svg = new Blob([this.#svg_content], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = this.#DOMURL.createObjectURL(svg);
    this.#img.src = url;
  }

  get text() {
    return this.#text;
  }

  set text(value: string) {
    this.#text = value;
    this.#svg_content =
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
      '<foreignObject width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml">' +
      value +
      "</div>" +
      "</foreignObject>" +
      "</svg>";
    // when the content changed, the image need reload.
    this.onSet();
  }
}
