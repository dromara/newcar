import { ICircleAngleMut } from "@newcar/objects/src/interfaces/CircleAngle";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { Interpolator } from "../interpolation/Interpolator";

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
    let flag = "";
    if (
      ((flag = "startAt"), datas.startAt === undefined) ||
      ((flag = "lastsFor"), datas.lastsFor === undefined) ||
      ((flag = "to"), datas.to === undefined) ||
      ((flag = "bindTo"), datas.bindTo === undefined)
    )
      throw new Error(`be unset data "${flag}"`);
    datas.from = datas.from ?? [datas.bindTo.startAngle, datas.bindTo.endAngle];
    this.#datas = {
      length: datas.lastsFor - datas.startAt,
      start: datas.startAt,
      obj: datas.bindTo,
      interpolatorstart: new Interpolator(
        datas.from[0],
        datas.to[0],
        datas.by ?? LinearInterpolator
      ),
      interpolatorend: new Interpolator(datas.from[1], datas.to[1], datas.by ?? LinearInterpolator),
    };
  }

  onDrawFrame(relativeFrameCount: number, parent: AnimationBuilder): void {
    this.#datas.obj.startAngle = this.#datas.interpolatorstart.interpolate(
      (relativeFrameCount + 1) / this.#datas.length
    );
    this.#datas.obj.endAngle = this.#datas.interpolatorend.interpolate(
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
