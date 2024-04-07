import * as nc from 'newcar'
import * as mod_math from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#canvas'))
const root = new nc.Widget().add(
  new mod_math.NumberAxis(-300, 300, {
    unitFont: 'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
    y: 500,
    style: {
      rotation: 200
    }
  })
)
.add(new nc.Arrow([0, 0], [100, 0], {
  style: {
    rotation: 200
  }
}))
.add(new nc.Rect([0, 0], [150, 150], {
  style: {
    rotation: 200
  }
}))
const scene = new nc.Scene(root)

app.checkout(scene)
app.play()
