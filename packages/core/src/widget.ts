import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Animation, AnimationInstance } from './animation'
import { deepClone } from './utils/deepClone'
import type { AnimationTree } from './animationTree'
import { analyseAnimationTree } from './animationTree'
import type { Event, EventInstance } from './event'
import type { BlendMode } from './utils/types'
import type { wait } from './apiWait'

export type WidgetInstance<T extends Widget> = T

export interface WidgetOptions {
  style?: WidgetStyle
  x?: number
  y?: number
  centerX?: number
  centerY?: number
  progress?: number
  children?: Widget[]
}

export interface WidgetStyle {
  scaleX?: number
  scaleY?: number
  rotation?: number
  transparency?: number
  blendMode?: BlendMode
}

export class Widget {
  x: number // The vector x of the widget.
  y: number // The vector y of the widget.
  centerX: number // The center vector x of the widget.
  centerY: number // The center vector y of the widget.
  progress: number // The progress/process of a widget.
  style: WidgetStyle = {
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    transparency: 1,
  } // The style of the widget.

  display = true
  isImplemented = false // If the widget is implemented by App.impl
  animationInstances: AnimationInstance[] = []
  eventInstances: EventInstance[] = []
  updates: ((elapsed: number, widget: Widget) => void)[] = []
  setups: GeneratorFunction[] = []
  key = `widget-${0}-${performance.now()}-${Math.random()
    .toString(16)
    .slice(2)}`

  parent: Widget | null
  hasSet = false

  constructor(options?: WidgetOptions) {
    options ??= {}
    this.x = options.x ?? 0
    this.y = options.y ?? 0
    this.centerX = options.centerX ?? 0
    this.centerY = options.centerY ?? 0
    this.progress = options.progress ?? 1
    this.children = options.children ?? []
    options.style ??= {}
    this.style.scaleX = options.style.scaleX ?? 1
    this.style.scaleY = options.style.scaleY ?? 1
    this.style.rotation = options.style.rotation ?? 0
    this.style.transparency = options.style.transparency ?? 1
    this.style.blendMode = options.style.blendMode ?? 'srcOver'
  }

  /**
   * The child-widgets of the widget.
   */
  children: Widget[] = []

  last: Widget = this

  /**
   * Called when the widget is registered.
   * @param _ck The CanvasKit namespace
   */
  init(_ck: CanvasKit) {}

  /**
   * Preload the necessary items during drawing.
   * Called when the properties of the widget is changed.
   * In common, we use it to initializing Paint, Rect, Path, etc.
   * @param CanvasKit The namespace of CanvasKit-WASM.
   * @param propertyChanged The changed property of this widget
   */

  predraw(_ck: CanvasKit, _propertyChanged: string) {}

  /**
   * Draw the object according to the parameters of the widget.
   * Called when the parameters is changed.
   * @param _canvas The canvas object of CanvasKit-WASM.
   */
  draw(_canvas: Canvas) {}

  /**
   * Called when the parameters is changed.
   * @param ck The namespace of CanvasKit-WASM.
   */
  preupdate(ck: CanvasKit, propertyChanged?: string) {
    this.predraw(ck, propertyChanged)
  }

  /**
   * Update the object according to the style of the widget.
   * Called when the style is changed.
   * @param canvas The canvas object of CanvasKit-WASM.
   */
  update(canvas: Canvas) {
    canvas.translate(this.x, this.y)
    canvas.rotate(this.style.rotation, this.centerX, this.centerY)
    canvas.scale(this.style.scaleX, this.style.scaleY)
    if (this.display) this.draw(canvas)
  }

  /**
   * Add children widgets for the widget.
   * @param children The added children.
   */
  add(...children: Widget[]): this {
    for (const child of children) {
      child.parent = child
      this.children.push(child)
    }

    return this
  }

  animate(
    animation: Animation<any>,
    startAt: number,
    during: number,
    params?: Record<string, any>,
  ): this {
    params ??= {}
    this.animationInstances.push({
      startAt,
      during,
      animation,
      params,
      mode: params.mode ?? 'positive',
    })

    return this
  }

  on(event: Event, effect: (widget: Widget, ...args: any[]) => any): this {
    this.eventInstances.push({
      event,
      effect,
    })
    if (typeof window === 'undefined') {
      console.warn(
        '[Newcar Warn] You are using local mode, events system was not supported',
      )
    }
    return this
  }

  animateTree(tree: AnimationTree, startAt: number) {
    this.animationInstances.push(...analyseAnimationTree(tree, startAt))
  }

  runAnimation(elapsed: number) {
    for (const instance of this.animationInstances) {
      if (
        instance.startAt <= elapsed &&
        instance.during + instance.startAt >= elapsed
      ) {
        if (instance.mode === 'positive') {
          instance.animation.act(
            this,
            elapsed - instance.startAt,
            (elapsed - instance.startAt) / instance.during,
            instance.params,
          )
        } else if (instance.mode === 'reverse') {
          instance.animation.act(
            this,
            elapsed - instance.startAt,
            1 - (elapsed - instance.startAt) / instance.during,
            instance.params,
          )
        }
      }
    }
    for (const update of this.updates) update(elapsed, this)

    for (const child of this.children) child.runAnimation(elapsed)
  }

  setEventListener(element: HTMLCanvasElement) {
    for (const instance of this.eventInstances)
      instance.event.operation(this, instance.effect, element)

    this.hasSet = true
    for (const child of this.children) child.setEventListener(element)
  }

  async runSetup(elapsed: number) {
    for (const setupFunc of this.setups) {
      const generator = setupFunc(
        this,
        (
          animation: Animation<any>,
          duration: number,
          params: Record<string, any>,
        ) => {
          this.animationInstances.push({
            startAt: elapsed,
            during: duration,
            animation,
            params,
            mode: params.mode ?? 'positive',
          })
        },
      )

      let result = generator.next()
      while (!result.done) {
        const waitInstruction = result.value
        if (waitInstruction && waitInstruction.duration)
          await this.handleWait(waitInstruction)

        result = generator.next()
      }
    }
    for (const child of this.children) child.runSetup(elapsed)
  }

  async handleWait(waitInstruction: ReturnType<typeof wait>) {
    const { duration, unit } = waitInstruction
    if (unit === 'second') {
      await new Promise((resolve) => setTimeout(resolve, duration * 1000))
    } else if (unit === 'frame') {
      // 假设帧率为 60 fps
      await new Promise((resolve) =>
        setTimeout(resolve, (duration / 60) * 1000),
      )
    }
  }

  setup(call: GeneratorFunction) {
    this.setups.push(call)
  }

  /**
   * Set up a update function to call it when the widget is changed.
   * @param updateFunc The frame from having gone to current frame.
   */
  setUpdate(updateFunc: (elapsed: number, widget: Widget) => void): this {
    this.updates.push(updateFunc)

    return this
  }

  _isAsyncWidget() {
    return false
  }

  show(): this {
    this.display = true
    return this
  }

  hide(): this {
    this.display = false
    return this
  }

  copy(): this {
    return deepClone(this)
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  isIn(x: number, y: number): boolean {
    return false
  }

  static getAbsoluteCoordinates(widget: Widget): { x: number; y: number } {
    function getCoordinates(
      widget: Widget,
      x: number,
      y: number,
    ): { x: number; y: number } {
      let parent = widget.parent
      let absoluteX = x
      let absoluteY = y

      while (parent) {
        absoluteX += parent.x
        absoluteY += parent.y
        parent = parent.parent
      }

      return { x: absoluteX, y: absoluteY }
    }

    return getCoordinates(widget, widget.x, widget.y)
  }

  static absoluteToRelative(
    widget: Widget,
    x: number,
    y: number,
  ): { x: number; y: number } {
    const { x: absoluteX, y: absoluteY } = Widget.getAbsoluteCoordinates(widget)
    const relativeX = x - absoluteX
    const relativeY = y - absoluteY

    return { x: relativeX, y: relativeY }
  }
}
