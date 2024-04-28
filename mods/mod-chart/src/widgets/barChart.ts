import { Figure, Rect } from '@newcar/basic'
import type { WidgetStyle } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { CanvasKit, Paint } from 'canvaskit-wasm'
import type { ChartData } from '../utils/chartData'
import type { ChartOption } from '../utils/chartOption'
import { ChartLayout } from './chartLayout'

export interface BarChartOptions extends ChartOption {
  categoryPercentage?: number
  barPercentage?: number
}

export interface BarChartStyle extends WidgetStyle {}

export class BarChart extends Figure {
  declare style: BarChartStyle
  categoryPercentage: number
  barPercentage: number

  paint: Paint
  layout: ChartLayout
  barSets: Rect[][]

  constructor(
    public data: ChartData,
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
        return set.data.map((value, index) => {
          return new Rect(
            [
              (index * this.layout.size.width) / this.data.labels.length
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2,
              this.layout.size.height - (value * this.layout.size.height) / this.layout.max,
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
                fillColor: set.backgroundColor ? set.backgroundColor[index] : Color.WHITE,
                borderColor: set.borderColor ? set.borderColor[index] : Color.WHITE,
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
        return set.data.map((value, index) => {
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
              (value * this.layout.size.width) / this.layout.max,
              (index * this.layout.size.height) / this.data.labels.length
              + (gridSize - categorySize) / 2
              + (setIndex * categorySize) / this.data.datasets.length
              + (categorySize / this.data.datasets.length - barSize) / 2
              + barSize,
            ],
            {
              style: {
                fillColor: set.backgroundColor ? set.backgroundColor[index] : Color.WHITE,
                borderColor: set.borderColor ? set.borderColor[index] : Color.WHITE,
              },
            },
          )
        })
      })
    }

    this.add(this.layout, ...this.barSets.flat())
    // this.endSide = new Line(this.basis.from, [this.endX, this.endY])
    // this.add(this.basis, this.endSide)
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
  }

  // predraw(ck: CanvasKit, propertyChanged: string): void {
  //   switch (propertyChanged) {
  //     case 'value': {
  //       this.endX = this.basis.to[0] + length * Math.cos(this.value)
  //       this.endY = this.basis.to[1] + length * Math.sin(this.value)
  //       this.endSide.to = [this.endX, this.endY]
  //       break
  //     }
  //   }
  // }
}
