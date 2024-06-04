import { changed, def, defineWidgetBuilder } from '@newcar/core'
import { deepMerge } from '@newcar/utils'
import type { Vector2 } from '../utils/vector2'
import { type FigureOptions, type FigureStyle, createFigure } from './figure'
import { createPolygon } from './polygon'
import { createLine } from './line'

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
export interface ArrowStyle extends FigureStyle { }

export function createArrow(from: Vector2, to: Vector2, options?: ArrowOptions) {
  return defineWidgetBuilder((ck) => {
    options ??= {}
    options.style ??= {}
    const figure = createFigure(options)(ck)
    const fromProp = def(from)
    const toProp = def(to)

    const tip = createPolygon([
      [0, 10],
      [22, 0],
      [0, -10],
    ], {
      x: to[0],
      y: to[1],
      style: {
        scaleX: from[0] > to[0] ? -1 : 1,
        scaleY: from[1] > to[1] ? -1 : 1,
        rotation: calculateArrowRotationAngle(from, to),
        ...options.style,
      },
    })(ck)
    const stem = createLine(from, to, {
      style: {
        color: options.style.borderColor,
        width: options.style.borderWidth,
        ...options.style,
      },
    })(ck)

    function reset() {
      const radian = calculateArrowRotationAngle(fromProp.value, toProp.value)
      tip.style.rotation.value = radian
    }

    changed(fromProp, reset)
    changed(toProp, reset)

    figure.add(stem, tip)

    return deepMerge(figure, {
      from: fromProp,
      to: toProp,
    })
  })
}
