import type { ICircleAngleMut } from "@newcar/objects/src/objects/circle/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AngleCircle extends AnimationBuilderItem {
  #datas: {
    obj: ICircleAngleMut;
    interpolatorstart: Interpolator;
    interpolatorend: Interpolator;
    length: number;
    start: number;
  };

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    from?: [number, number];
    to?: [number, number];
    bindTo?: ICircleAngleMut;
    by?: (x: number) => number;
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
    datas.from = datas.from ?? [datas.bindTo.startAngle, datas.bindTo.endAngle];
    this.#datas = {
      length: datas.lastsFor,
      start: datas.startAt,
      obj: datas.bindTo,
      interpolatorstart: new Interpolator(
        datas.from[0],
        datas.to[0],
        datas.by ?? LinearInterpolator,
      ),
      interpolatorend: new Interpolator(datas.from[1], datas.to[1], datas.by ?? LinearInterpolator),
    };
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#datas.obj.startAngle = this.#datas.interpolatorstart.interpolate(
      (relativeFrameCount + 1) / this.#datas.length,
    );
    this.#datas.obj.endAngle = this.#datas.interpolatorend.interpolate(
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
