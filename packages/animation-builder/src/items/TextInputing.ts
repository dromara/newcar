import type { ITextEditable } from "@newcar/objects/src/objects/text/interface";
import type { AnimationBuilder } from "..";
import { AnimationBuilderItem } from "../item";

export class TextInputing extends AnimationBuilderItem {

  #obj: ITextEditable
  #length: number;
  #start: number;
  #to: string

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    to?: string;
    bindTo?: ITextEditable;
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
    this.#to = datas.to;
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
  };


  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    const singleTime = this.#length / this.#to.length;
    const cycle = relativeFrameCount % singleTime
    if (cycle === 0) {
      this.#obj.text += this.#to[(relativeFrameCount - cycle) / singleTime - 1]
      console.log(this.#obj.text);
    }
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}