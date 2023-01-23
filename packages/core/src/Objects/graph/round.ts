import { Carobj } from "../index";

export class Round extends Carobj {
  #radius: number;

  constructor(x: number, y: number, radius: number) {
    super();
    this.#radius = radius;
    this.x = x;
    this.y = y;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.#radius, 0, 2 * Math.PI);
    ctx.stroke();
    return ctx;
  }
}
