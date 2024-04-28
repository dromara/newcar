import { Figure, Line, Text } from '@newcar/basic'
import type { WidgetStyle } from '@newcar/core'
import type { CanvasKit, Paint } from 'canvaskit-wasm'
import { Color } from '@newcar/utils'
import type { ChartData } from '../utils/chartData'
import type { ChartOption } from '../utils/chartOption'

export interface ChartLayoutOptions extends ChartOption {
}

export interface ChartLayoutStyle extends WidgetStyle {
  gridColor?: Color
  gridWidth?: number
}

export class ChartLayout extends Figure {
  declare style: ChartLayoutStyle
  size: {
    width: number
    height: number
  }

  indexAxis: 'x' | 'y'

  paint: Paint
  min: number
  max: number
  interval: number
  xAxis: Line
  yAxis: Line
  xGrids: Line[]
  yGrids: Line[]
  xLabels: Text[]
  yLabels: Text[]

  constructor(public data: ChartData, options?: ChartLayoutOptions) {
    options ??= {
      size: {
        width: 200,
        height: 200,
      },
    }
    super(options)
    this.size = options.size
    this.indexAxis = options.indexAxis ?? 'x'
    this.style.gridColor = options.gridColor ?? Color.WHITE
    this.style.gridWidth = options.gridWidth ?? 1

    const minDataValue = Math.min(
      ...data.datasets.flatMap((set) => {
        return set.data
      }),
      options.suggestedMin ?? 0,
    )
    const maxDataValue = options.suggestedMax
      ? Math.max(
        ...data.datasets.flatMap((set) => {
          return set.data
        }),
        options.suggestedMax,
      )
      : Math.max(
        ...data.datasets.flatMap((set) => {
          return set.data
        }),
      )
    const range = maxDataValue - minDataValue
    const magnitude = Math.floor(Math.log10(range))
    this.interval = 10 ** magnitude

    if (range / this.interval < 5)
      this.interval /= (Math.ceil(range / this.interval) === 2 ? 4 : 2)

    this.min = Math.floor(minDataValue / this.interval) * this.interval
    this.max = Math.ceil(maxDataValue / this.interval) * this.interval

    this.xAxis = new Line(
      [-5, this.size.height],
      [this.size.width, this.size.height],
      {
        style: {
          color: this.style.gridColor,
          width: this.style.gridWidth,
          transparency: 0.6,
        },
      },
    )
    this.yAxis = new Line([0, this.size.height + 5], [0, 0], {
      style: {
        color: this.style.gridColor,
        width: this.style.gridWidth,
        transparency: 0.6,
      },
    })

    if (this.indexAxis === 'x') {
      this.xGrids = this.data.labels.map((label, index) => {
        return new Line(
          [((index + 1) * this.size.width) / this.data.labels.length, 0],
          [
            ((index + 1) * this.size.width) / this.data.labels.length,
            this.size.height + 5,
          ],
          {
            style: {
              color: this.style.gridColor,
              width: this.style.gridWidth,
              transparency: 0.3,
            },
          },
        )
      })
      this.xLabels = this.data.labels.map((label, index) => {
        return new Text(
          [
            {
              text: label,
              style: {
                color: this.style.gridColor,
                fontSize: 16,
              },
            },
          ],
          {
            x: (index * this.size.width) / this.data.labels.length,
            y: this.size.height + 4,
            style: {
              width: this.size.width / this.data.labels.length,
              textAlign: 'center',
            },
          },
        )
      })

      this.yGrids = []

      for (let i = this.min; i <= this.max; i += this.interval) {
        this.yGrids.push(
          new Line(
            [
              -5,
              this.size.height
              - ((i - this.min) / (this.max - this.min)) * this.size.height,
            ],
            [
              this.size.width,
              this.size.height
              - ((i - this.min) / (this.max - this.min)) * this.size.height,
            ],
            {
              style: {
                color: this.style.gridColor,
                width: this.style.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
      }

      this.yLabels = []

      for (let i = this.min; i <= this.max; i += this.interval) {
        this.yLabels.push(
          new Text(
            [
              {
                text: i.toString(),
                style: {
                  color: this.style.gridColor,
                  fontSize: 16,
                },
              },
            ],
            {
              x: -8 - i.toString().length * 12,
              y:
                this.size.height - 8
                - ((i - this.min) / (this.max - this.min)) * this.size.height,
              style: {
                width: i.toString().length * 12,
                textAlign: 'right',
              },
            },
          ),
        )
      }
    }
    else {
      this.yGrids = this.data.labels.map((label, index) => {
        return new Line(
          [-5, (index * this.size.height) / this.data.labels.length],
          [
            this.size.width,
            (index * this.size.height) / this.data.labels.length,
          ],
          {
            style: {
              color: this.style.gridColor,
              transparency: 0.3,
            },
          },
        )
      })
      this.yLabels = this.data.labels.map((label, index) => {
        return new Text(
          [
            {
              text: label,
              style: {
                color: this.style.gridColor,
                fontSize: 16,
              },
            },
          ],
          {
            x: -8 - label.length * 12,
            y: ((index + 0.5) * this.size.height) / this.data.labels.length - 8,
            style: {
              width: label.length * 12,
              textAlign: 'right',
            },
          },
        )
      })

      this.xGrids = []

      for (let i = this.min; i <= this.max; i += this.interval) {
        this.xGrids.push(
          new Line(
            [
              ((i - this.min) / (this.max - this.min)) * this.size.width,
              0,
            ],
            [
              ((i - this.min) / (this.max - this.min)) * this.size.width,
              this.size.height + 5,
            ],
            {
              style: {
                color: this.style.gridColor,
                transparency: 0.3,
              },
            },
          ),
        )
      }

      this.xLabels = []

      for (let i = this.min; i <= this.max; i += this.interval) {
        this.xLabels.push(
          new Text(
            [
              {
                text: i.toString(),
                style: {
                  color: this.style.gridColor,
                  fontSize: 16,
                },
              },
            ],
            {
              x:
                ((i - this.min) / (this.max - this.min)) * this.size.width - this.size.width / ((this.max - this.min) / this.interval) / 2,
              y: this.size.height + 4,
              style: {
                width: this.size.width / ((this.max - this.min) / this.interval),
                textAlign: 'center',
              },
            },
          ),
        )
      }
    }

    this.add(
      this.xAxis,
      this.yAxis,
      ...this.xGrids,
      ...this.xLabels,
      ...this.yGrids,
      ...this.yLabels,
    )
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    // this.paint.setColor(this.style.borderColor!.withAlpha(0.5).toFloat4())
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
