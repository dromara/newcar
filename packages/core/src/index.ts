import { type Carobj } from "./Objects/index";

export class Car {
  #ele: HTMLCanvasElement; // The html element of canvas.
  #objects: Carobj[] = []; // The objects of animation.
  #every?: (agr0: number) => void; // Do it for every frame.
  #start?: () => void; // Do it before the animation started.
  #fps = 0; // The FPS.
  #fpsImmediate = 0; // Current number of frames.
  #ctx: CanvasRenderingContext2D | null = null; // The context of canvas.

  /**
   * Create a animation of newcar.
   * @param ele The element of canvas.
   * @param fps The FPS of the animation.
   */
  constructor(ele: HTMLCanvasElement, fps: number) {
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
  forEvery(command: (agr0: number) => void) {
    this.#every = command;
    return this;
  }

  /**
   * Set this.#start
   * @param command The function.
   */
  forStart(command: () => void) {
    this.#start = command;
    return this;
  }

  /**
   * Start the animation.
   */
  start() {
    if (this.#ctx === null) return;
    this.#start && this.#start();
    // eslint-disable-next-line no-constant-condition
    setInterval(() => {
      this.#ctx?.clearRect(0, 0, this.#ele.width, this.#ele.height);
      this.#fpsImmediate += 1;
      this.#every && this.#every(this.#fpsImmediate);
      this.#objects.forEach((object) => {
        if (!object.display) return;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        object.draway(this.#ctx!);
      });
    }, 1000 / this.#fps);
  }

  /**
   * Link the Car Object on the animation.
   * @param obj the Carobj Object.
   */
  linkObject(obj: Carobj) {
    this.#objects.push(obj);
  }
}

export { Text } from "./Objects/text";
