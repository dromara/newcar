import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import { Color } from '@newcar/utils'
import type { Scene } from './scene'
import { initial } from './initial'
import { deepClone } from './utils/deepClone'
import { patch } from './patch'
import type { Widget } from './widget'
import type { GlobalPlugin } from './plugin'
import { type Config, defineConfig } from './config'

/**
 * A object that control a single animatiopn canvas.
 */
export class App {
  /**
   * The current scene of this app
   */
  scene: Scene
  surface: Surface
  private playing = false
  private last: Widget
  private lastFrameTime = performance.now()
  private currentFrameTime = performance.now()
  /**
   * The App config.
   */
  config: Config
  /**
   * Updating group, which call them every update calling.
   */
  updates: ((elapsed: number) => void)[] = []
  cleared: boolean

  /**
   * The Constructor of `App`
   * @param element The `<canvas>` element.
   * @param ck The CanvasKit Namespace.
   * @param plugins The plugins provided by `CarEngine`.
   */
  constructor(
    public element: HTMLCanvasElement,
    private ck: CanvasKit,
    private plugins: GlobalPlugin[],
  ) {
    this.setBackgroundColor(Color.BLACK)
    this.config = defineConfig({
      unit: 's',
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

  /**
   * Checkout a scene.
   * @param scene The scene that is going to be changed.
   * @returns this
   */
  checkout(scene: Scene): this {
    for (const plugin of this.plugins) plugin.beforeCheckout(this, scene)
    this.scene = scene
    this.scene.startTime = performance.now()
    this.last = this.scene.root
    for (const plugin of this.plugins) plugin.onCheckout(this, this.scene)
    // if (!scene.root.hasSet)
    scene.root.setEventListener(this.element)
    return this
  }

  /**
   * The rendering and uodate function, which called every frame.
   * @param app The `App` object.
   * @param canvas The `Canvas` object of CanvasKit-WASM
   */
  static update(app: App, canvas: Canvas): void {
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

    if (app.cleared) {
      canvas.clear(Color.parse(app.element.style.backgroundColor).toFloat4())
      app.cleared = false
    }
    for (const plugin of app.plugins) plugin.onUpdate(app, app.scene.elapsed)

    if (app.playing) {
      if (app.config.unit === 'frame')
        app.scene.elapsed += 1
      else if (app.config.unit === 'ms')
        app.scene.elapsed = performance.now() - app.scene.startTime
      else if (app.config.unit === 's')
        app.scene.elapsed = (performance.now() - app.scene.startTime) / 1000
      app.surface.requestAnimationFrame((canvas: Canvas) => {
        App.update(app, canvas)
      })
    }
  }

  /**
   * Start to play this animation app
   * @param frame Play at `frame`
   * @returns this
   */
  play(frame?: number): this {
    if (this.scene === void 0) {
      console.warn(
        `[Newcar Warn] Current scene is undefined, please checkout a usable scene.`,
      )
    }
    this.scene.elapsed ??= frame
    this.playing = true
    this.surface.requestAnimationFrame((canvas: Canvas) => {
      App.update(this, canvas)
    })

    return this
  }

  /**
   * Pause the animation of this app.
   * @param frame pause at `frame`
   * @returns this
   */
  pause(frame?: number): this {
    this.scene.elapsed ??= frame
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

  /**
   * Add a plugin for this app.
   * @param plugin The `CarPlugin`
   */
  use(plugin: GlobalPlugin) {
    this.plugins.push(plugin)
  }

  /**
   * Set the background color
   * @param color The `Color` object
   * @returns this
   */
  setBackgroundColor(color: Color | 'transparent'): this {
    color !== 'transparent'
      ? (this.element.style.backgroundColor = color.toString())
      : (this.element.style.backgroundColor = '')

    return this
  }

  clear() {
    this.cleared = true
  }
}
