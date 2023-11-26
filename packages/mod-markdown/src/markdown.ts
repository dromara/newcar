import { WebView } from "@newcar/basic/src";
import { parse } from "marked";
import type { CarobjOption } from "packages/basic/src/objects/carobj";
import type { Sized } from "packages/basic/src/objects/interfaces";

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
