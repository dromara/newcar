import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Widget, WidgetBuilder } from './widget'

export interface SceneOptions {}

export function createScene(builder: WidgetBuilder<Widget>, options: SceneOptions) {
  return (ck) => {
    const player = {
      paused: true,
      elapsed: 0,
    }
    const root = builder(ck)

    function tick(canvas: Canvas) {
      root.render(canvas, player.elapsed)
      player.elapsed++
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
