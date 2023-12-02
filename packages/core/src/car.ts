import type { Scene } from "./scene";

export class Car {
  #playing: boolean;
  private lastUpdateTime: number;
  readonly context: CanvasRenderingContext2D;

  constructor(public element: HTMLCanvasElement, public scene: Scene) {
    this.playing = false;
    this.element.style.backgroundColor = "black";
    this.context = this.element.getContext("2d")!;
  }

  static update(car: Car): void {
    const currentTimestamp = Date.now();
    const intervalTime = (currentTimestamp - car.lastUpdateTime) / 1000;
    car.lastUpdateTime = currentTimestamp;
    car.scene.elapsed += intervalTime;
    car.context.clearRect(0, 0, car.element.width, car.element.height);
    for (const update of car.scene.updates) {
      update(car.scene.elapsed);
    }
    for (const object of car.scene.objects) {
      for (const animation of object.animations) {
        animation.elapsed += intervalTime;
        if (animation.elapsed <= animation.duration) {
          animation.animate(
            object,
            animation.duration,
            animation.elapsed,
            animation.params,
          );
        }
      }
      object.update(car.context);
    }
    if (car.playing) {
      requestAnimationFrame(() => Car.update(car));
    }
  }

  init(): this {
    for (const object of this.scene.objects) {
      object.init();
    }

    return this;
  }

  play(): this {
    this.playing = true;

    return this;
  }

  stop(): this {
    this.playing = false;

    return this;
  }

  get playing(): boolean {
    return this.#playing;
  }

  set playing(playing: boolean) {
    this.#playing = playing;
    if (playing) {
      this.lastUpdateTime = Date.now();
      requestAnimationFrame(() => Car.update(this));
    }
  }
}
