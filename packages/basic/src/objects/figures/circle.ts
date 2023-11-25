import type { FigureOption } from "./figure";
import { Figure } from "./figure";

/**
 * The circle options.
 * @param from The start angle of the circle.
 * @param to The end angle of the circle.
 * @see FigureOption
 * @see Circle
 */
export interface CircleOption extends FigureOption {
  from?: number;
  to?: number;
}

/**
 * The circle object.
 */
export class Circle extends Figure implements CircleOption {
  radius: number;
  from: number;
  to: number;

  /**
   * @param radius The radius of the circle.
   * @param options The options of the object.
   * @see CircleOption
   */
  constructor(radius: number, options?: CircleOption) {
    super((options ??= {}));
    this.radius = radius;
    this.from = options.from ?? 0;
    this.to = options.to ?? 2 * Math.PI;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.borderWidth;
    context.beginPath();
    context.arc(0, 0, this.radius, this.from, this.to);
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
      context.fill();
    }
    context.strokeStyle = this.borderColor.toString();
    context.stroke();
  }
}
