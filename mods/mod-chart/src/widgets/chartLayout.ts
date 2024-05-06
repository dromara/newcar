import { Line, Rect, Text } from '@newcar/basic'
import type { WidgetStyle } from '@newcar/core'
import type { Paint } from 'canvaskit-wasm'
import { Color } from '@newcar/utils'
import stringWidth from 'string-width'
import type { BaseChartData, BaseChartOptions } from './baseChart'
import { BaseChart } from './baseChart'

export interface ChartLayoutOptions extends BaseChartOptions {
}

export interface ChartLayoutStyle extends WidgetStyle {
}

interface ChartAxis {
  suggestedMin: number
  suggestedMax: number
  gridColor: Color
  gridWidth: number
  min: number
  max: number
  interval: number
  pos: number[]
  posLine?: number[]
  axis?: Line
  ticks: Line[]
  grids: Line[]
  labels: Text[]
}

export class ChartLayout extends BaseChart {
  declare style: ChartLayoutStyle
  size: {
    width: number
    height: number
  }

  indexAxis: 'x' | 'y'
  endColumn: boolean
  edgeOffset: boolean

  paint: Paint
  legends: Rect[]
  legendLabels: Text[]

  index: ChartAxis
  cross: ChartAxis

  constructor(public data: BaseChartData, options?: ChartLayoutOptions) {
    options ??= {}
    super(options)
    this.size = options.size ?? { width: 300, height: 300 }
    this.indexAxis = options.indexAxis ?? 'x'
    this.endColumn = options.endColumn ?? true
    this.edgeOffset = options.edgeOffset ?? false

    this.index = {
      suggestedMin: options.axis?.index?.suggestedMin
      ?? options.suggestedMin
      ?? (options.axis?.index?.beginAtZero ?? true)
        ? 0
        : Number.MAX_VALUE,
      suggestedMax: options.axis?.index?.suggestedMax
      ?? options.suggestedMax
      ?? (options.axis?.index?.beginAtZero ?? true)
        ? Number.MIN_VALUE
        : 0,
      gridColor: options.axis?.index?.gridColor ?? options.gridColor ?? Color.WHITE,
      gridWidth: options.axis?.index?.gridWidth ?? options.gridWidth ?? 1,
      min: 0,
      max: 0,
      interval: 0,
      pos: [],
      posLine: [],
      ticks: [],
      grids: [],
      labels: [],
    }

    this.index.axis = new Line(
      [0, 0],
      [0, this.size.height],
      {
        style: {
          color: this.index.gridColor,
          width: this.index.gridWidth,
          transparency: 0.6,
        },
      },
    )

    if (data.labels) {
      this.index.min = 0
      this.index.max = this.endColumn ? data.labels.length : data.labels.length - 1
      this.index.interval = 1
      for (let i = 0; i < data.labels.length; i++)
        this.index.pos.push(this.endColumn ? i + 0.5 : i)
      for (let i = 0; i < data.labels.length; i++)
        this.index.posLine.push(i)
      if (this.endColumn)
        this.index.posLine.push(data.labels.length)
      if (this.edgeOffset) {
        this.index.min -= 0.5
        this.index.max += 0.5
        this.index.posLine.unshift(-0.5)
        this.index.posLine.push(data.labels.length - 0.5)
      }
    }
    else {
      this.generateAxisRange(
        this.index,
        data.datasets.flatMap(set => (set.data.map(unit => (unit.index)))),
      )
      this.index.posLine = this.index.pos
    }

    this.cross = {
      suggestedMin: options.axis?.cross?.suggestedMin
      ?? options.suggestedMin
      ?? (options.axis?.cross?.beginAtZero ?? true)
        ? 0
        : Number.MAX_VALUE,
      suggestedMax: options.axis?.cross?.suggestedMax
      ?? options.suggestedMax
      ?? (options.axis?.cross?.beginAtZero ?? true)
        ? Number.MIN_VALUE
        : 0,
      gridColor: options.axis?.cross?.gridColor ?? options.gridColor ?? Color.WHITE,
      gridWidth: options.axis?.cross?.gridWidth ?? options.gridWidth ?? 1,
      min: 0,
      max: 0,
      interval: 0,
      pos: [],
      ticks: [],
      grids: [],
      labels: [],
    }

    this.cross.axis = new Line(
      [0, this.size.height],
      [this.size.width, this.size.height],
      {
        style: {
          color: this.cross.gridColor,
          width: this.cross.gridWidth,
          transparency: 0.6,
        },
      },
    )

    this.generateAxisRange(
      this.cross,
      data.datasets.flatMap(set => (set.data.map(unit => (unit.cross)))),
    )

    if (this.indexAxis === 'x') {
      this.index.axis.from = [0, this.size.height]
      this.index.axis.to = [this.size.width, this.size.height]

      this.index.pos.forEach((pos) => {
        this.index.labels.push(
          new Text(
            [
              {
                text: pos.toString(),
                style: {
                  color: this.index.gridColor,
                  fontSize: 16,
                },
              },
            ],
            {
              x: (pos - this.index.interval / 2 - this.index.min) / (this.index.max - this.index.min) * this.size.width,
              y: this.size.height + 4,
              style: {
                width: this.index.interval / (this.index.max - this.index.min) * this.size.width,
                textAlign: 'center',
              },
            },
          ),
        )
      })

      this.index.posLine.forEach((pos) => {
        this.index.ticks.push(
          new Line(
            [(pos - this.index.min) / (this.index.max - this.index.min) * this.size.width, this.size.height],
            [(pos - this.index.min) / (this.index.max - this.index.min) * this.size.width, this.size.height + 5],
            {
              style: {
                color: this.index.gridColor,
                width: this.index.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
        this.index.grids.push(
          new Line(
            [(pos - this.index.min) / (this.index.max - this.index.min) * this.size.width, 0],
            [(pos - this.index.min) / (this.index.max - this.index.min) * this.size.width, this.size.height],
            {
              style: {
                color: this.index.gridColor,
                width: this.index.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
      })

      if (data.labels) {
        this.index.pos.forEach((pos, index) => {
          this.index.labels[index] = new Text(
            [
              {
                text: data.labels[index],
                style: {
                  color: this.index.gridColor,
                  fontSize: 16,
                },
              },
            ],
            {
              x: (pos - this.index.interval / 2 - this.index.min) / (this.index.max - this.index.min) * this.size.width,
              y: this.size.height + 4,
              style: {
                width: this.index.interval / (this.index.max - this.index.min) * this.size.width,
                textAlign: 'center',
              },
            },
          )
        })
      }

      this.cross.axis.from = [0, this.size.height]
      this.cross.axis.to = [0, 0]

      for (let i = this.cross.min; i <= this.cross.max; i += this.cross.interval) {
        this.cross.ticks.push(
          new Line(
            [0, this.size.height - (i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.height],
            [-5, this.size.height - (i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.height],
            {
              style: {
                color: this.cross.gridColor,
                width: this.cross.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
        this.cross.labels.push(
          new Text(
            [
              {
                text: i.toString(),
                style: {
                  color: this.cross.gridColor,
                  fontSize: 16,
                },
              },
            ],
            {
              x: -8 - stringWidth(i.toString()) * 12,
              y: this.size.height - 8 - (i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.height,
              style: {
                width: stringWidth(i.toString()) * 12,
                textAlign: 'right',
              },
            },
          ),
        )
        this.cross.grids.push(
          new Line(
            [0, this.size.height - (i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.height],
            [this.size.width, this.size.height - (i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.height],
            {
              style: {
                color: this.cross.gridColor,
                width: this.cross.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
      }
    }
    else {
      this.index.axis.from = [0, this.size.height]
      this.index.axis.to = [0, 0]

      this.index.pos.forEach((pos, index) => {
        this.index.labels[index] = new Text(
          [
            {
              text: pos.toString(),
              style: {
                color: this.index.gridColor,
                fontSize: 16,
              },
            },
          ],
          {
            x: -8 - stringWidth(pos.toString()) * 12,
            y: this.size.height - 8 - (pos - this.index.min) / (this.index.max - this.index.min) * this.size.height,
            style: {
              width: stringWidth(pos.toString()) * 12,
              textAlign: 'right',
            },
          },
        )
      })

      this.index.posLine.forEach((pos) => {
        this.index.ticks.push(
          new Line(
            [0, this.size.height - (pos - this.index.min) / (this.index.max - this.index.min) * this.size.height],
            [-5, this.size.height - (pos - this.index.min) / (this.index.max - this.index.min) * this.size.height],
            {
              style: {
                color: this.index.gridColor,
                width: this.index.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
        this.index.grids.push(
          new Line(
            [0, this.size.height - (pos - this.index.min) / (this.index.max - this.index.min) * this.size.height],
            [this.size.width, this.size.height - (pos - this.index.min) / (this.index.max - this.index.min) * this.size.height],
            {
              style: {
                color: this.index.gridColor,
                width: this.index.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
      })

      if (data.labels) {
        this.index.pos.forEach((pos, index) => {
          this.index.labels[index] = new Text(
            [
              {
                text: data.labels[index],
                style: {
                  color: this.index.gridColor,
                  fontSize: 16,
                },
              },
            ],
            {
              x: -8 - stringWidth(data.labels[index]) * 12,
              y: this.size.height - 8 - (pos - this.index.min) / (this.index.max - this.index.min) * this.size.height,
              style: {
                width: stringWidth(data.labels[index]) * 12,
                textAlign: 'right',
              },
            },
          )
        })
      }

      this.cross.axis.from = [0, this.size.height]
      this.cross.axis.to = [this.size.width, this.size.height]

      for (let i = this.cross.min; i <= this.cross.max; i += this.cross.interval) {
        this.cross.ticks.push(
          new Line(
            [(i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.width, this.size.height],
            [(i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.width, this.size.height + 5],
            {
              style: {
                color: this.cross.gridColor,
                width: this.cross.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
        this.cross.labels.push(
          new Text(
            [
              {
                text: i.toString(),
                style: {
                  color: this.cross.gridColor,
                  fontSize: 16,
                },
              },
            ],
            {
              x: (i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.width - stringWidth(i.toString()) * 6,
              y: this.size.height + 4,
              style: {
                width: stringWidth(i.toString()) * 12,
                textAlign: 'center',
              },
            },
          ),
        )
        this.cross.grids.push(
          new Line(
            [(i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.width, 0],
            [(i - this.cross.min) / (this.cross.max - this.cross.min) * this.size.width, this.size.height],
            {
              style: {
                color: this.cross.gridColor,
                width: this.cross.gridWidth,
                transparency: 0.3,
              },
            },
          ),
        )
      }
    }

    this.add(
      this.index.axis,
      ...this.index.ticks,
      ...this.index.labels,
      ...this.index.grids,
      this.cross.axis,
      ...this.cross.ticks,
      ...this.cross.labels,
      ...this.cross.grids,
    )

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
                color: this.index.gridColor,
                fontSize: 16,
              },
            },
          ],
          {
            x: this.size.width / 2 - legendWidthPrefix[this.data.datasets.length] / 2 + legendWidthPrefix[i] + 24,
            y: -27,
            style: {
              width: stringWidth(this.data.datasets[i].label) * 12,
              textAlign: 'center',
            },
          },
        ),
      )
    }

    this.add(
      ...this.legends,
      ...this.legendLabels,
    )
  }

  private generateAxisRange(axis: ChartAxis, data: number[]) {
    const minDataValue = Math.min(...data, axis.suggestedMin)
    const maxDataValue = Math.max(...data, axis.suggestedMax)
    const range = maxDataValue - minDataValue
    const magnitude = Math.floor(Math.log10(range))
    axis.interval = 10 ** magnitude

    if (range / axis.interval < 5)
      axis.interval /= (Math.ceil(range / axis.interval) === 2 ? 4 : 2)

    axis.min = Math.floor(minDataValue / axis.interval) * axis.interval
    axis.max = Math.ceil(maxDataValue / axis.interval) * axis.interval

    for (let i = axis.min; i <= axis.max; i += axis.interval)
      axis.pos.push(i)
  }
}
