import type { Animate } from "../animations";
import type { TimingFunction } from "../timing-functions";
import { linear } from "../timing-functions";

interface Animation {
  animate: Animate;
  duration: number;
  elapsed: number;
  by: TimingFunction;
  params: Record<string, any>;
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
 * @param operation The operation of canva when rendering the object.
 * @see Carobj
 */
export interface CarobjOption {
  display?: boolean;
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  centerX?: number;
  centerY?: number;
  rotation?: number;
  transparency?: number;
  operation?: GlobalCompositeOperation;
  children?: Carobj[];
}

/**
 * The basic animation object of newcar.
 */
export class Carobj implements CarobjOption {
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
  #children: Carobj[] = [];
  parent?: Carobj;
  animations: Animation[] = [];

  /**
   * @param options The options for construct the object.
   * @see CarobjOption
   */
  constructor(options?: CarobjOption) {
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
    this.operation = options.operation ?? "source-over";
    options.children && this.add(...options.children);
  }

  /**
   * Drawing method, which will be called at each frame.
   * This method is used for inherited classes to implement their rendering.
   * @param context The context instance of the canvas object.
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  draw(context: CanvasRenderingContext2D, ...args: any[]): void {}

  /**
   * Update method, which will be called directly at each frame.
   * The method SHOULD NOT be modified,
   * instead, implement what you want to show in `draw()`.
   * @param context The context instance of the canvas object.
   * @see draw()
   */
  update(context: CanvasRenderingContext2D, ...args: any[]): void {
    if (!this.display) {
      return;
    }

    context.save();
    // Translate origin to the coordinate and set the rotation center.
    context.translate(this.x + this.centerX, this.y + this.centerY);
    context.rotate(this.rotation);
    // After rotation, restore to the coordinate.
    context.translate(-this.centerX, -this.centerY);
    context.scale(this.scaleX, this.scaleY);
    context.globalAlpha = this.transparency;
    context.globalCompositeOperation = this.operation;
    this.draw(context, ...args);
    for (const child of this.children) {
      child.update(context);
    }
    context.restore();
  }

  /**
   * Add children to the object.
   * @param children The children to add.
   */
  add(...children: Carobj[]): this {
    for (const child of children) {
      child.parent = this;
      this.#children.push(child);
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
    animate: Animate,
    duration: number,
    params: Record<string, any> & { by?: TimingFunction },
  ): this {
    this.animations.push({
      animate,
      duration,
      elapsed: 0,
      by: params.by ?? linear,
      params,
    });
    delete params.by;

    return this;
  }

  get children(): Carobj[] {
    return this.#children;
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
