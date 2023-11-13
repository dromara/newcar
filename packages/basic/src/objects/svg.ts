import { DOMURL } from "@newcar/utils/src";

import type { CarobjOption } from "./carobj";
import { Image } from "./image";

const Svg2Blob = (xml: string): Blob =>
  new Blob([xml], { type: "image/svg+xml;charset=utf-8" });

/**
 * The SVG object.
 */
export class Svg extends Image {
  #svg: string;

  /**
   * @param svg The svg content.
   * @param options The options of the object.
   * @see CarobjOption
   */
  constructor(svg: string, options?: CarobjOption) {
    super(DOMURL.createObjectURL(Svg2Blob(svg)), options);
    this.#svg = svg;
  }

  get svg(): string {
    return this.#svg;
  }

  set svg(svg: string) {
    this.svg = svg;
    this.url = DOMURL.createObjectURL(Svg2Blob(svg));
  }
}
