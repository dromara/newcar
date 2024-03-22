import CanvasKitInit, { CanvasKit, CanvasKitInitOptions } from 'canvaskit-wasm'
import type { App } from './app'
import type { CarPlugin } from './plugin'

export type EngineStatus = 'pending' | 'ready' | 'error' | 'pause'

export class CarEngine {
  private _ckNamespace?: CanvasKit
  private _ckInit: Promise<CanvasKit>
  private _init: Promise<void>
  private _status: EngineStatus = 'pending'
  private _apps: App[] = []
  private _plugins: CarPlugin[] = []

  constructor(opts?: CanvasKitInitOptions) {
    this._ckInit = CanvasKitInit(opts)
    this._init = this._engineInit()
  }

  async whenReady() {
    await this._init
  }

  private async _engineInit() {
    this._ckNamespace = await this._ckInit
    

    this._status = 'ready'
  }

  usePlugin(plugin: CarPlugin) {
    this._plugins.push(plugin)
  }

  get status() { return this._status }

}
