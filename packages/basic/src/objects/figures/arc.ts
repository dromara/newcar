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
  start?: number;
  end?: number;
}

/**
 * The arc object.
 */
export class Arc extends Figure implements ArcOption {
  radius: number;
  start: number;
  end: number;

  /**
   * @param radius The radius of the arc.
   * @param options The options of the object.
   * @see ArcOption
   */
  constructor(radius: number, options?: ArcOption) {
    super((options ??= {}));
    this.radius = radius;
    this.start = options.start ?? 0;
    this.end = options.end ?? 2 * Math.PI;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.borderWidth;
    context.beginPath();
    context.arc(0, 0, this.radius, this.start, this.end * this.progress);
    if (this.fillColor) {
      context.fillStyle = this.fillColor.toString();
      context.fill();
    }
    context.strokeStyle = this.borderColor.toString();
    context.stroke();
  }
}
