import type { carobject } from "../carobj/input_type";
import { Svg } from "../svg";
import type { webviewobject } from "./input_type";

const html2svg = (body: string, width: number, height: number): string => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <foreignObject width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml" style="color: white">
  ${body}</div></foreignObject></svg>`;

export class WebView extends Svg {
  #text: string;
  #width: number;
  #height: number;

  constructor(text: string, data?: carobject & webviewobject) {
    data = data ?? {};
    const width = data.width || 640;
    const height = data.height || 480;
    super(html2svg(text, width, height), data);
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
