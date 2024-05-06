import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { Color } from '@newcar/utils'
import type { Scene } from './scene'
import { initial } from './initial'
import { deepClone } from './utils/deepClone'
import { patch } from './patch'
import type { Widget } from './widget'
import type { GlobalPlugin } from './plugin'
import { type Config, defineConfig } from './config'

export class App {
  scene: Scene
  surface: Surface
  private playing = false
  private last: Widget
  private lastFrameTime = performance.now()
  private currentFrameTime = performance.now()
  config: Config
  updates: ((elapsed: number) => void)[] = []

  constructor(
    public element: HTMLCanvasElement,
    private ck: CanvasKit,
    private plugins: GlobalPlugin[],
  ) {
    this.setBackgroundColor(Color.BLACK)
    this.config = defineConfig({
      unit: 'frame',
      fps: 60,
    })
    if (element === void 0) {
      console.warn(
        `[Newcar Warn] You are trying to use a undefined canvas element.`,
      )
    }
    for (const plugin of this.plugins) plugin.beforeSurfaceLoaded(this)

    if (typeof window !== 'undefined') {
      this.surface = this.ck.MakeWebGLCanvasSurface(this.element)
    }
    else {
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
    app.currentFrameTime = performance.now()
    const timeSinceLastFrame = app.currentFrameTime - app.lastFrameTime
    if (timeSinceLastFrame < app.frameDuration) {
      app.surface.requestAnimationFrame((canvas: Canvas) => {
        App.update(app, canvas)
      })
      return
    }

    for (const plugin of app.plugins)
      plugin.beforeUpdate(app, app.scene.elapsed)

    if (app.scene.elapsed === 0)
      initial(app.scene.root, app.ck, canvas)

    for (const plugin of app.plugins)
      plugin.beforePatch(app, app.scene.elapsed, app.last, app.scene.root)

    patch(app.last, app.scene.root, app.ck, canvas)
    for (const plugin of app.plugins)
      plugin.onPatch(app, app.scene.elapsed, app.last, app.scene.root)

    app.last = deepClone(app.scene.root)

    for (const plugin of app.plugins)
      plugin.beforeAnimate(app, app.scene.elapsed, app.scene.root)
    app.scene.root.runAnimation(app.scene.elapsed)
    app.scene.root.processSetups(app.scene.elapsed)
    for (const plugin of app.plugins)
      plugin.onAnimate(app, app.scene.elapsed, app.scene.root)

    for (const plugin of app.plugins) plugin.onUpdate(app, app.scene.elapsed)

    if (app.playing) {
      app.scene.elapsed += 1
      app.lastFrameTime = app.currentFrameTime
      app.surface.requestAnimationFrame((canvas: Canvas) => {
        App.update(app, canvas)
      })
    }
  }

  private get frameDuration() {
    return 1000 / this.config.fps
  }

  play(frame: number): this {
    if (this.scene === void 0) {
      console.warn(
        `[Newcar Warn] Current scene is undefined, please checkout a usable scene.`,
      )
    }
    this.scene.elapsed = frame
    this.playing = true
    this.surface.requestAnimationFrame((canvas: Canvas) => {
      App.update(this, canvas)
    })

    return this
  }

  pause(frame: number): this {
    this.scene.elapsed = frame
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

  use(plugin: GlobalPlugin) {
    this.plugins.push(plugin)
  }

  setBackgroundColor(color: Color | 'transparent'): this {
    color !== 'transparent'
      ? (this.element.style.backgroundColor = color.toString())
      : (this.element.style.backgroundColor = '')

    return this
  }

  destroy(): this {
    this.pause(0)
    this.updates = []
    if (this.surface) {
      this.surface.dispose()
      this.surface = null as any
    }
    this.element = null as any
    return this
  }
}
