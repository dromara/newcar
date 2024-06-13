import * as nc from 'newcar'

const engine = (await new nc.CarEngine().init(
  './node_modules/canvaskit-wasm/bin/canvaskit.wasm',
))

const font = await nc.useFont('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')

const milestoneElem = document.querySelector('#milestone') as HTMLCanvasElement
window.addEventListener('resize', () => {
  milestoneElem.width = window.innerWidth
  milestoneElem.height = window.innerHeight
})
window.dispatchEvent(new Event('resize'))

export class Milestone {
  scenes: nc.Scene[]
  current: number

  milestoneElem: HTMLCanvasElement
  app: nc.App

  static engine = engine
  static instance: Milestone

  constructor(el: HTMLCanvasElement, ...scenes: nc.Scene[]) {
    this.scenes = scenes
    this.current = 0

    this.milestoneElem = el
    this.app = engine.createApp(this.milestoneElem)

    this.switch_to(0)
  }

  switch_to(n: number) {
    if (this.scenes[n] === undefined) return
    this.current = n
    this.app.checkout(this.scenes[n])
  }

  add_scene(setup: ((app: nc.App) => nc.Scene) | nc.Scene) {
    if (setup instanceof nc.Scene) {
      this.scenes.push(setup)
    } else {
      this.scenes.push(setup(this.app))
    }
  }
}

const root = new nc.Widget({
  pos: nc.pp(0.5, 0.5)
})

for (let x = 0; x <= 20000; x += 20) {
  for (let y = 0; y <= 2000; y += 20) {
    root.add(new nc.Circle(10, {
      x,
      y
    })
      .animate(nc.fadeIn().withAttr({ duration: 3 }))
    )
  }
}

export const defaultScene = new nc.Scene(
  root.animate(nc.rotate().withAttr({ to: 1000, duration: 3 }))
)

const left = document.querySelector('.left') as HTMLDivElement
left.addEventListener('click', () => {
  milestone.switch_to(milestone.current + 1)
})

const right = document.querySelector('.right') as HTMLDivElement
right.addEventListener('click', () => {
  milestone.switch_to(milestone.current - 1)
})

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':
      left.dispatchEvent(new Event('click'))
      break
    case 'ArrowRight':
      right.dispatchEvent(new Event('click'))
      break
  }
})

Milestone.instance = new Milestone(milestoneElem)

export const milestone = Milestone.instance
milestone.add_scene(defaultScene)
milestone.switch_to(0)

milestone.app.play()

// import CanvasKitInit, { Canvas } from 'canvaskit-wasm'

// const ck = await CanvasKitInit({
//   locateFile: (file) => './node_modules/canvaskit-wasm/bin/canvaskit.wasm'
// })
// const surface = ck.MakeWebGLCanvasSurface(document.getElementById('milestone') as HTMLCanvasElement)

// const paint = new ck.Paint()
// function update(canvas: Canvas) {
//   for (let x = 0; x <= 2000; x += 20) {
//     for (let y = 0; y <= 2000; y += 20) {
//       const path = new ck.Path()
//       path.arc(x, y, 10, 0, 360)
//       canvas.drawPath(path, paint)
//     }
//   }
//   canvas.rotate(10, 0, 0)
//   surface.requestAnimationFrame(update)
// }

// surface.requestAnimationFrame(update)

// const element = document.querySelector('#milestone') as HTMLCanvasElement
// const ctx = element.getContext('2d')

// let rotation = 0
// function update() {
//   ctx.save()
//   for (let x = 0; x <= 20000; x += 20) {
//     for (let y = 0; y <= 20000; y += 20) {
//       ctx.beginPath()
//       ctx.arc(x, y, 10, 0, 2 * Math.PI)
//       ctx.stroke()
//     }
//   }
//   rotation += 0.1
//   ctx.rotate(rotation)
//   // ctx.restore()
//   requestAnimationFrame(update)
//   ctx.clearRect(0, 0, element.width, element.height)
//   ctx.restore()
// }

// requestAnimationFrame(update)
