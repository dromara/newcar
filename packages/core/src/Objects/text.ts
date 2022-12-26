import { Carobj } from "./index";

export class Text extends Carobj {
  
  #text: string;
  #x: number;
  #y: number;

  constructor (
    width: number,
    length: number,
    text: string
  ) {
    super(width, length);
    this.#text = text;
  }
  
  #draway (ctx: CanvasRenderingContext2D) {
    ctx.fillText(this.#text, this.#x, this.#y);
    return ctx;
  }

  get text () {
    return this.#text;
  }

  set text (value) {
    this.#text = value;
  }
  
  get x () {
    return this.#x;
  }

  set x (value: number) {
    this.#x = value;
  }

  get y () {
    return this.#y;
  }

  set y (value: number) {
    this.#y = value
  }

  get sigh () {
    return "Text"
  }
}