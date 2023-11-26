import type { CarobjOption } from "./carobj";
import type { Sized } from "./interfaces";
import { Svg } from "./svg";

const xhtml2Svg = (xhtml: string): string => `\
<foreignObject width="100%" height="100%">\
<div xmlns="http://www.w3.org/1999/xhtml" style="color: white;">\
${xhtml}</div></foreignObject>`;

/**
 * The webview object.
 */
export class WebView extends Svg implements Sized {
  #xhtml: string;

  /**
   * @param xhtml The XHTML content.
   * @param options The options of the object.
   * @see SvgOption
   */
  constructor(xhtml: string, options?: CarobjOption & Sized) {
    super(xhtml2Svg(xhtml), options);
    this.#xhtml = xhtml;
  }

  get xhtml(): string {
    return this.#xhtml;
  }

  set xhtml(xhtml: string) {
    this.#xhtml = xhtml;
    super.svg = xhtml2Svg(xhtml);
  }
}
