import { type Carobj } from "./objects/index";
import { IRenderable } from "./objects/interfaces/Renderable";
import { IRendererController } from "./objects/interfaces/RenderController";
import { AnimationBuilder } from "./builder/AnimationBuilder";
import { type AnimationBuilderItem } from "./builder/AnimationBuilderItem";

export class Car implements IRenderable, IRendererController {
  #ele: HTMLCanvasElement; // The html element of canvas.
  #objects: Carobj[] = []; // The objects of animation.
  #every?: (agr0: number) => void; // Do it for every frame.
  #start?: () => void; // Do it before the animation started.
  #fps = 0; // The FPS.
  #frameImmediately = 0; // Current number of frames.
  #ctx: CanvasRenderingContext2D | null = null; // The context of canvas.
  #animationBuilder: AnimationBuilder = new AnimationBuilder();
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isSuspend: boolean = false; // The animation is or isnot suspend;
  suspendFrame: number | null = null; // The frame when the animation suspended

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

  suspend(frame?: number) {
    if (typeof frame !== "undefined") this.suspendFrame = frame;
    this.isSuspend = true;
  }

  continue(frame?: number) {
    if (typeof frame !== "undefined") this.suspendFrame = frame;
    this.isSuspend = false;
  }

  /**
   * Start draw every frame.
   */
  startFrame() {
    this.#frameImmediately = 0;
    if (this.#ctx === null) return;
    this.#start && this.#start();
    // eslint-disable-next-line no-constant-condition
    setInterval(() => {
      this.#ctx?.clearRect(0, 0, this.#ele.width, this.#ele.height);
      console.log(this.#frameImmediately, this.isSuspend);
      if (!this.isSuspend) {
        this.#frameImmediately += 1;
      }
      this.#every && this.#every(this.#frameImmediately);
      this.#objects.forEach((object) => {
        if (!object.display) return;
        if (this.#frameImmediately < object.liveFrame) return;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // if (this.#frameImmediately >= object.dieFrame! || object.dieFrame !== null) return;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        object.onUpdate(this.#ctx!);
      });
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

  addObject(obj: Carobj) {
    this.#animationBuilder.addObject(obj);
    return this;
  }

  addAnimationItem(animationItem: AnimationBuilderItem) {
    this.#animationBuilder.addItem(animationItem);
    return this;
  }

  startPlay() {
    this.#animationBuilder.playOnCar(this);
  }
}

export { Text } from "./objects/text";
export { Spirit } from "./objects/spirit";
export { Point } from "./objects/graph/point";
export { Line } from "./objects/graph/line";
export { Definition } from "./objects/graph/definition";
export { LineSegment } from "./objects/graph/lineSegment";
export { Circle } from "./objects/graph/circle";
export { AnimationBuilder } from "./builder/AnimationBuilder";
export { MutateContent } from "./builder/builder_items/MutateContent";
export { Interpolator } from "./interpolation/Interpolator";
export { LinearInterpolator } from "./interpolation/LinearInterpolator";
export { Translation } from "./builder/builder_items/Translation";
export { Rotation } from "./builder/builder_items/Rotation";
export { Scale } from "./builder/builder_items/Scale";
export { ChangingStatus } from "./builder/builder_items/ChangingStatus";
export { Limit } from "./builder/builder_items/Limit";
export { AngleCircle } from "./builder/builder_items/AngleCircle";
export { SingleFrameAction } from "./builder/builder_items/SingleFrameAction";
export {
  EaseInBackInterpolator,
  EaseInBounceInterpolator,
  EaseInCircInterpolator,
  EaseInCubicInterpolator,
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
  EaseOutCubicInterpolator,
  EaseOutElasticInterpolator,
  EaseOutExpoInterpolator,
  EaseOutQuadInterpolator,
  EaseOutQuartInterpolator,
  EaseOutQuintInterpolator,
  EaseOutSineInterpolator,
} from "./interpolation/NonlinearInterpolators";
