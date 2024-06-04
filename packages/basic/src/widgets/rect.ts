import type { ConvertToProp } from '@newcar/core'
import { changed, def, defineWidgetBuilder } from '@newcar/core'
import { deepMerge } from '@newcar/utils'
import type { Path, PathOptions, PathStyle } from './path'
import { createPath } from './path'

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

    const path = createPath(options ?? {})(ck)
    const rect = ck.LTRBRect(0, 0, widthProp.value * options.progress, lengthProp.value * options.progress)
    path.path.addRect(rect)

    function reset() {
      path.path.reset()
      rect.set([0, 0, widthProp.value * path.progress.value, lengthProp.value * path.progress.value])
      path.path.addRect(rect)
    }

    changed(widthProp, reset)
    changed(lengthProp, reset)

    const style = {
      radius: def(options.style.radius ?? 0),
    }

    return deepMerge(path, { style })
  })
}
