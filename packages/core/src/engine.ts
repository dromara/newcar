import CanvasKitInit, { CanvasKit, CanvasKitInitOptions } from 'canvaskit-wasm'
import { App } from './app'
import type { CarPlugin } from './plugin'

export class CarEngine {
  ck: CanvasKit
  readonly apps: App[] = []
  readonly plugins: CarPlugin[] = []

  async init(canvasKitWasmFile: string) {
    for (const plugin of this.plugins) {
      plugin.beforeCanvasKitLoaded(this)
    }
    this.ck = await CanvasKitInit({
      locateFile(_file) {
        return canvasKitWasmFile
      },
    })
    for (const plugin of this.plugins) {
      plugin.onCanvasKitLoaded(this)
    }
    return this
  }

  use(plugin: CarPlugin): this {
    this.plugins.push(plugin)

    return this
  }

  createApp(element: HTMLCanvasElement): App {
    const app = new App(element, this.ck, this.plugins)
    this.apps.push(app)
    return app
  }
}
