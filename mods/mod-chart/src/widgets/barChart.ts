import { Rect } from '@newcar/basic'
import { Color } from '@newcar/utils'
import type { Canvas } from 'canvaskit-wasm'
import type {
  BaseSimpleChartData,
  BaseSimpleChartDataSet,
  BaseSimpleChartOptions,
  BaseSimpleChartStyle,
} from './baseSimpleChart'
import { BaseSimpleChart } from './baseSimpleChart'
import type { ChartDataUnit } from './chartDataUnit'

/**
 * BarChart options.
 * @public
 * @interface
 * @category BarChart
 * @extends BaseSimpleChartOptions
 * @property categoryPercentage - The percentage of the category width in the grid width. Default is 0.8.
 * @property barPercentage - The percentage of the bar width in the category width. Default is 0.8.
 */
export interface BarChartOptions extends BaseSimpleChartOptions {
  categoryPercentage?: number
  barPercentage?: number
}

/**
 * BarChart style.
 * @public
 * @interface
 * @category BarChart
 * @extends BaseSimpleChartStyle
 * @property borderRadius - The border radius of the bar. Default is 0. Not supported yet.
 */
export interface BarChartStyle extends BaseSimpleChartStyle {
  borderRadius?: number
}

/**
 * BarChart data set.
 * @public
 * @interface
 * @category BarChart
 * @extends BaseSimpleChartDataSet
 * @property data - The data of the BarChart.
 * @property style - The style of the data set.
 */
export interface BarChartDataSet extends BaseSimpleChartDataSet {
  data: ChartDataUnit<BarChartStyle>[]
  style?: BarChartStyle
}

/**
 * BarChart data.
 * @public
 * @interface
 * @category BarChart
 * @extends BaseSimpleChartData
 * @property datasets - The data sets of the bar chart.
 * @property style - The style of the bar chart.
 */
export interface BarChartData extends BaseSimpleChartData {
  datasets: BarChartDataSet[]
  style?: BarChartStyle
}

/**
 * BarChart widget.
 * @public
 * @category BarChart
 * @class
 * @extends BaseSimpleChart
 */
export class BarChart extends BaseSimpleChart {
  /**
   * The style of the BarChart.
   * @public
   * @type BarChartStyle
   */
  declare style: BarChartStyle
  /**
   * The percentage of the category width in the grid width.
   * @public
   * @type number
   * @default 0.8
   */
  categoryPercentage: number
  /**
   * The percentage of the bar width in the category width.
   * @public
   * @type number
   * @default 0.8
   */
  barPercentage: number

  /**
   * The bar sets of the BarChart.
   */
  barSets: Rect[][]

  /**
   * Create a BarChart.
   * @public
   * @constructor
   * @param data - The data of the BarChart.
   * @param options - The options of the BarChart.
   */
  constructor(
    public data: BarChartData,
    options?: BarChartOptions,
  ) {
    options ??= {}
    super(data, {
      gridAlign: true,
      edgeOffset: !(options.gridAlign ?? true),
      ...options,
    })

    this.categoryPercentage = options.categoryPercentage ?? 0.8
    this.barPercentage = options.barPercentage ?? 0.8

    if (this.layout.indexAxis === 'x') {
      const gridSize = this.layout.index.interval
        / (this.layout.index.max - this.layout.index.min) * this.layout.size.width
      const categorySize = gridSize * this.categoryPercentage
      const barSize = (categorySize / this.data.datasets.length) * this.barPercentage
      this.barSets = this.data.datasets.map((set, setIndex) => {
        set.style.backgroundColor ??= Color.WHITE.withAlpha(0.2)
        set.style.borderColor ??= Color.WHITE
        set.style.borderWidth ??= 1
        set.style.border ??= true
        return set.data.map((unit, index) => {
          return new Rect(
            [
              (this.layout.index.pos[index] - this.layout.index.interval / 2 - this.layout.index.min)
              / (this.layout.index.max - this.layout.index.min) * this.layout.size.width
              + (gridSize - categorySize) / 2 + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2,
              this.layout.size.height - ((unit.cross * this.progress - this.layout.cross.min) * this.layout.size.height)
              / (this.layout.cross.max - this.layout.cross.min),
            ],
            [
              (this.layout.index.pos[index] - this.layout.index.interval / 2 - this.layout.index.min)
              / (this.layout.index.max - this.layout.index.min) * this.layout.size.width
              + (gridSize - categorySize) / 2 + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2
              + barSize,
              this.layout.size.height - (0 - this.layout.cross.min)
              / (this.layout.cross.max - this.layout.cross.min) * this.layout.size.height,
            ],
            {
              style: {
                fillColor: unit.style.backgroundColor ?? set.style.backgroundColor,
                borderColor: unit.style.borderColor ?? set.style.borderColor,
                borderWidth: unit.style.borderWidth ?? set.style.borderWidth,
                border: unit.style.border ?? set.style.border,
              },
            },
          )
        })
      })
    }
    else {
      const gridSize = this.layout.size.height / this.data.labels.length
      const categorySize = gridSize * this.categoryPercentage
      const barSize = (categorySize / this.data.datasets.length) * this.barPercentage
      this.barSets = this.data.datasets.map((set, setIndex) => {
        set.style.backgroundColor ??= Color.WHITE.withAlpha(0.2)
        set.style.borderColor ??= Color.WHITE
        set.style.borderWidth ??= 1
        set.style.border ??= true
        return set.data.map((unit, index) => {
          return new Rect(
            [
              (0 - this.layout.cross.min) / (this.layout.cross.max - this.layout.cross.min) * this.layout.size.width,
              (index * this.layout.size.height) / this.data.labels.length
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2,
            ],
            [
              ((unit.cross * this.progress - this.layout.cross.min) * this.layout.size.width)
              / (this.layout.cross.max - this.layout.cross.min),
              (index * this.layout.size.height) / this.data.labels.length
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2
              + barSize,
            ],
            {
              style: {
                fillColor: unit.style.backgroundColor ?? set.style.backgroundColor,
                borderColor: unit.style.borderColor ?? set.style.borderColor,
                borderWidth: unit.style.borderWidth ?? set.style.borderWidth,
                border: unit.style.border ?? set.style.border,
              },
            },
          )
        })
      })
    }

    this.add(...this.barSets.flat())
  }

  draw(_canvas: Canvas) {
    super.draw(_canvas)
    if (this.layout.indexAxis === 'x') {
      this.barSets.forEach((set, setIndex) => {
        set.forEach((bar, index) => {
          bar.from[1] = this.layout.size.height
          - ((this.data.datasets[setIndex].data[index].cross * this.progress - this.layout.cross.min) * this.layout.size.height)
          / (this.layout.cross.max - this.layout.cross.min)
        })
      })
    }
    else {
      this.barSets.forEach((set, setIndex) => {
        set.forEach((bar, index) => {
          bar.to[0] = ((this.data.datasets[setIndex].data[index].cross * this.progress - this.layout.cross.min) * this.layout.size.width)
          / (this.layout.cross.max - this.layout.cross.min)
        })
      })
    }
  }
}
