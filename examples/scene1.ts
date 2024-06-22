import * as nc from 'newcar'
import * as mt from '@newcar/mod-math'
import * as gm from '@newcar/mod-geometry'

await nc.useFont('./Roboto-Regular.ttf')

export default nc.createScene(
  new nc.Widget()
    .add(
      new mt.NumberPlane([0, 1500], [0, 850], {
        x: 50,
        y: 500
      })
    )
)