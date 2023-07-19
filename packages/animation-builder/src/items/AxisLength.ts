import type { ILengthofAxisX, ILengthofAxisY } from "@newcar/objects/src/objects/coordinateSystem/interface";
import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AxisLength extends AnimationBuilderItem {

  #obj: ILengthofAxisX & ILengthofAxisY;
  #interpolatorstart: Interpolator;
  #interpolatorend: Interpolator;
  #length: number;
  #start: number;
  #from: number[];
  #to: number[];
  #by: (x: number) => number

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    from?: [number, number, number, number];
    to?: [number, number, number, number];
    bindTo?: ILengthofAxisX & ILengthofAxisY;
    by?: (x: number) => number;
  }) {
    super();
    let flag = "";
    if (
      ((flag = "startAt"), datas.startAt === undefined) ||
      ((flag = "lastsFor"), datas.lastsFor === undefined) ||
      ((flag = "to"), datas.to === undefined) ||
      ((flag = "bindTo"), datas.bindTo === undefined)
    ) {
      throw new Error(`be unset data "${flag}"`);
    }
    this.#obj = datas.bindTo; 
    this.#from = datas.from || [this.#obj.axisPositiveXLength, this.#obj.axisPositiveYLength, this.#obj.axisNegativeXLength, this.#obj.axisNegativeYLength];
    this.#to = datas.to;
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
    this.#by = datas.by ?? LinearInterpolator

    this.#interpolatorstart = new Interpolator(
      this.#from[0],
      this.#to[0],
      this.#by
    );
    this.#interpolatorend = new Interpolator(
      this.#from![1], 
      this.#to[1], 
      this.#by
    );
  };


  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.axisPositiveXLength = this.#interpolatorstart.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.axisPositiveYLength = this.#interpolatorend.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    // this.#obj.axisNegativeXLength = this.#interpolatorstart.interpolate(
    //   (relativeFrameCount + 1) / this.#length,
    // );
    // this.#obj.axisNegativeYLength = this.#interpolatorend.interpolate(
    //   (relativeFrameCount + 1) / this.#length,
    // );
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
