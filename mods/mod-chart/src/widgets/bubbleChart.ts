import type { ChartDataUnit } from './chartDataUnit'
import type { LineChartData, LineChartDataSet, LineChartOptions, LineChartStyle } from './lineChart'
import { LineChart } from './lineChart'

export interface BubbleChartOptions extends LineChartOptions {}

export interface BubbleChartStyle extends LineChartStyle {}

export interface BubbleChartDataSet extends LineChartDataSet {
  data: ChartDataUnit<BubbleChartStyle>[]
  style?: BubbleChartStyle
}

export interface BubbleChartData extends LineChartData {
  datasets: BubbleChartDataSet[]
  style?: BubbleChartStyle
}

export class BubbleChart extends LineChart {
  declare style: BubbleChartStyle

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
        animateIndex: true,
        ...data.style,
      },
    }
  }
}
