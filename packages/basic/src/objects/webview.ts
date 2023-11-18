import type { CarobjOption } from "./carobj";
import { Svg } from "./svg";

/**
 * The webview options.
 * @param width The width of the WebView.
 * @param height The height of the WebView.
 * @see CarobjOption
 * @see WebView
 */
export interface WebViewOption extends CarobjOption {
  width?: number;
  height?: number;
}

const xhtml2Svg = (xhtml: string, width: number, height: number): string => `\
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\
<foreignObject width="100%" height="100%">\
<div xmlns="http://www.w3.org/1999/xhtml" style="color: white">\
${xhtml}</div></foreignObject></svg>`;

/**
 * The webview object.
 */
export class WebView extends Svg implements WebViewOption {
  #xhtml: string;
  width: number;
  height: number;

  /**
   * @param xhtml The XHTML content.
   * @param options The options of the object.
   * @see WebViewOption
   */
  constructor(xhtml: string, options?: WebViewOption) {
    options ??= {};
    const width = options.width ?? 640;
    const height = options.height ?? 480;
    super(xhtml2Svg(xhtml, width, height), options);
    this.#xhtml = xhtml;
    this.width = width;
    this.height = height;
  }

  get xhtml(): string {
    return this.#xhtml;
  }

  set xhtml(xhtml: string) {
    this.#xhtml = xhtml;
    super.svg = xhtml2Svg(xhtml, this.width, this.height);
  }
}
