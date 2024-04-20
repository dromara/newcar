import type { Widget } from './widget'

export class Scene {
  elapsed = 0

  constructor(public root: Widget) {}
}
