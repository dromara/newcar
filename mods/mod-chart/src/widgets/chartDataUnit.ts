import { Widget, type WidgetOptions } from '@newcar/core'

export interface ChartDataOptions<ChartStyle> extends WidgetOptions {
  style?: ChartStyle
}

export interface ChartData {
  index?: number
  cross?: number
  weight?: number
}

export class ChartDataUnit<ChartStyle> extends Widget {
  declare style: ChartStyle

  constructor(public value: number | ChartData, options?: ChartDataOptions<ChartStyle>) {
    options ??= {}
    super(options)
    this.style = options.style ?? {} as ChartStyle

    if (typeof value === 'number')
      this.value = { cross: value }
  }

  get index() {
    return (<ChartData> this.value).index
  }

  get cross() {
    return (<ChartData> this.value).cross
  }

  get weight() {
    return (<ChartData> this.value).weight
  }

  set index(index: number) {
    (<ChartData> this.value).index = index
  }

  set cross(cross: number) {
    (<ChartData> this.value).cross = cross
  }

  set weight(weight: number) {
    (<ChartData> this.value).weight = weight
  }
}
