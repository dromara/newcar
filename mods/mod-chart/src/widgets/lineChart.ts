import { Circle } from '@newcar/basic'
import { Color } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'
import type { StrokeCap, StrokeJoin } from '@newcar/core'
import { str2BlendMode, str2StrokeCap, str2StrokeJoin } from '@newcar/core'
import { bezierControlPoints } from '../utils/bezierControlPoints'
import type {
  BaseSimpleChartData,
  BaseSimpleChartDataSet,
  BaseSimpleChartOptions,
  BaseSimpleChartStyle,
} from './baseSimpleChart'
import {
  BaseSimpleChart,
} from './baseSimpleChart'
import type { ChartDataUnit } from './chartDataUnit'

export interface LineChartOptions extends BaseSimpleChartOptions {}

export interface LineChartStyle extends BaseSimpleChartStyle {
  dotSize?: number
  borderDashInterval?: number[]
  borderDashOffset?: number
  borderJoinStyle?: StrokeJoin
  borderCapStyle?: StrokeCap
  lineWidth?: number
  tension?: number
  showLine?: boolean
}

export interface LineChartDataSet extends BaseSimpleChartDataSet {
  data: ChartDataUnit<LineChartStyle>[]
  style?: LineChartStyle
}

export interface LineChartData extends BaseSimpleChartData {
  datasets: LineChartDataSet[]
}

export class LineChart extends BaseSimpleChart {
  declare style: LineChartStyle
  categoryPercentage: number
  barPercentage: number

  paths: Path[]
  strokePaints: Paint[]
  dotSets: Circle[][]

  constructor(
    public data: LineChartData,
    options?: LineChartOptions,
  ) {
    options ??= {
      size: {
        width: 200,
        height: 200,
      },
    }
    super(data, {
      ...options,
      endColumn: false,
    })

    this.dotSets = this.data.datasets.map((set) => {
      set.style.backgroundColor ??= Color.WHITE.withAlpha(0.2)
      set.style.borderColor ??= Color.WHITE
      set.style.borderWidth ??= 1
      set.style.border ??= true
      set.style.dotSize ??= 5
      if (this.layout.indexAxis === 'x') {
        const gridSize = this.layout.size.width / (this.data.labels.length - 1)
        return set.data.map((unit, index) => {
          return new Circle(
            unit.style.dotSize ?? set.style.dotSize,
            {
              x: index * gridSize,
              y: this.layout.size.height
              - ((unit.value * this.progress - this.layout.min) * this.layout.size.height)
              / (this.layout.max - this.layout.min),
              style: {
                fillColor: unit.style.backgroundColor ?? set.style.backgroundColor,
                borderColor: unit.style.borderColor ?? set.style.borderColor,
                borderWidth: unit.style.borderWidth ?? set.style.borderWidth,
                border: unit.style.border ?? set.style.border,
              },
            },
          )
        })
      }
      else {
        const gridSize = this.layout.size.height / (this.data.labels.length - 1)
        return set.data.map((unit, index) => {
          return new Circle(
            unit.style.dotSize ?? set.style.dotSize,
            {
              x: ((unit.value * this.progress - this.layout.min) * this.layout.size.width) / (this.layout.max - this.layout.min),
              y: this.layout.size.height - index * gridSize,
              style: {
                fillColor: unit.style.backgroundColor ?? set.style.backgroundColor,
                borderColor: unit.style.borderColor ?? set.style.borderColor,
                borderWidth: unit.style.borderWidth ?? set.style.borderWidth,
                border: unit.style.border ?? set.style.border,
              },
            },
          )
        })
      }
    })

    this.add(this.layout, ...this.dotSets.flat())
  }

  init(ck: CanvasKit) {
    super.init(ck)
    this.paths = []
    this.strokePaints = []

    for (let i = 0; i < this.dotSets.length; i++) {
      const borderColor = this.data.datasets[i].style.borderColor
        ?? (this.data.datasets[i].data[0].style.borderColor ?? Color.WHITE)
      const lineWidth = this.data.datasets[i].style.lineWidth
        ?? (this.data.datasets[i].data[0].style.lineWidth ?? 3)
      const tension = this.data.datasets[i].style.tension
        ?? (this.data.datasets[i].data[0].style.tension ?? 0.1)
      this.paths[i] = new ck.Path()
      const controlPoints = bezierControlPoints(this.dotSets[i], tension, false)
      for (let j = 0; j < this.dotSets[i].length; j++) {
        if (j === 0) {
          this.paths[i].moveTo(this.dotSets[i][j].x, this.dotSets[i][j].y)
        }
        else {
          this.paths[i].cubicTo(
            controlPoints[j - 1].next.x,
            controlPoints[j - 1].next.y,
            controlPoints[j].previous.x,
            controlPoints[j].previous.y,
            this.dotSets[i][j].x,
            this.dotSets[i][j].y,
          )
          // this.paths[i].lineTo(this.dotSets[i][j].x, this.dotSets[i][j].y)
        }
      }
      // Stroke
      this.strokePaints[i] = new ck.Paint()
      this.strokePaints[i].setStyle(ck.PaintStyle.Stroke)
      this.strokePaints[i].setColor(borderColor.toFloat4())
      this.strokePaints[i].setStrokeWidth(lineWidth)
      this.strokePaints[i].setStrokeJoin(str2StrokeJoin(ck, this.data.datasets[i].style.borderJoinStyle ?? 'miter'))
      this.strokePaints[i].setStrokeCap(str2StrokeCap(ck, this.data.datasets[i].style.borderCapStyle ?? 'butt'))
      try {
        const dash = ck.PathEffect.MakeDash(
          this.style.borderDashInterval,
          this.style.borderDashOffset,
        )
        this.strokePaints[i].setPathEffect(dash)
      }
      catch {}

      // Alpha
      this.strokePaints[i].setAlphaf(this.style.transparency * this.data.datasets[i].style.borderColor.alpha)

      // Blend Mode
      this.strokePaints[i].setBlendMode(str2BlendMode(ck, this.style.blendMode))

      // AntiAlias
      this.strokePaints[i].setAntiAlias(this.style.antiAlias)
    }
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'progress': {
        if (this.layout.indexAxis === 'x') {
          const gridSize = this.layout.size.width / (this.data.labels.length - 1)
          for (let i = 0; i < this.dotSets.length; i++) {
            for (let j = 0; j < this.dotSets[i].length; j++) {
              this.dotSets[i][j].y = this.layout.size.height
              - ((this.data.datasets[i].data[j].value * this.progress - this.layout.min) * this.layout.size.height)
              / (this.layout.max - this.layout.min)
              this.dotSets[i][j].x = j * gridSize
            }
          }
        }
        else {
          const gridSize = this.layout.size.height / (this.data.labels.length - 1)
          for (let i = 0; i < this.dotSets.length; i++) {
            for (let j = 0; j < this.dotSets[i].length; j++) {
              this.dotSets[i][j].x = ((this.data.datasets[i].data[j].value * this.progress - this.layout.min) * this.layout.size.width) / (this.layout.max - this.layout.min)
              this.dotSets[i][j].y = this.layout.size.height - j * gridSize
            }
          }
        }

        this.paths = []

        for (let i = 0; i < this.dotSets.length; i++) {
          const tension = this.data.datasets[i].style.tension
            ?? (this.data.datasets[i].data[0].style.tension ?? 0.1)
          this.paths[i] = new ck.Path()
          this.paths[i].moveTo(0, 0)
          const controlPoints = bezierControlPoints(this.dotSets[i], tension, false)
          for (let j = 0; j < this.dotSets[i].length; j++) {
            if (j === 0) {
              this.paths[i].moveTo(this.dotSets[i][j].x, this.dotSets[i][j].y)
            }
            else {
              this.paths[i].cubicTo(
                controlPoints[j - 1].next.x,
                controlPoints[j - 1].next.y,
                controlPoints[j].previous.x,
                controlPoints[j].previous.y,
                this.dotSets[i][j].x,
                this.dotSets[i][j].y,
              )
              // this.paths[i].lineTo(this.dotSets[i][j].x, this.dotSets[i][j].y)
            }
          }
        }
      }
    }
  }

  draw(canvas: Canvas): void {
    for (let i = 0; i < this.paths.length; i++) {
      const showLine = this.data.datasets[i].style.showLine ?? true
      if (showLine)
        canvas.drawPath(this.paths[i], this.strokePaints[i])
    }
  }
}
