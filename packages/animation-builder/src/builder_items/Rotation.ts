/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRotatedMut } from "@newcar/objects/src/interfaces/Rotated";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";

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
    let flag = "";
    if (
      ((flag = "startAt"), datas.startAt === undefined) ||
      ((flag = "lastsFor"), datas.lastsFor === undefined) ||
      ((flag = "to"), datas.to === undefined) ||
      ((flag = "bindTo"), datas.bindTo === undefined)
    )
      throw new Error(`be unset data "${flag}"`);
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
      (relativeFrameCount + 1) / this.#datas.length
    );
  }
  get startFrame(): number {
    return this.#datas.start;
  }
  get length(): number {
    return this.#datas.length;
  }
}
