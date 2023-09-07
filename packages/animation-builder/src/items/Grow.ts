import type { IScaledMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "../";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Grow extends AnimationBuilderItem {
  #obj: IScaledMut;
  #startFrame: number;
  #length: number;
  #interpolator: Interpolator;

  constructor(
    obj: IScaledMut,
    data: {
      startAt: number;
      lastsFor?: number;
      by: (x: number) => number;
    },
  ) {
    super();
    this.#obj = obj;
    this.#startFrame = data.startAt;
    this.#length = data.lastsFor ?? 30;
    this.#interpolator = new Interpolator(0, 1, data.by ?? LinearInterpolator);
  }

  get startFrame(): number {
    return this.#startFrame;
  }

  get length(): number {
    return this.#length;
  }

  onDrawFrame(relativeFrameCount: number, _parents: AnimationBuilder) {
    this.#obj.scaleX = this.#interpolator.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.scaleY = this.#interpolator.interpolate((relativeFrameCount + 1) / this.#length);
  }
}
