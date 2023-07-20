import { Carobj } from "../carobj";
import { carobject } from "../carobj/input_type";

export class HTMLPlugin extends Carobj {
  #svg_content: string;
  #content: string;
  #img: HTMLImageElement = document.createElement("img");
  #DOMURL = window.URL || window.webkitURL || window;

  constructor(content: string, datas: carobject) {
    super(datas);
    this.#content = content;
    this.#svg_content = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
                      '<foreignObject width="100%" height="100%">' +
                        '<div xmlns="http://www.w3.org/1999/xhtml">' +
                          content +
                        '</div>' +
                      '</foreignObject>' +
                    '</svg>';
  }

  override onDraw(ctx: CanvasRenderingContext2D, element?: HTMLElement | undefined): CanvasRenderingContext2D {
    const svg = new Blob([this.#svg_content], {
      type: "image/svg+xml;charset=utf-8"
    })
    const url = this.#DOMURL.createObjectURL(svg);
    this.#img.src = url;
    ctx.drawImage(this.#img, 0, 0);
    this.#DOMURL.revokeObjectURL(url);
    return ctx;
  }

  get content() {
    return this.#content;
  }

  set content(value: string) {
    this.#content = value;
    this.#svg_content = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
                      '<foreignObject width="100%" height="100%">' +
                        '<div xmlns="http://www.w3.org/1999/xhtml">' +
                          value +
                        '</div>' +
                      '</foreignObject>' +
                    '</svg>';
  }
}
