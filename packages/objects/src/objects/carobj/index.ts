import type { carobject } from "./input_type";
import type { IPositionedMut, IRotatedMut, IScaledMut, ITransparencyMut } from "./interface";

export class Carobj implements IPositionedMut, IRotatedMut, IScaledMut, ITransparencyMut {
  display = true; // The Object is or isnot display.
  #x = 0;
  #y = 0;
  #rotation = 0;
  #scaleX = 1;
  #scaleY = 1;
  #children: Carobj[] = [];
  #operation: GlobalCompositeOperation = "source-over";
  #transparency: number;
  #parent: Carobj | null = null;

  constructor(datas: carobject) {
    this.#x = datas.x ?? 0;
    this.#y = datas.y ?? 0;
    typeof datas.scaleX !== "undefined" && (this.#scaleX = datas.scaleX!);
    typeof datas.scaleY !== "undefined" && (this.#scaleY = datas.scaleY!);
    typeof datas.display !== "undefined" && (this.display = datas.display!);
    typeof datas.rotation !== "undefined" && (this.#rotation = datas.rotation!);
    typeof datas.operation !== "undefined" && (this.#operation = datas.operation!);
    typeof datas.children !== "undefined" && (this.#children = datas.children!);
    this.#transparency = datas.transparency ?? 1;
    this.children.forEach((child) => {
      child.#parent = this;
    })
  }

  get transparency() {
    return this.#transparency;
  }

  set transparency(value: number) {
    this.#transparency = value;
  }


  /**
   * Run before the animation begin to play.
   */
  onSet(): void { }

  /**
   * Run it in each frame.
   * Use it to change the variable that need to be reset.
   */
  onAppend(): void { }

  /**
   * Get called on each frame.
   * @param ctx The context instance of the canvas object.
   */
  onDraw(ctx: CanvasRenderingContext2D, element?: HTMLElement) {
    return ctx;
  }

  /**
   * Actually get called on each frame. The difference to `onDraw()` is that `onDraw()` is used for inherited classes to implement their render while this will be actually called directly on each frame.
   * We will do some transformation on this frame.
   * @param ctx The context instance.
   */
  onUpdate(ctx: CanvasRenderingContext2D) {
    if (this.display === true) {
      this.onAppend();
      ctx.save();
      ctx.translate(this.x, this.y);
      // ctx.translate(this.#x, this.#y);
      ctx.rotate(this.#rotation);
      ctx.scale(this.#scaleX, this.#scaleY);
      ctx.globalAlpha = this.#transparency;
      ctx.globalCompositeOperation = this.#operation;
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

  get operation() {
    return this.#operation;
  }

  set operation(value: GlobalCompositeOperation) {
    this.#operation = value;
  }

  get parent() {
    return this.#parent;
  }

  set parent(value: Carobj) {
    this.#parent = value;
  }

  addChildren(...children: Carobj[]) {
    for (const child of children) {
      this.#children.push(child);
    }
    return this;
  }
}
