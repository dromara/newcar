import type { App } from '@newcar/core'
import { CarEngine } from '@newcar/core'
import { deferred, once } from '@newcar/utils'

const readyEvent = new Event('ready')
const errorEvent = new Event('error')

const globalEngine = new CarEngine()
let globalInited = false
const globalInitReady = deferred<CarEngine>()

export type InitStatus = 'pending' | 'ready' | 'error'

let status: InitStatus = 'pending'

export class GlobalInitElement extends HTMLElement {
  get status(): InitStatus {
    return status
  }

  static getGlobalEngine() {
    return globalEngine
  }

  constructor() {
    super()

    if (globalInited)
      throw new Error('newcar: cannot init global engine twice')
    globalInited = true
  }

  whenReady() {
    return globalInitReady.promise
  }

  getEngine() {
    return this.whenReady()
  }

  connectedCallback() {
    this.load().then(
      () => {
        status = 'ready'
        globalInitReady.resolve(globalEngine)
        this.dispatchEvent(readyEvent)
      },
      (err) => {
        status = 'error'
        globalInitReady.reject(err)
        this.dispatchEvent(errorEvent)
      },
    )
  }

  async load() {
    const wasmSrc = this.getAttribute('wasm-src')
    if (wasmSrc == null)
      throw new TypeError(`newcar: missing 'wasm-src' property`)

    await globalEngine.init(wasmSrc)
  }
}

const canvasMap = new Map<string, CanvasElement>()

export class CanvasElement extends HTMLElement {
  private _shadowRoot: ShadowRoot
  private _el?: HTMLCanvasElement
  private _app?: App
  private _ready = deferred<App>()
  private _name?: string

  static getCanvasByName(name: string): CanvasElement | null {
    return canvasMap.get(name)
  }

  get canvasElement() {
    return this._el
  }

  static observedAttributes = ['width', 'height']
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'closed' })
  }

  whenReady() {
    return this._ready.promise
  }

  getApp() {
    return this.whenReady()
  }

  getEngine() {
    return globalInitReady.promise
  }

  async load() {
    const el = document.createElement('canvas')
    this._el = el
    el.setAttribute('data-nc-controlled', '')
    el.setAttribute('width', this.getAttribute('width') ?? '')
    el.setAttribute('height', this.getAttribute('height') ?? '')

    this._shadowRoot.appendChild(el)

    const engine = await globalInitReady.promise

    this._app = engine.createApp(el)

    if (this.hasAttribute('name')) {
      const name = this.getAttribute('name')
      if (canvasMap.has(name))
        throw new TypeError(`newcar: duplicate canvas name: ${name}`)
      canvasMap.set(name, this)
    }
  }

  disconnectedCallback() {
    if (this.hasAttribute('name')) {
      const name = this.getAttribute('name')
      if (canvasMap.get(name) === this)
        canvasMap.delete(name)
    }
  }

  connectedCallback() {
    this.load().then(
      () => {
        this._ready.resolve(this._app)
        this.dispatchEvent(readyEvent)
      },
      (err) => {
        this._ready.reject(err)
        this.dispatchEvent(errorEvent)
      },
    )
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'name') {
      if (this._name != null) {
        if (canvasMap.get(this._name) === this)
          canvasMap.delete(this._name)
        else throw new TypeError('newcar: illegal value')
      }

      this._name = newValue
      canvasMap.set(newValue, this)
    }

    this._el?.setAttribute(name, newValue)
  }
}

export const registerCustomElements = once(() => {
  customElements.define('nc-global-init', GlobalInitElement, {})
  customElements.define('nc-canvas', CanvasElement, {})
})

export function getCanvasByName(name: string): CanvasElement | null {
  return canvasMap.get(name)
}

export function getGlobalEngine() {
  return globalInitReady.promise
}

export { }
