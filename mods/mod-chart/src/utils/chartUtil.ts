import type { ChartDataOptions } from '../widgets'
import { ChartDataUnit } from '../widgets'

export function dataUnits<ChartStyle>(data: number[], options?: ChartDataOptions<ChartStyle>): ChartDataUnit<ChartStyle>[] {
  return data.map(value => new ChartDataUnit(value, options))
}
