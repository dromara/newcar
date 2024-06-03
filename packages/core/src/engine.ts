import CanvasKitInit from 'canvaskit-wasm'
import { defineCreateAppApi } from './app'
import type { Widget, WidgetBuilder } from './widget'

export async function initEngine(wasm: string) {
  const ck = await CanvasKitInit({
    locateFile: (_file: string) => wasm,
  })

  const createApp = defineCreateAppApi(ck) as ReturnType<typeof defineCreateAppApi>

  function use<T extends Widget>(builder: WidgetBuilder<T>) {
    return builder(ck)
  }

  return {
    createApp,
    ck,
    use,
  }
}
