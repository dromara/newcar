import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'
import { initial } from './initial'
import type { Widget } from './widget'
import type { GlobalPlugin } from './plugin'
import { type Config, defineConfig } from './config'

/**
 * @see Widget
 */
export class LocalApp {
  scene: Scene
  surface: Surface
  private playing = false
  private last: Widget
  updates: ((elapsed: number) => void)[] = []
  canvas: Canvas
  config: Config

  constructor(
    public width: number,
    public height: number,
    private ck: CanvasKit,
    private plugins: GlobalPlugin[],
  ) {
    for (const plugin of this.plugins) {
      plugin.beforeSurfaceLoaded(this)
    }

    if (typeof window === 'undefined') {
      this.surface = this.ck.MakeSurface(this.width, this.height)
      this.canvas = this.surface.getCanvas()
    }
    else {
      console.warn(
        '[Newcar Warn] You are using browser to run Newcar local mode, please use normal App.',
      )
    }
    for (const plugin of this.plugins)
      plugin.onSurfaceLoaded(this, this.surface)
    this.config = defineConfig({
      unit: 's',
    })
  }

  checkout(scene: Scene): this {
    for (const plugin of this.plugins) plugin.beforeCheckout(this, scene)

    this.scene = scene
    this.last = this.scene.root
    for (const plugin of this.plugins) plugin.onCheckout(this, this.scene)

    return this
  }

  static update(app: LocalApp): void {
    for (const plugin of app.plugins)
      plugin.beforeUpdate(app, app.scene.elapsed)

    initial(app.scene.root, app.ck, app.canvas)
    // Contrast the old widget and the new widget and update them.
    for (const plugin of app.plugins)
      plugin.beforePatch(app, app.scene.elapsed, app.last, app.scene.root)

    for (const plugin of app.plugins) {
      plugin.onPatch(app, app.scene.elapsed, app.last, app.scene.root)
    }
    (function draw(widget: Widget) {
      widget.init(app.ck)
      app.canvas.save()
      // widget.update(app.canvas)
      for (const child of widget.children) draw(child)

      app.canvas.restore()
    })(app.scene.root)

    // Animating.
    app.scene.root.runAnimation(app.scene.elapsed, app.ck)

    for (const plugin of app.plugins) plugin.onUpdate(app, app.scene.elapsed)

    app.scene.elapsed += 1
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

  /**
   * Get every frame's image data
   * @param duration The duration
   * @returns The image data list.
   */
  getFrames(duration: number, fps?: number) {
    const data = []
    if (this.config.unit === 'frame') {
      for (let elapsed = 0; elapsed <= duration; elapsed++) {
        this.canvas.clear(this.ck.BLACK)
        LocalApp.update(this)
        data.push(this.surface.makeImageSnapshot().encodeToBytes())
      }
    }
    else if (this.config.unit === 's') {
      for (let elapsed = 0; elapsed <= (duration * fps); elapsed += (1 / fps)) {
        this.canvas.clear(this.ck.BLACK)
        LocalApp.update(this)
        data.push(this.surface.makeImageSnapshot().encodeToBytes())
      }
    }
    else if (this.config.unit === 'ms') {
      for (let elapsed = 0; elapsed <= (duration * (fps / 1000)); elapsed += (1000 / fps)) {
        this.canvas.clear(this.ck.BLACK)
        LocalApp.update(this)
        data.push(this.surface.makeImageSnapshot().encodeToBytes())
      }
    }
    return data
  }
}
