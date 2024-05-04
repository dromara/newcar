import type { BaseChartData, BaseChartDataSet, BaseChartOptions, BaseChartStyle } from './baseChart'
import { BaseChart } from './baseChart'
import type { ChartDataUnit } from './chartDataUnit'
import { ChartLayout } from './chartLayout'

export interface BaseSimpleChartOptions extends BaseChartOptions {
}

export interface BaseSimpleChartStyle extends BaseChartStyle {
}

export interface BaseSimpleChartDataSet extends BaseChartDataSet {
  data: ChartDataUnit<BaseSimpleChartStyle>[]
  style?: BaseSimpleChartStyle
}

export interface BaseSimpleChartData extends BaseChartData {
  datasets: BaseSimpleChartDataSet[]
}

export class BaseSimpleChart extends BaseChart {
  declare style: BaseSimpleChartStyle

  layout: ChartLayout

  constructor(
    public data: BaseSimpleChartData,
    options?: BaseSimpleChartOptions,
  ) {
    options ??= {
      size: {
        width: 200,
        height: 200,
      },
    }
    super(options)
    this.layout = new ChartLayout(data, {
      ...options,
      x: 0,
      y: 0,
    })

    if (!options.layout)
      this.add(this.layout)
  }
}
