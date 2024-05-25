import type { Widget } from './widget'

export class Scene {
  elapsed = 0
  startTime: number

  constructor(public root: Widget) {
    this.root.status = 'live'
  }
}

export function createScene(root: Widget) {
  return new Scene(root)
}
