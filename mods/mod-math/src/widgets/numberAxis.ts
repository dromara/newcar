import { Widget, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Color } from '@newcar/utils'
import {
  Vector2,
  TextOptions,
  Arrow,
  Line,
  ArrowOptions,
  LineOptions,
  Text,
} from '@newcar/basic'
import { Canvas, CanvasKit } from 'canvaskit-wasm'

export type Trend = (counter: number) => number | string

export interface NumberAxisOptions extends WidgetOptions {
  style?: NumberAxisStyle
  unit?: boolean
  interval?: number
  trend?: Trend
  arrowOptions?: ArrowOptions
  textOptions?: TextOptions
  enableUnit?: boolean
  unitFont?: string
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
  textOptions: TextOptions
  unitFont: string | null
  unit: boolean
  private arrow: Arrow
  private ticks: Line[] = []
  private enableUnit: boolean
  private units: Text[] = []

  constructor(
    public from: number,
    public to: number,
    options?: NumberAxisOptions,
  ) {
    options ??= {}
    super(options)
    this.trend = options.trend ?? ((counter) => counter)
    this.interval = options.interval ?? 50
    this.arrowOptions = options.arrowOptions ?? {}
    this.textOptions = options.textOptions ?? {}
    this.enableUnit = options.enableUnit ?? false
    this.unitFont = options.unitFont ?? null
    this.unit = options.unit ?? false
    options.style ??= {}
    this.style.tickColor = options.style.tickColor ?? Color.WHITE
    this.style.tickHeight = options.style.tickHeight ?? [-5, 5]
    this.style.tickRotation = options.style.tickRotation ?? 0
    this.style.tickWidth = options.style.tickWidth ?? 2
    this.style.color = options.style.color ?? Color.WHITE
    this.arrow = new Arrow([this.from, 0], [this.to, 0], this.arrowOptions)
    let counter = (this.from - (this.from % this.interval)) / this.interval
    for (let x = this.from; x <= this.to; x += this.interval) {
      this.ticks.push(
        new Line(
          [x, this.style!.tickHeight![0]],
          [x, this.style!.tickHeight![1]],
          {
            style: {
              rotation: this.style.tickRotation,
              width: this.style.tickWidth,
              color: this.style.color,
            },
          },
        ),
      )
      if (this.unit) {
        this.units.push(
          new Text(this.trend(counter).toString(), this.unitFont!, {
            x: x / 2,
            y: 10,
            style: {
              size: 15,
              rotation: -this.style.rotation!
            },
            ...this.textOptions,
          }),
        )
      }
      counter += 1
    }
    this.children.push(this.arrow, ...this.ticks, ...this.units)
  }

  init(ck: CanvasKit): void {}
}
