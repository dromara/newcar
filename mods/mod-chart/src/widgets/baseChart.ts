import { Figure } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import type { Color } from '@newcar/utils'
import type { ChartLayout } from './chartLayout'
import type { ChartDataUnit } from './chartDataUnit'

export interface BaseChartOptions extends WidgetOptions {
  indexAxis?: 'x' | 'y'
  scales?: {
    x?: {
      beginAtZero?: boolean
    }
    y?: {
      beginAtZero?: boolean
    }
  }
  size: {
    width: number
    height: number
  }
  suggestedMin?: number
  suggestedMax?: number
  gridColor?: Color
  gridWidth?: number
  layout?: ChartLayout
  endColumn?: boolean
}

export interface BaseChartStyle extends WidgetStyle {
  backgroundColor?: Color
  borderColor?: Color
  borderWidth?: number
  border?: boolean
}

export interface BaseChartDataSet {
  label: string
  data: ChartDataUnit<BaseChartStyle>[]
  style?: BaseChartStyle
}

export interface BaseChartData {
  labels: string[]
  datasets: BaseChartDataSet[]
}

export class BaseChart extends Figure {
  constructor(
    options?: BaseChartOptions,
  ) {
    options ??= {
      size: {
        width: 200,
        height: 200,
      },
    }
    super(options)
  }
}
