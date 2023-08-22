import type { IScaledMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Scale extends AnimationBuilderItem {
  #datas: {
    obj: IScaledMut;
    interpolatorx: Interpolator;
    interpolatory: Interpolator;
    length: number;
    start: number;
  };

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    from?: [number, number];
    to?: [number, number];
    by?: (x: number) => number;
    bindTo?: IScaledMut;
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
    datas.from = datas.from ?? [datas.bindTo.scaleX, datas.bindTo.scaleY];
    this.#datas = {
      obj: datas.bindTo,
      interpolatorx: new Interpolator(datas.from[0], datas.to[0], datas.by ?? LinearInterpolator),
      interpolatory: new Interpolator(datas.from[1], datas.to[1], datas.by ?? LinearInterpolator),
      length: datas.lastsFor,
      start: datas.startAt,
    };
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#datas.obj.scaleX = this.#datas.interpolatorx.interpolate(
      (relativeFrameCount + 1) / this.#datas.length,
    );
    this.#datas.obj.scaleY = this.#datas.interpolatory.interpolate(
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
