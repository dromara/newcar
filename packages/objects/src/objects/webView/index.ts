/* eslint-disable prefer-template */
import { Svg } from "../svg";
import type { webviewobject } from "./input_type";
import type { carobject } from "../carobj/input_type";


function html2svg(body: string, width: number, height: number): string {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <foreignObject width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml" style="color: white">
  ${body}</div></foreignObject></svg>`;
}

export class WebView extends Svg {
  #text: string;
  #width: number;
  #height: number;

  constructor(text: string, datas: carobject & webviewobject) {
    const width = datas.width || 640;
    const height = datas.height || 480;
    super(html2svg(text, width, height), datas);
    this.#text = text;
    this.#width = width;
    this.#height = height;
  }

  get text() {
    return this.#text;
  }

  set text(value: string) {
    this.#text = value;
    super.text = html2svg(value, this.#width, this.#height);
  }
}
