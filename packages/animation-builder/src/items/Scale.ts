import type { IScaledMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Scale extends AnimationBuilderItem {
  #obj: IScaledMut;
  #interpolatorX: Interpolator;
  #interpolatorY: Interpolator;
  readonly #length: number;
  readonly #start: number;

  constructor(
    obj: IScaledMut,
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
    data.from = data.from ?? [this.#obj.scaleX, this.#obj.scaleY];
    this.#interpolatorX = new Interpolator(
      data.from[0],
      data.to[0],
      data.by ?? LinearInterpolator,
    );
    this.#interpolatorY = new Interpolator(
      data.from[1],
      data.to[1],
      data.by ?? LinearInterpolator,
    );
    this.#length = data.lastsFor;
    this.#start = data.startAt;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.scaleX = this.#interpolatorX.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.scaleY = this.#interpolatorY.interpolate((relativeFrameCount + 1) / this.#length);
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
