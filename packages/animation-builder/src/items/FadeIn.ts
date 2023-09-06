import type { ITransparencyMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "../";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class FadeIn extends AnimationBuilderItem {
  #obj: ITransparencyMut;
  #startFrame: number;
  #length: number;
  #interpolator: Interpolator;

  constructor(
    obj: ITransparencyMut,
    data: {
      startAt: number;
      lastsFor?: number;
      by: (x: number) => number;
    },
  ) {
    super();
    this.#obj = obj;
    this.#startFrame = data.startAt;
    this.#length = data.lastsFor ?? 60;
    this.#interpolator = new Interpolator(0, 1, data.by ?? LinearInterpolator);
  }

  get startFrame(): number {
    return this.#startFrame;
  }

  get length(): number {
    return this.#length;
  }

  onDrawFrame(relativeFrameCount: number, _parents: AnimationBuilder) {
    this.#obj.transparency = this.#interpolator.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
  }
}
