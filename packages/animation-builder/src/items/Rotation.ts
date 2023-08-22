import type { IRotatedMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Rotation extends AnimationBuilderItem {
  #obj: IRotatedMut;
  #interpolator: Interpolator;
  #length: number;
  #start: number;

  constructor(
    obj: IRotatedMut,
    datas: {
      startAt?: number;
      lastsFor?: number;
      from?: number;
      to?: number;
      by?: (x: number) => number;
    },
  ) {
    super();
    if (datas.to === undefined || datas.lastsFor === undefined || datas.startAt === undefined) {
      throw new Error("This animation is missing necessary values");
    }
    datas.from = datas.from ?? obj.rotation;
    this.#start = datas.startAt;
    this.#obj = obj;
    this.#interpolator = new Interpolator(datas.from, datas.to, datas.by ?? LinearInterpolator);
    this.#length = datas.lastsFor;
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
