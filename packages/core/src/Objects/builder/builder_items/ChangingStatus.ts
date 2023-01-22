/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISpiritStatus } from "../../interfaces/SpiritStatus";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";
import { Interpolator } from "../../interpolation/Interpolator";
import { LinearInterpolator } from "../../interpolation/LinearInterpolator";

export class ChangingStatusTemporaryIndeterminateVariation {
  #s0: number | null = null;
  #s1: number | null = null;
  #start: number | null = null;
  #length: number | null = null;
  #obj: ISpiritStatus | null = null;
  #interpolator: (arg0: number) => number = LinearInterpolator;

  /**
   * Set which frame to start.
   * @param start The frame number.
   */
  startAt(start: number): ChangingStatusTemporaryIndeterminateVariation {
    this.#start = start;
    return this;
  }

  /**
   * Set how long the animation lasts in frames.
   */
  lastsFor(frames: number): ChangingStatusTemporaryIndeterminateVariation {
    this.#length = frames;
    return this;
  }

  from(rstart: number): ChangingStatusTemporaryIndeterminateVariation {
    this.#s0 = rstart;
    return this;
  }

  to(rend: number): ChangingStatusTemporaryIndeterminateVariation {
    this.#s1 = rend;
    return this;
  }

  /**
   * Set the interpolation function the animation will use.
   * @param interpolationFunction The interpolation function the animation will use.
   * @returns The reference to itself.
   */
  by(
    interpolationFunction: (arg0: number) => number
  ): ChangingStatusTemporaryIndeterminateVariation {
    this.#interpolator = interpolationFunction;
    return this;
  }

  /**
   * Bind to an object.
   * @param obj The obejct to bind to.
   */
  bindTo(obj: ISpiritStatus): ChangingStatusTemporaryIndeterminateVariation {
    this.#obj = obj;
    if (this.#s0 === null) {
      this.#s0 = obj.status;
    }
    return this;
  }

  boom(): ChangingStatus {
    if (this.#s1 === null) throw new Error("Cannot BOOM!");
    if (this.#s0 === null) throw new Error("Cannot BOOM!");
    if (this.#start === null) throw new Error("Cannot BOOM!");
    if (this.#length === null) throw new Error("Cannot BOOM!");
    if (this.#obj === null) throw new Error("Cannot BOOM!");
    return new ChangingStatus(
      this.#s0,
      this.#s1,
      this.#length,
      this.#start,
      this.#obj,
      this.#interpolator
    );
  }
}

export class ChangingStatus extends AnimationBuilderItem {
  #obj: ISpiritStatus;
  #interpolator: Interpolator;
  #length: number;
  #start: number;

  static create(): ChangingStatusTemporaryIndeterminateVariation {
    return new ChangingStatusTemporaryIndeterminateVariation();
  }

  constructor(
    rstart: number,
    rend: number,
    length: number,
    start: number,
    obj: ISpiritStatus,
    interpolator: (arg0: number) => number
  ) {
    super();
    this.#obj = obj;
    this.#interpolator = new Interpolator(rstart, rend, interpolator);
    this.#length = length;
    this.#start = start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.status = this.#interpolator.interpolate((relativeFrameCount + 1) / this.#length);
  }
  get startFrame(): number {
    return this.#start;
  }
  get length(): number {
    return this.#length;
  }
}
