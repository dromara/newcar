import { Widget, WidgetOptions, WidgetStyle } from "@newcar/core";
import { NumberAxis, NumberAxisOptions } from "./numberAxis";

export interface NumberPlaneOptions extends WidgetOptions {
  axisXOptions?: NumberAxisOptions
  axisYOptions?: NumberAxisOptions
}

export interface NumberPlaneStyle extends WidgetStyle {}

export class NumberPlane extends Widget {
  declare style: NumberPlaneStyle
  axisXOptions: NumberAxisOptions
  axisYOptions: NumberAxisOptions
  axisX: NumberAxis
  axisY: NumberAxis

  constructor(public fromX: number, public toX: number, public fromY: number, public toY: number, options?: NumberPlaneOptions) {
    options ??= {}
    super(options)
    this.axisXOptions = options.axisXOptions ?? {}
    this.axisYOptions = {
      style: {
        rotation: -90
      },
      ...this.axisYOptions
    }
    this.axisX = new NumberAxis(this.fromX, this.toX, this.axisXOptions)
    this.axisY = new NumberAxis(this.fromY, this.toY, this.axisYOptions)
    this.add(this.axisX, this.axisY)
    options.style ??= {}
  }
}