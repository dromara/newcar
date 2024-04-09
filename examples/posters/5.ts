import * as nc from 'newcar'
import { NumberPlane, MathFunction } from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#poster'))

const rcd = new nc.Recorder(document.querySelector('#poster'), 'mp4')

const root = new nc.Widget().add(
  new nc.Rect([0, 0], [100, 100], {
    x: 350,
    y: 175
  }).add(
    new nc.Arrow([0, 0], [0, 100]).animate(nc.create, 0, 30)
  ).add(new nc.Widget().add(new nc.Arrow([0, 0], [0, -100]).animate(nc.create, 0, 30)))
).setUpdate((e, w) => {
  if (e === 20) {
    rcd.start(500, (url) => {
      console.log(url)
    })
  }
})

const scene = new nc.Scene(root)
app.checkout(scene)
app.play()
