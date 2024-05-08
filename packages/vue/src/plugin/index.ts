import { CarEngine } from '@newcar/core'
import type { App } from 'vue'

export function newcar(wasm: string) {
  async function install(app: App, _options: any) {
    const engine = await new CarEngine().init(wasm)
    app.provide<CarEngine>('carengine', engine)
  }

  return { install }
}
