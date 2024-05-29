import { Arrow, Line, Text } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { CanvasKit } from 'canvaskit-wasm'

export type Trend = (x: number) => number | string

export interface NumberAxisOptions extends WidgetOptions {
  style?: NumberAxisStyle

  /**
   * The ratio of pixels to 1 tick, i.e. the division value
   */
  division?: number

  /**
   * The trend of the axis, i.e. the function that maps the division to the axis value
   * For example, if the division is 50, the trend is (x => x / 50), this is default value, too
   */
  trend?: Trend
}

export interface NumberAxisStyle extends WidgetStyle {
  /**
   * If display ticks.
   */
  ticks?: boolean
  tickColor?: Color

  /**
   * If display arrow (the triangle at the end of the axis)
   */
  arrow?: boolean

  /**
   * if display the number or text under the ticks of the axis
   */
  texts?: boolean
  textColor?: Color
  textSize?: number

  /**
   * The color of the axis
   */
  color?: Color
}

export class NumberAxis extends Widget {
  division: number
  trend: Trend
  declare style: NumberAxisStyle
  ticks: Line[]
  texts: Text[]
  main: Arrow

  constructor(
    public length: [number, number],
    options?: NumberAxisOptions,
  ) {
    options ??= {}
    super(options)
    this.division = options.division ?? 50
    this.trend = options.trend ?? (x => x / 50)
    this.style ??= {}
    this.style.ticks = options.style.ticks ?? true
    this.style.tickColor = options.style.tickColor ?? Color.WHITE
    this.style.texts = options.style.texts ?? true
    this.style.textSize = options.style.textSize ?? 20
    this.style.textColor = options.style.textColor ?? Color.WHITE
    this.style.color = options.style.color ?? Color.WHITE
    this.style.arrow = options.style.arrow ?? true
    this.main = new Arrow([this.length[0], 0], [this.length[1], 0], {
      style: {
        color: this.style.color,
      },
      progress: this.progress,
    })
    this.ticks = []
    this.texts = []
    for (let x = this.length[0] + (this.length[1] - this.length[0]) % this.division; x <= this.length[1]; x += this.division) {
      if (this.style.ticks) {
        this.ticks.push(
          new Line([x, -5], [x, 5], {
            style: {
              color: this.style.tickColor,
            },
            progress: this.progress,
          }),
        )
      }
      if (this.style.texts) {
        this.texts.push(new Text(this.trend(x).toString(), {
          x: x - (this.style.textSize / 2),
          y: 10,
          style: {
            fontSize: this.style.textSize,
            fillColor: this.style.textColor,
            // Note: the rotation is reversed because the canvas is flipped
            rotation: -this.style.rotation,
          },
        }))
      }
    }
    this.add(this.main, ...this.ticks, ...this.texts)
  }

  init(_ck: CanvasKit): void {
    super.init(_ck)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'style.color':
        this.main.style.color = this.style.color
        break
      case 'style.tickColor':
        for (const tick of this.ticks)
          tick.style.color = this.style.tickColor
        break
      case 'style.textColor':
        for (const text of this.texts)
          text.style.fillColor = this.style.textColor
        break
      case 'style.textSize':
        for (const text of this.texts)
          text.style.fontSize = this.style.textSize
        break
      case 'progress':
        this.main.progress = this.progress
        for (const tick of this.ticks)
          tick.progress = this.progress
        break
      case 'style.rotation':
        for (const text of this.texts)
          text.style.rotation = -this.style.rotation
    }
  }
}
