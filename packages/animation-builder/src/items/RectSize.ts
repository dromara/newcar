import type { IRectSize } from "@newcar/objects/src/objects/rectangle/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class RectSize extends AnimationBuilderItem {
  #obj: IRectSize;
  #interpolatorwidth: Interpolator;
  #interpolatorlength: Interpolator;
  #length: number;
  #start: number;
  #from: number[];
  #to: number[];

  constructor(
    obj: IRectSize,
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
    this.#obj = obj;
    this.#from = datas.from ?? [this.#obj.width, this.#obj.length];
    this.#to = datas.to;
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;

    this.#interpolatorwidth = new Interpolator(
      this.#from[0],
      this.#to[0],
      datas.by ?? LinearInterpolator,
    );
    this.#interpolatorlength = new Interpolator(
      datas.from![1],
      datas.to[1],
      datas.by ?? LinearInterpolator,
    );
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.width = this.#interpolatorwidth.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.length = this.#interpolatorlength.interpolate(
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
