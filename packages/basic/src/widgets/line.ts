import type { ConvertToProp, Prop } from '@newcar/core'
import { changed, def, defineWidgetBuilder } from '@newcar/core'
import { deepMerge } from '@newcar/utils'
import type { Vector2 } from '../utils/vector2'
import type { Path, PathOptions, PathStyle } from './path'
import { createPath } from './path'

export interface LineOptions extends PathOptions {
  style?: LineStyle
}

export interface LineStyle extends PathStyle {

  /**
   * The line width of this line.
   */
  width?: number
}

export interface Line extends Path {
  style: ConvertToProp<LineStyle>
  from: Prop<Vector2>
  to: Prop<Vector2>
}

export function createLine(from: Vector2, to: Vector2, options?: LineOptions) {
  return defineWidgetBuilder<Line>((ck) => {
    options ??= {}
    options.style ??= {}
    const path = createPath(deepMerge(options, {
      style: {
        border: true,
        borderWidth: options.style.width,
        fill: false,
      },
    }))(ck)

    const fromProp = def(from)
    const toProp = def(to)
    options.style ??= {}
    const style = {
      width: def(options.style.width ?? 2),
    }

    path.path.moveTo(...from)
    path.path.lineTo(...to)

    function reset(_v: Prop<Vector2>) {
      path.path.reset()
      path.path.moveTo(...fromProp.value)
      path.path.lineTo(...fromProp.value)
    }

    changed(fromProp, reset)
    changed(toProp, reset)
    changed(style.width, (v) => {
      path.style.borderWidth.value = v.value
    })

    return deepMerge(path, {
      style,
      from: fromProp,
      to: toProp,
    })
  })
}
