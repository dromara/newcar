import { DateTime } from 'luxon'
import type { Canvas } from 'canvaskit-wasm'
import type { ConvertToProp } from '@newcar/core'
import type { BaseChartData, BaseChartDataSet, BaseChartOptions, BaseChartStyle } from './baseChart'
import { BaseChart } from './baseChart'
import type { ChartDataUnit } from './chartDataUnit'
import { ChartLayout } from './chartLayout'

/**
 * BaseSimpleChartOptions
 * @interface
 * @extends BaseChartOptions
 */
export interface BaseSimpleChartOptions extends BaseChartOptions {
}

/**
 * BaseSimpleChartStyle
 * @interface
 * @extends BaseChartStyle
 */
export interface BaseSimpleChartStyle extends BaseChartStyle {
}

/**
 * BaseSimpleChartDataSet
 * @interface
 * @extends BaseChartDataSet
 */
export interface BaseSimpleChartDataSet extends BaseChartDataSet {
  data: ChartDataUnit<BaseSimpleChartStyle>[]
  style?: BaseSimpleChartStyle
}

/**
 * BaseSimpleChartData
 * @interface
 * @extends BaseChartData
 */
export interface BaseSimpleChartData extends BaseChartData {
  datasets: BaseSimpleChartDataSet[]
  style?: BaseSimpleChartStyle
}

/**
 * BaseSimpleChart
 * @class
 * @extends BaseChart
 * @description
 * Base class for simple chart widgets that don't mix multiple chart types.
 */
export class BaseSimpleChart extends BaseChart {
  /**
   * Style object for the chart.
   * @public
   * @type BaseSimpleChartStyle
   */
  declare style: ConvertToProp<BaseSimpleChartStyle>

  /**
   * Layout object for the chart.
   * @public
   * @type ChartLayout
   */
  layout: ChartLayout

  /**
   * Constructor
   * @param data - The data of the chart.
   * @param options - The options of the chart.
   */
  constructor(
    public data: BaseSimpleChartData,
    options?: BaseSimpleChartOptions,
  ) {
    options ??= {}
    super(options)

    this.data.datasets.forEach((dataset) => {
      dataset.data.forEach((dataUnit, index) => {
        if (!dataUnit.index && this.data.labels && this.data.labels[index] instanceof DateTime)
          dataUnit.index = <DateTime> this.data.labels[index]
      })
    })

    this.layout = options.layout ?? new ChartLayout(data, {
      size: {
        width: options.size.width ?? 300,
        height: options.size.width ?? 300,
      },
      ...options,
      x: 0,
      y: 0,
    })

    this.data.datasets.forEach((dataset) => {
      dataset.data.forEach((dataUnit, index) => {
        if (!(!dataUnit.isIndexDate() && dataUnit.index) && this.data.labels && typeof this.data.labels[index] === 'string')
          dataUnit.index = this.layout.index.pos[index]
      })
    })

    if (!options.layout)
      this.add(this.layout)
  }

  draw(_canvas: Canvas) {
    super.draw(_canvas)
    this.layout.progress = this.progress
  }
}
