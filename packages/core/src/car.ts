import type { Scene } from "./scene";

export class Car {
  readonly context?: CanvasRenderingContext2D;

  constructor(public element: HTMLCanvasElement, public scene?: Scene) {
    this.context = this.element.getContext("2d") ?? undefined;
    this.element.style.backgroundColor = "black";
  }

  play(): this {
    if (this.context && this.scene) {
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
            animation.animate(
              object,
              animation.frameCount,
              animation.length,
              animation.params
            );
          }
          object.update(context);
        }
        scene.currentFrame += 1;
        requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    return this;
  }
}
