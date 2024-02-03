import type { CarObjectOption } from "./carobj";
import { Image } from "./image";
import type { Sized } from "./interfaces";

const svg2Blob = (xml: string): Blob =>
  new Blob([xml], { type: "image/svg+xml" });

const wrappedSvg = (svg: string, width?: number, height?: number): string =>
  `<${[
    "svg",
    `xmlns="http://www.w3.org/2000/svg"`,
    width && `width="${width}"`,
    height && `height="${height}"`,
  ]
    .filter(Boolean) // If the width or height is zero, discard it.
    .join(" ")}>${svg}</svg>`;

const solve = (svg: string, width?: number, height?: number): string =>
  window.URL.createObjectURL(svg2Blob(wrappedSvg(svg, width, height)));

/**
 * The SVG object.
 */
export class Svg extends Image implements Sized {
  #svg: string;
  width?: number;
  height?: number;

  /**
   * @param svg The svg content.
   * @param options The options of the object.
   * @see CarObjectOption
   */
  constructor(svg: string, options?: CarObjectOption & Sized) {
    super(solve(svg, (options ??= {}).width, options.height), options);
    this.#svg = svg;
    this.width = options.width;
    this.height = options.height;
  }

  get svg(): string {
    return this.#svg;
  }

  set svg(svg: string) {
    this.svg = svg;
    this.url = solve(svg, this.width, this.height);
  }
}
