import type { IRectSize } from "@newcar/objects/src/objects/rectangle/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class RectSize extends AnimationBuilderItem {
  #obj: IRectSize;
  #interpolatorWidth: Interpolator;
  #interpolatorLength: Interpolator;
  readonly #length: number;
  readonly #start: number;
  readonly #from: number[];
  readonly #to: number[];

  constructor(
    obj: IRectSize,
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
    this.#from = data.from ?? [this.#obj.width, this.#obj.length];
    this.#to = data.to;
    this.#length = data.lastsFor;
    this.#start = data.startAt;

    this.#interpolatorWidth = new Interpolator(
      this.#from[0],
      this.#to[0],
      data.by ?? LinearInterpolator,
    );
    this.#interpolatorLength = new Interpolator(
      data.from![1],
      data.to[1],
      data.by ?? LinearInterpolator,
    );
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.width = this.#interpolatorWidth.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.length = this.#interpolatorLength.interpolate(
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
