import type { AnimationBuilder } from "..";
import { AnimationBuilderItem } from "../item";

export class SingleFrameAction extends AnimationBuilderItem {
  #datas: {
    frame: number;
    func: () => void;
  };

  constructor(datas: { at?: number; run?: () => void }) {
    super();
    let flag = "";
    if (((flag = "at"), datas.at === undefined) || ((flag = "func"), datas.run === undefined)) {
      throw new Error(`be unset data "${flag}"`);
    }
    this.#datas = {
      frame: datas.at / 2,
      func: datas.run,
    };
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    // console.log(relativeFrameCount);
    if (relativeFrameCount === this.#datas.frame) {
      this.#datas.func();
    }
  }

  get startFrame(): number {
    return this.#datas.frame;
  }

  get length(): number {
    return this.#datas.frame + 1;
  }
}
