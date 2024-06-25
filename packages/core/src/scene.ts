import { Widget } from './widget'

export class RootWidget extends Widget {
  canvasSize: [number, number]

  constructor() {
    super()
  }
}

export class Scene {
  elapsed = 0
  startTime: number
  root: RootWidget = new RootWidget()

  constructor(root: Widget) {
    // this.root.status = 'live'
    root.isImplemented.value = true
    this.root.add(root)
  }
}

export function createScene<T extends Widget>(root: T) {
  return new Scene(root)
}
