import { config } from "@newcar/utils";

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
    let elapsed: number;
    switch (config.timing) {
      case "frame": {
        elapsed = 1;
        break;
      }
      case "second": {
        const currentTimestamp = Date.now();
        const intervalTime = (currentTimestamp - car.lastUpdateTime) / 1000;
        car.lastUpdateTime = currentTimestamp;
        elapsed = intervalTime;
        break;
      }
    }
    car.scene.elapsed += elapsed;
    car.context.clearRect(0, 0, car.element.width, car.element.height);
    for (const update of car.scene.updates) {
      update(car.scene.elapsed);
    }
    for (const object of car.scene.objects) {
      for (const animation of object.animations) {
        if (animation.elapsed <= animation.duration) {
          animation.elapsed += elapsed;
          animation.animate(
            object,
            animation.elapsed / animation.duration,
            animation.by,
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

  play(at?: number): this {
    this.playing = true;
    if (typeof at !== "undefined") {
      this.scene.elapsed = at;
    }

    return this;
  }

  stop(at?: number): this {
    this.playing = false;
    if (typeof at !== "undefined") {
      this.scene.elapsed = at;
    }

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
