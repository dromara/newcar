/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import type { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import type { IRenderable } from "@newcar/objects/src/interfaces/Renderable";
import type { Carobj } from "@newcar/objects/src/objects/carobj";
import type { Color } from "@newcar/utils";

export class Renderer implements IRenderable, IRendererController {
  #width: number;
  #height: number;
  #ele: HTMLCanvasElement; // The html element of canvas.
  #objects: Carobj[] = []; // The objects of animation.
  #every?: ((arg0: number) => void)[] = []; // Do it for every frame.
  #start?: () => void; // Do it before the animation started.
  #fps = 0; // The FPS.
  #currentFrame = 0; // Current number of frames.
  readonly #ctx: CanvasRenderingContext2D | null = null; // The context of canvas.
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isSuspend: boolean = false; // The animation is or isnot suspend;

  /**
   * Create a animation of newcar.
   * @param ele The element of canvas.
   * @param fps The FPS of the animation.
   * @param width The actual width of the animation.
   * @param height The actual height of the animation.
   */
  constructor(
    ele: HTMLCanvasElement,
    fps: number,
    options?: { width?: number; height?: number; backgroundColor?: Color },
  ) {
    options = options ?? {};
    this.#width = options.width ?? ele.width;
    this.#height = options.height ?? ele.height;
    this.#ele = ele;
    this.#ele.style.backgroundColor =
      typeof options.backgroundColor === "undefined" ? "black" : options.backgroundColor.toString();
    if (this.#ele.getContext) {
      this.#fps = fps;
      this.#ctx = this.#ele.getContext("2d");
    } else {
      throw new Error("Cannot get context");
    }

    return this;
  }

  #scaleFitRatio(): number {
    if (this.#ele.width === 0 || this.#ele.height === 0) {
      return 0;
    }

    const actualWidth = this.#ele.width;
    const actualHeight = this.#ele.height;
    const actualRatio = actualWidth / actualHeight;
    const animationRatio = this.#width / this.#height;

    return animationRatio > actualRatio ? actualWidth / this.#width : actualHeight / this.#height;
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
   * Start drawing every frame.
   */
  play() {
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
      // Preparation Stage.
      this.#ctx?.save();
      const ratio = this.#scaleFitRatio(); // TODO: Center the animation
      this.#ctx?.scale(ratio, ratio);
      this.#ctx?.clearRect(0, 0, this.#ele.width, this.#ele.height);

      // Counting Stage.
      if (!this.isSuspend) {
        this.#currentFrame += 1;
      }

      // Event Stage.
      if (this.#every) {
        for (const each of this.#every) {
          each && each(this.#currentFrame);
        }
      }

      // Pre-render Stage.
      (function render(objects, ctx) {
        for (const object of objects) {
          ctx?.save();
          object.beforeTranslate(ctx!);
          render(object.children, ctx);
          ctx?.restore();
        }
      })(this.#objects, this.#ctx);

      // Render Stage.
      for (const object of this.#objects) {
        object.onUpdate(this.#ctx!);
      }

      // After Stage.
      this.#ctx?.restore();
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

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set width(newWidth: number) {
    this.#width = newWidth > 0 ? newWidth : 0;
  }

  set height(newHeight: number) {
    this.#height = newHeight > 0 ? newHeight : 0;
  }
}
