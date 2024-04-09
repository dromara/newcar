import * as nc from 'newcar'
import { NumberPlane, MathFunction } from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#poster'))

const rcd = new nc.Recorder(document.querySelector('#poster'), 'mp4')

const root = new nc.Widget().add(
  new NumberPlane(-200, 200, -200, 200, {
    x: 400,
    y: 225,
  })
    .add(new MathFunction(Math.sin, [-4, 4]).animate(nc.create, 20, 80))
    .add(new MathFunction(Math.cos, [-4, 4]).animate(nc.create, 20, 80)),
).setUpdate((e, w) => {
  if (e === 20) {
    rcd.start(1600, (url) => {
      console.log(url)
    })
  }
})

const scene = new nc.Scene(root)
app.checkout(scene)
app.play()
