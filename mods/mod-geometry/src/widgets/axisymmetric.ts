import { Widget, type WidgetOptions } from '@newcar/core'

export class Axisymmetric extends Widget {
  constructor(
    private originalWidget: Widget,
    /**
     * [x1, y1, x2, y2]
     */
    private axis: [number, number, number, number],
    options: WidgetOptions,
  ) {
    super(options)
  }
}
