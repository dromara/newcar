import type { Ref, WidgetOptions, WidgetRange, WidgetStyle } from '@newcar/core'
import { Widget, ref } from '@newcar/core'
import type { CanvasKit } from 'canvaskit-wasm'

export interface RowOptions extends WidgetOptions {
  style: RowStyle
}

export interface RowStyle extends WidgetStyle {}

export class Row extends Widget {
  width: Ref<number>

  constructor(width: number, options?: RowOptions) {
    super(options)
    this.width = ref(width)
  }

  init(ck: CanvasKit) {
    super.init(ck)
    let currentX = 0
    let currentY = 0
    let index = 0
    for (const child of this.children) {
      child.init(ck)
      child.initialized = true
    }
    for (const child of this.children) {
      child.x.value += currentX
      child.y.value += currentY
      currentX += child.calculateRange()[2] - child.calculateRange()[0]
      if (index < this.children.length - 1) {
        if (this.children[index + 1].calculateRange()[2] - this.children[index + 1].calculateRange()[0] + currentY > this.width.value) {
          currentY += child.calculateRange()[3] - child.calculateRange()[1]
          currentX = 0
        }
      }
      index += 1
    }
  }

  calculateRange(): WidgetRange {
    let width = 0
    let height = 0
    for (const child of this.children) {
      width += child.calculateRange()[2] - child.calculateRange()[0]
      height += child.calculateRange()[3] - child.calculateRange()[1]
    }
    return [0, 0, width, height]
  }
}
