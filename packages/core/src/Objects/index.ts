export class Carobj {
  #width: number
  #length: number
  constructor (
      width: number,
      length: number
  ) {
      this.#width = width;
      this.#length = length;
  }
  
  #draway (ctx: CanvasRenderingContext2D) {
    return ctx;
  }
  
  get draway () {
    return this.#draway;
  }

  get sigh () {
    return "CarObject"
  }
}