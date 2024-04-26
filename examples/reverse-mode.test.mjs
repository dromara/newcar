import path from 'node:path'
import * as n from 'newcar'

const i = await n.useImage(path.resolve('../assets/poster1.gif'))

const engine = await new n.CarEngine().init(
  './node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createLocalApp(600, 600)
const scene = new n.Scene(
  new n.Circle(100, {
    x: 300,
    y: 300,
  }).animate(n.create, 0, 30, {
    mode: 'reverse',
  }),
)
app.checkout(scene)

export default app
