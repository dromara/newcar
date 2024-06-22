import { Widget, defineGlobalPlugin } from '@newcar/core'
import { Line } from '@newcar/basic'

export interface TimeviewOptions {
  x?: number
  y?: number
  target: Widget[]
}

export default (options: TimeviewOptions) => {
  return defineGlobalPlugin({
    name: 'timeview',
    key: 'timeview',
    version: '0.1.0',

    onPlay(app) {
      app.scene.root
        .add(
          new Widget({
            x: options.x ?? 0,
            y: options.y ?? 0,
          }).add(
            new Line([0, 0], [0, 50 * options.target.length]),
          ),
        )
    },
  })
}
