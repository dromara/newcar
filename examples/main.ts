import * as nc from 'newcar'
import scene1 from './scene1'
import timeview from '@newcar/plugin-timeview'

// const milestone = document.querySelector('#milestone') as HTMLCanvasElement
// window.addEventListener('resize', () => {
//   milestone.width = window.innerWidth
//   milestone.height = window.innerHeight
// })
// window.dispatchEvent(new Event('resize'))

const engine = await new nc.CarEngine().init('./node_modules/canvaskit-wasm/bin/canvaskit.wasm')
const app = engine.createApp(document.querySelector('#milestone'))


app.checkout(scene1)

app.play()

export default app