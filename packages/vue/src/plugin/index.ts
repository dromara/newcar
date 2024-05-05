import { CarEngine } from '@newcar/core'

export function newcar(wasm: string) {
  async function install(app: { config: { globalProperties: { $carengine: CarEngine } } }, _options: any) {
    app.config.globalProperties.$carengine = await new CarEngine().init(wasm)
  }

  return { install }
}
