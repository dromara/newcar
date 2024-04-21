import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Animation, AnimationInstance } from './animation'
import { deepClone } from './utils/deepClone'
import type { AnimationTree } from './animationTree';
import { analyseAnimationTree } from './animationTree'
import type { Event, EventInstance } from './event';

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
  key = `widget-${0}-${performance.now()}-${Math.random()
    .toString(16)
    .slice(2)}`
  parent: Widget | null

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
    if (this.display)
      this.draw(canvas)
  }

  /**
   * Add children widgets for the widget.
   * @param children The added children.
   */
  add(...children: Widget[]): this {
    for (const child of children)
      this.children.push(child)

    return this
  }

  animate(
    animation: Animation<Widget>,
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
      effect
    })
    if (typeof window === 'undefined') 
      console.warn('[Newcar Warn] You are using local mode, events system was not supported')
    event.operation(this, effect)

    return this
  }

  animateTree(tree: AnimationTree, startAt: number) {
    this.animationInstances.push(...analyseAnimationTree(tree, startAt))
  }

  runAnimation(elapsed: number) {
    for (const instance of this.animationInstances) {
      if (
        instance.startAt <= elapsed
        && instance.during + instance.startAt >= elapsed
      ) {
        if (instance.mode === 'positive') {
          instance.animation.act(
            this,
            elapsed - instance.startAt,
            (elapsed - instance.startAt) / instance.during,
            instance.params,
          )
        }
        else if (instance.mode === 'reverse') {
          instance.animation.act(
            this,
            elapsed - instance.startAt,
            1 - (elapsed - instance.startAt) / instance.during,
            instance.params,
          )
        }
      }
    }
    for (const update of this.updates)
      update(elapsed, this)

    for (const child of this.children)
      child.runAnimation(elapsed)
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

  isIn(): boolean {
    return false
  }

  isOnSide(): boolean {
    return false
  }
}
