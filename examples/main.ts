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

export const defaultScene = new nc.Scene(
  new nc.Circle(100, {
    x: 200,
    y: 200
  })
  .animate(nc.focusOn().withAttr({ duration: 0.3 }))
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
      break;
    case 'ArrowRight':
      right.dispatchEvent(new Event('click'))
      break;
  }
})

Milestone.instance = new Milestone(milestoneElem)

export const milestone = Milestone.instance
milestone.add_scene(defaultScene)
milestone.switch_to(0)

milestone.app.play()