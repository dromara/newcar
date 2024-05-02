import { Figure, Rect } from '@newcar/basic'
import { Color } from '@newcar/utils'
import type { CanvasKit, Paint } from 'canvaskit-wasm'
import type { ChartData, ChartOption, ChartStyle } from '../utils'
import { ChartLayout } from './chartLayout'

export interface BarChartOptions extends ChartOption {
  categoryPercentage?: number
  barPercentage?: number
}

export interface BarChartStyle extends ChartStyle {
  borderRadius?: number
}

export class BarChart extends Figure {
  declare style: BarChartStyle
  categoryPercentage: number
  barPercentage: number

  paint: Paint
  layout: ChartLayout
  barSets: Rect[][]

  constructor(
    public data: ChartData<BarChartStyle>,
    options?: BarChartOptions,
  ) {
    options ??= {
      size: {
        width: 200,
        height: 200,
      },
    }
    super(options)
    options.x = 0
    options.y = 0
    this.layout = new ChartLayout(data, options)

    this.categoryPercentage = options.categoryPercentage ?? 0.8
    this.barPercentage = options.barPercentage ?? 0.8

    if (this.layout.indexAxis === 'x') {
      const gridSize = this.layout.size.width / this.data.labels.length
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
              (index * this.layout.size.width) / this.data.labels.length
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2,
              this.layout.size.height - (unit.value * this.progress * this.layout.size.height) / this.layout.max,
            ],
            [
              (index * this.layout.size.width) / this.data.labels.length
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2
              + barSize,
              this.layout.size.height - this.layout.style.gridWidth / 2,
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
              0,
              (index * this.layout.size.height) / this.data.labels.length
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2
              + this.layout.style.gridWidth / 2,
            ],
            [
              (unit.value * this.progress * this.layout.size.width) / this.layout.max,
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

    this.add(this.layout, ...this.barSets.flat())
  }

  predraw(_ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'progress': {
        if (this.layout.indexAxis === 'x') {
          this.barSets.forEach((set, setIndex) => {
            set.forEach((bar, index) => {
              bar.from[1] = this.layout.size.height - (this.data.datasets[setIndex].data[index].value * this.progress * this.layout.size.height) / this.layout.max
            })
          })
        }
        else {
          this.barSets.forEach((set, setIndex) => {
            set.forEach((bar, index) => {
              bar.from[0] = (this.data.datasets[setIndex].data[index].value * this.progress * this.layout.size.width) / this.layout.max
            })
          })
        }
      }
    }
  }
}
