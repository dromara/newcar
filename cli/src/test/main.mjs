import { CarEngine, ImageWidget, Scene, Widget, move, useImage } from 'newcar'

const logoLoaded = await useImage('./assets/newcar.webp')

const engine = await new CarEngine().init('../../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
const app = engine.createLocalApp(700, 700)
app.config.unit = 'frame'
const logo = new ImageWidget(logoLoaded, {
  style: {
    scaleX: 0.4,
    scaleY: 0.4,
  },
}).animate(move().withAttr({ duration: 1, to: [400, 400] }))
const root = new Widget().add(logo)
const scene = new Scene(root)
app.checkout(scene)

export default app
