import type { CanvasKit } from 'canvaskit-wasm'
import { deepMerge } from '@newcar/utils'
import type { Vector2 } from '../../utils/vector2'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'
import { Polygon } from './polygon'
import { Line } from './line'

/**
 * Calculates the rotation angle for an arrow based on the line's start and end points,
 * with the angle expressed in degrees. The angle is calculated with respect
 * to the horizontal axis pointing to the right.
 *
 * @param startPoint The starting point of the line.
 * @param endPoint The ending point of the line.
 * @returns The rotation angle in degrees, where 0 degrees points to the right (east),
 * and positive angles are measured clockwise.
 */
function calculateArrowRotationAngle(
  startPoint: Vector2,
  endPoint: Vector2,
): number {
  // Calculate the differences in the x and y coordinates
  const dx = endPoint[0] - startPoint[0]
  const dy = endPoint[1] - startPoint[1]

  // Calculate the angle in radians using Math.atan2(dy, dx)
  const angleRadians = Math.atan2(dy, dx)

  // Convert the angle to degrees
  let angleDegrees = angleRadians * (180 / Math.PI)

  // Normalize the angle to the range [0, 360)
  if (angleDegrees < 0)
    angleDegrees += 360

  return angleDegrees
}

export interface ArrowOptions extends FigureOptions {
  style?: ArrowStyle
}

export interface ArrowStyle extends FigureStyle {}

export class Arrow extends Figure {
  private tip: Polygon
  private trim: Line
  radian: number

  constructor(
    public from: Vector2,
    public to: Vector2,
    options?: ArrowOptions,
  ) {
    options ??= {}
    super(options)
    this.radian = calculateArrowRotationAngle(this.from, this.to)
    this.tip = new Polygon(
      [
        [0, 10],
        [22, 0],
        [0, -10],
      ],
      {
        x: this.to[0],
        y: this.to[1],
        style: {
          scaleX: this.from[0] > this.to[0] ? -1 : 1,
          scaleY: this.from[1] > this.to[1] ? -1 : 1,
          rotation: this.radian,
          ...this.style,
        },
        progress: this.progress,
      },
    )
    this.trim = new Line(this.from, this.to, {
      style: deepMerge({
        color: this.style.borderColor,
        width: this.style.borderWidth,
      }, this.style),
      progress: this.progress,
    })
    this.add(this.trim, this.tip)
    // WARN: Must push parts in constructor, if not, it will err
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'from':
      case 'to': {
        this.radian = calculateArrowRotationAngle(this.from, this.to)

        this.tip.style.rotation = this.radian
        this.trim.from = this.from
        this.trim.to = this.to
        break
      }
      case 'progress': {
        this.tip.progress = this.progress
        this.trim.progress = this.progress
        break
      }
      case 'style.transparency': {
        this.tip.style.transparency = this.style.transparency
        this.trim.style.transparency = this.style.transparency
        break
      }
      case 'style.offset':
      case 'style.interval': {
        this.tip.style.offset = this.style.offset
        this.tip.style.interval = this.style.interval
      }
    }
  }

  isIn(x: number, y: number): boolean {
    const dx = x - this.tip.x;
    const dy = y - this.tip.y;

    const rotatedX = dx * Math.cos(this.tip.style.rotation) - dy * Math.sin(this.tip.style.rotation);
    const rotatedY = dx * Math.sin(this.tip.style.rotation) + dy * Math.cos(this.tip.style.rotation);

    return this.tip.isIn(rotatedX, rotatedY) || this.trim.isIn(x, y);
}
}
