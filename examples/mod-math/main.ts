import * as nc from 'newcar'
import * as mod_math from '@newcar/mod-math'

const engine = await new nc.CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createApp(document.querySelector('#canvas'))
const root = new nc.Rect([0, 0], [100, 100], {
  x: 100,
  y: 100,
})
  // .add(new nc.Text('Hello', 'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf'))
  .animate(nc.rotate, 0, 300, {
    from: 0,
    to: 2000,
  })
  .add(new nc.Rect([0, 0], [100, 100]))
  .add(new nc.Arrow([0, 0], [100, 100]))
  // .add(
  //   new mod_math.NumberAxis(-300, 300, {
  //     unitFont:
  //       'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
  //   }),
  // )
const scene = new nc.Scene(root)

// for (let row = 0; row <= 100; row += 10) {
//   for (let column = 0; column <= 100; column += 10) {
//     root.add(new nc.Circle(10, {
//       x: row,
//       y: column,
//       style: {
//         fill: false,
//         border: true
//       }
//     }))
//   }
// }

app.checkout(scene)
app.play()
