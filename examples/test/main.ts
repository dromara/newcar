import { CarEngine, Scene, Widget } from '@newcar/core'
import { Arc } from '@newcar/basic'

let circle: any
let app: any

new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    circle = new Arc(1000)
    app.checkout(new Scene(circle))
    app.play()
  })

setInterval(() => {
  circle.radius += 1
}, 1000 / 90)
