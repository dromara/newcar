import * as nc from 'newcar'
import * as mod_math from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#canvas'))
const root = new nc.Widget()
const scene = new nc.Scene(root)
root
  .add(
    new mod_math.NumberAxis(-200, 200, {
      x: 400,
      y: 200,
    }).add(
      new mod_math.MathFunction(Math.cos, [-4, 4]).animate(nc.create, 0, 30),
    ),
  )
  .add(
    new mod_math.NumberPlane(-200, 200, -100, 100, {
      x: 400,
      y: 600,
      unitFont: 'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
    })
      .add(
        new mod_math.MathFunction((x) => -(x ** 2), [-4, 4]).animate(
          nc.create,
          0,
          30,
        ),
      )
  )

app.checkout(scene)
app.play()
