import type { ITransparencyMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Transparency extends AnimationBuilderItem {
  #obj: ITransparencyMut;
  #interpolator: Interpolator;
  #length: number;
  #start: number;
  #from: number;
  #to: number;

  constructor(
    obj: ITransparencyMut,
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
    this.#obj = obj;
    this.#from = datas.from ?? this.#obj.transparency;
    this.#to = datas.to;
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
    this.#interpolator = new Interpolator(this.#from, this.#to, datas.by ?? LinearInterpolator);
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.transparency = this.#interpolator.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
