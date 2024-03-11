import { config } from "@newcar/utils";
import type { Canvas, CanvasKit, Paint, Surface } from "canvaskit-wasm";
import CanvasKitInit from "canvaskit-wasm";
import mitt from "mitt";

import type { Scene } from "./scene";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CarHookEventMap = {
  "before-frame-update": Car;
  "frame-updated": Car;
};

export class Car {
  private _playing!: boolean;
  private lastUpdateTime!: number;
  readonly canvasKitLoaded = CanvasKitInit({
    locateFile(_file) {
      return config.canvaskitWasmFile;
    },
  });

  canvaskit: CanvasKit;
  paint: Paint;
  surface: Surface;
  canvas: Canvas;
  events: {
    "ready-to-play": (() => any)[];
  } = {
    "ready-to-play": [],
  };

  readonly hook = mitt<CarHookEventMap>();
  #scene: Scene;

  constructor(public element: HTMLCanvasElement, scene: Scene) {
    this.#scene = scene;
    this.playing = false;
    this.canvasKitLoaded.then((canvaskit) => {
      this.canvaskit = canvaskit;
      this.surface = canvaskit.MakeWebGLCanvasSurface(this.element);
      this.canvas = this.surface.getCanvas();
      this.paint = new canvaskit.Paint();
      for (const callback of this.events["ready-to-play"]) {
        callback();
      }
    });
  }

  static update(car: Car, canvas: Canvas): void {
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

    for (const update of car.scene.updates) {
      update(car.scene.elapsed);
    }
    (function f(objects: typeof car.scene.objects) {
      for (const object of objects) {
        object.beforeUpdate(car);
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
        object.updated(car);
      }
    })(car.scene.objects);

    canvas.clear(car.canvaskit.BLACK);
    for (const object of car.scene.objects) {
      object.update(car.paint, canvas, car.canvaskit, car.element);
      for (const update of object.updates) {
        update(object, car.scene.elapsed);
      }
      object.updated(car);
    }

    car.hook.emit("frame-updated", car);

    if (car.playing) {
      car.surface.requestAnimationFrame((canvas: Canvas) =>
        Car.update(car, canvas),
      );
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

  on(event: "ready-to-play", callback: () => any): this {
    switch (event) {
      case "ready-to-play": {
        this.events[event].push(callback);
        break;
      }
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
      this.surface.requestAnimationFrame((canvas: Canvas) =>
        Car.update(this, canvas),
      );
    }
  }

  get scene(): Scene {
    return this.#scene;
  }

  set scene(value: Scene) {
    this.#scene = value;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const car = this;
    (function f(objects: typeof car.scene.objects) {
      for (const object of objects) {
        for (const setup of object.setups) {
          Promise.resolve().then(() => setup(object));
        }
      }
    })(car.scene.objects);
  }
}
