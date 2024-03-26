import { CarEngine, Scene, Widget } from '@newcar/core'
import { Arc } from '@newcar/basic'
import { move } from '@newcar/basic'

let circle: any
let app: any

await new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    circle = new Arc(10)
    circle.animate(move, 100, 0)
    app.checkout(new Scene(circle))
    app.play()
  })

