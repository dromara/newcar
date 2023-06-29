import type { ITextEditable } from "@newcar/objects/src/objects/text/interface";

import type { AnimationBuilder } from "..";
import { AnimationBuilderItem } from "../item";

export class MutateContent extends AnimationBuilderItem {
  #datas: {
    start: number;
    textObject: ITextEditable;
    mutateTo: string;
  };

  constructor(datas: { startAt?: number; bindTo?: ITextEditable; mutateContentTo?: string }) {
    super();
    let flag = "";
    if (
      ((flag = "startAt"), datas.startAt === undefined) ||
      ((flag = "bindTo"), datas.bindTo === undefined) ||
      ((flag = "mutateContentTo"), datas.mutateContentTo === undefined)
    ) {
      throw new Error(`be unset data "${flag}"`);
    }
    this.#datas = {
      start: datas.startAt,
      textObject: datas.bindTo,
      mutateTo: datas.mutateContentTo,
    };
  }

  onDrawFrame(_relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#datas.textObject.text = this.#datas.mutateTo;
  }

  get startFrame(): number {
    return this.#datas.start;
  }

  get length(): number {
    return 1;
  }
}
