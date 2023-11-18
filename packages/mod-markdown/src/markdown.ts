import { WebView } from "@newcar/basic/src";
import type { WebViewOption } from "@newcar/basic/src/objects/webview";
import { marked } from "marked";

export default class Markdown extends WebView {
  #markdown: string;

  constructor(markdown: string, options: WebViewOption) {
    options ??= {};
    super(marked.parse(markdown), options);
    this.#markdown = markdown;
  }

  get markdown(): string {
    return this.#markdown;
  }

  set markdown(value: string) {
    this.#markdown = value;
    this.xhtml = marked.parse(value);
  }

  override draw(ctx) {
    console.log(this.xhtml);
  }
}
