import * as nc from 'newcar'
import { NumberPlane, MathFunction } from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#poster'))

const rcd = new nc.Recorder(document.querySelector('#poster'), 'mp4')

const root = new nc.Widget().add(new nc.Circle(50, {
  style: {
    fillColor: nc.Color.parse('yellow')
  },
  x: 400,
  y: 50
}).animate(nc.create, 0, 30, {
  by: nc.easeInBack
}).animate(nc.move, 120, 180, {
  from: [400, 50],
  to: [400, 300],
  by: nc.easeBounce
}))
.add(new nc.Line([0, 350], [0, 350]).setUpdate((e, w) => {
  if (e === 150) {
    w.to = [800, 350]
  }
  if (e === 0) {
    rcd.start(4500, (url) => {
      console.log(url)
    })
  }
}).animate(nc.create, 150, 30, {
  by: nc.easeInExpo
}))

const scene = new nc.Scene(root)
app.checkout(scene)
app.play()
