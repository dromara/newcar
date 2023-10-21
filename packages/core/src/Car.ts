import type { Scene } from "./Scene";

export class Car {
  #ele: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #currentScene: Scene;

  constructor(ele: HTMLCanvasElement) {
    this.#ele = ele;
    if (this.#ele.getContext) {
      this.#context = this.#ele.getContext("2d")!;
    }
  }

  checkOutScene(scene: Scene) {
    this.#currentScene = scene;
  }

  play() {
    if (this.#context === null) {
      return;
    }
    const scene = this.#currentScene;
    const context = this.#context;
    for (const object of scene.objects) {
      object.onSet();
    }
    function count() {
      for (const update of scene.updates) {
        update && update(scene.currentFrame);
      }
      for (const object of scene.objects) {
        object.onUpdate(context);
      }
      scene.currentFrame += 1;
      requestAnimationFrame(count);
    }
    requestAnimationFrame(count);
  }
}
