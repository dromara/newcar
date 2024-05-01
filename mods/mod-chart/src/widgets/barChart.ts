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
              this.layout.size.height - (unit.value * this.layout.size.height) / this.layout.max,
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
              (unit.value * this.layout.size.width) / this.layout.max,
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
