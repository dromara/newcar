import type { CarObjectOption, Sized } from "@newcar/basic";
import { WebView } from "@newcar/basic";
import { parse } from "marked";

export default class Markdown extends WebView implements Sized {
  #markdown: string;

  constructor(markdown: string, options: CarObjectOption & Sized) {
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
