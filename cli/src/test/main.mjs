import path from 'node:path'
import { CarEngine, ImageWidget, Scene, Text, Widget, move, useFont, useImage } from 'newcar'

const logoLoaded = await useImage('./assets/newcar.webp')
await useFont('./fonts/bahnschrift.ttf')

const engine = await new CarEngine().init('../../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
const app = engine.createLocalApp(700, 700)
const logo = new ImageWidget(logoLoaded, {
  style: {
    scaleX: 0.4,
    scaleY: 0.4,
  },
})
const text = new Text(['Hello Newcar!'], {
  y: 600,
  style: {
    textAlign: 'center',
  },
}).animate(move, 0, 300, {
  from: [0, 600],
  to: [-1400, 600],
})
const root = new Widget().add(text, logo)
const scene = new Scene(root)
app.checkout(scene)

export default app
