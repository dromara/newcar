import type { WidgetOptions } from '@newcar/core';
import { Widget } from '@newcar/core'

export class Intersection extends Widget {
  clones: Widget[] = []

  constructor(public widgets: Widget[], options?: WidgetOptions) {
    options ??= {}
    super(options)
    for (const widget of this.widgets) {
      const clone = widget.copy()
      clone.style.blendMode = 'srcIn'
      this.clones.push(clone)
    }
    this.add(...this.clones)
  }
}