import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { textobject } from "./input_type";
import type { IFontSize, ITextEditable } from "./interface";

export class Text extends Carobj implements ITextEditable, IFontSize {
  #text: string;
  #size: number;
  #color: string;
  #fontFamily = "sans-serif";
  #align: CanvasTextAlign = "start";
  #baseline: CanvasTextBaseline = "middle";
  #hollow: Boolean;
  constructor(text: string, datas: textobject & carobject) {
    super(datas);
    this.#text = text;
    typeof datas.size === "undefined" ? (this.#size = 10) : (this.#size = datas.size);
    typeof datas.color === "undefined" ? (this.#color = "white") : (this.#color = datas.color);
    if (typeof datas.fontFamily !== "undefined") {
      this.fontFamily = datas.fontFamily;
    }
    if (typeof datas.align !== "undefined") {
      this.#align = datas.align;
    }
    if (typeof datas.baseline !== "undefined") {
      this.#baseline = datas.baseline;
    }
    this.#hollow = datas.hollow ?? false;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.font = `${this.#size}px ${this.#fontFamily}`;
    // console.log(this.#size, this.#fontFamily);
    // console.log(`${this.#size}px ${this.#fontFamily}`);
    ctx.textAlign = this.#align;
    ctx.textBaseline = this.#baseline;
    if (!this.#hollow) {
      ctx.fillStyle = this.#color;
      ctx.fillText(this.#text, 0, 0);
    } else if (this.#hollow) {
      ctx.strokeStyle = this.#color;
      ctx.strokeText(this.#text, 0, 0);
    }

    return ctx;
  }

  get color() {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
  }

  get fontFamily() {
    return this.#fontFamily;
  }

  set fontFamily(value: string) {
    this.#fontFamily = value;
  }

  get align() {
    return this.#align;
  }

  set align(value: CanvasTextAlign) {
    this.#align = value;
  }

  get baseline() {
    return this.#baseline;
  }

  set baseline(value: CanvasTextBaseline) {
    this.#baseline = value;
  }

  get text() {
    return this.#text;
  }

  set text(value) {
    this.#text = value;
  }

  get size() {
    return this.#size;
  }

  set size(value: number) {
    this.#size = value;
  }
}
