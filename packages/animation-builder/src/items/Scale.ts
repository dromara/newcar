/* eslint-disable @typescript-eslint/no-unused-vars */
import { IScaledMut } from "@newcar/objects/src/objects/carobj/interface";
import { AnimationBuilder } from "..";
import { AnimationBuilderItem } from "../item";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";

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
    let flag = "";
    if (
      ((flag = "startAt"), datas.startAt === undefined) ||
      ((flag = "lastsFor"), datas.lastsFor === undefined) ||
      ((flag = "to"), datas.to === undefined) ||
      ((flag = "bindTo"), datas.bindTo === undefined)
    )
      throw new Error(`be unset data "${flag}"`);
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
      (relativeFrameCount + 1) / this.#datas.length
    );
    this.#datas.obj.scaleY = this.#datas.interpolatory.interpolate(
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
