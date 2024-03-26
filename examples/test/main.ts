import { CarEngine, Scene, Widget, App } from '@newcar/core'
import { Arc } from '@newcar/basic'
import { move } from '@newcar/basic'

let circle: any
let app: any

await new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    circle = new Arc(100)
    circle.animate(move, 10000000000, 0)
    app.checkout(new Scene(circle.add(new Arc(20, {
      x: 100,
      y: 100
    }))))
    app.play()
  })

