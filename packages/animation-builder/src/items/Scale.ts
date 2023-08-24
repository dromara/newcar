import type { IScaledMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Scale extends AnimationBuilderItem {
  #obj: IScaledMut;
  #interpolatorx: Interpolator;
  #interpolatory: Interpolator;
  #length: number;
  #start: number;

  constructor(
    obj: IScaledMut,
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
    datas.from = datas.from ?? [this.#obj.scaleX, this.#obj.scaleY];
    this.#interpolatorx = new Interpolator(
      datas.from[0],
      datas.to[0],
      datas.by ?? LinearInterpolator,
    );
    this.#interpolatory = new Interpolator(
      datas.from[1],
      datas.to[1],
      datas.by ?? LinearInterpolator,
    );
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.scaleX = this.#interpolatorx.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.scaleY = this.#interpolatory.interpolate((relativeFrameCount + 1) / this.#length);
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
