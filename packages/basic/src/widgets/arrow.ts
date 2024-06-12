import type { CanvasKit } from 'canvaskit-wasm'
import type { Reactive, Ref } from '@newcar/core'
import { changed, reactive, ref } from '@newcar/core'
import type { Vector2 } from '../utils/vector2'
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

/**
 * Represents options that can be applied to an arrow figure.
 */
export interface ArrowOptions extends FigureOptions {
  style?: ArrowStyle
}

/**
 * Represents the style properties that can be applied to an arrow figure.
 */
export interface ArrowStyle extends FigureStyle {}

/**
 * Represents an arrow figure, a subclass of the Figure class.
 */
export class Arrow extends Figure {
  private tip: Polygon
  private trim: Line
  radian: Ref<number>
  from: Reactive<Vector2>
  to: Reactive<Vector2>

  /**
   * Constructs a new Arrow instance.
   * @param from The starting point of the arrow.
   * @param to The ending point of the arrow.
   * @param options Optional configuration options for the arrow.
   */
  constructor(
    from: Vector2,
    to: Vector2,
    options?: ArrowOptions,
  ) {
    options ??= {}
    super(options)
    this.from = reactive(from)
    this.to = reactive(to)
    this.radian = ref(calculateArrowRotationAngle(this.from, this.to))
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
          rotation: this.radian.value,
          ...options.style,
        },
        progress: this.progress.value,
      },
    )
    this.trim = new Line(this.from, this.to, {
      style:
        {
          color: this.style.borderColor,
          width: this.style.borderWidth.value,
          ...options.style,
        },
      progress: this.progress.value,
    })
    this.add(this.trim, this.tip)
    // WARN: Must push parts in constructor, if not, it will err
  }

  init(_ck: CanvasKit) {
    changed(this.from, (from) => {
      this.radian.value = calculateArrowRotationAngle(from, this.to)

      this.tip.style.rotation = this.radian
      this.trim.from = from
    })

    changed(this.to, (to) => {
      this.radian.value = calculateArrowRotationAngle(this.from, to)

      this.tip.style.rotation = this.radian
      this.trim.to = to
    })

    changed(this.progress, (progress) => {
      this.tip.progress = progress
      this.trim.progress = progress
    })

    changed(this.style.transparency, (transparency) => {
      this.tip.style.transparency = transparency
      this.trim.style.transparency = transparency
    })

    changed(this.style.offset, (offset) => {
      this.tip.style.offset.value = offset.value
    })

    changed(this.style.interval, (interval) => {
      this.tip.style.interval = interval
    })
  }
}
