import type { Config } from './config'
import { DEFAULT_SCENE_CONFIG } from './config'
import type { Widget } from './widget'

export class Scene {
  elapsed = 0
  startTime: number
  config: Config

  // When advance frames, please use this method
  tick(n: number = 1) {
    for (let i = 0; i <= n; i++)
      this.elapsed += 1
  }

  nextFrame(callback: any) {
    this.tick()
    if (this.config.fps !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        callback()
      }, 1000 / this.config.fps)
    }
    else {
      // TODO: handle unlimited `fps`
    }
  }

  constructor(public root: Widget, config: Config = DEFAULT_SCENE_CONFIG) {
    this.config = config
  }
}

export function createScene(root: Widget) {
  return new Scene(root)
}
