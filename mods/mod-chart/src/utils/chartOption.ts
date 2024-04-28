import type { WidgetOptions } from '@newcar/core'
import type { Color } from '@newcar/utils'

export interface ChartOption extends WidgetOptions {
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
}
