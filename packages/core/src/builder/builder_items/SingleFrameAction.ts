import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";

export class SingleFrameActionTemporaryIndeterminateVariation {
  #frame: number | null = null;
  #func: (() => void) | null = null;

  at(frame: number) {
    this.#frame = frame;
    return this;
  }

  run(func: () => void) {
    this.#func = func;
    return this;
  }

  boom(): SingleFrameAction {
    if (this.#frame === null) throw new Error("Cannot BOOM!");
    if (this.#func === null) throw new Error("Cannot BOOM!");
    return new SingleFrameAction(this.#frame, this.#func);
  }
}

export class SingleFrameAction extends AnimationBuilderItem {
  #frame: number;
  #func: () => void;

  static create() {
    return new SingleFrameActionTemporaryIndeterminateVariation();
  }

  constructor(frame: number, func: () => void) {
    super();
    // TODO: Fix the bug.
    // Warning: The unknown bug,the frame will be the twice than real frame,so now there make it be half to fix the bug.
    this.#frame = frame / 2;
    this.#func = func;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    // console.log(relativeFrameCount);
    if (relativeFrameCount === this.#frame) {
      this.#func();
    }
  }

  get startFrame(): number {
    return this.#frame;
  }
  get length(): number {
    return this.#frame + 1;
  }
}
