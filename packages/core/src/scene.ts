import { Widget } from './widget'

export class Scene {
  private _elapsed = 0

  constructor(public root: Widget) {}

  get elapsed() {
    return this._elapsed
  }
}
