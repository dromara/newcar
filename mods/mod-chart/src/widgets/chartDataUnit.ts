import { Widget, type WidgetOptions } from '@newcar/core'
import type { DateTimeUnit } from 'luxon'
import { DateTime } from 'luxon'

/**
 * ChartDataOptions
 * @public
 * @category General
 * @interface
 * @extends {WidgetOptions}
 * @template ChartStyle - Chart style type (which may differ depending on the chart type)
 * @property {ChartStyle} [style] - Chart style
 */
export interface ChartDataOptions<ChartStyle> extends WidgetOptions {
  style?: ChartStyle
}

/**
 * ChartData
 * @public
 * @category General
 * @interface
 * @property {number} [index] - Index value (displayed on the index-axis)
 * @property {number} [cross] - Cross value (displayed on the cross-axis)
 * @property {number} [weight] - Weight value (display forms may differ depending on the chart type)
 */
export interface ChartData {
  index?: number | DateTime
  cross?: number
  weight?: number
}

/**
 * ChartDataUnit
 * @public
 * @category General
 * @class
 * @extends {Widget}
 * @template ChartStyle - Chart style type (which may differ depending on the chart type)
 */
export class ChartDataUnit<ChartStyle> extends Widget {
  /**
   * Chart style
   * @public
   * @type {ChartStyle}
   */
  declare style: ChartStyle

  /**
   * Interval unit
   * @type {DateTimeUnit}
   */
  intervalUnit?: DateTimeUnit

  /**
   * ChartDataUnit constructor
   * @public
   * @param {number | ChartData} value - Value
   * @param {ChartDataOptions<ChartStyle>} [options] - Options
   */
  constructor(public value: number | ChartData, options?: ChartDataOptions<ChartStyle>) {
    options ??= {}
    super(options)
    this.style = options.style ?? {} as ChartStyle

    if (typeof value === 'number')
      this.value = { cross: value }
  }

  /**
   * Index value
   */
  get index(): number {
    if (!((<ChartData> this.value).index instanceof DateTime)) {
      return <number>(<ChartData> this.value).index
    }
    else {
      const date = <DateTime> (<ChartData> this.value).index
      if (!this.intervalUnit)
        throw new Error('Interval unit is not set')
      const start = date.startOf(this.intervalUnit)
      const end = date.endOf(this.intervalUnit)
      if (this.intervalUnit !== 'week')
        return start.get(this.intervalUnit) + date.diff(start).as('milliseconds') / (end.diff(start).as('milliseconds'))
      else
        return start.get('weekNumber') + date.diff(start).as('milliseconds') / (end.diff(start).as('milliseconds'))
    }
  }

  /**
   * returns the index value as a DateTime
   */
  indexDate() {
    return <DateTime> (<ChartData> this.value).index
  }

  /**
   * returns whether the index value is a DateTime
   */
  isIndexDate() {
    return (<ChartData> this.value).index instanceof DateTime
  }

  /**
   * Cross value
   */
  get cross() {
    return (<ChartData> this.value).cross
  }

  /**
   * Weight value
   */
  get weight() {
    return (<ChartData> this.value).weight
  }

  /**
   * Set index value
   * @param index
   */
  set index(index: number | DateTime) {
    (<ChartData> this.value).index = index
  }

  /**
   * Set cross value
   * @param cross
   */
  set cross(cross: number) {
    (<ChartData> this.value).cross = cross
  }

  /**
   * Set weight value
   * @param weight
   */
  set weight(weight: number) {
    (<ChartData> this.value).weight = weight
  }
}
