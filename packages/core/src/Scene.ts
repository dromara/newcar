import type { Carobj } from "@newcar/basic/src";

export class Scene {
  #updates: ((arg0: number) => void)[] = [];
  #currentFrame = 0;
  #objects: Carobj[] = [];

  constructor() {}

  /**
   * Set the callback function and run it in each frame.
   * @param update the callback function.
   */
  setUpdate(update: (arg0: number) => void) {
    this.#updates.push(update);
  }

  use() {}

  kill() {}

  get updates() {
    return this.#updates;
  }

  get currentFrame() {
    return this.#currentFrame;
  }

  set currentFrame(value: number) {
    this.#currentFrame = value;
  }

  get objects() {
    return this.#objects;
  }
}
