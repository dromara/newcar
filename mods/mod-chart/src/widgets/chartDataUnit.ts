import { Widget, type WidgetOptions } from '@newcar/core'

export interface ChartDataOptions<ChartStyle> extends WidgetOptions {
  style?: ChartStyle
}

export class ChartDataUnit<ChartStyle> extends Widget {
  declare style: ChartStyle

  constructor(public value: number, options?: ChartDataOptions<ChartStyle>) {
    options ??= {}
    super(options)
    this.style = options.style ?? {} as ChartStyle
  }
}
