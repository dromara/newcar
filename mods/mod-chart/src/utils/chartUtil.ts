import type { ChartData, ChartDataOptions } from '../widgets'
import { ChartDataUnit } from '../widgets'

export function dataUnits<ChartStyle>(data: (number | ChartData)[], options?: ChartDataOptions<ChartStyle>): ChartDataUnit<ChartStyle>[] {
  return data.map(value => new ChartDataUnit(value, options))
}
