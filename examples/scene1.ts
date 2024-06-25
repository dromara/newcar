import * as nc from 'newcar'
import * as mt from '@newcar/mod-math'
import * as gm from '@newcar/mod-geometry'

await nc.useFont('./Roboto-Regular.ttf')

export default nc.createScene(
  new nc.Circle(200, {
    x: 800,
    y: 450
  })
    .animate(nc.transform().withAttr({
      to: new nc.Rect(100, 100),
      duration: 1
    }))
)