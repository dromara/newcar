import type { WidgetOptions, WidgetStyle } from "@newcar/core"
import { Widget } from "@newcar/core"
import { Color } from "@newcar/utils";
import type { Paint } from "canvaskit-wasm";
import { Join } from "../../utils/join";
import { Cap } from "../../utils/cap";

export interface FigureStyle extends WidgetStyle{
  border?: boolean
  borderColor?: Color
  borderWidth?: number
  fill?: boolean
  fillColor?: Color
  join?: Join
  cap?: Cap
}

export interface FigureOptions extends WidgetOptions {
  style?: FigureStyle
}

export class Figure extends Widget {
  declare style: FigureStyle
  strokePaint: Paint
  fillPaint: Paint

  constructor(options?: FigureOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.borderColor = options.style.borderColor ?? Color.WHITE
    this.style.borderWidth = options.style.borderWidth ?? 2
    this.style.fillColor = options.style.fillColor ?? Color.WHITE
    this.style.fill = options.style.fill ?? true
    this.style.border = options.style.border ?? false
    this.style.join = options.style.join ?? 'miter'
    this.style.cap = options.style.cap ?? 'square'
  }
}