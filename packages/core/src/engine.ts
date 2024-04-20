import type { CanvasKit } from 'canvaskit-wasm'
import CanvasKitInit from 'canvaskit-wasm'
import { App } from './app'
import { LocalApp } from './localApp'
import type { CarPlugin } from './plugin'

// eslint-disable-next-line import/no-mutable-exports
export let $ck: CanvasKit
export class CarEngine {
  ck: CanvasKit
  readonly apps: (App | LocalApp)[] = []
  readonly plugins: CarPlugin[] = []

  async init(canvasKitWasmFile: string) {
    for (const plugin of this.plugins)
      plugin.beforeCanvasKitLoaded(this)

    this.ck = await CanvasKitInit({
      locateFile(_file) {
        return canvasKitWasmFile
      },
    })
    for (const plugin of this.plugins)
      plugin.onCanvasKitLoaded(this)

    $ck = this.ck
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

  createLocalApp(width: number, height: number): LocalApp {
    const app = new LocalApp(width, height, this.ck, this.plugins)
    this.apps.push(app)
    return app
  }
}
