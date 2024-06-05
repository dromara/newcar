import type { CanvasKit } from 'canvaskit-wasm'
import { Color, error, isNull } from '@newcar/utils'
import type { Scene, SceneOptions } from './scene'

export function defineCreateAppApi(ck: CanvasKit) {
  return function createApp(element: HTMLCanvasElement) {
    const surface = ck.MakeWebGLCanvasSurface(element)
    element.style.backgroundColor = Color.BLACK.toString()
    let scene: Scene | null = null

    if (!surface) {
      throw new Error('NDIWDLIJ')
    }

    function checkout(callback: (ck: CanvasKit, options?: SceneOptions) => Scene) {
      scene = callback(ck)
    }

    function play() {
      if (isNull(scene))
        return error('The scene is not existm, please use `App.checkout()` to mount a scene')
      if (scene!.player.paused)
        return
      surface?.requestAnimationFrame((canvas) => {
        scene!.tick(canvas, surface)
      })
    }

    return {
      play,
      scene,
      checkout,
    }
  }
}
