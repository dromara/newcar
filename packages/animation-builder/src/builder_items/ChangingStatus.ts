// TODO: Recreate the animation of changing status of spirits.

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISpiritStatus } from "@newcar/objects/src/interfaces/SpiritStatus";
import { AnimationBuilder } from "../AnimationBuilder";
import { AnimationBuilderItem } from "../AnimationBuilderItem";

export class ChangingStatusTemporaryIndeterminateVariation {
  #start: number | null = null;
  #length: number | null = null;
  #obj: ISpiritStatus | null = null;

  /**
   * Set which frame to start.
   * @param start The frame number.
   */
  startAt(start: number): ChangingStatusTemporaryIndeterminateVariation {
    this.#start = start;
    return this;
  }

  /**
   * Set how long the animation lasts in frames.
   */
  lastsFor(frames: number): ChangingStatusTemporaryIndeterminateVariation {
    this.#length = frames;
    return this;
  }

  /**
   * Bind to an object.
   * @param obj The obejct to bind to.
   */
  bindTo(obj: ISpiritStatus): ChangingStatusTemporaryIndeterminateVariation {
    this.#obj = obj;
    return this;
  }

  boom(): ChangingStatus {
    if (this.#start === null) throw new Error("Cannot BOOM!");
    if (this.#length === null) throw new Error("Cannot BOOM!");
    if (this.#obj === null) throw new Error("Cannot BOOM!");
    return new ChangingStatus(this.#length, this.#start, this.#obj);
  }
}

export class ChangingStatus extends AnimationBuilderItem {
  #obj: ISpiritStatus;
  #length: number;
  #start: number;

  static create(): ChangingStatusTemporaryIndeterminateVariation {
    return new ChangingStatusTemporaryIndeterminateVariation();
  }

  constructor(length: number, start: number, obj: ISpiritStatus) {
    super();
    this.#obj = obj;
    this.#length = length;
    this.#start = start;
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.status = relativeFrameCount % this.#obj.length;
  }
  get startFrame(): number {
    return this.#start;
  }
  get length(): number {
    return this.#length;
  }
}
