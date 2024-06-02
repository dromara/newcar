import type { WidgetOptions, WidgetStyle } from '../base'
import { createBase } from '../base'
import { defineWidgetBuilder } from '../widget'

export type Color = any

export interface FigureStyle extends WidgetStyle {
  border?: boolean
  borderColor?: Color
  borderShader?: Shader
}

export interface FigureOptions extends WidgetOptions {
  style: FigureStyle
}

export function createFigure(options: FigureOptions) {
  return defineWidgetBuilder((_ck) => {
    const base = createBase(options)(_ck)

    return {
      ...base,
    }
  })
}
