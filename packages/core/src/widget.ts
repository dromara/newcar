import type { Canvas, CanvasKit } from 'canvaskit-wasm'

export type WidgetBuilder<T extends Widget> = (ck: CanvasKit) => T

export function defineWidgetBuilder<T extends Widget>(builder: WidgetBuilder<T>): WidgetBuilder<T> {
  return builder
}

export interface Widget {
  update: (canvas: Canvas, elapsed: number, renderFunction: (canvas: Canvas) => any) => void
  render: (canvas: Canvas) => void
}
