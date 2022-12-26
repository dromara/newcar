import { Carobj } from "./Objects/index"

export class Car {
  #ele: HTMLCanvasElement
  #objects: Carobj[]
  #every: (agr0: number) => void
  #start: () => void
  #fps: number
  #fpsImmediate: number
  #ctx: CanvasRenderingContext2D | null

  constructor (
    ele: HTMLCanvasElement,
    fps: number
  ) {
    this.#ele = ele;
    if (this.#ele.getContext) {
      this.#fps = fps;
      this.#ctx = this.#ele.getContext("2d");
    }
    return this;
  }

  forEvery (command: (agr0: number) => void) {
    this.#every = command;
    return this;
  }

  forStart (command: () => void) {
    this.#start = command;
    return this;
  }

  start () {
    if (this.#ctx === null) return;
    this.#start()
    while(true) {
      this.#fpsImmediate += 1;
      this.#every(this.#fpsImmediate)
      this.#objects.forEach(object => {
        object.draway(this.#ctx);
      })
    }
  }

  linkObject (obj: Carobj) {
    this.#objects.push(obj);
  }
}