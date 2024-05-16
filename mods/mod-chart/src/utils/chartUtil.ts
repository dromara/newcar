/**
 * ChartUtils.
 * @public
 * @module
 * @category Utils
 * @description
 * This module provides utility functions for the chart widgets.
 */
import type { DateTime, DateTimeUnit } from 'luxon'
import { Duration } from 'luxon'
import type { ChartData, ChartDataOptions, DateTimeWithPeriod } from '../widgets'
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

/**
 * Generate a sequence of dates.
 * @param start
 * @param duration
 * @param intervalUnit
 * @param interval
 */
export function dateSequence(start: DateTime, duration: Duration, intervalUnit: DateTimeUnit, interval: number = 1): DateTimeWithPeriod[] {
  const sequence = []
  for (let i = 0; start.startOf(intervalUnit).plus({ [intervalUnit]: i }) < start.startOf(intervalUnit).plus(duration); i += interval)
    sequence.push(start.startOf(intervalUnit).plus({ [intervalUnit]: i }))
  return sequence.map((date) => {
    const dateWithPeriod = date as DateTimeWithPeriod
    dateWithPeriod.duration = Duration.fromObject({ [intervalUnit]: interval })
    return dateWithPeriod
  })
}
