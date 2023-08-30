/* eslint-disable prefer-template */
import { Svg } from "../svg";
import type { carobject } from "../carobj/input_type";
import type { texobject } from "./input_type";
import "../../../node_modules/mathjax/es5/tex-svg";

declare let MathJax: any;

export class Tex extends Svg {
  #text: string;

  constructor(text: string, datas: carobject & texobject) {
    super(MathJax.tex2svg(text).innerHTML, datas);
    this.#text = text;
    }
  get text() {
    return this.#text;
  }

  set text(value: string) {
    this.#text = value;
    super.text = MathJax.tex2svg(value).innerHTML;
  }
}
