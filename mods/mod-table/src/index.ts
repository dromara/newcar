import type { Ref, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget, ref } from '@newcar/core'
import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Line } from '@newcar/basic'
import type { Color } from '@newcar/utils'
import { isNull } from '@newcar/utils'

export interface TableOptions extends WidgetOptions {
  style?: TableStyle
}

export interface TableStyle extends WidgetStyle {}

export interface TableItem {
  content?: Widget | null
  backgroundColor?: Color | null
}

export type Row = Array<number>

export type Column = Array<number>

function create2DArray(row: number, col: number) {
  const array = Array(row)

  for (let i = 0; i < row; i++) {
    array[i] = Array(col).fill(null)
  }

  return array
}

export class Table extends Widget {
  row: Ref<number>
  col: Ref<number>
  private lines: Array<Line> = []
  // The width of each column
  private cols: Column = []
  // The height of each rows
  private rows: Row = []
  private data: Array<Array<Widget | null>>

  constructor(row: number, col: number, options?: TableOptions) {
    super(options ?? {})
    this.row = ref(row)
    this.col = ref(col)
    this.cols = Array(this.col.value).fill(100)
    this.rows = Array(this.row.value).fill(45)
    this.data = create2DArray(row, col)
  }

  init(ck: CanvasKit) {
    super.init(ck)
    const totalWidth = this.calculateWidth()
    const totalHeight = this.calculateHeight()
    let counter = 0
    for (let x = 0; x < this.col.value; x += 1) {
      // TODO
      counter += this.cols[x]
      this.lines.push(
        new Line([counter, 0], [counter, totalHeight]),
      )
    }

    counter = 0
    for (let y = 0; y < this.row.value; y += 1) {
      counter += this.rows[y]
      this.lines.push(
        new Line([0, counter], [totalWidth, counter]),
      )
    }
    this.add(...this.lines)

    for (const r of this.data) {
      for (const c of r) {
        if (!isNull(c)) {
          if (!c.initialized) {
            c.initialized = true
            c.init(ck)
          }
          // this.setItemWithRange(c, c.calculateRange())
        }
      }
    }
  }

  draw(canvas: Canvas) {
    super.draw(canvas)
    for (const r of this.data) {
      for (const c of r) {
        if (!isNull(c)) { /* empty */ }
        // this.setItemWithRange(c, c.calculateRange())
      }
    }
  }

  calculateHeight() {
    let result = 0
    for (const height of this.rows) {
      result += height
    }
    return result
  }

  calculateWidth() {
    let result = 0
    for (const width of this.cols) {
      result += width
    }
    return result
  }

  setItem(item: Widget, row: number, col: number) {
    this.data[row][col] = item

    return this
  }

  removeItem(row: number, col: number) {
    this.data[row][col] = null

    return this
  }
}
