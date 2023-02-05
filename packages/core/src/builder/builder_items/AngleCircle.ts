import { ICircleAngleMut } from "@newcar/objects/src/interfaces/CircleAngle";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";
import { LinearInterpolator } from "../../interpolation/LinearInterpolator";
import { Interpolator } from "../../interpolation/Interpolator";

export class AngleCircleTemporaryIndeterminateVariation {
  #startAngle0: number | null = null;
  #startAngle1: number | null = null;
  #endAngle0: number | null = null;
  #endAngle1: number | null = null;
  #start: number | null = null;
  #length: number | null = null;
  #obj: ICircleAngleMut | null = null;

  #interpolator: (arg0: number) => number = LinearInterpolator;

  /**
   * Set which frame to start.
   * @param start The frame number.
   */
  startAt(start: number): AngleCircleTemporaryIndeterminateVariation {
    this.#start = start;
    return this;
  }

  /**
   * Set how long the animation lasts in frames.
   */
  lastsFor(frames: number): AngleCircleTemporaryIndeterminateVariation {
    this.#length = frames;
    return this;
  }

  from(start: number, end: number): AngleCircleTemporaryIndeterminateVariation {
    this.#startAngle0 = start;
    this.#endAngle0 = end;
    return this;
  }

  to(start: number, end: number): AngleCircleTemporaryIndeterminateVariation {
    this.#startAngle1 = start;
    this.#endAngle1 = end;
    return this;
  }

  /**
   * Set the interpolation function the animation will use.
   * @param interpolationFunction The interpolation function the animation will use.
   * @returns The reference to itself.
   */
  by(interpolationFunction: (arg0: number) => number): AngleCircleTemporaryIndeterminateVariation {
    this.#interpolator = interpolationFunction;
    return this;
  }

  /**
   * Bind to an object.
   * @param obj The obejct to bind to.
   */
  bindTo(obj: ICircleAngleMut): AngleCircleTemporaryIndeterminateVariation {
    this.#obj = obj;
    if (this.#startAngle0 === null && this.#endAngle0 === null) {
      this.#startAngle0 = obj.startAngle;
      this.#endAngle0 = obj.endAngle;
    }
    return this;
  }

  boom(): AngleCircle {
    if (this.#startAngle1 === null) throw new Error("Cannot BOOM!");
    if (this.#startAngle0 === null) throw new Error("Cannot BOOM!");
    if (this.#endAngle1 === null) throw new Error("Cannot BOOM!");
    if (this.#endAngle0 === null) throw new Error("Cannot BOOM!");
    if (this.#start === null) throw new Error("Cannot BOOM!");
    if (this.#length === null) throw new Error("Cannot BOOM!");
    if (this.#obj === null) throw new Error("Cannot BOOM!");
    return new AngleCircle(
      this.#startAngle0,
      this.#startAngle1,
      this.#endAngle0,
      this.#endAngle1,
      this.#length,
      this.#start,
      this.#obj,
      this.#interpolator
    );
  }
}

export class AngleCircle extends AnimationBuilderItem {
  #obj: ICircleAngleMut;
  #interpolatorstart: Interpolator;
  #interpolatorend: Interpolator;
  #length: number;
  #start: number;

  static create(): AngleCircleTemporaryIndeterminateVariation {
    return new AngleCircleTemporaryIndeterminateVariation();
  }

  constructor(
    start0: number,
    start1: number,
    end0: number,
    end1: number,
    length: number,
    start: number,
    obj: ICircleAngleMut,
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
    this.#obj.startAngle = this.#interpolatorstart.interpolate(
      (relativeFrameCount + 1) / this.#length
    );
    this.#obj.endAngle = this.#interpolatorend.interpolate((relativeFrameCount + 1) / this.#length);
  }
  get startFrame(): number {
    return this.#start;
  }
  get length(): number {
    return this.#length;
  }
}
