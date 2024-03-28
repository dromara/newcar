import { CarEngine, Scene, Widget, App } from '@newcar/core'
import { Arc, Arrow, ImageWidget, Line, Rect } from '@newcar/basic'
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
    root.add()
    app.play()
  })
