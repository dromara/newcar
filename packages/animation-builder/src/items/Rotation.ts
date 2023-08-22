import type { IRotatedMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Rotation extends AnimationBuilderItem {
  #datas: {
    obj: IRotatedMut;
    interpolator: Interpolator;
    length: number;
    start: number;
  };

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    from?: number;
    to?: number;
    by?: (x: number) => number;
    bindTo?: IRotatedMut;
  }) {
    super();
    if (
      datas.bindTo === undefined ||
      datas.to === undefined ||
      datas.lastsFor === undefined ||
      datas.startAt === undefined
    ) {
      throw new Error("This animation is missing necessary values");
    }
    datas.from = datas.from ?? datas.bindTo.rotation;
    this.#datas = {
      start: datas.startAt,
      obj: datas.bindTo,
      interpolator: new Interpolator(datas.from, datas.to, datas.by ?? LinearInterpolator),
      length: datas.lastsFor,
    };
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#datas.obj.rotation = this.#datas.interpolator.interpolate(
      (relativeFrameCount + 1) / this.#datas.length,
    );
  }

  get startFrame(): number {
    return this.#datas.start;
  }

  get length(): number {
    return this.#datas.length;
  }
}
