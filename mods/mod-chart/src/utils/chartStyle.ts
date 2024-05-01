import type { Color } from '@newcar/utils'
import type { WidgetStyle } from '@newcar/core'

export interface ChartStyle extends WidgetStyle {
  backgroundColor?: Color
  borderColor?: Color
  borderWidth?: number
  border?: boolean
}
