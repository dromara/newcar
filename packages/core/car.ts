import type { Scene } from "./scene";

export class Car {
  readonly element: HTMLCanvasElement;
  readonly context?: CanvasRenderingContext2D;
  scene: Scene;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.context = this.element.getContext("2d") ?? undefined;
  }

  play(): void {
    if (!this.context) {
      return;
    }

    const scene = this.scene;
    const context = this.context;
    for (const object of scene.objects) {
      object.init();
    }

    function update() {
      for (const update of scene.updates) {
        update(scene.currentFrame);
      }
      for (const object of scene.objects) {
        object.update(context);
      }
      scene.currentFrame += 1;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
}
