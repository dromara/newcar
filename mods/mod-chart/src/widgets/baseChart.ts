import { Figure } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import type { Color } from '@newcar/utils'
import type { ChartLayout } from './chartLayout'
import type { ChartDataUnit } from './chartDataUnit'

export interface BaseChartOptions extends WidgetOptions {
  indexAxis?: 'x' | 'y'
  scales?: {
    index?: {
      beginAtZero?: boolean
      suggestedMin?: number
      suggestedMax?: number
    }
    cross?: {
      beginAtZero?: boolean
      suggestedMin?: number
      suggestedMax?: number
    }
  }
  size?: {
    width: number
    height: number
  }
  suggestedMin?: number
  suggestedMax?: number
  gridColor?: Color
  gridWidth?: number
  endColumn?: boolean
  beginOffset?: boolean
  layout?: ChartLayout
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
  labels?: string[]
  datasets: BaseChartDataSet[]
}

export class BaseChart extends Figure {
  constructor(
    options?: BaseChartOptions,
  ) {
    options ??= {}
    super(options)
  }
}
