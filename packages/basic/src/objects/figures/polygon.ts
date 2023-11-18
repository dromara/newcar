import type { FigureOption } from "./figure";
import { Figure } from "./figure";
import type { Point } from "./line";

/**
 * The polygon options.
 * @param lineCap The line cap style of the polygon.
 * @param lineJoin The line join style of the polygon.
 * @see FigureOption
 * @see Polygon
 */
export interface PolygonOption extends FigureOption {
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;
}

/**
 * The polygon object.
 */
export class Polygon extends Figure implements PolygonOption {
  points: Point[];
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;

  /**
   * @param points The points of the polygon.
   * @param options The options of the object.
   * @see PolygonOption
   */
  constructor(points: Point[], options?: PolygonOption) {
    super((options ??= {}));
    this.points = points;
    this.lineCap = options.lineCap ?? "butt";
    this.lineJoin = options.lineJoin ?? "miter";
  }

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.borderColor.toString();
    context.lineWidth = this.borderWidth;
    context.lineCap = this.lineCap;
    context.lineJoin = this.lineJoin;
    context.beginPath();
    for (const [index, point] of this.points.entries()) {
      (index ? context.lineTo : context.moveTo)(...point);
    }
    context.closePath();
    context.stroke();
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
      context.fill();
    }
  }
}
