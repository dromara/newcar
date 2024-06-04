import type { ConvertToProp } from '@newcar/core'
import { def, defineWidgetBuilder } from '@newcar/core'
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
    const path = createPath(options ?? {})(ck)
    const rect = ck.LTRBRect(0, 0, width, length)
    path.path.addRect(rect)

    const style = {
      radius: def(options.style.radius ?? 0),
    }

    return deepMerge(path, { style })
  })
}
