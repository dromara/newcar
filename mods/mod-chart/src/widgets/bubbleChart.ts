import type { ChartDataUnit } from './chartDataUnit'
import type { LineChartData, LineChartDataSet, LineChartOptions, LineChartStyle } from './lineChart'
import { LineChart } from './lineChart'

/**
 * BubbleChart options
 * @public
 * @category BubbleChart
 * @extends LineChartOptions
 */
export interface BubbleChartOptions extends LineChartOptions {}

/**
 * BubbleChart style
 * @public
 * @category BubbleChart
 * @extends LineChartStyle
 */
export interface BubbleChartStyle extends LineChartStyle {}

/**
 * BubbleChart data set
 * @public
 * @category BubbleChart
 * @extends LineChartDataSet
 */
export interface BubbleChartDataSet extends LineChartDataSet {
  data: ChartDataUnit<BubbleChartStyle>[]
  style?: BubbleChartStyle
}

/**
 * BubbleChart data
 * @public
 * @category BubbleChart
 * @extends LineChartData
 */
export interface BubbleChartData extends LineChartData {
  datasets: BubbleChartDataSet[]
  style?: BubbleChartStyle
}

/**
 * BubbleChart
 * @public
 * @category BubbleChart
 * @extends LineChart
 * @description
 * The BubbleChart is a variation of the ScatterChart that displays three dimensions of data.
 * Each point on the chart is represented by a circle, where the index and cross axis coordinates represent the first two dimensions,
 * and the size of the circle represents the third dimension.
 * In fact, the BubbleChart is a LineChart with the `showLine` option set to `false` and the `animateIndex` option set to `true` when the index type is a number
 * (which means it is actually the same as the ScatterChart)
 */
export class BubbleChart extends LineChart {
  /**
   * Bubble chart data
   * @public
   * @type {BubbleChartData}
   */
  declare style: BubbleChartStyle

  /**
   * Create a bubble chart.
   * @param data - The bubble chart data.
   * @param options - The bubble chart options.
   */
  constructor(
    public data: BubbleChartData,
    options?: BubbleChartOptions,
  ) {
    options ??= {}
    super({
      ...data,
      style: {
        showLine: false,
        animateIndex: true,
        ...data.style,
      },
    }, options)

    this.data = {
      ...data,
      style: {
        showLine: false,
        animateIndex: this.layout.indexType === 'number',
        ...data.style,
      },
    }
  }
}
