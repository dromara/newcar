import type { Ref, WidgetOptions, WidgetRange, WidgetStyle } from '@newcar/core'
import { Widget, ref } from '@newcar/core'
import type { CanvasKit } from 'canvaskit-wasm'

export interface ColumnOptions extends WidgetOptions {
  style: ColumnStyle
}

export interface ColumnStyle extends WidgetStyle {}

export class Column extends Widget {
  height: Ref<number>

  constructor(height: number, options?: ColumnOptions) {
    options.style ??= {}
    super(options ?? {})
    this.height = ref(height)
  }

  init(ck: CanvasKit) {
    super.init(ck)
    let index = 0
    for (const child of this.children) {
      child.init(ck)
      child.initialized = true
    }
    let currentX = 0
    let currentY = 0
    for (const child of this.children) {
      child.x.value += currentX
      child.y.value += currentY
      currentY += child.calculateRange()[3] - child.calculateRange()[1]
      if (index < this.children.length - 1) {
        if (this.children[index + 1].calculateRange()[3] - this.children[index + 1].calculateRange()[1] + currentY > this.height.value) {
          currentX += child.calculateRange()[2] - child.calculateRange()[0]
          currentY = 0
        }
      }
      index += 1
    }
  }

  calculateRange(): WidgetRange {
    let width = 0
    let height = 0
    for (const child of this.children) {
      width += child.calculateRange()[2] - child.calculateRange()[0] + child.x.value
      height += child.calculateRange()[3] - child.calculateRange()[1] + child.y.value
    }
    return [0, 0, width, height]
  }
}
