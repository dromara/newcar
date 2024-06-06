import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { SceneConfig, Widget } from '@newcar/core'
import { defineSceneConfig } from '@newcar/core'

export interface LocalSceneOptions {
  config?: SceneConfig
  canvas?: Canvas
  surface?: Surface
}

export function createLocalScene(root: Widget, options?: LocalSceneOptions) {
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

    function getFrames(duration: number, fps?: number) {
      const data = []
      if (options.config.unit === 'frame') {
        for (let elapsed = 0; elapsed <= duration; elapsed++) {
          options.canvas.clear(ck.BLACK)
          root.update(options.canvas, elapsed, root.render)
          data.push(options.surface.makeImageSnapshot().encodeToBytes())
        }
      }
      else if (options.config.unit === 's') {
        for (let elapsed = 0; elapsed <= (duration * fps); elapsed += (1 / fps)) {
          options.canvas.clear(ck.BLACK)
          root.update(options.canvas, elapsed, root.render)
          data.push(options.surface.makeImageSnapshot().encodeToBytes())
        }
      }
      else if (options.config.unit === 'ms') {
        for (let elapsed = 0; elapsed <= (duration * (fps / 1000)); elapsed += (1000 / fps)) {
          options.canvas.clear(ck.BLACK)
          root.update(options.canvas, elapsed, root.render)
          data.push(options.surface.makeImageSnapshot().encodeToBytes())
        }
      }
      return data
    }

    return {
      player,
      ck,
      root,
      getFrames,
      ...options,
    }
  }
}
export type LocalScene = ReturnType<ReturnType<typeof createLocalScene>>
