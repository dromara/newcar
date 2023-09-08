/* eslint-disable unicorn/no-array-for-each */
import type { carobject } from "./input_type";
import type { IPositionedMut, IRotatedMut, IScaledMut, ITransparencyMut } from "./interface";

export class Carobj implements IPositionedMut, IRotatedMut, IScaledMut, ITransparencyMut {
  display = true; // The Object is or isnot display.
  #x = 0;
  #y = 0;
  #rotation = 0;
  #scaleX = 1;
  #scaleY = 1;
  #centerX: number;
  #centerY: number;
  #children: Carobj[] = [];
  #transparency: number;
  #parent: Carobj | null = null;

  constructor(data?: carobject) {
    data = data ?? {};
    this.#x = data.x ?? 0;
    this.#y = data.y ?? 0;
    typeof data.scaleX !== "undefined" && (this.#scaleX = data.scaleX!);
    typeof data.scaleY !== "undefined" && (this.#scaleY = data.scaleY!);
    typeof data.display !== "undefined" && (this.display = data.display!);
    typeof data.rotation !== "undefined" && (this.#rotation = data.rotation!);
    typeof data.children !== "undefined" && (this.#children = data.children!);
    this.#centerX = data.centerX ?? 0;
    this.#centerY = data.centerY ?? 0;
    this.#transparency = data.transparency ?? 1;
    this.children.forEach((child) => {
      child.#parent = this;
    });
  }

  /**
   * Run before the animation begin to play.
   */
  onSet(): void {}

  /**
   * Run it in each frame.
   * Use it to change the variable that need to be reset.
   */
  onModify(): void {}

  /**
   * Get called on each frame.
   * @param ctx The context instance of the canvas object.
   * @param element The DOM of <canvas>.
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  onDraw(ctx: CanvasRenderingContext2D, element?: HTMLElement) {
    return ctx;
  }

  /**
   * Get called before translate on each frame.
   * @param ctx The context instance of the canvas object.
   * @param element The dom of <canvas>
   */
  beforeTranslate(ctx: CanvasRenderingContext2D, element?: HTMLElement) {
    return ctx;
  }

  /**
   * Actually get called on each frame. The difference to `onDraw()` is that `onDraw()` is used for inherited classes to implement their render while this will be actually called directly on each frame.
   * We will do some transformation on this frame.
   * @param ctx The context instance.
   */
  onUpdate(ctx: CanvasRenderingContext2D) {
    if (this.display === true) {
      this.onModify();
      ctx.save();
      // Translate origin to the coordinate。
      ctx.translate(this.x, this.y);
      // Set the rotation center.
      ctx.translate(this.#centerX, this.#centerY);
      ctx.rotate(this.#rotation);
      // After rotation, restore to the coordinate.
      ctx.translate(-this.#centerX, -this.#centerY);
      ctx.scale(this.#scaleX, this.#scaleY);
      ctx.globalAlpha = this.#transparency;
      this.onDraw(ctx);
      for (const child of this.#children) {
        child.onUpdate(ctx);
      }
      ctx.restore();
    }
  }

  /**
   * Set the display to false.
   */
  hide() {
    this.display = false;
  }

  /**
   * Set the display to true.
   */
  appear() {
    this.display = true;
  }

  get children() {
    return this.#children;
  }

  get x() {
    return this.#x;
  }

  set x(value: number) {
    this.#x = value;
  }

  get y() {
    return this.#y;
  }

  set y(value: number) {
    this.#y = value;
  }

  set scaleX(value: number) {
    this.#scaleX = value;
  }

  get scaleX(): number {
    return this.#scaleX;
  }

  set scaleY(value: number) {
    this.#scaleY = value;
  }

  get scaleY(): number {
    return this.#scaleY;
  }

  /**
   * Return the rotation of the component, in radians.
   */
  get rotation() {
    return this.#rotation;
  }

  /**
   * Set the rotation of the component. Remember, the value is in radians (which 2*pi == 360deg).
   */
  set rotation(value: number) {
    this.#rotation = value;
  }

  get parent() {
    return this.#parent!;
  }

  set parent(value: Carobj) {
    this.#parent = value;
  }

  get transparency() {
    return this.#transparency;
  }

  set transparency(value: number) {
    this.#transparency = value;
  }

  get centerX() {
    return this.#centerX;
  }

  set centerX(value: number) {
    this.#centerX = value;
  }

  get centerY() {
    return this.#centerY;
  }

  set centerY(value: number) {
    this.#centerY = value;
  }

  addChildren(...children: Carobj[]) {
    for (const child of children) {
      this.#children.push(child);
      child.parent = this;
    }

    return this;
  }
}
