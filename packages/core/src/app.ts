import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'
import { initial, pre } from './utils'

export class App {
  private _scene: Scene
  private _CanvasKit: CanvasKit
  private playing = false
  surface: Surface

  constructor(public element: HTMLCanvasElement, private CanvasKit: CanvasKit) {
    this._CanvasKit = CanvasKit
    this.surface = this._CanvasKit.MakeWebGLCanvasSurface(this.element)
    console.log(this.surface)
  }

  checkout(scene: Scene): this {
    this._scene = scene
    initial(this._scene.root, this._CanvasKit)

    return this
  }

  static update(app: App, canvas: Canvas): void {
    if (app.playing) {
      app.surface.requestAnimationFrame((canvas: Canvas) =>
        App.update(app, canvas)
      );
    }
  }

  play(): this {
    this.playing = true
    this.surface.requestAnimationFrame((canvas: Canvas) => App.update(this, canvas))

    return this
  }

  pause(): this {
    this.playing = false

    return this
  }

  get currentScene() {
    return this._scene
  }
}
