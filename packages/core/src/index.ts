import { Carobj } from "./Objects/index"

export class Car {
  #ele: HTMLCanvasElement
  #objects: Carobj[]
  #every: () => void
  #start: () => void
  #fps: number
  #fpsImmediate: number
  #ctx: CanvasRenderingContext2D | null

  constructor (
    ele: HTMLCanvasElement,
    fps: number
  ) {
    this.#ele = ele;
    this.#fps = fps;
    this.#ctx = this.#ele.getContext("2d");
    return this;
  }

  forEvery (command: () => void) {
    this.#every = command;
    return this;
  }

  forStart (command: () => void) {
    this.#start = command;
    return this;
  }

  linkObject (obj: Carobj) {
    this.#objects.push(obj);
  }
}