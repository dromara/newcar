import * as nc from 'newcar'
import { NumberPlane, MathFunction } from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#poster'))

const rcd = new nc.Recorder(document.querySelector('#poster'), 'mp4')

const root = new nc.Widget().add(
  new nc.Text("Hello, MY Newcar!", 'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf', {
    y: 120,
    x: 10,
    style: {
      size: 90
    },
  }).animate(nc.create, 0, 60)
).setUpdate((e, w) => {
  if (e === 10) {
    rcd.start(1000, (url) => {
      console.log(url)
    })
  }
})

const scene = new nc.Scene(root)
app.checkout(scene)
app.play()
