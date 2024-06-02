import type { Prop } from '@newcar/core'
import { changed, def, defineWidgetBuilder } from '@newcar/core'
import { Canvas, CanvasKit } from 'canvaskit-wasm'
import { deepMerge } from '@newcar/utils'
import type { Vector2 } from '../utils/vector2'
import type { PathOptions, PathStyle } from './path'
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

export function createLine(from: Vector2, to: Vector2, options: LineOptions) {
  return defineWidgetBuilder((ck) => {
    const path = createPath(options)(ck)

    const fromProp = def(from)
    const toProp = def(to)
    options.style ??= {}
    const style = {
      width: options.style.width ?? 2,
    }

    path.path.moveTo(from[0], from[1])
    path.path.lineTo(to[0], to[1])

    function reset(v: Prop<Vector2>) {
      path.path.reset()
      path.path.moveTo(v.value[0], v.value[1])
      path.path.lineTo(v.value[0], v.value[1])
    }

    changed(fromProp, reset)
    changed(toProp, reset)

    return deepMerge(path, {
      style,
      from: fromProp,
      to: toProp,
    })
  })
}
