import { Rect } from '@newcar/basic'
import { Color } from '@newcar/utils'
import type { CanvasKit, Paint } from 'canvaskit-wasm'
import type {
  BaseSimpleChartData,
  BaseSimpleChartDataSet,
  BaseSimpleChartOptions,
  BaseSimpleChartStyle,
} from './baseSimpleChart'
import { BaseSimpleChart } from './baseSimpleChart'
import type { ChartDataUnit } from './chartDataUnit'

export interface BarChartOptions extends BaseSimpleChartOptions {
  categoryPercentage?: number
  barPercentage?: number
}

export interface BarChartStyle extends BaseSimpleChartStyle {
  borderRadius?: number
}

export interface BarChartDataSet extends BaseSimpleChartDataSet {
  data: ChartDataUnit<BarChartStyle>[]
  style?: BarChartStyle
}

export interface BarChartData extends BaseSimpleChartData {
  datasets: BarChartDataSet[]
}

export class BarChart extends BaseSimpleChart {
  declare style: BarChartStyle
  categoryPercentage: number
  barPercentage: number

  paint: Paint
  barSets: Rect[][]

  constructor(
    public data: BarChartData,
    options?: BarChartOptions,
  ) {
    options ??= {}
    super(data, options)

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
              this.layout.size.height - ((unit.value * this.progress - this.layout.cross.min) * this.layout.size.height)
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
              + (categorySize / this.data.datasets.length - barSize) / 2
              + this.layout.style.gridWidth / 2,
            ],
            [
              ((unit.value * this.progress - this.layout.cross.min) * this.layout.size.width)
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

  predraw(_ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'progress': {
        if (this.layout.indexAxis === 'x') {
          this.barSets.forEach((set, setIndex) => {
            set.forEach((bar, index) => {
              bar.from[1] = this.layout.size.height
              - ((this.data.datasets[setIndex].data[index].value * this.progress - this.layout.cross.min) * this.layout.size.height)
              / (this.layout.cross.max - this.layout.cross.min)
            })
          })
        }
        else {
          this.barSets.forEach((set, setIndex) => {
            set.forEach((bar, index) => {
              bar.to[0] = ((this.data.datasets[setIndex].data[index].value * this.progress - this.layout.cross.min) * this.layout.size.width)
              / (this.layout.cross.max - this.layout.cross.min)
            })
          })
        }
      }
    }
  }
}
