import { type Carobj } from "./Objects/index";
import { IRenderable } from "./Objects/interfaces/Renderable";
import { IRendererController } from "./Objects/interfaces/RenderController";

export class Car implements IRenderable, IRendererController {
  #ele: HTMLCanvasElement; // The html element of canvas.
  #objects: Carobj[] = []; // The objects of animation.
  #every?: (agr0: number) => void; // Do it for every frame.
  #start?: () => void; // Do it before the animation started.
  #fps = 0; // The FPS.
  #frameImmediately = 0; // Current number of frames.
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
  onUpdate(command: (agr0: number) => void) {
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
    this.#frameImmediately = 0;
    if (this.#ctx === null) return;
    this.#start && this.#start();
    // eslint-disable-next-line no-constant-condition
    setInterval(() => {
      this.#ctx?.clearRect(0, 0, this.#ele.width, this.#ele.height);
      this.#frameImmediately += 1;
      this.#every && this.#every(this.#frameImmediately);
      this.#objects.forEach((object) => {
        if (!object.display || !object.lifeStatus) return;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        object.onUpdate(this.#ctx!);
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
export { Point } from "./Objects/graph/point";
export { Line } from "./Objects/graph/line";
export { LineSegment } from "./Objects/graph/lineSegment";
export { AnimationBuilder } from "./Objects/builder/AnimationBuilder";
export { MutateContent } from "./Objects/builder/builder_items/MutateContent";
export { Interpolator } from "./Objects/interpolation/Interpolator";
export { LinearInterpolator } from "./Objects/interpolation/LinearInterpolator";
export { Translation } from "./Objects/builder/builder_items/Translation";
export { Rotation } from "./Objects/builder/builder_items/Rotation";
export { Scale } from "./Objects/builder/builder_items/Scale";
export {
  EaseInBackInterpolator,
  EaseInBounceInterpolator,
  EaseInCircInterpolator,
  EaseInCubicInterpolatorInterpolator,
  EaseInElasticInterpolator,
  EaseInExpoInterpolator,
  EaseInOutBackInterpolator,
  EaseInOutBounceInterpolator,
  EaseInOutCircInterpolator,
  EaseInOutElasticInterpolator,
  EaseInOutCubicInterpolator,
  EaseInOutExpoInterpolator,
  EaseInOutQuadInterpolator,
  EaseInOutQuartInterpolator,
  EaseInOutQuintInterpolator,
  EaseInOutSineInterpolator,
  EaseInQuadInterpolator,
  EaseInQuartInterpolator,
  EaseInQuintInterpolator,
  EaseInSineInterpolator,
  EaseOutBackInterpolator,
  EaseOutBounceInterpolator,
  EaseOutCircInterpolator,
  EaseOutCubicInterpolatorInterpolator,
  EaseOutElasticInterpolator,
  EaseOutExpoInterpolator,
  EaseOutQuadInterpolator,
  EaseOutQuartInterpolator,
  EaseOutQuintInterpolator,
  EaseOutSineInterpolator,
} from "./Objects/interpolation/NonlinearInterpolators";
