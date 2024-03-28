import { CarEngine, Scene, Widget, App } from '@newcar/core'
import { Arc, Arrow, Line, Rect } from '@newcar/basic'
import { move } from '@newcar/basic'
import { Color } from 'newcar'

let circle: any
let app: App

await new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    const root = new Widget()
    const scene = new Scene(root)
    app.checkout(scene)
    root.add(new Arrow([0, 0], [100, 100]).add(new Line([0, 0], [100, 100])))
    app.play()
  })
