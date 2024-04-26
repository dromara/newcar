import { Widget, type WidgetOptions } from '@newcar/core'

export class centrallySymmetric extends Widget {
  mirror: Widget
  constructor(origin: Widget, options?: WidgetOptions) {
    options ??= {}
    super(options)
    this.mirror = origin.copy()
    this.mirror.style.rotation! += 180
    this.add(this.mirror)
  }
}
