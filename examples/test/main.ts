import { CarEngine, Scene, Widget, App } from '@newcar/core'
import { Arc, Arrow, ImageWidget, Line, Rect, Text } from '@newcar/basic'
import { move } from '@newcar/basic'
import { Color, preload } from 'newcar'

let circle: any
let app: App

await preload(
  {
    src: './brand.png',
    type: 'image',
    name: 'brand',
  },
  {
    src: 'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
    type: 'font',
    name: 'd',
  },
)

await new CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {
    app = engine.createApp(document.querySelector('#canvas'))
    const root = new Widget()
    const scene = new Scene(root)
    app.checkout(scene)
    root
      .add(
        new Text('Hello world!', 'd', {
          x: 200,
          y: 200,
          style: {
            border: true,
            fill: true,
            borderWidth: 5,
            borderColor: Color.parse('skyblue'),
          },
        }),
      )
      .add(new ImageWidget('brand'))
    app.play()
  })
