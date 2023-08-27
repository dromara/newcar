import type { ITransparencyMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Transparency extends AnimationBuilderItem {
  #obj: ITransparencyMut;
  #interpolator: Interpolator;
  readonly #length: number;
  readonly #start: number;
  readonly #from: number;
  readonly #to: number;

  constructor(
    obj: ITransparencyMut,
    data: {
      startAt?: number;
      lastsFor?: number;
      from?: number;
      to?: number;
      by?: (x: number) => number;
    },
  ) {
    super();
    if (data.to === undefined || data.lastsFor === undefined || data.startAt === undefined) {
      throw new Error("This animation is missing necessary values");
    }
    this.#obj = obj;
    this.#from = data.from ?? this.#obj.transparency;
    this.#to = data.to;
    this.#length = data.lastsFor;
    this.#start = data.startAt;
    this.#interpolator = new Interpolator(this.#from, this.#to, data.by ?? LinearInterpolator);
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
