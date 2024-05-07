import { Figure } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import type { Color } from '@newcar/utils'
import type { ChartLayout } from './chartLayout'
import type { ChartDataUnit } from './chartDataUnit'

export interface ChartAxisOptions extends WidgetOptions {
  beginAtZero?: boolean
  suggestedMin?: number
  suggestedMax?: number
  gridColor?: Color
  gridWidth?: number
}

export interface BaseChartOptions extends ChartAxisOptions {
  indexAxis?: 'x' | 'y'
  axis?: {
    index?: ChartAxisOptions
    cross?: ChartAxisOptions
  }
  size?: {
    width: number
    height: number
  }
  endColumn?: boolean
  edgeOffset?: boolean
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
  style?: BaseChartStyle
}

export class BaseChart extends Figure {
  constructor(
    options?: BaseChartOptions,
  ) {
    options ??= {}
    super(options)
  }
}
