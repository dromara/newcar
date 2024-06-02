import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Widget, WidgetBuilder } from './widget'

export interface SceneOptions {}

export function createScene(builder: WidgetBuilder<Widget>, options?: SceneOptions) {
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
      root,
      player,
      tick,
      ...options,
      ck,
    }
  }
}
export type Scene = ReturnType<ReturnType<typeof createScene>>
