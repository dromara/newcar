import type { CanvasKit } from 'canvaskit-wasm'
import CanvasKitInit from 'canvaskit-wasm/full'
import { App } from './app'
import { LocalApp } from './local-app'
import type { GlobalPlugin } from './plugin'

// eslint-disable-next-line import/no-mutable-exports
export let $ck: CanvasKit

/**
 * The engine that drive CanvasKit-WASM
 */
export class CarEngine {
  ck: CanvasKit
  readonly apps: (App | LocalApp)[] = []
  readonly plugins: GlobalPlugin[] = []

  /**
   * Initializing a `CarEngine`
   * @param canvasKitWasmFile The path of `canvaskit.wasm`. In common, the file is under bin in npm package canvaskit-wasm
   * @returns the engine object.
   */
  async init(canvasKitWasmFile: string) {
    for (const plugin of this.plugins) {
      if (plugin.beforeCanvasKitLoaded)
        plugin.beforeCanvasKitLoaded(this)
    }

    this.ck = await CanvasKitInit({
      locateFile(_file) {
        return canvasKitWasmFile
      },
    })
    for (const plugin of this.plugins) {
      if (plugin.onCanvasKitLoaded)
        plugin.onCanvasKitLoaded(this)
    }

    $ck = this.ck
    return this
  }

  /**
   * Using a plugin for global.
   * @param plugin The plugin object.
   * @returns this
   */
  use(plugin: GlobalPlugin): this {
    this.plugins.push(plugin)

    return this
  }

  /**
   * Creating a browser app.
   * @param element The `<canvas>` tag.
   * @returns `App`
   */
  createApp(element: HTMLCanvasElement): App {
    const app = new App(element, this.ck, this.plugins)
    this.apps.push(app)
    return app
  }

  /**
   * Creating a local(nodejs/denojs) app
   * @param width
   * @param height
   * @returns `LocalApp`
   */
  createLocalApp(width: number, height: number): LocalApp {
    const app = new LocalApp(width, height, this.ck, this.plugins)
    this.apps.push(app)
    return app
  }
}
