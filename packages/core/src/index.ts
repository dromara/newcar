import { Carobj } from "./Objects/index"

export class Car {
  #ele: HTMLCanvasElement  // The html element of canvas.
  #objects: Carobj[]   // The objects of animation.
  #every: (agr0: number) => void  // Do it for every frame.
  #start: () => void   // Do it before the animation started.
  #fps: number   // The FPS.
  #fpsImmediate: number   // Current number of frames.
  #ctx: CanvasRenderingContext2D | null   // The context of canvas.
  
  /**
    * Create a animation of newcar.
    * @param ele: The element of canvas.
    * @param fps: The FPS of the animation.
    */
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
  
  /**
   * Set this.#every
   * @param command the fuction.
   */
  forEvery (command: (agr0: number) => void) {
    this.#every = command;
    return this;
  }
  
  /**
   * Set this.#start
   * @param command The function.
   */
  forStart (command: () => void) {
    this.#start = command;
    return this;
  }
  
  /**
   * Start the animation.
   */
  start () {
    if (this.#ctx === null) return;
    this.#start()
    while(true) {
      this.#fpsImmediate += 1;
      this.#every(this.#fpsImmediate)
      this.#objects.forEach(object => {
        if (!object.display) return;
        object.draway(this.#ctx!);
      })
    }
  }
  
  /**
   * Link the Car Object on the animation.
   * @param obj the Carobj Object.
   */
  linkObject (obj: Carobj) {
    this.#objects.push(obj);
  }
}