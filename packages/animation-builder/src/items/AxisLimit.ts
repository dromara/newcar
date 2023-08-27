import type { INumberAxisLimit } from "@newcar/objects/src/objects/numberAxis/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AxisLimit extends AnimationBuilderItem {
  #obj: INumberAxisLimit;
  #interpolatorMax: Interpolator;
  #interpolatorMin: Interpolator;
  readonly #length: number;
  readonly #start: number;

  constructor(
    obj: INumberAxisLimit,
    data: {
      startAt?: number;
      lastsFor?: number;
      from?: [number, number];
      to?: [number, number];
      by?: (x: number) => number;
    },
  ) {
    super();
    if (data.to === undefined || data.lastsFor === undefined || data.startAt === undefined) {
      throw new Error("This animation is missing necessary values");
    }
    data.from = data.from ?? [obj.max, obj.min];
    this.#start = data.startAt;
    this.#obj = obj;
    this.#interpolatorMax = new Interpolator(
      data.from[0],
      data.to[0],
      data.by ?? LinearInterpolator,
    );
    this.#interpolatorMin = new Interpolator(
      data.from[1],
      data.to[1],
      data.by ?? LinearInterpolator,
    );
    this.#length = data.lastsFor;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.max = this.#interpolatorMax.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.min = this.#interpolatorMin.interpolate((relativeFrameCount + 1) / this.#length);
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
