import type { ChartDataUnit } from './chartDataUnit'
import type { LineChartData, LineChartDataSet, LineChartOptions, LineChartStyle } from './lineChart'
import { LineChart } from './lineChart'

export interface ScatterChartOptions extends LineChartOptions {}

export interface ScatterChartStyle extends LineChartStyle {}

export interface ScatterChartDataSet extends LineChartDataSet {
  data: ChartDataUnit<ScatterChartStyle>[]
  style?: ScatterChartStyle
}

export interface ScatterChartData extends LineChartData {
  datasets: ScatterChartDataSet[]
  style?: ScatterChartStyle
}

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
        animateIndex: true,
      },
    }
  }
}
