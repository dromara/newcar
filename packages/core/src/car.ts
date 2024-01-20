import { config } from "@newcar/utils";
import mitt from "mitt";

import type { Scene } from "./scene";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CarHookEventMap = {
  "before-frame-update": Car;
  "frame-updated": Car;
};

export class Car extends EventTarget {
  private _playing: boolean;
  private lastUpdateTime: number;
  readonly context: CanvasRenderingContext2D;
  readonly hook = mitt<CarHookEventMap>();

  constructor(public element: HTMLCanvasElement, public scene: Scene) {
    super();
    this.playing = false;
    this.element.style.backgroundColor = "black";
    this.context = this.element.getContext("2d")!;
  }

  static update(car: Car): void {
    car.hook.emit("before-frame-update", car);

    let elapsed: number;
    switch (config.timing) {
      case "frame": {
        elapsed = 1;
        break;
      }
      case "second": {
        const currentTimestamp = performance.now();
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
    (function f(objects: typeof car.scene.objects) {
      for (const object of objects) {
        for (const animation of object.animations) {
          if (animation.elapsed <= animation.duration) {
            animation.elapsed += elapsed;
            animation.animate(
              object,
              animation.elapsed / animation.duration,
              animation.by,
              animation.params ?? {},
            );
          }
        }
        f(object.children);
      }
    })(car.scene.objects);
    for (const object of car.scene.objects) {
      object.update(car.context);
      object.updated(car);
    }

    car.hook.emit("frame-updated", car);

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
    return this._playing;
  }

  set playing(playing: boolean) {
    this._playing = playing;
    if (playing) {
      this.lastUpdateTime = performance.now();
      requestAnimationFrame(() => Car.update(this));
    }
  }
}
