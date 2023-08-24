import type { INumberAxisLimit } from "@newcar/objects/src/objects/numberAxis/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AxisLimit extends AnimationBuilderItem {
  #obj: INumberAxisLimit;
  #interpolatormax: Interpolator;
  #interpolatormin: Interpolator;
  #length: number;
  #start: number;

  constructor(
    obj: INumberAxisLimit,
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
    datas.from = datas.from ?? [obj.max, obj.min];
    this.#start = datas.startAt;
    this.#obj = obj;
    this.#interpolatormax = new Interpolator(
      datas.from[0],
      datas.to[0],
      datas.by ?? LinearInterpolator,
    );
    this.#interpolatormin = new Interpolator(
      datas.from[1],
      datas.to[1],
      datas.by ?? LinearInterpolator,
    );
    this.#length = datas.lastsFor;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.max = this.#interpolatormax.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.min = this.#interpolatormin.interpolate((relativeFrameCount + 1) / this.#length);
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
