/* eslint-disable no-unused-expressions */
import { Arrow, Line, Text } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'

export type Trend = (x: number) => number | string

export interface NumberAxisOptions extends WidgetOptions {
  style?: NumberAxisStyle
  score?: number
  trend?: Trend
}

export interface NumberAxisStyle extends WidgetStyle {
  ticks?: boolean
  texts?: boolean
  textSize?: number
}

export class NumberAxis extends Widget {
  score: number
  trend: Trend
  declare style: NumberAxisStyle

  constructor(
    public length: [number, number],
    public axisRange: [number, number],
    options?: NumberAxisOptions,
  ) {
    options ?? {}
    super(options)
    this.score = options.score ?? 50
    this.trend = options.trend ?? (x => x / 50)
    this.style ?? {}
    this.style.ticks = options.style.ticks ?? true
    this.style.texts = options.style.texts ?? true
    this.style.textSize = options.style.textSize ?? 20
    const main = new Arrow([this.length[0], 0], [this.length[1], 0])
    const ticks: Line[] = []
    const texts: Text[] = []
    for (let x = this.length[0]; x <= this.length[1]; x += this.score) {
      if (this.style.ticks) {
        ticks.push(
          new Line([x, -5], [x, 5]),
        )
      }
      if (this.style.texts) {
        texts.push(new Text([{
          text: this.trend(x).toString(),
          style: {
            fontSize: this.style.textSize,
          },
        }], {
          x: x - (this.style.textSize / 2),
          y: 10,
          style: {
            textAlign: 'center',
            width: this.style.textSize,
          },
        }))
      }
    }
    this.add(main, ...ticks, ...texts)
  }
}
