import { DOMURL } from "../utils/url";
import type { CarobjOption } from "./carobj";
import { Image } from "./image";

const toSvg = (xml: string): Blob =>
  new Blob([xml], { type: "image/svg+xml;charset=utf-8" });

export class Svg extends Image {
  #svg: string;

  /**
   * Svg object.
   * @param svg The svg content.
   * @param options The options of the object.
   * @see CarobjOption
   */
  constructor(svg: string, options?: CarobjOption) {
    super(DOMURL.createObjectURL(toSvg(svg)), options);
    this.#svg = svg;
  }

  get svg(): string {
    return this.#svg;
  }

  set svg(value: string) {
    this.svg = value;
    this.url = DOMURL.createObjectURL(toSvg(this.svg));
  }
}
