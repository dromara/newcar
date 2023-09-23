import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";

export class Polygon extends Carobj {
  #points: Carobj[];

  constructor(points: Carobj[], data?: carobject) {
    data = data ?? {};
    super(data);
    this.#points = points;
  }

  onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    super.onDraw(ctx);

    return ctx;
  }

  get points() {
    return this.#points;
  }

  set points(value: Carobj[]) {
    this.#points = value;
  }
}
