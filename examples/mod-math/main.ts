import * as nc from 'newcar'
import * as mod_math from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#canvas'))
const root = new nc.Rect([0, 0], [150, 150], {
  x: 100,
  y: 100,
})
  .add(new nc.Arrow([0, 0], [200, 200]))
  .animate(nc.rotate, 0, 100, {
    from: 0,
    to: 300,
  })
const scene = new nc.Scene(root)

app.checkout(scene)
app.play()
