import * as nc from 'newcar'

const engine = await new nc.CarEngine().init(
  '../cli/node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createLocalApp(1600, 900)
const root = new nc.Circle(100)
const scene = new nc.Scene(root)
app.checkout(scene)

export default app
