/**
 * Carobj options.
 * @param display Whether or not this object should be rendered.
 * @param x The x coordinate of this object based on parent object.
 * @param y The y coordinate of this object based on parent object.
 * @param scaleX The Scale in the x direction.
 * @param scaleY The Scale in the y direction.
 * @param centerX The Center of rotation in the x direction.
 * @param centerY The Center of rotation in the y direction.
 * @param rotation The rotation angle of this object in radians.
 * @param transparency The transparency of this object t from 0 to 1.
 * @param operation The operation of canva when rendering this object.
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

export class Carobj {
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
  #children: Carobj[];
  parent?: Carobj;

  /**
   * Base object.
   * @param options The options of the object.
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
    options.children && this.addChildren(...options.children);
  }

  /* Initialize method, which will be called before the animation starts. */
  init(): void {}

  /**
   * Drawing method, which will be called at each frame.
   * This method is used for inherited classes to implement their rendering.
   * @param context The context instance of the canvas object.
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  draw(context: CanvasRenderingContext2D): void {}

  /**
   * Update method, which will be called directly at each frame.
   * The method SHOULD NOT be modified,
   * instead, implement what you want to show in `draw()`.
   * @param context The context instance of the canvas object.
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
    for (const child of this.#children) {
      child.update(context);
    }
    context.restore();
  }

  /**
   * Add children to the object.
   * @param children The children to add.
   */
  addChildren(...children: Carobj[]): this {
    for (const child of children) {
      child.parent = this;
      this.#children.push(child);
    }

    return this;
  }
}
