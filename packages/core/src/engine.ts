import CanvasKitInit, { CanvasKit, CanvasKitInitOptions } from 'canvaskit-wasm'
import { CarApp } from './app'

export type EngineStatus = 'pending' | 'ready' | 'error' | 'pause'

export class CarEngine {
  private _ckNamespace?: CanvasKit
  private _ckInit: Promise<CanvasKit>
  private _init: Promise<void>
  private _status: EngineStatus = 'pending'
  private _apps: CarApp[] = []

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

  get status() { return this._status }

}
