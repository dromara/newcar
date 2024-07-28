import * as nc from 'newcar'

const engine = await new nc.CarEngine().init('../../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
const app = engine.createLocalApp(1000, 300)
app.config.unit = 'frame'

const scene = nc.createScene(new nc.Rect(200, 200, {
  x: 50,
  y: 50,
  centerX: 50,
  centerY: 50,
  style: {
    color: nc.Color.parse('green'),
  },
}).animate(
  nc.create().withAttr({
    duration: 1,
  }),
))
app.checkout(scene)

export default app
