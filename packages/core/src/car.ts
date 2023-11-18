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
    const element = this.element;
    function update(): void {
      context.clearRect(0, 0, element.width, element.height);
      for (const update of scene.updates) {
        update(scene.currentFrame);
      }
      for (const object of scene.objects) {
        for (const animation of object.animations) {
          if (animation.frameCount > animation.length) {
            break;
          }
          animation.frameCount += 1;
          animation.animate(object, animation.frameCount, animation.length, animation.params);
        }
        object.update(context);
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
