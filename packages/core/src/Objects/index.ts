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
  
  #draway () {
    return this;
  }

  get sigh () {
    return "CarObject"
  }

  get draway () {
    return this.#draway;
  }
}