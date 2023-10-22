import type { Scene } from "./scene";

export class Car {
  readonly element: HTMLCanvasElement;
  readonly ctx?: CanvasRenderingContext2D;
  scene: Scene;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = this.element.getContext("2d") ?? undefined;
  }

  play(): void {
    if (!this.ctx) {
      return;
    }

    const scene = this.scene;
    const ctx = this.ctx;
    for (const object of scene.objects) {
      object.init();
    }

    function update() {
      for (const update of scene.updates) {
        update(scene.currentFrame);
      }
      for (const object of scene.objects) {
        object.update(ctx);
      }
      scene.currentFrame += 1;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
}
