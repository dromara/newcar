import * as nc from 'newcar'

const engine = await new nc.CarEngine().init(
  '../cli/node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createLocalApp(1600, 900)
const root = new nc.Circle(100, {
  x: 800,
  y: 100,
}).animate(nc.create, 0, 60).animate(nc.move, 60, 60, {
  from: [800, 100],
  to: [800, 800],
  by: nc.easeBounce,
})
const scene = new nc.Scene(root)
app.checkout(scene)

export default app
