import type { ICircleAngleMut } from "@newcar/objects/src/objects/circle/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class CircleAngle extends AnimationBuilderItem {
  #obj: ICircleAngleMut;
  #interpolatorStart: Interpolator;
  #interpolatorEnd: Interpolator;
  #length: number;
  #start: number;

  constructor(
    obj: ICircleAngleMut,
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
    data.from = data.from ?? [obj.startAngle, obj.endAngle];
    this.#length = data.lastsFor;
    this.#start = data.startAt;
    this.#obj = obj;
    this.#interpolatorStart = new Interpolator(
      data.from[0],
      data.to[0],
      data.by ?? LinearInterpolator,
    );
    this.#interpolatorEnd = new Interpolator(
      data.from[1],
      data.to[1],
      data.by ?? LinearInterpolator,
    );
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.startAngle = this.#interpolatorStart.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.endAngle = this.#interpolatorEnd.interpolate((relativeFrameCount + 1) / this.#length);
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
