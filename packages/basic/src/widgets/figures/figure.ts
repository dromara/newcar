import type { WidgetOptions, WidgetStyle } from "@newcar/core"
import { Widget } from "@newcar/core"
import { Color } from "@newcar/utils";

export interface FigureStyle extends WidgetStyle{
  borderColor?: Color
  borderWidth?: number | null
  fillColor?: Color | null
}

export interface FigureOptions extends WidgetOptions {
  style?: FigureStyle
}

export class Figure extends Widget {
  declare style: FigureStyle

  constructor(options?: FigureOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.borderColor = options.style.borderColor ?? Color.WHITE
    this.style.borderWidth = options.style.borderWidth ?? 2
    this.style.fillColor = options.style.fillColor ?? Color.WHITE
  }
}