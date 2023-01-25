/* eslint-disable @typescript-eslint/no-unused-vars */
import { ITextEditable } from "../../objects/interfaces/TextEditable";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";

export class MutateContentTemporaryIndeterminateVariation {
  #start: number | null = null;
  #textObject: ITextEditable | null = null;
  #mutateTo: string | null = null;

  /**
   * Set which frame to start.
   * @param start The frame number.
   */
  startAt(start: number): MutateContentTemporaryIndeterminateVariation {
    this.#start = start;
    return this;
  }

  /**
   * Bind to a text object.
   * @param obj The obejct to bind to.
   */
  bindTo(obj: ITextEditable): MutateContentTemporaryIndeterminateVariation {
    this.#textObject = obj;
    return this;
  }

  /**
   * Set the mutated text.
   * @param txt The target text.
   */
  mutateContentTo(txt: string): MutateContentTemporaryIndeterminateVariation {
    this.#mutateTo = txt;
    return this;
  }

  boom(): MutateContent {
    if (!this.#mutateTo) throw new Error("Cannot BOOM!");
    if (!this.#start) throw new Error("Cannot BOOM!");
    if (!this.#textObject) throw new Error("Cannot BOOM!");
    return new MutateContent(this.#start, this.#textObject, this.#mutateTo);
  }
}

export class MutateContent extends AnimationBuilderItem {
  #start = 0;
  #textObject: ITextEditable;
  #mutateTo: string;

  static create(): MutateContentTemporaryIndeterminateVariation {
    return new MutateContentTemporaryIndeterminateVariation();
  }

  constructor(startFrame: number, textObject: ITextEditable, mutateTo: string) {
    super();
    this.#start = startFrame;
    this.#textObject = textObject;
    this.#mutateTo = mutateTo;
  }

  onDrawFrame(_relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#textObject.text = this.#mutateTo;
  }
  get startFrame(): number {
    return this.#start;
  }
  get length(): number {
    return 1;
  }
}
