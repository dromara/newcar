import type { FigureOption } from "./figure";
import { Figure } from "./figure";

/**
 * The arc options.
 * @param from The start angle of the arc.
 * @param to The end angle of the arc.
 * @see FigureOption
 * @see Arc
 */
export interface ArcOption extends FigureOption {
  from?: number;
  to?: number;
}

/**
 * The arc object.
 */
export class Arc extends Figure implements ArcOption {
  radius: number;
  from: number;
  to: number;

  /**
   * @param radius The radius of the arc.
   * @param options The options of the object.
   * @see ArcOption
   */
  constructor(radius: number, options?: ArcOption) {
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
