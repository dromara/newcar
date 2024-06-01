import * as nc from 'newcar'

const engine = (await new nc.CarEngine().init(
  './node_modules/canvaskit-wasm/bin/canvaskit.wasm',
))

export const scene1 = new nc.Scene(
  new nc.Circle(100)
    .animate(nc.discolorate, 0, 1, {
      from: nc.Color.parse("yellow"),
      to: nc.Color.parse("blue")
    })
)

const app1 = engine.createApp(document.querySelector('#a1'))
app1.checkout(scene1)
console.log(app1.scene.root)
app1.play()