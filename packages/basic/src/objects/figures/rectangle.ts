import type { FigureOption } from "./figure";
import { Figure } from "./figure";

/**
 * The rectangle options.
 * @param lineJoin The line join style of the rectangle.
 * @see FigureOption
 * @see Rectangle
 */
export interface RectangleOption extends FigureOption {
  lineJoin?: CanvasLineJoin;
}

/**
 * The rectangle object.
 */
export class Rectangle extends Figure implements RectangleOption {
  width: number;
  height: number;
  lineJoin: CanvasLineJoin;

  /**
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   * @param options The options of the object.
   * @see RectangleOption
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
