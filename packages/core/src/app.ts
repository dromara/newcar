import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'

export class App {
  private _scene: Scene
  private _ckNamespace: CanvasKit
  private playing = false
  private surface: Surface

  constructor(public element: HTMLCanvasElement, ckNamespace: CanvasKit) {
    this._ckNamespace = ckNamespace
    this.surface = this._ckNamespace.MakeWebGLCanvasSurface(this.element)
  }

  checkout(scene: Scene) {
    this._scene = scene
    this._scene.root.preUpdate(this._ckNamespace, "") // TODO: reactive properties
  }

  update(canvas: Canvas) {
    this.surface.requestAnimationFrame((canvas: Canvas) => {
      // If user choose to pause, stop to request.
      if (!this.playing) return
      this.update(canvas)
    })
  }

  play() {
    this.playing = true
    this.surface.requestAnimationFrame(this.update)
  }

  pause() {
    this.playing = false
  }

  get currentScene() {
    return this._scene
  }
}
