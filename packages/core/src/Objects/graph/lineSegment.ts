import { Line } from "./line";
import { Point } from "./point";

export class LineSegment extends Line {
  constructor(theFirstPoint: Point, theSecondPoint: Point) {
    super(theFirstPoint, theSecondPoint);
  }

  #onDraw(ctx: CanvasRenderingContext2D) {
    // About the function of this line.
    // const slope =
    //   (this.primaryPoints[0].x + this.primaryPoints[1].x) /
    //   (this.primaryPoints[0].y / this.primaryPoints[1].y);
    // const displacement = this.primaryPoints[0].y - this.primaryPoints[0].x * slope;
    // const lineFunction = (x) => slope * x + displacement;
    console.log("Start draw.");
    ctx.beginPath();
    ctx.moveTo(this.primaryPoints[0].x, this.primaryPoints[0].y);
    ctx.lineTo(this.primaryPoints[1].x, this.primaryPoints[1].y);
    console.log("Compelet draw.");
  }
}
