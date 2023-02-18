/* eslint-disable @typescript-eslint/no-unused-vars */
import { IScaledMut } from "@newcar/objects/src/interfaces/Scaled";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";

export class ScaleTemporaryIndeterminateVariation {
  #x1: number | null = null;
  #x2: number | null = null;
  #y1: number | null = null;
  #y2: number | null = null;
  #start: number | null = null;
  #length: number | null = null;
  #obj: IScaledMut | null = null;
  #interpolator: (arg0: number) => number = LinearInterpolator;

  /**
   * Set which frame to start.
   * @param start The frame number.
   */
  startAt(start: number): ScaleTemporaryIndeterminateVariation {
    this.#start = start;
    return this;
  }

  /**
   * Set how long the animation lasts in frames.
   */
  lastsFor(frames: number): ScaleTemporaryIndeterminateVariation {
    this.#length = frames;
    return this;
  }

  from(x1: number, y1: number): ScaleTemporaryIndeterminateVariation {
    this.#x1 = x1;
    this.#y1 = y1;
    return this;
  }

  to(x2: number, y2: number): ScaleTemporaryIndeterminateVariation {
    this.#x2 = x2;
    this.#y2 = y2;
    return this;
  }

  /**
   * Set the interpolation function the animation will use.
   * @param interpolationFunction The interpolation function the animation will use.
   * @returns The reference to itself.
   */
  by(interpolationFunction: (arg0: number) => number): ScaleTemporaryIndeterminateVariation {
    this.#interpolator = interpolationFunction;
    return this;
  }

  /**
   * Bind to an object.
   * @param obj The obejct to bind to.
   */
  bindTo(obj: IScaledMut): ScaleTemporaryIndeterminateVariation {
    this.#obj = obj;
    if (this.#x1 === null && this.#y1 === null) {
      this.#x1 = obj.scaleX;
      this.#y1 = obj.scaleY;
    }
    return this;
  }

  boom(): Scale {
    if (this.#x1 === null) throw new Error("Cannot BOOM!");
    if (this.#x2 === null) throw new Error("Cannot BOOM!");
    if (this.#y1 === null) throw new Error("Cannot BOOM!");
    if (this.#y2 === null) throw new Error("Cannot BOOM!");
    if (this.#start === null) throw new Error("Cannot BOOM!");
    if (this.#length === null) throw new Error("Cannot BOOM!");
    if (this.#obj === null) throw new Error("Cannot BOOM!");
    return new Scale(
      this.#x1,
      this.#y1,
      this.#x2,
      this.#y2,
      this.#length,
      this.#start,
      this.#obj,
      this.#interpolator
    );
  }
}

export class Scale extends AnimationBuilderItem {
  #obj: IScaledMut;
  #interpolatorx: Interpolator;
  #interpolatory: Interpolator;
  #length: number;
  #start: number;

  static create(): ScaleTemporaryIndeterminateVariation {
    return new ScaleTemporaryIndeterminateVariation();
  }

  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    length: number,
    start: number,
    obj: IScaledMut,
    interpolator: (arg0: number) => number
  ) {
    super();
    this.#obj = obj;
    this.#interpolatorx = new Interpolator(x1, x2, interpolator);
    this.#interpolatory = new Interpolator(y1, y2, interpolator);
    this.#length = length;
    this.#start = start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.scaleX = this.#interpolatorx.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.scaleY = this.#interpolatory.interpolate((relativeFrameCount + 1) / this.#length);
  }
  get startFrame(): number {
    return this.#start;
  }
  get length(): number {
    return this.#length;
  }
}
