import type { ChartDataUnit } from './chartDataUnit'
import type { LineChartData, LineChartDataSet, LineChartOptions, LineChartStyle } from './lineChart'
import { LineChart } from './lineChart'

/**
 * ScatterChart options
 * @public
 * @category ScatterChart
 * @extends LineChartOptions
 */
export interface ScatterChartOptions extends LineChartOptions {}

/**
 * ScatterChart style
 * @public
 * @category ScatterChart
 * @extends LineChartStyle
 */
export interface ScatterChartStyle extends LineChartStyle {}

/**
 * ScatterChart data set
 * @public
 * @category ScatterChart
 * @extends LineChartDataSet
 */
export interface ScatterChartDataSet extends LineChartDataSet {
  data: ChartDataUnit<ScatterChartStyle>[]
  style?: ScatterChartStyle
}

/**
 * ScatterChart data
 * @public
 * @category ScatterChart
 * @extends LineChartData
 */
export interface ScatterChartData extends LineChartData {
  datasets: ScatterChartDataSet[]
  style?: ScatterChartStyle
}

/**
 * ScatterChart
 * @public
 * @category ScatterChart
 * @extends LineChart
 * @description
 * The ScatterChart is a variation of the LineChart that displays individual data points.
 * In fact, the ScatterChart is a LineChart with the `showLine` option set to `false` and the `animateIndex` option set to `true` when the index type is a number.
 */
export class ScatterChart extends LineChart {
  declare style: ScatterChartStyle

  constructor(
    public data: ScatterChartData,
    options?: ScatterChartOptions,
  ) {
    options ??= {}
    super({
      ...data,
      style: {
        ...data.style,
        showLine: false,
        animateIndex: true,
      },
    }, options)

    this.data = {
      ...data,
      style: {
        ...data.style,
        showLine: false,
        animateIndex: this.layout.indexType === 'number',
      },
    }
  }
}
