import type { ICircleAngleMut } from "@newcar/objects/src/objects/circle/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AngleCircle extends AnimationBuilderItem {
  #obj: ICircleAngleMut;
  #interpolatorStart: Interpolator;
  #interpolatorEnd: Interpolator;
  #length: number;
  #start: number;

  constructor(
    obj: ICircleAngleMut,
    datas: {
      startAt?: number;
      lastsFor?: number;
      from?: [number, number];
      to?: [number, number];
      by?: (x: number) => number;
    },
  ) {
    super();
    if (datas.to === undefined || datas.lastsFor === undefined || datas.startAt === undefined) {
      throw new Error("This animation is missing necessary values");
    }
    datas.from = datas.from ?? [obj.startAngle, obj.endAngle];
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
    this.#obj = obj;
    this.#interpolatorStart = new Interpolator(
      datas.from[0],
      datas.to[0],
      datas.by ?? LinearInterpolator,
    );
    this.#interpolatorEnd = new Interpolator(
      datas.from[1],
      datas.to[1],
      datas.by ?? LinearInterpolator,
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
