import type { CanvasKit } from 'canvaskit-wasm'
import type { LocalScene, LocalSceneOptions } from './localScene'

export function defineCreateLocalAppApi(ck: CanvasKit) {
  return function createLocalApp(width: number, length: number) {
    const surface = ck.MakeSurface(width, length)
    const canvas = surface.getCanvas()
    let scene: LocalScene | null = null

    if (!surface) {
      throw new Error('NDIWDLIJ')
    }

    function checkout(callback: (ck: CanvasKit, options?: LocalSceneOptions) => LocalScene) {
      scene = callback(ck, {
        canvas,
        surface,
      })
    }

    return {
      scene,
      checkout,
    }
  }
}
