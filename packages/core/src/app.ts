import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { Color } from '@newcar/utils'
import type { Scene } from './scene'
import { initial } from './initial'
import { deepClone } from './utils/deepClone'
import { patch } from './patch'
import type { Widget } from './widget'
import type { CarPlugin } from './plugin'

export class App {
  scene: Scene
  surface: Surface
  private playing = false
  private last: Widget
  updates: ((elapsed: number) => void)[] = []

  constructor(
    public element: HTMLCanvasElement,
    private ck: CanvasKit,
    private plugins: CarPlugin[],
  ) {
    this.setBackgroundColor(Color.BLACK)
    if (element === void 0) {
      console.warn(
        `[Newcar Warn] You are trying to use a undefined canvas element.`,
      )
    }
    for (const plugin of this.plugins) plugin.beforeSurfaceLoaded(this)

    if (typeof window !== 'undefined') {
      this.surface = this.ck.MakeWebGLCanvasSurface(this.element)
    } else {
      console.warn(
        '[Newcar Warn] You are using nodejs to run Newcar, please use LocalApp.',
      )
    }

    for (const plugin of this.plugins)
      plugin.onSurfaceLoaded(this, this.surface)
  }

  checkout(scene: Scene): this {
    for (const plugin of this.plugins) plugin.beforeCheckout(this, scene)

    this.scene = scene
    this.last = this.scene.root
    for (const plugin of this.plugins) plugin.onCheckout(this, this.scene)
    // if (!scene.root.hasSet)
    scene.root.setEventListener(this.element)
    return this
  }

  static update(app: App, canvas: Canvas): void {
    for (const plugin of app.plugins)
      plugin.beforeUpdate(app, app.scene.elapsed)

    // If this updating is this scene's origin, initial this scene.
    if (app.scene.elapsed === 0) initial(app.scene.root, app.ck, canvas)

    // Contrast the old widget and the new widget and update them.
    for (const plugin of app.plugins)
      plugin.beforePatch(app, app.scene.elapsed, app.last, app.scene.root)

    patch(app.last, app.scene.root, app.ck, canvas)
    for (const plugin of app.plugins)
      plugin.afterPatch(app, app.scene.elapsed, app.last, app.scene.root)

    app.last = deepClone(app.scene.root)

    // Animating.
    app.scene.root.runAnimation(app.scene.elapsed)

    for (const plugin of app.plugins) plugin.afterUpdate(app, app.scene.elapsed)

    if (app.playing) {
      app.scene.elapsed += 1
      app.surface.requestAnimationFrame((canvas: Canvas) => {
        for (const updateFunc of app.updates) updateFunc(app.scene.elapsed)

        App.update(app, canvas)
      })
    }
  }

  play(): this {
    if (this.scene === void 0) {
      console.warn(
        `[Newcar Warn] Current scene is undefined, please checkout a usable scene.`,
      )
    }
    this.playing = true
    this.surface.requestAnimationFrame((canvas: Canvas) => {
      App.update(this, canvas)
    })

    return this
  }

  pause(): this {
    this.playing = false

    return this
  }

  /**
   * Set up a update function to call it when the widget is changed.
   * @param updateFunc The frame from having gone to current frame.
   */
  setUpdate(updateFunc: (elapsed: number) => void) {
    this.updates.push(updateFunc)
  }

  use(plugin: CarPlugin) {
    this.plugins.push(plugin)
  }

  setBackgroundColor(color: Color | 'transparent'): this {
    color !== 'transparent'
      ? (this.element.style.backgroundColor = color.toString())
      : (this.element.style.backgroundColor = '')

    return this
  }
}
