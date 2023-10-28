import { Figure } from "./figure";
import type { FigureOption } from "./interfaces";

export interface RectangleOption extends FigureOption {
  lineJoin?: CanvasLineJoin;
}

/**
 * Circle options.
 * @param startAngle The start angle of the circle.
 * @param endAngle The end angle of the circle.
 * @see FigureOption
 * @see Circle
 */
export class Rectangle extends Figure {
  width: number;
  height: number;
  lineJoin: CanvasLineJoin;

  /**
   * Circle object.
   * @param radius The radius of the circle.
   * @param options The options of the circle.
   * @see CircleOption
   */
  constructor(width: number, height: number, options?: RectangleOption) {
    super((options ??= {}));
    this.width = width;
    this.height = height;
    this.lineJoin = options.lineJoin ?? "miter";
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.borderWidth;
    context.lineJoin = this.lineJoin;
    context.strokeStyle = this.borderColor.toString();
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
      context.fill();
    }
    context.beginPath();
    context.moveTo(-0.5 * this.width, -0.5 * this.height);
    context.lineTo(0.5 * this.width, -0.5 * this.height);
    context.lineTo(0.5 * this.width, 0.5 * this.height);
    context.lineTo(-0.5 * this.width, 0.5 * this.height);
    context.closePath();
    context.stroke();
  }
}
