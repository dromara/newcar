import * as nc from 'newcar'

new nc.CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    const app = engine.createLocalApp(200, 300)
    const root = new nc.Circle(200)
    const scene = new nc.Scene(root)
    app.checkout(scene)
    const data = app.getFrames(30)
    console.log(data)
  })
