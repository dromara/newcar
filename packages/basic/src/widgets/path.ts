import { deepMerge } from '@newcar/utils'
import type { Canvas, EmbindEnumEntity, InputCommands, Path } from 'canvaskit-wasm'
import { defineWidgetBuilder } from '../../../core/src/widget'
import type { FigureOptions, FigureStyle } from './figure'
import { createFigure } from './figure'

export interface PathOptions extends FigureOptions {
  style?: PathStyle
}

export interface PathStyle extends FigureStyle {}

export function createPath(options?: PathOptions) {
  return defineWidgetBuilder((ck) => {
    const figure = createFigure(options ?? {})(ck)

    const path = new ck.Path()

    function addPathFromPathString(pathString: string) {
      path.addPath(
        ck.Path.MakeFromSVGString(pathString),
      )
    }

    function addPathFromCmds(cmds: InputCommands) {
      path.addPath(
        ck.Path.MakeFromCmds(cmds),
      )
    }

    function addPathFromOp(one: Path, two: Path, op: EmbindEnumEntity) {
      path.addPath(
        ck.Path.MakeFromOp(one, two, op),
      )
    }

    function render(canvas: Canvas) {
      figure.render(canvas)
      if (figure.style.fill.value)
        canvas.drawPath(path, figure.fillPaint)
      if (figure.style.border.value)
        canvas.drawPath(path, figure.strokePaint)
    }

    return deepMerge(figure, {
      path,
      addPathFromPathString,
      addPathFromCmds,
      addPathFromOp,
      render,
    })
  })
}
