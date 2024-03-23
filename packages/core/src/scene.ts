import { Canvas } from 'canvaskit-wasm'
import { Widget } from './widget'

export class Scene {
  private _elapsed = 0

  constructor(public root: Widget, private canvas: Canvas) {}

  get elapsed() {
    return this._elapsed
  }
}
