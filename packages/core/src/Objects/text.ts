import { Carobj } from "./index";
import { IPositionedMut } from "./interfaces/Positioned";
import { ITextEditable } from "./interfaces/TextEditable";

export class Text extends Carobj implements ITextEditable, IPositionedMut {
  #text: string;
  #size: number | string;
  #color: string;
  #fontFamily: string;
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
    if (size) this.#size = size;
    else this.#size = "";
    if (color) this.#color = color;
    else this.#color = "";
    if (fontFamily) this.#fontFamily = fontFamily;
    else this.#fontFamily = "";
    if (align) this.#align = align;
    if (baseLine) this.#baseLine = baseLine;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.font = `${this.#size} ${this.#fontFamily}`;
    if (!(typeof this.#align === "undefined")) ctx.textAlign = this.#align;
    if (!(typeof this.#baseLine === "undefined")) ctx.textBaseline = this.#baseLine;
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

  get sigh() {
    return "Text";
  }
}
