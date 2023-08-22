import type { IPositionedMut } from "@newcar/objects/src/objects/carobj/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class Translation extends AnimationBuilderItem {
  #datas: {
    length: number;
    start: number;
    obj: IPositionedMut;
    interpolatorx: Interpolator;
    interpolatory: Interpolator;
  };

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    from?: [number, number];
    to?: [number, number];
    by?: (x: number) => number;
    bindTo?: IPositionedMut;
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
    datas.from = datas.from ?? [datas.bindTo.x, datas.bindTo.y];
    this.#datas = {
      length: datas.lastsFor ?? null,
      start: datas.startAt ?? null,
      obj: datas.bindTo ?? null,
      interpolatorx: new Interpolator(datas.from[0], datas.to[0], datas.by ?? LinearInterpolator),
      interpolatory: new Interpolator(datas.from[1], datas.to[1], datas.by ?? LinearInterpolator),
    };
  }

  get length(): number {
    return this.#datas.length;
  }

  get startFrame(): number {
    return this.#datas.start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#datas.obj.x = this.#datas.interpolatorx.interpolate(
      (relativeFrameCount + 1) / this.#datas.length,
    );
    this.#datas.obj.y = this.#datas.interpolatory.interpolate(
      (relativeFrameCount + 1) / this.#datas.length,
    );
  }
}
