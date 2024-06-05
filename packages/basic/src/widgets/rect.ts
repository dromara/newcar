import type { ConvertToProp } from '@newcar/core'
import { changed, def, defineWidgetBuilder } from '@newcar/core'
import type { Path, PathOptions, PathStyle } from './path'
import { createPath } from './path'

function mapRadius(source: RectStyle['radius']): [number, number, number, number, number, number, number, number] {
  const target: [number, number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0, 0]
  if (typeof source === 'number') {
    target.fill(source, 0, 8)
  }
  else if (source.length === 2) {
    target.fill(source[0], 0, 4)
      .fill(source[1], 4, 8)
  }
  else if (source.length === 4) {
    target.fill(source[0], 0, 2)
      .fill(source[1], 2, 4)
      .fill(source[2], 4, 6)
      .fill(source[3], 6, 8)
  }
  else {
    return source
  }
  return target
}

export interface RectOptions extends PathOptions {
  style?: RectStyle
}

export interface RectStyle extends PathStyle {
  /**
   * The corner radius of the rectangle.
   * @default 0
   * @description
   * The corner radius can be a single number, in which case all corners will have the same radius.
   * It can also be an array of 2 numbers, in which case the first number will be the radius of the top-left and top-right corners, and the second number will be the radius of the bottom-left and bottom-right corners.
   * It can also be an array of 4 numbers, in which case the first number will be the radius of the top-left corner, the second number will be the radius of the top-right corner, the third number will be the radius of the bottom-right corner, and the fourth number will be the radius of the bottom-left corner.
   * It can also be an array of 8 numbers, in which case in order, the numbers will be radiusX, radiusY for upper-left, upper-right, lower-right, lower-left.
   */
  radius?: number
  | [number, number]
  | [number, number, number, number]
  | [number, number, number, number, number, number, number, number]
}

export interface Rect extends Path {
  style: ConvertToProp<RectStyle>
}

export function createRect(width: number, length: number, options: RectOptions) {
  return defineWidgetBuilder<Rect>((ck) => {
    options ??= {}
    options.style ??= {}
    const widthProp = def(width)
    const lengthProp = def(length)

    const path = createPath(options)(ck)

    const style = {
      ...path.style,
      radius: def(options.style.radius ?? 0),
    }

    path.path.addRRect(new Float32Array([
      0,
      0,
      widthProp.value * path.progress.value,
      lengthProp.value * path.progress.value,
      ...mapRadius(style.radius.value),
    ]))

    function reset() {
      path.path.rewind()
      path.path.addRRect(new Float32Array([
        0,
        0,
        widthProp.value * path.progress.value,
        lengthProp.value * path.progress.value,
        ...mapRadius(style.radius.value),
      ]))
    }

    changed(widthProp, reset)
    changed(lengthProp, reset)
    changed(style.radius, reset)
    changed(path.progress, reset)

    return {
      ...path,
      style,
    }
  })
}
