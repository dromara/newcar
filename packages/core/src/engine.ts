import CanvasKitInit, { CanvasKit, CanvasKitInitOptions } from 'canvaskit-wasm'
import { App } from './app'
import type { CarPlugin } from './plugin'


export class CarEngine {
  CanvasKit: CanvasKit
  readonly apps: App[] = []
  readonly plugins: CarPlugin[] = []

  async init(canvasKitWasmFile: string) {
    this.CanvasKit = await CanvasKitInit({
      locateFile(_file) {
        return canvasKitWasmFile
      },
    })
    return this
  }

  use(plugin: CarPlugin): this {
    this.plugins.push(plugin)

    return this
  }

  createApp(element: HTMLCanvasElement): App {
    const app = new App(
      element,
      this.CanvasKit
    )
    this.apps.push(app)
    return app
  }
}
