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
    const root = new Widget()
      .add(
        new Rect([0, 0], [100, 100], {
          y: 100
        })
      )
      .add(
        new Text(
          'Hello world!',
          'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
          {
            y: 100
          }
        ),
      )
      // .add(new ImageWidget('./brand.png'))
    const scene = new Scene(root)
    app.checkout(scene)
    // root
    //   .add()
    app.play()
  })
