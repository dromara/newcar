import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Widget } from './widget'
import { type SceneConfig, defineSceneConfig } from './config'

export interface SceneOptions {
  config?: SceneConfig
}

export function createScene(root: Widget, options?: SceneOptions) {
  return (ck: CanvasKit) => {
    const player = {
      paused: false,
      elapsed: 0,
      startTime: performance.now(),
      lastFrameTime: performance.now(),
    }

    options ??= {}
    options.config ??= defineSceneConfig({
      unit: 's',
    })

    function tick(canvas: Canvas, surface: Surface) {
      root.update(canvas, player.elapsed, root.render)
      switch (options.config.unit) {
        case 'frame':
          player.elapsed++
          break
        case 's':
          player.elapsed += (performance.now() - player.lastFrameTime) / 1000
          player.lastFrameTime = performance.now()
          break
        case 'ms':
          player.elapsed += performance.now() - player.lastFrameTime
          player.lastFrameTime = performance.now()
          break
      }
      surface.requestAnimationFrame((canvas) => {
        tick(canvas, surface)
      })
    }

    return {
      player,
      tick,
      ck,
      root,
      ...options,
    }
  }
}
export type Scene = ReturnType<ReturnType<typeof createScene>>
