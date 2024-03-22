import CanvasKitInit, { CanvasKit, CanvasKitInitOptions } from 'canvaskit-wasm'

export type EngineStatus = 'pending' | 'ready' | 'error' | 'pause'

export class MarqueeApp {}

export class CarEngine {
  private _ckNamespace?: CanvasKit
  private _ckInit: Promise<CanvasKit>
  private _init: Promise<void>
  private _status: EngineStatus = 'pending'
  private _apps: MarqueeApp[] = []

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
