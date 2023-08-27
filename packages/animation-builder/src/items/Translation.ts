import type { IPositionedMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Translation extends AnimationBuilderItem {
  #length: number;
  #start: number;
  #obj: IPositionedMut;
  #interpolatorX: Interpolator;
  #interpolatorY: Interpolator;

  constructor(
    obj: IPositionedMut,
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
    this.#obj = obj;
    data.from = data.from ?? [this.#obj.x, this.#obj.y];
    this.#length = data.lastsFor;
    this.#start = data.startAt;
    this.#interpolatorX = new Interpolator(data.from[0], data.to[0], data.by ?? LinearInterpolator);
    this.#interpolatorY = new Interpolator(data.from[1], data.to[1], data.by ?? LinearInterpolator);
  }

  get length(): number {
    return this.#length;
  }

  get startFrame(): number {
    return this.#start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.x = this.#interpolatorX.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.y = this.#interpolatorY.interpolate((relativeFrameCount + 1) / this.#length);
  }
}
