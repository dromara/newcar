import { WebView } from "@newcar/basic/src";
import type { CarobjOption } from "@newcar/basic/src/objects/carobj";
import type { Sized } from "@newcar/basic/src/objects/interfaces";

export default class CodeBlock extends WebView implements Sized {
  #language: string;
  #code = "";

  constructor(code: string, options: CarobjOption & Sized) {
    options ??= {};
    super("", options);
    this.#code = code;
  }
}
