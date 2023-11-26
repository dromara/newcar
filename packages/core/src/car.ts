import type { Scene } from "./scene";

export class Car {
  readonly context: CanvasRenderingContext2D;

  constructor(public element: HTMLCanvasElement, public scene: Scene) {
    this.context = this.element.getContext("2d")!;
    this.element.style.backgroundColor = "black";
  }

  static update(car: Car): void {
    car.context.clearRect(0, 0, car.element.width, car.element.height);
    for (const update of car.scene.updates) {
      update(car.scene.currentFrame);
    }
    car.scene.currentFrame += 1;
    for (const object of car.scene.objects) {
      for (const animation of object.animations) {
        if (animation.frameCount <= animation.length) {
          animation.animate(
            object,
            (animation.frameCount += 1),
            animation.length,
            animation.params,
          );
        }
      }
      object.update(car.context);
    }
    requestAnimationFrame(() => Car.update(car));
  }

  play(): this {
    if (this.context && this.scene) {
      for (const object of this.scene.objects) {
        object.init();
      }
      requestAnimationFrame(() => Car.update(this));
    }

    return this;
  }

  checkout(scene: Scene): this {
    this.scene = scene;
    this.play();

    return this;
  }
}
