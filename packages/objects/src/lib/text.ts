import { Carobj } from "./carobj";
import { IPositionedMut } from "../interfaces/Positioned";
import { ITextEditable } from "../interfaces/TextEditable";

export class Text extends Carobj implements ITextEditable, IPositionedMut {
  #text: string;
  #size: number;
  #color: string;
  #fontFamily = "sans-serif";
  #align: "start" | "end" | "right" | "end" | "center" = "start";
  #baseLine: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom" = "middle";

  constructor(
    text: string,
    x: number,
    y: number,
    size?: number,
    color?: string,
    fontFamily?: string,
    align?: "start" | "end" | "right" | "end" | "center",
    baseLine?: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom"
  ) {
    super();
    this.#text = text;
    this.x = x;
    this.y = y;
    typeof size === "undefined" ? (this.#size = 10) : (this.#size = size);
    typeof color === "undefined" ? (this.#color = "black") : (this.#color = color);
    if (typeof fontFamily !== "undefined") this.fontFamily = fontFamily;
    if (typeof align !== "undefined") this.#align = align;
    if (typeof baseLine !== "undefined") this.#baseLine = baseLine;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.font = `${this.#size}px ${this.#fontFamily}`;
    // console.log(this.#size, this.#fontFamily);
    // console.log(`${this.#size}px ${this.#fontFamily}`);
    ctx.textAlign = this.#align;
    ctx.textBaseline = this.#baseLine;
    ctx.fillStyle = this.#color;
    ctx.fillText(this.#text, 0, 0);
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

  set align(value: "start" | "end" | "right" | "end" | "center") {
    this.#align = value;
  }

  get baseLine() {
    return this.#baseLine;
  }

  set baseLine(value: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom") {
    this.#baseLine = value;
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

  get sigh() {
    return "Text";
  }
}
