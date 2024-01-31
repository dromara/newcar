import temml from "temml";

import type { CarobjOption } from "../carobj";
import { WebView } from "../webview";

export class MathTex extends WebView {
  #tex: string;
  constructor(tex: string, options?: CarobjOption) {
    super(`${temml.renderToString(tex)}`, options);
    this.tex = tex;
  }

  get tex(): string {
    return this.#tex;
  }

  set tex(value: string) {
    this.#tex = value;
    // super.svg = temml.renderToString(value);
  }
}
