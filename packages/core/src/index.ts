import { AnimationBuilder } from "@newcar/animation-builder/src/AnimationBuilder";
import { type AnimationBuilderItem } from "@newcar/animation-builder/src/AnimationBuilderItem";
import { Carobj } from "@newcar/objects";
import { dataSaver } from "./dataSaver";

export class Car {
  #animationBuilder: AnimationBuilder = new AnimationBuilder();
  #dataSaver: dataSaver;

  constructor(ele: HTMLCanvasElement, fps: number) {
    this.#dataSaver = new dataSaver(ele, fps);
    return this;
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
    this.#animationBuilder.playOnCar(this.#dataSaver);
  }

  suspend(frame?: number) {
    this.#dataSaver.suspend(frame);
  }

  continue(frame?: number) {
    this.#dataSaver.continue(frame);
  }
}

export { Text, Spirit, Point, Line, Definition, LineSegment, Circle } from "@newcar/objects";
export { Carobj };
export { Interpolator } from "@newcar/animation-builder/src/interpolation/Interpolator";
export { LinearInterpolator } from "@newcar/animation-builder/src/interpolation/LinearInterpolator";
export { AnimationBuilder } from "@newcar/animation-builder/src/AnimationBuilder";
export * from "@newcar/animation-builder/src/builder_items/index";
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
} from "@newcar/animation-builder/src/interpolation/NonlinearInterpolators";
