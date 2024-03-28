import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Widget } from '../widget'
import { isAsyncFunction } from '@newcar/utils'

export const initial = (widget: Widget, ck: CanvasKit, canvas: Canvas) => {
  if (isAsyncFunction(widget.init)) {
    widget.init(ck)
  } else {
    widget.init(ck)
  }
  for (const child of widget.children) {
    initial(child, ck, canvas)
  }
}
