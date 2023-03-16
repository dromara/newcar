// TODO: Recreate the animation of changing status of spirits.

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISpiritStatus } from "@newcar/objects/src/interfaces/SpiritStatus";
import { AnimationBuilder } from "..";
import { AnimationBuilderItem } from "../item";

export class ChangingStatus extends AnimationBuilderItem {
  #datas: {
    obj: ISpiritStatus;
    length: number;
    start: number;
  };

  constructor(datas: { startAt?: number; lastsFor?: number; bindTo?: ISpiritStatus }) {
    super();
    let flag = "";
    if (
      ((flag = "startAt"), datas.startAt === undefined) ||
      ((flag = "lastsFor"), datas.lastsFor === undefined) ||
      ((flag = "bindTo"), datas.bindTo === undefined)
    )
      throw new Error(`be unset data "${flag}"`);
    this.#datas = {
      length: datas.lastsFor - datas.startAt,
      start: datas.startAt,
      obj: datas.bindTo,
    };
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#datas.obj.status = relativeFrameCount % this.#datas.obj.length;
  }
  get startFrame(): number {
    return this.#datas.start;
  }
  get length(): number {
    return this.#datas.length;
  }
}
