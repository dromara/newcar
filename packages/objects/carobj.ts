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
  draw(ctx: CanvasRenderingContext2D): void {}

  /**
   * The real method to be called directly at each frame.
   * We will do some transforms here so you SHOULD NOT modify this method,
   * instead, implement what you want to show in `draw()`.
   * @param context The context instance.
   * @see draw()
   */
  update(ctx: CanvasRenderingContext2D): void {
    if (!this.display) {
      return;
    }

    ctx.save();
    // Translate origin to the coordinate and set the rotation center.
    ctx.translate(this.x + this.centerX, this.y + this.centerY);
    ctx.rotate(this.rotation);
    // After rotation, restore to the coordinate.
    ctx.translate(-this.centerX, -this.centerY);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.globalAlpha = this.transparency;
    ctx.globalCompositeOperation = this.operation;
    this.draw(ctx);
    for (const child of this.children) {
      child.update(ctx);
    }
    ctx.restore();
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
