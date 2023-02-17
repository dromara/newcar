/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDefinitionImageLimit } from "@newcar/objects/src/interfaces/DefinitionImageLimit";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";
import { Interpolator } from "../../../core/src/interpolation/Interpolator";
import { LinearInterpolator } from "../../../core/src/interpolation/LinearInterpolator";

export class LimitTemporaryIndeterminateVariation {
  #start0: number | null = null;
  #start1: number | null = null;
  #end0: number | null = null;
  #end1: number | null = null;
  #start: number | null = null;
  #length: number | null = null;
  #obj: IDefinitionImageLimit | null = null;
  #interpolator: (arg0: number) => number = LinearInterpolator;

  /**
   * Set which frame to start.
   * @param start The frame number.
   */
  startAt(start: number): LimitTemporaryIndeterminateVariation {
    this.#start = start;
    return this;
  }

  /**
   * Set how long the animation lasts in frames.
   */
  lastsFor(frames: number): LimitTemporaryIndeterminateVariation {
    this.#length = frames;
    return this;
  }

  from(start: number, end: number): LimitTemporaryIndeterminateVariation {
    this.#start0 = start;
    this.#end0 = end;
    return this;
  }

  to(start: number, end: number): LimitTemporaryIndeterminateVariation {
    this.#start1 = start;
    this.#end1 = end;
    return this;
  }

  /**
   * Set the interpolation function the animation will use.
   * @param interpolationFunction The interpolation function the animation will use.
   * @returns The reference to itself.
   */
  by(interpolationFunction: (arg0: number) => number): LimitTemporaryIndeterminateVariation {
    this.#interpolator = interpolationFunction;
    return this;
  }

  /**
   * Bind to an object.
   * @param obj The obejct to bind to.
   */
  bindTo(obj: IDefinitionImageLimit): LimitTemporaryIndeterminateVariation {
    this.#obj = obj;
    if (this.#start0 === null && this.#end0 === null) {
      this.#start0 = obj.startVariable;
      this.#end0 = obj.startVariable;
    }
    return this;
  }

  boom(): Limit {
    if (this.#start1 === null) throw new Error("Cannot BOOM!");
    if (this.#start0 === null) throw new Error("Cannot BOOM!");
    if (this.#end1 === null) throw new Error("Cannot BOOM!");
    if (this.#end0 === null) throw new Error("Cannot BOOM!");
    if (this.#start === null) throw new Error("Cannot BOOM!");
    if (this.#length === null) throw new Error("Cannot BOOM!");
    if (this.#obj === null) throw new Error("Cannot BOOM!");
    return new Limit(
      this.#start0,
      this.#start1,
      this.#end0,
      this.#end1,
      this.#length,
      this.#start,
      this.#obj,
      this.#interpolator
    );
  }
}

export class Limit extends AnimationBuilderItem {
  #obj: IDefinitionImageLimit;
  #interpolatorstart: Interpolator;
  #interpolatorend: Interpolator;
  #length: number;
  #start: number;

  static create(): LimitTemporaryIndeterminateVariation {
    return new LimitTemporaryIndeterminateVariation();
  }

  constructor(
    start0: number,
    start1: number,
    end0: number,
    end1: number,
    length: number,
    start: number,
    obj: IDefinitionImageLimit,
    interpolator: (arg0: number) => number
  ) {
    super();
    this.#obj = obj;
    this.#interpolatorstart = new Interpolator(start0, start1, interpolator);
    this.#interpolatorend = new Interpolator(end0, end1, interpolator);
    this.#length = length;
    this.#start = start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.startVariable = this.#interpolatorstart.interpolate(
      (relativeFrameCount + 1) / this.#length
    );
    this.#obj.endVariable = this.#interpolatorend.interpolate(
      (relativeFrameCount + 1) / this.#length
    );
  }
  get startFrame(): number {
    return this.#start;
  }
  get length(): number {
    return this.#length;
  }
}
