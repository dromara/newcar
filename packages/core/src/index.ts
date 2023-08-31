import type { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import type { IRenderable } from "@newcar/objects/src/interfaces/Renderable";
import type { Carobj } from "@newcar/objects/src/objects/carobj";

export class Renderer implements IRenderable, IRendererController {
  #ele: HTMLCanvasElement; // The html element of canvas.
  #objects: Carobj[] = []; // The objects of animation.
  #every?: ((arg0: number) => void)[] = []; // Do it for every frame.
  #start?: () => void; // Do it before the animation started.
  #fps = 0; // The FPS.
  #currentFrame = 0; // Current number of frames.
  #ctx: CanvasRenderingContext2D | null = null; // The context of canvas.
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isSuspend: boolean = false; // The animation is or isnot suspend;

  /**
   * Create a animation of newcar.
   * @param ele The element of canvas.
   * @param fps The FPS of the animation.
   */
  constructor(ele: HTMLCanvasElement, fps: number) {
    this.#ele = ele;
    this.#ele.style.backgroundColor = "black";
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
  onUpdate(command: (agr0: number) => void) {
    this.#every?.push(command);

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

  pause(frame?: number) {
    if (typeof frame !== "undefined") {
      this.#currentFrame = frame;
    }
    this.isSuspend = true;
  }

  continue(frame?: number) {
    if (typeof frame !== "undefined") {
      this.#currentFrame = frame;
    }
    this.isSuspend = false;
  }

  /**
   * Start draw every frame.
   */
  countFrame() {
    // this.#currentFrame = 0;
    if (this.#ctx === null) {
      return;
    }
    this.#start && this.#start();
    (function set(objects) {
      for (const object of objects) {
        object.onSet();
        set(object.children);
      }
    })(this.#objects);
    setInterval(() => {
      this.#ctx?.clearRect(0, 0, this.#ele.width, this.#ele.height);
      // console.log(this.#currentFrame, this.isSuspend);
      if (!this.isSuspend) {
        this.#currentFrame += 1;
      }
      if (this.#every) {
        for (const each of this.#every) {
          each && each(this.#currentFrame);
        }
      }
      for (const object of this.#objects) {
        object.onUpdate(this.#ctx!);
      }
    }, 1000 / this.#fps);
  }

  /**
   * Link the Car Object on the animation.
   * @param obj the Carobj Object.
   * Attention: the function only can link Car Object,which can't use animation builder.
   */
  linkObject(...objects: Carobj[]) {
    for (const object of objects) {
      this.#objects.push(object);
    }
  }

  get fps() {
    return this.#fps;
  }

  get element() {
    return this.#ele;
  }
}
