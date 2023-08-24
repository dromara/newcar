import type { IPositionedMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Translation extends AnimationBuilderItem {
  #length: number;
  #start: number;
  #obj: IPositionedMut;
  #interpolatorx: Interpolator;
  #interpolatory: Interpolator;

  constructor(
    obj: IPositionedMut,
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
    datas.from = datas.from ?? [this.#obj.x, this.#obj.y];
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
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
  }

  get length(): number {
    return this.#length;
  }

  get startFrame(): number {
    return this.#start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.x = this.#interpolatorx.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.y = this.#interpolatory.interpolate((relativeFrameCount + 1) / this.#length);
  }
}
