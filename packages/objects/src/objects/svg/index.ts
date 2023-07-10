import { Carobj } from "../carobj";
import { carobject } from "../carobj/input_type";
import { svgobject } from "./input_type";

export class Svg extends Carobj {
  #image: HTMLImageElement = new Image();
  #svg_string: string;
  #svg_element: HTMLElement = document.createElement("svg");

  constructor(datas: carobject & svgobject) {
    super(datas);
    this.#svg_string = datas.content
    this.#svg_element.innerHTML = this.#svg_string;
    const svg_xml = (new XMLSerializer()).serializeToString(this.#svg_element);
    this.#image.src = "data:image/svg+xml;base64," + window.btoa(svg_xml);
  }

  override onDraw(ctx: CanvasRenderingContext2D, element?: HTMLElement | undefined): CanvasRenderingContext2D {
    ctx.drawImage(this.#image, this.x, this.y);
    return ctx;
  }
}