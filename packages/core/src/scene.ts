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
    this.root.add(root)
  }
}

export function createScene(root: Widget) {
  return new Scene(root)
}
