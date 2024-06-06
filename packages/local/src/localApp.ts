import { Color, error, isNull } from '@newcar/utils'
import type { CanvasKit } from 'canvaskit-wasm'
import type { Scene, SceneOptions } from './localScene'

export function defineCreateLocalAppApi(ck: CanvasKit) {
  return function createLocalApp(width: number, length: number) {
    const surface = ck.MakeSurface(width, length)
    const canvas = surface.getCanvas()
    let scene: Scene | null = null

    if (!surface) {
      throw new Error('NDIWDLIJ')
    }

    function checkout(callback: (ck: CanvasKit, options?: SceneOptions) => Scene) {
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
