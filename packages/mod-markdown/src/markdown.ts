import { WebView } from "@newcar/basic/src";
import type { CarobjOption } from "@newcar/basic/src/objects/carobj";
import type { Sized } from "@newcar/basic/src/objects/interfaces";
import { parse } from "marked";

export default class Markdown extends WebView implements Sized {
  #markdown: string;

  constructor(markdown: string, options: CarobjOption & Sized) {
    options ??= {};
    super(parse(markdown), options);
    this.#markdown = markdown;
  }

  get markdown(): string {
    return this.#markdown;
  }

  set markdown(value: string) {
    this.#markdown = value;
    this.xhtml = parse(value);
  }
}
