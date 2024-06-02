import type { CanvasKit } from 'canvaskit-wasm'
import type { Scene } from './scene'

export interface AppOptions {
  canvasElement: HTMLCanvasElement
  ck: CanvasKit
}

export function createApp(sceneBuilder: any, options: AppOptions) {
  const surface = options.ck.MakeWebGLCanvasSurface(options.canvasElement)
  const scene = sceneBuilder(options.ck) as Scene
  if (!surface) {
    throw new Error('NDIWDLIJ')
  }

  function update() {
    if (scene.player.paused)
      return
    surface?.requestAnimationFrame((canvas) => {
      scene.tick(canvas)
    })
  }

  return {
    update,
    scene,
  }
}
