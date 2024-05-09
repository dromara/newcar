/**
 * ChartUtils.
 * @public
 * @module
 * @category Utils
 * @description
 * This module provides utility functions for the chart widgets.
 */
import type { ChartData, ChartDataOptions } from '../widgets'
import { ChartDataUnit } from '../widgets'

/**
 * Convert data to data units.
 * @param data - The data.
 * @param options - The options.
 * @returns The data units.
 * @public
 * @category Utils
 * @example
 * ```ts
 * const data = [1, 2, 3]
 * const dataUnits = dataUnits(data)
 * ```
 */
export function dataUnits<ChartStyle>(data: (number | ChartData)[], options?: ChartDataOptions<ChartStyle>): ChartDataUnit<ChartStyle>[] {
  return data.map(value => new ChartDataUnit(value, options))
}
