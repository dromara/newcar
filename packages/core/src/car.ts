import type { Scene } from "./scene";

export class Car {
  readonly element: HTMLCanvasElement;
  readonly context?: CanvasRenderingContext2D;
  scene: Scene;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.context = this.element.getContext("2d") ?? undefined;
    this.element.style.backgroundColor = "black";
  }

  play(): Car {
    if (!this.context) {
      return this;
    }

    for (const object of this.scene.objects) {
      object.init();
    }
    const scene = this.scene;
    const context = this.context;
    function update(): void {
      for (const update of scene.updates) {
        update(scene.currentFrame);
      }
      for (const object of scene.objects) {
        object.update(context!);
      }
      scene.currentFrame += 1;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);

    return this;
  }

  checkout(scene: Scene): Car {
    this.scene = scene;

    return this;
  }
}
