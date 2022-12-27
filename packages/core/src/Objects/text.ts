import { Carobj } from "./index";

export class Text extends Carobj {
  #text: string;
  #x: number;
  #y: number;

  constructor(text: string, x: number, y: number) {
    super();
    this.#text = text;
    this.#x = x;
    this.#y = y;
  }

  #draway(ctx: CanvasRenderingContext2D) {
    ctx.fillText(this.#text, this.#x, this.#y);
    return ctx;
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
