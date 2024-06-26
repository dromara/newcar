import * as nc from 'newcar'
import * as mt from '@newcar/mod-math'
import * as gm from '@newcar/mod-geometry'

await nc.useFont('./Roboto-Regular.ttf')

export default nc.createScene(
  new nc.Rect(200, 300, {
    x: 800,
    y: 450
  })
  .animate(nc.wiggle().withAttr({ duration: 1, count: 8, amplitude: 10, scale: 1.5 }))
)