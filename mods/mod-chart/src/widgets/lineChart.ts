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
  animateIndex?: boolean
}

export interface LineChartDataSet extends BaseSimpleChartDataSet {
  data: ChartDataUnit<LineChartStyle>[]
  style?: LineChartStyle
}

export interface LineChartData extends BaseSimpleChartData {
  datasets: LineChartDataSet[]
  style?: LineChartStyle
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
    options ??= {}
    super(data, {
      endColumn: false,
      ...options,
    })

    if (data.labels) {
      data.datasets.forEach((set) => {
        set.data.forEach((unit, index) => {
          unit.index = this.layout.index.pos[index]
        })
      })
    }

    this.dotSets = this.data.datasets.map((set) => {
      set.style ??= {}
      set.style.backgroundColor ??= this.data.style?.backgroundColor ?? Color.WHITE.withAlpha(0.2)
      set.style.borderColor ??= this.data.style?.borderColor ?? Color.WHITE
      set.style.borderWidth ??= this.data.style?.borderWidth ?? 1
      set.style.border ??= this.data.style?.border ?? true
      set.style.dotSize ??= this.data.style?.dotSize ?? 5
      if (this.layout.indexAxis === 'x') {
        return set.data.map((unit) => {
          return new Circle(
            unit.weight ?? unit.style.dotSize ?? set.style.dotSize,
            {
              x: (unit.index - this.layout.index.min)
              / (this.layout.index.max - this.layout.index.min) * this.layout.size.width,
              y: this.layout.size.height
              - ((unit.cross * this.progress - this.layout.cross.min) * this.layout.size.height)
              / (this.layout.cross.max - this.layout.cross.min),
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
        return set.data.map((unit) => {
          return new Circle(
            unit.weight ?? unit.style.dotSize ?? set.style.dotSize,
            {
              x: ((unit.cross * this.progress - this.layout.cross.min) * this.layout.size.width)
              / (this.layout.cross.max - this.layout.cross.min),
              y: this.layout.size.height - (unit.index - this.layout.index.min)
              / (this.layout.index.max - this.layout.index.min) * this.layout.size.height,
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

    this.add(...this.dotSets.flat())
  }

  init(ck: CanvasKit) {
    super.init(ck)
    this.paths = []
    this.strokePaints = []

    for (let i = 0; i < this.dotSets.length; i++) {
      const borderColor = this.data.datasets[i].style?.borderColor
        ?? this.data.style?.borderColor ?? Color.WHITE
      const lineWidth = this.data.datasets[i].style?.lineWidth
        ?? this.data.style?.lineWidth ?? 3
      const tension = this.data.datasets[i].style?.tension
        ?? this.data.style?.tension ?? 0.1
      const borderJoinStyle = this.data.datasets[i].style?.borderJoinStyle
        ?? this.data.style?.borderJoinStyle ?? 'miter'
      const borderCapStyle = this.data.datasets[i].style?.borderCapStyle
        ?? this.data.style?.borderCapStyle ?? 'butt'
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
      this.strokePaints[i].setStrokeJoin(str2StrokeJoin(ck, borderJoinStyle ?? 'miter'))
      this.strokePaints[i].setStrokeCap(str2StrokeCap(ck, borderCapStyle ?? 'butt'))
      try {
        const dash = ck.PathEffect.MakeDash(
          this.style.borderDashInterval,
          this.style.borderDashOffset,
        )
        this.strokePaints[i].setPathEffect(dash)
      }
      catch {}

      // Alpha
      this.strokePaints[i].setAlphaf(this.style.transparency * borderColor.alpha)

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
          for (let i = 0; i < this.dotSets.length; i++) {
            for (let j = 0; j < this.dotSets[i].length; j++) {
              this.dotSets[i][j].y = this.layout.size.height
              - (this.data.datasets[i].data[j].cross * this.progress - this.layout.cross.min)
              / (this.layout.cross.max - this.layout.cross.min) * this.layout.size.height
              this.dotSets[i][j].x
                = (this.data.datasets[i].data[j].style?.animateIndex
                ?? this.data.datasets[i].style?.animateIndex
                ?? this.data.style?.animateIndex ?? false)
                  ? (this.data.datasets[i].data[j].index * this.progress - this.layout.index.min) / (this.layout.index.max - this.layout.index.min)
                  * this.layout.size.width
                  : this.dotSets[i][j].x
            }
          }
        }
        else {
          for (let i = 0; i < this.dotSets.length; i++) {
            for (let j = 0; j < this.dotSets[i].length; j++) {
              this.dotSets[i][j].x = (this.data.datasets[i].data[j].cross * this.progress - this.layout.cross.min)
              / (this.layout.cross.max - this.layout.cross.min) * this.layout.size.width
              this.dotSets[i][j].y
                = (this.data.datasets[i].data[j].style?.animateIndex
                ?? this.data.datasets[i].style?.animateIndex
                ?? this.data.style?.animateIndex ?? false)
                  ? this.layout.size.height - (this.data.datasets[i].data[j].index * this.progress - this.layout.index.min)
                  / (this.layout.index.max - this.layout.index.min) * this.layout.size.height
                  : this.dotSets[i][j].y
            }
          }
        }

        for (let i = 0; i < this.dotSets.length; i++) {
          for (let j = 0; j < this.dotSets[i].length; j++) {
            this.dotSets[i][j].radius = this.data.datasets[i].data[j].weight
              ? this.progress * this.data.datasets[i].data[j].weight
              : this.dotSets[i][j].radius
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
      const showLine = this.data.datasets[i].style?.showLine ?? this.data.style?.showLine ?? true
      if (showLine)
        canvas.drawPath(this.paths[i], this.strokePaints[i])
    }
  }
}
