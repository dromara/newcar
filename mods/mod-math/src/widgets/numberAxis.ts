import { Arrow, Line, Text } from '@newcar/basic'
import type { ConvertToProp, Reactive, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget, changed, reactive, ref } from '@newcar/core'
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
  declare style: ConvertToProp<NumberAxisStyle>
  ticks: Line[]
  texts: Text[]
  main: Arrow
  length: Reactive<[number, number]>

  constructor(
    length: [number, number],
    options?: NumberAxisOptions,
  ) {
    options ??= {}
    super(options)
    this.length = reactive(length)
    this.division = options.division ?? 50
    this.trend = options.trend ?? (x => x / 50)
    this.style ??= {}
    this.style.ticks = ref(options.style.ticks ?? true)
    this.style.tickColor = reactive(options.style.tickColor ?? Color.WHITE)
    this.style.texts = ref(options.style.texts ?? true)
    this.style.textSize = ref(options.style.textSize ?? 20)
    this.style.textColor = reactive(options.style.textColor ?? Color.WHITE)
    this.style.color = reactive(options.style.color ?? Color.WHITE)
    this.main = new Arrow([this.length[0], 0], [this.length[1], 0], {
      style: {
        color: this.style.color,
      },
      progress: this.progress.value,
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
            progress: this.progress.value,
          }),
        )
      }
      if (this.style.texts) {
        this.texts.push(new Text(this.trend(x).toString(), {
          x: x - (this.style.textSize.value / 2),
          y: 10,
          style: {
            fontSize: this.style.textSize.value,
            fillColor: this.style.textColor,
            // Note: the rotation is reversed because the canvas is flipped
            rotation: -this.style.rotation.value,
          },
        }))
      }
    }
    this.add(this.main, ...this.ticks, ...this.texts)

    changed(this.style.color, (v) => {
      this.main.style.color = v
    })
    changed(this.style.tickColor, (v) => {
      for (const tick of this.ticks)
        tick.style.color = v
    })
    changed(this.style.textColor, (v) => {
      for (const text of this.texts)
        text.style.fillColor = v
    })
    changed(this.style.textSize, (v) => {
      for (const text of this.texts)
        text.style.fontSize.value = v.value
    })
    changed(this.style.rotation, (v) => {
      for (const text of this.texts)
        text.style.rotation.value = -v.value
    })
    changed(this.progress, (v) => {
      this.main.progress.value = v.value
      for (const tick of this.ticks)
        tick.progress.value = v.value
    })
    changed(this.style.ticks, (v) => {
      if (v.value) {
        for (let x = this.length[0] + (this.length[1] - this.length[0]) % this.division; x <= this.length[1]; x += this.division) {
          this.ticks.push(
            new Line([x, -5], [x, 5], {
              style: {
                color: this.style.tickColor,
              },
              progress: this.progress.value,
            }),
          )
        }
      }
      else {
        for (const tick of this.ticks)
          tick.hide()
      }
    })
    changed(this.style.texts, (v) => {
      if (v.value) {
        for (let x = this.length[0] + (this.length[1] - this.length[0]) % this.division; x <= this.length[1]; x += this.division) {
          this.texts.push(new Text(this.trend(x).toString(), {
            x: x - (this.style.textSize.value / 2),
            y: 10,
            style: {
              fontSize: this.style.textSize.value,
              fillColor: this.style.textColor,
              // Note: the rotation is reversed because the canvas is flipped
              rotation: -this.style.rotation.value,
            },
          }))
        }
      }
      else {
        for (const text of this.texts)
          text.hide()
      }
    })

    function reset(this: NumberAxis) {
      this.texts = []
      this.ticks = []
      for (let x = this.length[0] + (this.length[1] - this.length[0]) % this.division; x <= this.length[1]; x += this.division) {
        if (this.style.texts) {
          this.texts.push(new Text(this.trend(x).toString(), {
            x: x - (this.style.textSize.value / 2),
            y: 10,
            style: {
              fontSize: this.style.textSize.value,
              fillColor: this.style.textColor,
              // Note: the rotation is reversed because the canvas is flipped
              rotation: -this.style.rotation.value,
            },
          }))
        }
        if (this.style.ticks) {
          this.ticks.push(
            new Line([x, -5], [x, 5], {
              style: {
                color: this.style.tickColor,
              },
              progress: this.progress.value,
            }),
          )
        }
      }
    }
    changed(this.length, reset.bind(this))
    changed(this.division, reset.bind(this))
    changed(this.trend, reset.bind(this))
  }

  init(_ck: CanvasKit): void {
    super.init(_ck)
  }
}
