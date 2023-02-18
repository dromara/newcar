/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRotatedMut } from "@newcar/objects/src/interfaces/Rotated";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";

export class RotateTemporaryIndeterminateVariation {
  #r0: number | null = null;
  #r1: number | null = null;
  #start: number | null = null;
  #length: number | null = null;
  #obj: IRotatedMut | null = null;
  #interpolator: (arg0: number) => number = LinearInterpolator;

  /**
   * Set which frame to start.
   * @param start The frame number.
   */
  startAt(start: number): RotateTemporaryIndeterminateVariation {
    this.#start = start;
    return this;
  }

  /**
   * Set how long the animation lasts in frames.
   */
  lastsFor(frames: number): RotateTemporaryIndeterminateVariation {
    this.#length = frames;
    return this;
  }

  /**
   * Set the start angle.
   * @param rstart The start angle in radians.
   * @returns The reference to itself.
   */
  from(rstart: number): RotateTemporaryIndeterminateVariation {
    this.#r0 = rstart;
    return this;
  }

  /**
   * Set the end angle.
   * @param rend The end angle in radians.
   * @returns The reference to itself.
   */
  to(rend: number): RotateTemporaryIndeterminateVariation {
    this.#r1 = rend;
    return this;
  }

  /**
   * Set the interpolation function the animation will use.
   * @param interpolationFunction The interpolation function the animation will use.
   * @returns The reference to itself.
   */
  by(interpolationFunction: (arg0: number) => number): RotateTemporaryIndeterminateVariation {
    this.#interpolator = interpolationFunction;
    return this;
  }

  /**
   * Bind to an object.
   * @param obj The obejct to bind to.
   */
  bindTo(obj: IRotatedMut): RotateTemporaryIndeterminateVariation {
    this.#obj = obj;
    if (this.#r0 === null) {
      this.#r0 = obj.rotation;
    }
    return this;
  }

  boom(): Rotation {
    if (this.#r1 === null) throw new Error("Cannot BOOM!");
    if (this.#r0 === null) throw new Error("Cannot BOOM!");
    if (this.#start === null) throw new Error("Cannot BOOM!");
    if (this.#length === null) throw new Error("Cannot BOOM!");
    if (this.#obj === null) throw new Error("Cannot BOOM!");
    return new Rotation(
      this.#r0,
      this.#r1,
      this.#length,
      this.#start,
      this.#obj,
      this.#interpolator
    );
  }
}

export class Rotation extends AnimationBuilderItem {
  #obj: IRotatedMut;
  #interpolator: Interpolator;
  #length: number;
  #start: number;

  static create(): RotateTemporaryIndeterminateVariation {
    return new RotateTemporaryIndeterminateVariation();
  }

  constructor(
    rstart: number,
    rend: number,
    length: number,
    start: number,
    obj: IRotatedMut,
    interpolator: (arg0: number) => number
  ) {
    super();
    this.#obj = obj;
    this.#interpolator = new Interpolator(rstart, rend, interpolator);
    this.#length = length;
    this.#start = start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.rotation = this.#interpolator.interpolate((relativeFrameCount + 1) / this.#length);
  }
  get startFrame(): number {
    return this.#start;
  }
  get length(): number {
    return this.#length;
  }
}
