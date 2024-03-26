import { CarEngine, Scene, Widget, App } from '@newcar/core'
import { Arc } from '@newcar/basic'
import { move } from '@newcar/basic'

let circle: any
let app: any

await new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    const root = new Widget()
    const scene = new Scene(root)
    for (let row = 0; row <= 10000; row += 10) {
      for (let column = 0; column <= 1000; column += 10) {
        root.add(new Arc(10, {
          x: column,
          y: row,
          style: {
            fillColor: null
          }
        }))
      }
    }
    app.checkout(scene)
    app.play()
    root.animate(move, 100, 0)
  })

