import { Canvas, CanvasKit } from "canvaskit-wasm";
import { Svg, SvgOptions, SvgStyle } from "./svg";

const xhtml2Svg = (xhtml: string): string => `\
<foreignObject width="100%" height="100%">\
<div xmlns="http://www.w3.org/1999/xhtml" style="color: white;">\
${xhtml}</div></foreignObject>`;

export interface WebviewOptions extends SvgOptions {
  style?: WebviewStyle
}

export interface WebviewStyle extends SvgStyle {}

export class Webview extends Svg {
  constructor(public xhtml: string, options?: WebviewOptions) {
    options ??= {}
    super(xhtml2Svg(xhtml), options)
    console.log(this.svg);
  }

  // predraw(ck: CanvasKit, propertyChanged: string): void {
  //   if (propertyChanged === 'svg') {
  //     this.ready = false
  //     this.init(ck)
  //   } else if (propertyChanged === 'xhtml') {
  //     this.svg = xhtml2Svg(this.svg)
  //   }
  // }
}