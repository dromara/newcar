import type { CanvasKit } from 'canvaskit-wasm'
import { error, isNull } from '@newcar/utils'
import type { Scene } from './scene'

export function defineCreateAppApi(ck: CanvasKit) {
  return function createApp(element: HTMLCanvasElement) {
    const surface = ck.MakeWebGLCanvasSurface(element)
    let scene: Scene | null = null

    if (!surface) {
      throw new Error('NDIWDLIJ')
    }

    function checkout(value: Scene) {
      scene = value
    }

    function update() {
      if (isNull(scene))
        return error('The scene is not existm, please use `App.checkout()` to mount a scene')
      if (scene!.player.paused)
        return
      surface?.requestAnimationFrame((canvas) => {
        scene!.tick(canvas)
      })
    }

    return {
      update,
      scene,
      checkout,
    }
  }
}
