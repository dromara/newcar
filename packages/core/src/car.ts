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
    function update(car: Car): void {
      car.context!.clearRect(0, 0, car.element.width, car.element.height);
      for (const update of car.scene.updates) {
        update(car.scene.currentFrame);
      }
      for (const object of car.scene.objects) {
        for (const animation of object.animations) {
          if (animation.frameCount > animation.length) {
            break;
          }
          animation.frameCount += 1;
          animation.animate(object, animation.frameCount, animation.length, animation.params);
        }
        object.update(car.context!);
      }
      car.scene.currentFrame += 1;
      requestAnimationFrame(() => {
        update(car);
      });
    }
    requestAnimationFrame(() => {
      update(this);
    });

    return this;
  }

  checkout(scene: Scene): Car {
    this.scene = scene;
    this.play();

    return this;
  }
}
