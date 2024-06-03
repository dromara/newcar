import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Widget, WidgetBuilder } from './widget'
import type { Base } from './base'

export interface SceneOptions {}

export function createScene(root: Widget, options?: SceneOptions) {
  return (ck: CanvasKit) => {
    const player = {
      paused: false,
      elapsed: 0,
    }

    function tick(canvas: Canvas, surface: Surface) {
      root.update(canvas, player.elapsed, root.render)
      player.elapsed++
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
