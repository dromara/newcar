import type {
  ILimitofAxisX,
  ILimitofAxisY,
} from "@newcar/objects/src/objects/coordinateSystem/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AxisLimit2d extends AnimationBuilderItem {
  #obj: ILimitofAxisX & ILimitofAxisY;
  #interpolatorXMax: Interpolator;
  #interpolatorYMax: Interpolator;
  #interpolatorXMin: Interpolator;
  #interpolatorYMin: Interpolator;
  readonly #length: number;
  readonly #start: number;
  readonly #from: number[];
  readonly #to: number[];
  readonly #by: (x: number) => number;

  constructor(
    obj: ILimitofAxisX & ILimitofAxisY,
    data: {
      startAt?: number;
      lastsFor?: number;
      from?: [number, number, number, number];
      to?: [number, number, number, number];
      by?: (x: number) => number;
    },
  ) {
    super();
    if (data.to === undefined || data.lastsFor === undefined || data.startAt === undefined) {
      throw new Error("This animation is missing necessary values");
    }
    this.#obj = obj;
    this.#from = data.from || [this.#obj.x_max, this.#obj.y_max, this.#obj.x_min, this.#obj.y_min];
    this.#to = data.to;
    this.#length = data.lastsFor;
    this.#start = data.startAt;
    this.#by = data.by ?? LinearInterpolator;

    this.#interpolatorXMax = new Interpolator(this.#from[0], this.#to[0], this.#by);
    this.#interpolatorYMax = new Interpolator(this.#from![1], this.#to[1], this.#by);
    this.#interpolatorXMin = new Interpolator(this.#from[2], this.#to[2], this.#by);
    this.#interpolatorYMin = new Interpolator(this.#from![3], this.#to[3], this.#by);
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.x_max = this.#interpolatorXMax.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.y_max = this.#interpolatorYMax.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.x_min = this.#interpolatorXMin.interpolate((relativeFrameCount + 1) / this.#length);
    this.#obj.y_min = this.#interpolatorYMin.interpolate((relativeFrameCount + 1) / this.#length);
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
