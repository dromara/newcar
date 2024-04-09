import * as nc from 'newcar'
import { NumberPlane, MathFunction } from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#poster'))

const rcd = new nc.Recorder(document.querySelector('#poster'), 'mp4')

const root = new nc.Widget({
  x: 100,
  y: 25,
})
.add(new nc.Rect([0, 0], [600, 66], {
  style: {
    fillColor: nc.Color.parse('red')
  }
}).animate(nc.create, 0, 30))
.add(new nc.Rect([0, 66], [600, 66 * 2], {
  style: {
    fillColor: nc.Color.parse('orange')
  }
}).animate(nc.create, 0, 30))
.add(new nc.Rect([0, 66 * 2], [600, 66 * 3], {
  style: {
    fillColor: nc.Color.parse('yellow')
  }
}).animate(nc.create, 0, 30))
.add(new nc.Rect([0, 66 * 3], [600, 66 * 4], {
  style: {
    fillColor: nc.Color.parse('green')
  }
}).animate(nc.create, 0, 30))
.add(new nc.Rect([0, 66 * 4], [600, 66 * 5], {
  style: {
    fillColor: nc.Color.parse('blue')
  }
}).animate(nc.create, 0, 30))
.add(new nc.Rect([0, 66 * 5], [600, 66 * 6], {
  style: {
    fillColor: nc.Color.parse('purple')
  }
}).animate(nc.create, 0, 30))
.setUpdate((e, w) => {
    if (e === 10) {
      rcd.start(1000, (url) => {
        console.log(url)
      })
    }
  })

const scene = new nc.Scene(root)
app.checkout(scene)
app.play()
