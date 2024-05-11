import { CarEngine } from '@newcar/core'

const readyEvent = new Event('ready', { cancelable: true })
const globalEngine = new CarEngine


class GlobalEngineElement extends HTMLElement {
  private _shadowRoot: ShadowRoot

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })

  }

  connectCallback() {
    const wasmSrc = this.getAttribute('wasm-src')
    if (wasmSrc == null) throw new TypeError(`newcar: missing 'wasm-src' property`)


  }

}