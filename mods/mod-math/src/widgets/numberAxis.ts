import { Widget, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Color } from '@newcar/utils'
import {
  Vector2,
  TextOptions,
  Arrow,
  Line,
  ArrowOptions,
  LineOptions,
} from '@newcar/basic'
import { Canvas, CanvasKit } from 'canvaskit-wasm'

export type Trend = (counter: number) => number

export interface NumberAxisOptions extends WidgetOptions {
  style?: NumberAxisStyle
  unit?: number
  interval?: number
  trend?: Trend
  arrowOptions?: ArrowOptions
  tickOptions?: LineOptions
}

export interface NumberAxisStyle extends WidgetStyle {
  tickWidth?: number
  tickRotation?: number
  tickColor?: Color
  color?: Color
  tickHeight?: [number, number]
}

export class NumberAxis extends Widget {
  declare style: NumberAxisStyle
  interval: number
  trend: Trend
  arrowOptions: ArrowOptions
  tickOptions: LineOptions
  private arrow: Arrow
  private ticks: Line[] = []

  constructor(
    public from: number,
    public to: number,
    options: NumberAxisOptions,
  ) {
    options ??= {}
    super(options)
    this.trend = options.trend ?? ((counter) => counter)
    this.interval = options.interval ?? 50
    options.style ??= {}
    this.style.tickColor = options.style.tickColor ?? Color.WHITE
    this.style.tickHeight = options.style.tickHeight ?? [-5, 5]
    this.style.tickRotation = options.style.tickRotation ?? 0
    this.style.tickWidth = options.style.tickWidth ?? 2
    this.style.color = options.style.color ?? Color.WHITE
    this.arrowOptions = options.arrowOptions ?? {}
  }

  init(ck: CanvasKit): void {
    this.arrow = new Arrow([this.from, 0], [this.to, 0], this.arrowOptions)
    for (let x = this.from; x <= this.to; x += this.interval) {
      this.ticks.push(
        new Line(
          [x, this.style!.tickHeight![0]],
          [x, this.style!.tickHeight![1]],
          this.tickOptions
        )
      )
    }
    this.children.push(this.arrow, ...this.ticks)
  }
}
