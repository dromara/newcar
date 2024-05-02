import { Figure, Line, Rect, Text } from '@newcar/basic'
import type { WidgetStyle } from '@newcar/core'
import type { Paint } from 'canvaskit-wasm'
import { Color } from '@newcar/utils'
import stringWidth from 'string-width'
import type { ChartData, ChartOption, ChartStyle } from '../utils'

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
  legends: Rect[]
  legendLabels: Text[]

  constructor(public data: ChartData<ChartStyle>, options?: ChartLayoutOptions) {
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
      ...data.datasets.flatMap(set => set.data).flatMap(unit => unit.value),
      options.suggestedMin ?? 0,
    )
    const maxDataValue = options.suggestedMax
      ? Math.max(
        ...data.datasets.flatMap(set => set.data).flatMap(unit => unit.value),
        options.suggestedMax,
      )
      : Math.max(
        ...data.datasets.flatMap(set => set.data).flatMap(unit => unit.value),
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
      this.xGrids = this.data.labels.map((_label, index) => {
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
      this.yLabels = []

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
              x: -8 - stringWidth(i.toString()) * 12,
              y:
                this.size.height - 8
                - ((i - this.min) / (this.max - this.min)) * this.size.height,
              style: {
                width: stringWidth(i.toString()) * 12,
                textAlign: 'right',
              },
            },
          ),
        )
      }
    }
    else {
      this.yGrids = this.data.labels.map((_label, index) => {
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
            x: -8 - stringWidth(label) * 12,
            y: ((index + 0.5) * this.size.height) / this.data.labels.length - 8,
            style: {
              width: stringWidth(label) * 12,
              textAlign: 'right',
            },
          },
        )
      })

      this.xGrids = []
      this.xLabels = []

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

    this.legends = []
    this.legendLabels = []
    const legendWidthPrefix = [0]
    for (let i = 1; i <= this.data.datasets.length; i++) {
      legendWidthPrefix[i] = legendWidthPrefix[i - 1]
      legendWidthPrefix[i] += stringWidth(this.data.datasets[i - 1].label) * 12 + 24
    }
    for (let i = 0; i < this.data.datasets.length; i++) {
      this.legends.push(
        new Rect(
          [
            this.size.width / 2 - legendWidthPrefix[this.data.datasets.length] / 2 + legendWidthPrefix[i],
            -26,
          ],
          [
            this.size.width / 2 - legendWidthPrefix[this.data.datasets.length] / 2 + legendWidthPrefix[i] + 20,
            -10,
          ],
          {
            style: {
              fillColor: this.data.datasets[i].style.backgroundColor
              ?? (this.data.datasets[i].data[0].style.backgroundColor ?? Color.WHITE),
              borderColor: this.data.datasets[i].style.borderColor
              ?? (this.data.datasets[i].data[0].style.borderColor ?? Color.WHITE),
              borderWidth: this.data.datasets[i].style.borderWidth
              ?? (this.data.datasets[i].data[0].style.borderWidth ?? 1),
              border: true,
            },
          },
        ),
      )
      this.legendLabels.push(
        new Text(
          [
            {
              text: this.data.datasets[i].label,
              style: {
                color: this.style.gridColor,
                fontSize: 16,
              },
            },
          ],
          {
            x: this.size.width / 2 - legendWidthPrefix[this.data.datasets.length] / 2 + legendWidthPrefix[i] + 24,
            y: -28,
            style: {
              width: stringWidth(this.data.datasets[i].label) * 12,
              textAlign: 'center',
            },
          },
        ),
      )
    }

    this.add(
      this.xAxis,
      this.yAxis,
      ...this.xGrids,
      ...this.xLabels,
      ...this.yGrids,
      ...this.yLabels,
      ...this.legends,
      ...this.legendLabels,
    )
  }
}
