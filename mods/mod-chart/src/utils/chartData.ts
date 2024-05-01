import type { ChartDataUnit } from '../widgets'

export interface ChartData<ChartStyle> {
  labels: string[]
  datasets: {
    label: string
    data: ChartDataUnit<ChartStyle>[]
    style?: ChartStyle
  }[]
}
