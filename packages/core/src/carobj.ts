/* eslint-disable unused-imports/no-unused-vars */
import type { Canvas, CanvasKit, Paint } from "canvaskit-wasm";

import type { Car } from "./car";

export const linear: TimingFunction = (x: number) => x;

/**
 * A continuous function that passes through points (0,0) and (1,1).
 * @param x The independent variable from 0 to 1.
 * @returns The dependent variable of x.
 */
export type TimingFunction = (x: number) => number;

/**
 * A functional animation.
 * @param object The Animated object.
 * @param process The process of the animation.
 * @param params Other parameters of the animation.
 */
export type AnimateFunction = (
  object: CarObject,
  process: number,
  by: TimingFunction,
  params?: Record<string, any>,
) => void;

export type Setup = <T extends CarObject>(object: T) => Promise<void>;

interface Animation {
  animate: AnimateFunction;
  duration: number;
  elapsed: number;
  by: TimingFunction;
  params?: Record<string, any>;
}

/**
 * The carobj options.
 * @param display Whether or not the object should be rendered.
 * @param x The x coordinate of the object based on parent object.
 * @param y The y coordinate of the object based on parent object.
 * @param scaleX The horizontal scale size.
 * @param scaleY The vertical scale size.
 * @param centerX The x coordinate of the center of rotation.
 * @param centerX The y coordinate of the center of rotation.
 * @param rotation The rotation angle of the object in radians.
 * @param transparency The transparency of the object from 0 to 1.
 * @param progress The progress of rendering.
 * @see CarObject
 */
export interface CarObjectOption {
  display?: boolean;
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  centerX?: number;
  centerY?: number;
  rotation?: number;
  transparency?: number;
  children?: CarObject[];
  progress?: number;
}

/**
 * The basic animation object of newcar.
 */
export class CarObject implements CarObjectOption {
  display: boolean;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  centerX: number;
  centerY: number;
  rotation: number;
  transparency: number;
  operation: GlobalCompositeOperation;
  children: CarObject[] = [];
  parent?: CarObject;
  animations: Animation[] = [];
  progress: number;
  data: Record<string, any> = {};
  setups: Setup[] = [];

  /**
   * @param options The options for construct the object.
   * @see CarObjectOption
   */
  constructor(options?: CarObjectOption) {
    options ??= {};
    this.display = options.display ?? true;
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.scaleX = options.scaleX ?? 1;
    this.scaleY = options.scaleY ?? 1;
    this.centerX = options.centerX ?? 0;
    this.centerY = options.centerY ?? 0;
    this.rotation = options.rotation ?? 0;
    this.transparency = options.transparency ?? 1;
    this.progress = options.progress ?? 1;
    options.children && this.add(...options.children);
  }

  /**
   * Drawing method, which will be called at each frame.
   * This method is used for inherited classes to implement their rendering.
   * @param paint The Paint Object of CanvasKit-WASM.
   * @param canvas The Canvas Object of CanvasKit-WASM.
   * @param canvaskit The CanvasKit Object of CanvasKit-WASM.
   * @param element The element of canvas.
   * @param args The other parameters.
   */
  draw(
    paint: Paint,
    canvas: Canvas,
    canvaskit: CanvasKit,
    element: HTMLCanvasElement,
    ...args: any[]
  ): void {}

  beforeUpdate(car: Car): void {}

  updated(car: Car): void {}

  /**
   * Update method, which will be called directly at each frame.
   * The method SHOULD NOT be modified,
   * instead, implement what you want to show in `draw()`.
   * @see draw()
   */
  update(
    paint: Paint,
    canvas: Canvas,
    canvaskit: CanvasKit,
    element: HTMLCanvasElement,
    ...args: any[]
  ): void {
    if (!this.display) {
      return;
    }
    canvas.save();
    canvas.translate(this.x, this.y);
    canvas.rotate(this.rotation, this.centerX, this.centerY);
    canvas.scale(this.scaleX, this.scaleY);
    paint.setAlphaf(this.transparency);
    paint.setColor(canvaskit.WHITE);
    this.draw(paint, canvas, canvaskit, element, ...args);
    for (const child of this.children) {
      child.update(paint, canvas, canvaskit, element);
    }
    canvas.restore();
  }

  /**
   * Add children to the object.
   * @param children The children to add.
   */
  add(...children: CarObject[]): this {
    for (const child of children) {
      child.parent = this;
      this.children.push(child);
    }

    return this;
  }

  /**
   * Bind an animation to the object.
   * @param animation The animation function.
   * @param length The length of the animation.
   * @param params The other parameters of this animation.
   */
  animate(
    animate: AnimateFunction,
    duration: number,
    params?: Record<string, any> & { by?: TimingFunction },
  ): this {
    this.animations.push({
      animate,
      duration,
      elapsed: 0,
      by: typeof params === "undefined" ? linear : params.by ?? linear,
      params,
    });
    // delete params.by;

    return this;
  }

  setup(callback: Setup): this {
    this.setups.push(callback);

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  provide(key: string, value: any): this {
    this.data[key] = value;

    return this;
  }

  inject(key: string): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let current: CarObject | undefined = this;
    while (current) {
      if (key in current.data) {
        return current.data[key];
      }
      current = current.parent;
    }

    return undefined;
  }

  get scale(): [number, number] {
    return [this.scaleX, this.scaleY];
  }

  set scale(scale: number | [number, number]) {
    if (Array.isArray(scale)) {
      [this.scaleX, this.scaleY] = scale;
    } else {
      this.scaleX = this.scaleY = scale;
    }
  }

  get center(): [number, number] {
    return [this.centerX, this.centerY];
  }

  set center(center: [number, number]) {
    [this.centerX, this.centerY] = center;
  }
}
