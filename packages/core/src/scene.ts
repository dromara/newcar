import type { Carobj } from "@newcar/basic/src/objects";

export class Scene {
  #updates: ((arg0: number) => void)[] = [];
  #currentFrame = 0;
  #objects: Carobj[] = [];

  constructor() {}

  /**
   * Set the callback function and run it in each frame.
   * @param update the callback function.
   */
  setUpdate(update: (arg0: number) => void): void {
    this.#updates.push(update);
  }

  use(obj: Carobj): Scene {
    this.#objects.push(obj);

    return this;
  }

  kill(): Scene {
    return this;
  }

  get updates(): ((arg0: number) => void)[] {
    return this.#updates;
  }

  get currentFrame(): number {
    return this.#currentFrame;
  }

  set currentFrame(value: number) {
    this.#currentFrame = value;
  }

  get objects(): Carobj[] {
    return this.#objects;
  }
}
