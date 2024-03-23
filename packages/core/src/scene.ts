import { Canvas } from 'canvaskit-wasm'
import { Widget } from './widget'

export class Scene {
  private _elapsed = 0
  private _widgets: Widget[] = []

  constructor(public root: Widget, private canvas: Canvas) {}

  add(widget: Widget) {
    const canvas = this.canvas
    new Proxy(widget, {
      set(widget, prop) {
        try {
          widget.draw(canvas, prop as string)
          return true
        } catch (err) {
          return false
        }
      },
    })
  }

  get elapsed() {
    return this._elapsed
  }
}
