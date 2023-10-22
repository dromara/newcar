import type { CarobjOption } from "./carobj";
import { Image } from "./image";

const DOMURL = window.URL || window.webkitURL || window;

const toSvg = (xml: string): Blob =>
  new Blob([xml], { type: "image/svg+xml;charset=utf-8" });

export class Svg extends Image {
  #svg: string;

  constructor(svg: string, options?: CarobjOption) {
    super(DOMURL.createObjectURL(toSvg(svg)), options ?? {});
    this.#svg = svg;
  }

  get svg(): string {
    return this.#svg;
  }

  set svg(value: string) {
    this.svg = value;
    this.path = DOMURL.createObjectURL(toSvg(this.svg));
  }
}
