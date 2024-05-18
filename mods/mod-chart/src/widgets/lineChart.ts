import { Circle } from '@newcar/basic'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'
import type { StrokeCap, StrokeJoin } from '@newcar/utils'
import { Color, str2BlendMode, str2StrokeCap, str2StrokeJoin } from '@newcar/utils'
import type { WidgetRange } from '@newcar/core'
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

/**
 * LineChart options.
 * @public
 * @interface
 * @category LineChart
 * @extends BaseSimpleChartOptions
 */
export interface LineChartOptions extends BaseSimpleChartOptions {}

/**
 * LineChart style.
 * @public
 * @interface
 * @category LineChart
 * @extends BaseSimpleChartStyle
 */
export interface LineChartStyle extends BaseSimpleChartStyle {
  /**
   * @property number dotSize
   * @description
   * dotSize is a number that represents the size of the dots in the line chart.
   * It is optional.
   * If not provided, the dotSize will be `5`.
   */
  dotSize?: number
  /**
   * @property number[] borderDashInterval
   * @description
   * borderDashInterval is an array of numbers that represents the intervals of the dashed border.
   * It is optional.
   * If not provided, the borderDashInterval will be `undefined`.
   */
  borderDashInterval?: number[]
  /**
   * @property number borderDashOffset
   * @description
   * borderDashOffset is a number that represents the offset of the dashed border.
   * It is optional.
   * If not provided, the borderDashOffset will be `0`.
   */
  borderDashOffset?: number
  /**
   * @property StrokeJoin borderJoinStyle
   * @description
   * borderJoinStyle is a string that represents the style of the border join.
   * It is optional.
   * If not provided, the borderJoinStyle will be `miter`.
   */
  borderJoinStyle?: StrokeJoin
  /**
   * @property StrokeCap borderCapStyle
   * @description
   * borderCapStyle is a string that represents the style of the border cap.
   * It is optional.
   * If not provided, the borderCapStyle will be `butt`.
   */
  borderCapStyle?: StrokeCap
  /**
   * @property number lineWidth
   * @description
   * lineWidth is a number that represents the width of the line in the line chart.
   * It is optional.
   * If not provided, the lineWidth will be `3`.
   */
  lineWidth?: number
  /**
   * @property number tension
   * @description
   * tension is a number that represents the tension of the line in the line chart, which is used to create a Bézier curve.
   * It is optional.
   * If not provided, the tension will be `0.1`.
   */
  tension?: number
  /**
   * @property boolean showLine
   * @description
   * showLine is a boolean that represents whether to show the line in the line chart.
   * It is optional.
   * If not provided, the showLine will be `true`.
   */
  showLine?: boolean
  /**
   * @property boolean animateIndex
   * @description
   * animateIndex is a boolean that represents whether to add animation to the index value of the data points in the line chart.
   * It is optional.
   * If not provided, the animateIndex will be `false`.
   */
  animateIndex?: boolean
}

/**
 * LineChart dataset.
 * @public
 * @interface
 * @category LineChart
 * @extends BaseSimpleChartDataSet
 */
export interface LineChartDataSet extends BaseSimpleChartDataSet {
  data: ChartDataUnit<LineChartStyle>[]
  style?: LineChartStyle
}

/**
 * LineChart data.
 * @public
 * @interface
 * @category LineChart
 * @extends BaseSimpleChartData
 */
export interface LineChartData extends BaseSimpleChartData {
  datasets: LineChartDataSet[]
  style?: LineChartStyle
}

/**
 * Line chart widget.
 * @public
 * @category LineChart
 * @class
 * @extends BaseSimpleChart
 * @description
 * LineChart is a class that extends BaseSimpleChart and is used to create a line chart widget.
 * In fact, LineChart can also be used to create a scatter chart and a bubble chart.
 */
export class LineChart extends BaseSimpleChart {
  /**
   * The style of the LineChart.
   */
  declare style: LineChartStyle

  /**
   * The paths of the lines in the LineChart.
   */
  paths: Path[]
  /**
   * The stroke paints for the lines in the LineChart.
   */
  strokePaints: Paint[]
  /**
   * The dot sets of the LineChart.
   */
  dotSets: Circle[][]

  /**
   * Create a LineChart.
   * @param data - The data of the LineChart.
   * @param options - The options of the LineChart.
   */
  constructor(
    public data: LineChartData,
    options?: LineChartOptions,
  ) {
    options ??= {}
    super(data, {
      gridAlign: false,
      ...options,
    })

    this.dotSets = this.data.datasets.map((set) => {
      set.style ??= {}
      set.style.backgroundColor ??= this.data.style?.backgroundColor ?? Color.WHITE.withAlpha(0.2)
      set.style.backgroundShader ??= this.data.style?.backgroundShader
      set.style.borderColor ??= this.data.style?.borderColor ?? Color.WHITE
      set.style.borderShader ??= this.data.style?.borderShader
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
                fillShader: unit.style.backgroundShader ?? set.style.backgroundShader,
                borderColor: unit.style.borderColor ?? set.style.borderColor,
                borderShader: unit.style.borderShader ?? set.style.borderShader,
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
                fillShader: unit.style.backgroundShader ?? set.style.backgroundShader,
                borderColor: unit.style.borderColor ?? set.style.borderColor,
                borderShader: unit.style.borderShader ?? set.style.borderShader,
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
      const borderShader = this.data.datasets[i].style?.borderShader
        ?? this.data.style?.borderShader
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
      if (borderShader)
        this.strokePaints[i].setShader(borderShader.toCanvasKitShader(ck))
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

  draw(canvas: Canvas): void {
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

    for (let i = 0; i < this.dotSets.length; i++) {
      const tension = this.data.datasets[i].style.tension
        ?? (this.data.datasets[i].data[0].style.tension ?? 0.1)
      this.paths[i].rewind()
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

    for (let i = 0; i < this.paths.length; i++) {
      const showLine = this.data.datasets[i].style?.showLine ?? this.data.style?.showLine ?? true
      if (showLine)
        canvas.drawPath(this.paths[i], this.strokePaints[i])
    }
  }

  isIn(x: number, y: number): boolean {
    const { x: dx, y: dy } = this.coordinateParentToChild(x, y)
    return super.isIn(x, y) || this.paths.some(path => path.contains(dx, dy))
  }

  calculateRange(): WidgetRange {
    const boundsArray = this.paths.map(path => path.computeTightBounds())
    return [
      Math.min(...boundsArray.map(bounds => bounds[0])),
      Math.min(...boundsArray.map(bounds => bounds[1])),
      Math.max(...boundsArray.map(bounds => bounds[2])),
      Math.max(...boundsArray.map(bounds => bounds[3])),
    ]
  }
}
