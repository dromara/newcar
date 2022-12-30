import { Carobj } from "../index";
import { Point } from "./point";

export class Line extends Carobj {
  #point1: number[] | Point;
  #point2: number[] | Point;

  constructor(theFirstPoint: number[] | Point, theSecondPoint: number[] | Point) {
    super();
    this.#point1 = theFirstPoint;
    this.#point2 = theSecondPoint;
  }

  #draway(ctx: CanvasRenderingContext2D) {
    // ......
  }
}
