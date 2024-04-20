import { Widget, type WidgetOptions } from '@newcar/core'

export class Axisymmetric extends Widget {
  mirror: Widget
  constructor(origin: Widget, options?: WidgetOptions) {
    options ??= {}
    super(options)
    this.mirror = origin.copy()
    this.mirror.style.scaleX = -1
    this.add(this.mirror)
  }
}