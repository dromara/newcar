import { Line } from "./line";
import { Point } from "./point";

export class LineSegment extends Line {
  constructor(theFirstPoint: number[] | Point, theSecondPoint: number[] | Point) {
    super(theFirstPoint, theSecondPoint);
  }

  #draway(ctx: CanvasRenderingContext2D) {
    // ......
  }
}
