import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Widget, WidgetBuilder } from './widget'
import type { Base } from './base'

export interface SceneOptions {}

export function createScene(builder: WidgetBuilder<Base>, options?: SceneOptions) {
  return (ck: CanvasKit) => {
    const player = {
      paused: false,
      elapsed: 0,
    }
    const root = builder(ck)

    function tick(canvas: Canvas, surface: Surface) {
      root.render(canvas, player.elapsed)
      player.elapsed++
      surface.requestAnimationFrame((canvas) => {
        tick(canvas, surface)
      })
    }

    return {
      player,
      tick,
      ...options,
      ck,
      root,
    }
  }
}
export type Scene = ReturnType<ReturnType<typeof createScene>>
