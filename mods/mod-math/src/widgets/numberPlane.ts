import { Widget, WidgetOptions, WidgetStyle } from "@newcar/core";
import { NumberAxis, NumberAxisOptions } from "./numberAxis";
import { Color } from "@newcar/utils";
import { Line, LineOptions } from "@newcar/basic";

export interface NumberPlaneOptions extends WidgetOptions {
  style?: NumberPlaneStyle
  axisXOptions?: NumberAxisOptions
  axisYOptions?: NumberAxisOptions
  gridOptions?: LineOptions
  grid?: boolean
}

export interface NumberPlaneStyle extends WidgetStyle {
  gridColor?: Color
}

export class NumberPlane extends Widget {
  declare style: NumberPlaneStyle
  axisXOptions: NumberAxisOptions
  axisYOptions: NumberAxisOptions
  gridOptions: LineOptions
  axisX: NumberAxis
  axisY: NumberAxis
  grid: boolean
  private gridUnitsX: Line[] = []
  private gridUnitsY: Line[] = []

  constructor(public fromX: number, public toX: number, public fromY: number, public toY: number, options?: NumberPlaneOptions) {
    options ??= {}
    super(options)
    this.axisXOptions = options.axisXOptions ?? {}
    this.axisYOptions = {
      style: {
        rotation: -90
      },
      ...options.axisYOptions
    }
    this.grid = options.grid ?? true
    this.axisX = new NumberAxis(this.fromX, this.toX, this.axisXOptions)
    this.axisY = new NumberAxis(this.fromY, this.toY, this.axisYOptions)
    this.gridOptions = options.gridOptions ?? {}
    for (let x = this.axisX.from; x <= this.axisX.to; x += this.axisX.interval) {
      this.gridUnitsY.push(new Line([x, this.axisY.from], [x, this.axisY.to], {
        style: {
          width: 1
        }
      }))
    }
    for (let y = this.axisY.from; y <= this.axisY.to; y += this.axisY.interval) {
      this.gridUnitsX.push(new Line([this.axisX.from, y], [this.axisX.to, y], {
        style: {
          width: 1
        }
      }))
    }
    this.add(this.axisX, this.axisY, ...this.gridUnitsX, ...this.gridUnitsY)
    options.style ??= {}
    this.style.gridColor = options.style.gridColor ?? Color.WHITE
  }
}