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
    ctx.fillText(this.#text, this.#x, this.#y)
  }

  get text () {
    return this.#text;
  }

  set text (value) {
    this.#text = value;
  }

  get sigh () {
    return "Text"
  }
}