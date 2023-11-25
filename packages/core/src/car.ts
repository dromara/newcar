import type { Scene } from "./scene";

export class Car {
  readonly context?: CanvasRenderingContext2D;

  constructor(public element: HTMLCanvasElement, public scene?: Scene) {
    this.context = this.element.getContext("2d") ?? undefined;
    this.element.style.backgroundColor = "black";
  }

  static update(car: Car): void {
    if (car.context && car.scene) {
      car.context.clearRect(0, 0, car.element.width, car.element.height);
      for (const update of car.scene.updates) {
        update(car.scene.currentFrame);
      }
      for (const object of car.scene.objects) {
        for (const animation of object.animations) {
          if (animation.frameCount > animation.length) {
            break;
          }
          animation.frameCount += 1;
          animation.animate(
            object,
            animation.frameCount,
            animation.length,
            animation.params,
          );
        }
        object.update(car.context);
      }
      car.scene.currentFrame += 1;
      requestAnimationFrame(() => {
        Car.update(car);
      });
    }
  }

  play(): this {
    if (this.context && this.scene) {
      for (const object of this.scene.objects) {
        object.init();
      }
      requestAnimationFrame(() => {
        Car.update(this);
      });
    }

    return this;
  }

  checkout(scene: Scene): Car {
    this.scene = scene;

    return this;
  }
}
