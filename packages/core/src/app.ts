import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'
import { initial } from './utils'
import { Widget } from './widget'

export const $draws = new WeakMap()

export class App {
  scene: Scene
  surface: Surface
  private playing = false
  test: any

  constructor(public element: HTMLCanvasElement, private ck: CanvasKit) {
    this.surface = this.ck.MakeWebGLCanvasSurface(this.element)
    console.log(this.surface)
    this.surface.requestAnimationFrame((canvas: Canvas) => App.update(this, canvas))
  }

  checkout(scene: Scene): this {
    this.scene = scene

    return this
  }

  static updateWidget(widget: Widget, prop: string) {}

  static update(app: App, canvas: Canvas): void {
    if (app.scene.elapsed === 0) {
      initial(app.scene.root, app.ck, canvas)
      App.updateWidget = (widget: Widget, prop: string) => {
        widget.predraw(app.ck, prop)
        widget.draw(canvas)
      }
    }
    
    app.scene.elapsed += 1
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

  impl(widget: Widget) {
    return new Proxy(widget, {
      set(target, prop, value) {
        (target as Record<string, any>)[prop as string] = value
        console.log(`${prop as string} changed!`)
        App.updateWidget(target, prop as string)
        return true
      }
    })
  }
}
