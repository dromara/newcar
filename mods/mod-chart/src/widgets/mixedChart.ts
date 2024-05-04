import type { CanvasKit, Paint } from 'canvaskit-wasm'
import { ChartLayout } from './chartLayout'
import type { BaseChartOptions, BaseChartStyle } from './baseChart'
import { BaseChart } from './baseChart'
import type { BaseSimpleChart } from './baseSimpleChart'

export interface MixedChartOptions extends BaseChartOptions {
}

export interface MixedChartStyle extends BaseChartStyle {
}

export interface ChartSet<T extends typeof BaseSimpleChart> {
  Chart: T
  data: ConstructorParameters<T>[0]
  options?: ConstructorParameters<T>[1]
}

export class MixedChart<T extends typeof BaseSimpleChart> extends BaseChart {
  declare style: MixedChartStyle
  categoryPercentage: number
  barPercentage: number

  paint: Paint
  layout: ChartLayout
  charts: BaseSimpleChart[]

  constructor(
    chartSet: ChartSet<T>[],
    options?: MixedChartOptions,
  ) {
    options ??= {}
    super(options)
    const data = {
      labels: chartSet[0].data.labels,
      datasets: chartSet.flatMap(set => (set.data.datasets)),
    }
    const setOptions: ConstructorParameters<T>[1] = {}
    chartSet.flatMap(set => (set.options)).forEach((option) => {
      for (const key in option)
        setOptions[key] = option[key]
    })

    this.layout = new ChartLayout(data, {
      ...setOptions,
      ...options,
      x: 0,
      y: 0,
    })
    this.charts = chartSet.map(set => new set.Chart(set.data, {
      ...options,
      x: 0,
      y: 0,
      ...set.options,
      layout: this.layout,
    }))
    this.add(this.layout, ...this.charts)
  }

  predraw(ck: CanvasKit, propertyChanged: string) {
    super.predraw(ck, propertyChanged)

    switch (propertyChanged) {
      case 'progress':
        this.layout.progress = this.progress
        this.charts.forEach(chart => chart.progress = this.progress)
        break
    }
  }
}
