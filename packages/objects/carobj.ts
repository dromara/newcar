import type { Positional, Rotatable, Scalable, Transparent } from "./interface";

export interface CarobjOption {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  children?: Carobj[];
  operation?: GlobalCompositeOperation;
  display?: boolean;
  rotation?: number;
  transparency?: number;
  centerX?: number;
  centerY?: number;
}

export class Carobj implements Positional, Rotatable, Scalable, Transparent {
  display: boolean;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  centerX: number;
  centerY: number;
  readonly children: Carobj[] = [];
  operation: GlobalCompositeOperation;
  transparency: number;
  parent?: Carobj;

  constructor(options?: CarobjOption) {
    options ??= {};
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.scaleX = options.scaleX ?? 1;
    this.scaleY = options.scaleY ?? 1;
    this.display = options.display ?? true;
    this.rotation = options.rotation ?? 0;
    options.children && this.addChildren(...options.children);
    this.operation = options.operation ?? "source-over";
    this.centerX = options.centerX ?? 0;
    this.centerY = options.centerY ?? 0;
    this.transparency = options.transparency ?? 1;
  }

  /**
   * Initialize this object.
   */
  init(): void {}

  /**
   * The method to be called at each frame,
   * whith is used for inherited classes to implement their rendering.
   * @param context The context instance of the canvas object.
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  draw(context: CanvasRenderingContext2D): void {}

  /**
   * The real method to be called directly at each frame.
   * We will do some transforms here so you SHOULD NOT modify this method,
   * instead, implement what you want to show in `draw()`.
   * @param context The context instance.
   * @see draw()
   */
  update(context: CanvasRenderingContext2D): void {
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
    this.draw(context);
    for (const child of this.children) {
      child.update(context);
    }
    context.restore();
  }

  /**
   * Hide this object.
   */
  hide(): void {
    this.display = false;
  }

  /**
   * Show this object.
   */
  show(): void {
    this.display = true;
  }

  /**
   * Add children to this object.
   * @param children The children to add.
   */
  addChildren(...children: Carobj[]): this {
    for (const child of children) {
      child.parent = this;
      this.children.push(child);
    }

    return this;
  }
}
