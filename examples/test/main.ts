import { CarEngine, Scene, Widget, App } from '@newcar/core'
import {
  Arc,
  Arrow,
  ImageWidget,
  Line,
  Rect,
  Svg,
  Text,
  Circle,
} from '@newcar/basic'
import { move } from '@newcar/basic'
import { Color, preload } from 'newcar'

let circle: any
let app: App

await new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    const root = new Circle(100, {
      x: 1000,
    })
      .animate(move, 0, 100, {
        x: -2000,
      })
      .add(new ImageWidget('./brand.png'))
      .add(
        new Circle(100, {
          x: 1000,
        }),
      )
    const scene = new Scene(root)
    app.checkout(scene)
    // root
    //   .add()
    app.play()
  })
