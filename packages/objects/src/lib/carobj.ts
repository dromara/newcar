import { IPositionedMut } from "../interfaces/Positioned";
import { IRotatedMut } from "../interfaces/Rotated";
import { IScaledMut } from "../interfaces/Scaled";

export class Carobj implements IPositionedMut, IRotatedMut, IScaledMut {
  display = true; // The Object is or isnot display.
  #x = 0;
  #y = 0;
  #rotation = 0;
  #scaleX = 1;
  #scaleY = 1;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  #liveAt: number = 1;
  #dieAt: null | number = null;
  /**
   * Get called on each frame.
   * @param ctx The context instance of the canvas object.
   */
  onDraw(ctx: CanvasRenderingContext2D) {
    return ctx;
  }

  /**
   * Actually get called on each frame. The difference to `onDraw()` is that `onDraw()` is used for inherited classes to implement their render while this will be actually called directly on each frame.
   * We will do some transformation on this frame.
   * @param ctx The context instance.
   */
  onUpdate(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.#x, this.#y);
    ctx.rotate(this.#rotation);
    ctx.scale(this.#scaleX, this.#scaleY);
    this.onDraw(ctx);
    ctx.restore();
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

  /**
   * Each Carobjs has different sighs.
   * @return The Carobj's type,one and only.
   */
  get sigh() {
    return "CarObject";
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

  setLiveTime(livetime: number, dietime: number | null) {
    this.#liveAt = livetime;
    this.#dieAt = dietime;
  }

  get liveFrame() {
    return this.#liveAt;
  }

  get dieFrame() {
    return this.#dieAt;
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
}
