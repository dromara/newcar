import { Carobj } from "@newcar/objects/src/lib/carobj";
import { IRenderable } from "@newcar/objects/src/interfaces/Renderable";
import { IRendererController } from "@newcar/objects/src/interfaces/RenderController";

export class Core implements IRenderable, IRendererController {
  #ele: HTMLCanvasElement; // The html element of canvas.
  #objects: Carobj[] = []; // The objects of animation.
  #every?: ((agr0: number) => void)[] = []; // Do it for every frame.
  #start?: () => void; // Do it before the animation started.
  #fps = 0; // The FPS.
  #frameImmediately = 0; // Current number of frames.
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

  suspend(frame?: number) {
    if (typeof frame !== "undefined") this.#frameImmediately = frame;
    this.isSuspend = true;
  }

  continue(frame?: number) {
    if (typeof frame !== "undefined") this.#frameImmediately = frame;
    this.isSuspend = false;
  }

  /**
   * Start draw every frame.
   */
  startFrame() {
    // this.#frameImmediately = 0;
    if (this.#ctx === null) return;
    this.#start && this.#start();
    setInterval(() => {
      this.#ctx?.clearRect(0, 0, this.#ele.width, this.#ele.height);
      // console.log(this.#frameImmediately, this.isSuspend);
      if (!this.isSuspend) {
        this.#frameImmediately += 1;
      }
      this.#every?.forEach((each) => {
        each && each(this.#frameImmediately);
      });
      this.#objects.forEach((object) => {
        object.onUpdate(this.#ctx!);
      })
    }, 1000 / this.#fps);
  }

  /**
   * Link the Car Object on the animation.
   * @param obj the Carobj Object.
   * Attention: the function only can link Car Object,which can't use animation builder.
   */
  linkObject(obj: Carobj) {
    this.#objects.push(obj);
  }
}
