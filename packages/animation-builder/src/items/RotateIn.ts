import type { IRotatedMut, IScaledMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "../";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class RotateIn extends AnimationBuilderItem {
  #obj: IScaledMut & IRotatedMut;
  #startFrame: number;
  #length: number;
  #interpolatorScale: Interpolator;
  #interpolatorRotate: Interpolator;

  constructor(
    obj: IScaledMut & IRotatedMut,
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
    this.#interpolatorScale = new Interpolator(0, 1, data.by ?? LinearInterpolator);
    this.#interpolatorRotate = new Interpolator(0, 4 * Math.PI, data.by ?? LinearInterpolator);
  }

  get startFrame(): number {
    return this.#startFrame;
  }

  get length(): number {
    return this.#length;
  }

  onDrawFrame(relativeFrameCount: number, _parents: AnimationBuilder) {
    this.#obj.scaleX = this.#interpolatorScale.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.scaleY = this.#interpolatorScale.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.rotation = this.#interpolatorRotate.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
  }
}
