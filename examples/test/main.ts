import { CarEngine, Scene, Widget } from '@newcar/core'
import { Arc } from '@newcar/basic'

let circle: any

new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    const app = engine.createApp(document.querySelector('#canvas'))
    circle = app.impl(new Arc(1000))
    app.checkout(new Scene(circle))
    app.play()
    console.log(app.test)
  })

setTimeout(() => {
  circle.radius = 200
  console.log('Time OVER!')
}, 2000)
