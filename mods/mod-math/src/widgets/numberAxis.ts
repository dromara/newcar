import type { Base, BaseOptions, BaseStyle, ConvertToProp, Prop, Widget } from '@newcar/core'
import { changed, createBase, def, defineWidgetBuilder } from '@newcar/core'
import { Color, deepMerge } from '@newcar/utils'
import type { Line, Text } from '@newcar/basic'
import { createArrow, createLine, createText } from '@newcar/basic'

export type Trend = (x: number) => number | string

export interface NumberAxisOptions extends BaseOptions {
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

export interface NumberAxisStyle extends BaseStyle {
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

export interface NumberAxis extends Base {
  length: Prop<[number, number]>
  division: Prop<number>
  trend: Prop<Trend>
  style: ConvertToProp<NumberAxisStyle>
  progress: Prop<number>
}

export function createNumberAxis(length: [number, number], options?: NumberAxisOptions) {
  return defineWidgetBuilder<NumberAxis>((ck) => {
    options ??= {}
    options.style ??= {}
    const base = createBase(options)(ck)

    const lengthProp = def(length)

    const division = def(options.division ?? 50)
    const trend = def(options.trend ?? ((x: number) => x / 50))
    const style = {
      ...base.style,
      ticks: def(options.style.ticks ?? true),
      tickColor: def(options.style.tickColor ?? Color.WHITE),
      texts: def(options.style.texts ?? true),
      textSize: def(options.style.textSize ?? 15),
      textColor: def(options.style.textColor ?? Color.WHITE),
      color: def(options.style.color ?? Color.WHITE),
    }

    const stem = createArrow([lengthProp.value[0], 0], [lengthProp.value[1], 0], {
      style: {
        color: style.color.value,
      },
    })(ck)
    let ticks: Line[] = []
    let texts: Text[] = []
    for (let x = lengthProp.value[0] + (lengthProp.value[1] - lengthProp.value[0]) % division.value; x <= lengthProp.value[1]; x += division.value) {
      if (style.ticks.value) {
        ticks.push(
          createLine([x, -5], [x, 5], {
            style: {
              color: style.tickColor.value,
            },
            progress: base.progress.value,
          })(ck),
        )
      }
      if (style.texts.value) {
        texts.push(
          createText(trend.value(x).toString(), {
            x: x - style.textSize.value / 3,
            y: 10,
            style: {
              fontSize: style.textSize.value,
              color: style.textColor.value,
              // Note: the rotation is reversed because the canvas is flipped
              rotation: -style.rotation.value,
            },
            progress: base.progress.value,
          })(ck),
        )
      }
    }

    base.add(stem, ...texts, ...ticks)

    changed(lengthProp, (v: any) => {
      stem.from.value = [v[0], 0]
      stem.to.value = [v[1], 0]
    })
    changed(division, (v) => {
      ticks = []
      for (let x = lengthProp.value[0] + (lengthProp.value[1] - lengthProp.value[0]) % v.value; x <= lengthProp.value[1]; x += v.value) {
        if (style.ticks.value) {
          ticks.push(
            createLine([x, -5], [x, 5], {
              style: {
                color: style.tickColor.value,
              },
              progress: base.progress.value,
            })(ck),
          )
        }
      }
    })
    changed(trend, (v) => {
      texts = []
      for (let x = lengthProp.value[0] + (lengthProp.value[1] - lengthProp.value[0]) % division.value; x <= lengthProp.value[1]; x += division.value) {
        if (style.texts.value) {
          texts.push(
            createText(v.value(x).toString(), {
              x: x - (style.textSize.value / 2),
              y: 10,
              style: {
                fontSize: style.textSize.value,
                color: style.textColor.value,
                // Note: the rotation is reversed because the canvas is flipped
                rotation: -style.rotation.value,
              },
              progress: base.progress.value,
            })(ck),
          )
        }
      }
    })
    changed(style.tickColor, (v) => {
      for (const tick of ticks) {
        tick.style.color.value = v.value
      }
    })
    changed(style.textColor, (v) => {
      for (const text of texts) {
        text.style.color.value = v.value
      }
    })
    changed(style.textSize, (v) => {
      for (const text of texts) {
        text.style.fontSize.value = v.value
      }
    })
    changed(style.rotation, (v) => {
      for (const text of texts) {
        // Note: reverse texts to keep his horizontal position
        text.style.rotation.value = -v.value
      }
    })
    changed(base.progress, (v) => {
      for (const text of texts) {
        text.progress.value = v.value
      }
      for (const tick of ticks) {
        tick.progress.value = v.value
      }
      stem.progress.value = v.value
    })
    changed(style.ticks, (v) => {
      for (const tick of ticks)
        tick.display.value = v.value
    })
    changed(style.texts, (v) => {
      for (const text of texts)
        text.display.value = v.value
    })

    return deepMerge(base, {
      length: lengthProp,
      style,
      division,
      trend,
    })
  })
}
