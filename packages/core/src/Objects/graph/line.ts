import { Carobj } from "../index";
import { type Point } from "./point";

export class Line extends Carobj {
  #point1: Point;
  #point2: Point;

  constructor(theFirstPoint: Point, theSecondPoint: Point) {
    super();
    this.#point1 = theFirstPoint;
    this.#point2 = theSecondPoint;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    // ......
    return ctx;
  }

  get primaryPoints() {
    return [this.#point1, this.#point2];
  }

  set startX(value: number) {
    this.#point1.x = value;
  }

  set startY(value: number) {
    this.#point1.y = value;
  }

  set endX(value: number) {
    this.#point2.x = value;
  }

  set endY(value: number) {
    this.#point2.y = value;
  }
}
