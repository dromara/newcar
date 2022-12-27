import { Carobj } from "./index";

export class Text extends Carobj {
  #text: string;
  #x: number;
  #y: number;
  #size: number | string;
  #color: string;
  #fontFamily: string;
  #align: "start" | "end" | "right" | "end" | "center";
  #baseLine: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";

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
    this.#x = x;
    this.#y = y;
    if (size) this.#size = size;
    else this.#size = "";
    if (color) this.#color = color;
    else this.#color = "";
    if (fontFamily) this.#fontFamily = fontFamily;
    else this.#fontFamily = "";
    if (align) this.#align = align;
    if (baseLine) this.#baseLine = baseLine;
  }

  #draway(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.#size} ${this.#fontFamily}`;
    if (!(typeof this.#align === "undefined")) ctx.textAlign = this.#align;
    if (!(typeof this.#baseLine === "undefined")) ctx.textBaseline = this.#baseLine;
    ctx.fillStyle = this.#color;
    ctx.fillText(this.#text, this.#x, this.#y);
    return ctx;
  }
	
	get color () {
    return this.#color;
  }

  set color (value: string) {
    this.#color = value;
  }

  get fontFamily () {
    return this.#fontFamily;
  }

  set fontFamily (value: string) {
    this.#fontFamily = value;
  }
  
  get align () {
    return this.#align;
  }

  set align (value: "start" | "end" | "right" | "end" | "center") {
    this.#align = value;
  }
	
	get baseLine () {
    return this.#baseLine;
  }

  set baseLine (value: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom") {
    this.#baseLine = value;
  }

  get draway() {
    return this.#draway;
  }

  get text() {
    return this.#text;
  }

  set text(value) {
    this.#text = value;
  }

  get x() {
    return this.#x;
  }

  set x(value: number) {
    this.#x = value;
  }

  get y() {
    return this.#y;
  }

  set y(value: number) {
    this.#y = value;
  }

  get sigh() {
    return "Text";
  }
}
