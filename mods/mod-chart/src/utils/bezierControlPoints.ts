/**
 * Calculate the distance between two points
 * @param current - The current point
 * @param current.x
 * @param current.y
 * @param previous - The previous point
 * @param previous.x
 * @param previous.y
 */
function distanceBetweenPoints(current: { x: number, y: number }, previous: { x: number, y: number }) {
  return Math.sqrt((current.x - previous.x) ** 2 + (current.y - previous.y) ** 2)
}

/**
 * Calculate the spline curve
 * @param firstPoint - The first point
 * @param firstPoint.x
 * @param firstPoint.y
 * @param middlePoint - The middle point
 * @param middlePoint.x
 * @param middlePoint.y
 * @param afterPoint - The after point
 * @param afterPoint.x
 * @param afterPoint.y
 * @param t - The tension
 */
export function splineCurve(
  firstPoint: { x: number, y: number },
  middlePoint: { x: number, y: number },
  afterPoint: { x: number, y: number },
  t: number,
): {
    previous: { x: number, y: number }
    next: { x: number, y: number }
  } {
  const previous = firstPoint
  const current = middlePoint
  const next = afterPoint
  const d01 = distanceBetweenPoints(current, previous)
  const d12 = distanceBetweenPoints(next, current)

  let s01 = d01 / (d01 + d12)
  let s12 = d12 / (d01 + d12)

  // If all points are the same, s01 & s02 will be inf
  s01 = Number.isNaN(s01) ? 0 : s01
  s12 = Number.isNaN(s12) ? 0 : s12

  const fa = t * s01 // scaling factor for triangle Ta
  const fb = t * s12

  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y),
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y),
    },
  }
}

/**
 * Calculate the bezier control points
 * @param points - The points
 * @param points.x
 * @param points.y
 * @param tension - The tension
 * @param loop - Whether the points are loop
 */
export function bezierControlPoints(
  points: { x: number, y: number }[],
  tension: number,
  loop: boolean,
) {
  const result = []

  let prev = loop ? points[points.length - 1] : points[0]
  for (let i = 0; i < points.length; ++i) {
    const point = points[i]
    result[i] = splineCurve(
      prev,
      point,
      points[Math.min(i + 1, points.length - (loop ? 0 : 1)) % points.length],
      tension,
    )
    prev = point
  }

  return result
}
