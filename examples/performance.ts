import * as nc from 'newcar'
import * as mt from '@newcar/mod-math'
import * as gm from '@newcar/mod-geometry'

await nc.useFont('./default.ttf')

const wid = new nc.Widget()
// for (let i = 0; i< 1000; i++) {
//   for (let y = 0; y < 330; y++) {
//     wid.add(
//       new nc.Rect(5, 5, {
//         x: i * 6,
//         y: y * 6
//       })
//     )
//   }
// }

export default nc.createScene(
  wid.animate(nc.move().withAttr({
    duration: 10,
    to: [100, 100]
  })).setup(function *() {
    yield 2
    console.log('hello')
    yield 2
    console.log('world!')
  })
)