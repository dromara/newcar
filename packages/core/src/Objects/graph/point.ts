import { Carobj } from "../index";

export class Point extends Carobj {
  #name: string; // The name of the point.
  #displayPoint: boolean; // Is or not is displaying the name of the point.
  #displayName: boolean; // Is or not is displaying the point.
  #pointRadius: number; // The radius of the point,the default is 0.5px.

  constructor(
    x: number,
    y: number,
    name?: string,
    displayPoint?: boolean,
    pointRadius?: number,
    displayName?: boolean
  ) {
    super();
    this.x = x;
    this.y = y;
    this.#name = name!;
    if (typeof displayPoint === "undefined") this.#displayPoint = false;
    else this.#displayPoint = displayPoint!;
    if (typeof displayName === "undefined") this.#displayName = false;
    else this.#displayName = displayName!;
    if (typeof pointRadius === "undefined") this.#pointRadius = 1;
    else this.#pointRadius = pointRadius!;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    if (this.#displayPoint) {
      ctx.arc(this.x, this.y, this.#pointRadius, 0, 2 * Math.PI);
    }
    if (this.#displayName) {
      // TODO: display the name of point.
    }
    return ctx;
  }

  displayPoint() {
    this.#displayPoint = true;
  }

  hidePoint() {
    this.#displayPoint = false;
  }

  displayName() {
    this.#displayName = true;
  }

  hideName() {
    this.#displayName = false;
  }

  get name() {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get pointRadius() {
    return this.#pointRadius;
  }

  set pointRadius(value: number) {
    this.#pointRadius = value;
  }
}
