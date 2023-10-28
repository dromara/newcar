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
    requestAnimationFrame(this.update);

    return this;
  }

  update(): void {
    for (const update of this.scene.updates) {
      update(this.scene.currentFrame);
    }
    for (const object of this.scene.objects) {
      object.update(this.context!);
    }
    this.scene.currentFrame += 1;
    requestAnimationFrame(this.update);
  }

  checkout(scene: Scene): Car {
    this.scene = scene;

    return this;
  }
}
