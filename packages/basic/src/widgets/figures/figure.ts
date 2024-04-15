import type { WidgetOptions, WidgetStyle } from "@newcar/core"
import { $ck, Widget } from "@newcar/core"
import { Color } from "@newcar/utils";
import type { Paint } from "canvaskit-wasm";
import { StrokeJoin, StrokeCap } from "../../utils/types";

export interface FigureStyle extends WidgetStyle{
  border?: boolean
  borderColor?: Color
  borderWidth?: number
  fill?: boolean
  fillColor?: Color
  join?: StrokeJoin
  cap?: StrokeCap
  offset?: number
  interval?: [number, number]
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
    this.style.offset = options.style.offset ?? 0
    this.style.interval = options.style.interval ?? [1, 0]
  }
}