import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'
import { initial } from './utils/initial'
import { deepClone } from './utils/deepClone'
import { patch, shallowEqual } from './utils/patch'
import { Widget } from './widget'

export class App {
  scene: Scene
  surface: Surface
  private playing = false
  private last: Widget
  test: any

  constructor(public element: HTMLCanvasElement, private ck: CanvasKit) {
    if (element == void 0) {
      console.warn(
        `[Newcar Warn] You are trying to use a undefined canvas element.`,
      )
    }
    this.surface = this.ck.MakeWebGLCanvasSurface(this.element)
    this.surface.requestAnimationFrame((canvas: Canvas) =>
      App.update(this, canvas),
    )
  }

  checkout(scene: Scene): this {
    this.scene = scene
    this.last = deepClone(this.scene.root)

    return this
  }

  static update(app: App, canvas: Canvas): void {
    // If this updating is this scene's origin, initial this scene
    if (app.scene.elapsed === 0) {
      initial(app.scene.root, app.ck, canvas)
    }
    // Contrast the old widget and the new widget.
    patch(app.last, app.scene.root, app.ck, canvas)
    // console.log(shallowEqual(app.last, deepClone(app.scene.root)))

    app.last = deepClone(app.scene.root)

    if (app.playing) {
      app.scene.elapsed += 1
      app.surface.requestAnimationFrame((canvas: Canvas) =>
        App.update(app, canvas),
      )
    }
  }

  play(): this {
    if (this.scene == void 0) {
      console.warn(
        `[Newcar Warn] Current scene is undefined, please checkout a usable scene.`,
      )
    }
    this.playing = true
    this.surface.requestAnimationFrame((canvas: Canvas) =>
      App.update(this, canvas),
    )

    return this
  }

  pause(): this {
    this.playing = false

    return this
  }
}
