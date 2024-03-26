import { CarEngine, Scene, Widget } from '@newcar/core'
import { Arc } from '@newcar/basic'
import { move } from '@newcar/basic'

let circle: any
let app: any

await new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    circle = new Arc(10, {
      x: 100,
      y: 100
    })
    circle.animate(move, 200, 0)
    app.checkout(new Scene(circle))
    app.play()
  })

