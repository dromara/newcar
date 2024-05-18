import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import { type BlendMode, isUndefined } from '@newcar/utils'
import type { Animation, AnimationInstance } from './animation'
import { deepClone } from './utils/deepClone'
import type { AnimationTree } from './animationTree'
import { analyseAnimationTree } from './animationTree'
import type { Event, EventInstance } from './event'
import type { WidgetPlugin } from './plugin'

export type WidgetRange = [number, number, number, number]
export type WidgetInstance<T extends Widget> = T
export type SetupFunction<T extends Widget> = (widget: Widget, animate: AnimateFunction<T>) => Generator<number | ReturnType<AnimateFunction<T>>, void, unknown>
export type AnimateFunction<T extends Widget> = (animation: Animation<T>, duration: number, params?: Record<string, any>) => {
  animation: Animation<T>
  mode: 'async' | 'sync'
  duration: number
  params: Record<string, any>
  setAsync: () => ReturnType<AnimateFunction<T>>
  setSync: () => ReturnType<AnimateFunction<T>>
}
export type Layout = 'row' | 'column' | 'absolute' | 'mix'

export interface WidgetOptions {
  style?: WidgetStyle
  x?: number
  y?: number
  centerX?: number // The rotation center x of the widget.
  centerY?: number // The rotation center y of the widget.
  progress?: number
  children?: Widget[]
}

export interface WidgetStyle {
  scaleX?: number
  scaleY?: number
  rotation?: number
  transparency?: number
  blendMode?: BlendMode
  antiAlias?: boolean
  layout?: Layout
  margin?: [number, number, number, number] | [number, number] | number
}

export class Widget {
  plugins: WidgetPlugin[] = []
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
  animationInstances: AnimationInstance<Widget>[] = []
  eventInstances: EventInstance<Widget>[] = []
  updates: ((elapsed: number, widget: Widget) => void)[] = []
  setups: Array<{ generator: Generator<number | ReturnType<AnimateFunction<any>>, void, unknown>, nextFrame: number }> = []
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
    this.style.antiAlias = options.style.antiAlias ?? true
    this.style.layout = options.style.layout ?? 'absolute'
    this.style.margin = isUndefined(options.style.margin)
      ? [0, 0, 0, 0]
      : typeof options.style.margin === 'number'
        ? [options.style.margin, options.style.margin, options.style.margin, options.style.margin]
        : options.style.margin.length === 2
          ? [options.style.margin[0], options.style.margin[0], options.style.margin[1], options.style.margin[1]]
          : options.style.margin
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
  init(_ck: CanvasKit) { }

  /**
   * Preload the necessary items during drawing.
   * Called when the properties of the widget is changed.
   * In common, we use it to initializing Paint, Rect, Path, etc.
   * @param _ck The namespace of CanvasKit-WASM.
   * @param _propertyChanged The changed property of this widget
   */

  predraw(_ck: CanvasKit, _propertyChanged: string) { }

  /**
   * Draw the object according to the parameters of the widget.
   * Called when the parameters is changed.
   * @param _canvas The canvas object of CanvasKit-WASM.
   */
  draw(_canvas: Canvas) { }

  /**
   * Called when the parameters is changed.
   * @param ck The namespace of CanvasKit-WASM.
   * @param propertyChanged
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
    if (this.display) {
      for (const plugin of this.plugins)
        plugin.beforeDraw(this, canvas)
      this.draw(canvas)
      for (const plugin of this.plugins)
        plugin.onDraw(this, canvas)
    }
  }

  /**
   * Add children widgets for the widget.
   * @param children The added children.
   */
  add(...children: Widget[] | ((parent: Widget) => Widget)[]): this {
    // let index = 0
    for (let child of children) {
      if (typeof child === 'function')
        child = child(this)
      child.parent = child
      this.children.push(child)
      // switch (this.style.layout) {
      //   case 'row': {
      //     if (index === 0)
      //       child.x = child.x + (child.style.margin as [number, number, number, number])[2]
      //     else
      //       child.x = child.x + (this.children[index - 1].style.margin as [number, number, number, number])[3] + (child.style.margin as [number, number, number, number])[2]
      //     break
      //   }
      //   case 'column': {
      //     if (index === 0)
      //       child.y = child.y + (child.style.margin as [number, number, number, number])[0]
      //     else
      //       child.y = child.y + (this.children[index - 1].style.margin as [number, number, number, number])[1] + (child.style.margin as [number, number, number, number])[0]
      //     break
      //   }
      //   case 'mix': {
      //     if (index === 0) {
      //       child.x = child.x + (child.style.margin as [number, number, number, number])[2]
      //       child.y = child.y + (child.style.margin as [number, number, number, number])[0]
      //     }
      //     else {
      //       child.x = child.x + (this.children[index - 1].style.margin as [number, number, number, number])[3] + (child.style.margin as [number, number, number, number])[2]
      //       child.y = child.y + (this.children[index - 1].style.margin as [number, number, number, number])[1] + (child.style.margin as [number, number, number, number])[0]
      //     }
      //     break
      //   }
      //   // TODO: Align and Baseline
      // }
      // index += 1
    }
    return this
  }

  animate(
    animation: Animation<any>,
    startAt: number | null,
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

  on(event: Event<Widget>, effect: (widget: Widget, ...args: any[]) => any): this {
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

  // Run an animation with respect to `elapsed`, which is maintained by `App` class
  runAnimation(elapsed: number) {
    // Traverse over instances sequence, run each animation
    for (const instance of this.animationInstances) {
      if (
        // this condition make sure the animation contained the current frame
        instance.startAt <= elapsed
        // this condition make sure the animation have not finished yet
        && (instance.during + instance.startAt) >= elapsed
      ) {
        if (instance.mode === 'positive') {
          instance.animation.act(
            this,
            elapsed - instance.startAt,
            (elapsed - instance.startAt) / instance.during,
            instance.params,
          )
          // console.log((elapsed - instance.startAt) / instance.during, instance.startAt, instance.during)
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
    for (const update of this.updates) update(elapsed, this)

    for (const child of this.children) child.runAnimation(elapsed)
  }

  setEventListener(element: HTMLCanvasElement) {
    for (const instance of this.eventInstances)
      instance.event.operation(this, instance.effect, element)

    this.hasSet = true
    for (const child of this.children) child.setEventListener(element)
  }

  /**
   * Set up a update function to call it when the widget is changed.
   * @param updateFunc The frame from having gone to current frame.
   */
  setUpdate(updateFunc: (elapsed: number, widget: Widget) => void): this {
    this.updates.push(updateFunc)

    return this
  }

  setup<T extends Widget>(setupFunc: SetupFunction<T>): this {
    const animate: AnimateFunction<T> = (animation: Animation<T>, duration: number, params?: Record<string, any>) => {
      return {
        animation,
        duration,
        params: params ?? {},
        mode: 'sync',
        setAsync() {
          this.mode = 'async'
          return this
        },
        setSync() {
          this.mode = 'sync'
          return this
        },
      }
    }
    const generator = setupFunc(this, animate as AnimateFunction<T>)
    this.setups.push({ generator, nextFrame: 0 })
    return this
  }

  // process logic:
  // 1. `setup.nextFrame >= setup.nextFrame` turned out that the current animation of this setup have not finished yet
  // 2. If `typeof result.value === 'number'`, processor shall simply take this animation as a delay as long as `result.value`.
  // 3. If `typeof result.value === 'object'`, processor shall play this animation with respect to its playing mode
  //  - 'async': will not be considered into the playing process, until the condition in step 1 hold
  //  - 'sync': playing immediately
  // 4. clean up
  //
  // Notice the processing of async mode here, it will simply put the animation onto playing sequence, without nextFrame advanced,
  // compared with the processing of `sync` animation.
  // When entered next update process, `runAnimation` will run multiple async animations that overlapped on the timeline
  // For example, if we have a `move` animation from 1 to 60, and a `scale` animation from 30 to 90, then they will be played at the same time from 30 to 90
  processSetups(elapsed: number) {
    this.setups.forEach((setup) => {
      if (elapsed >= setup.nextFrame) {
        // advance the setup
        const result = setup.generator.next()
        if (!result.done) {
          if (typeof result.value === 'number') {
            // simply put a delay as long as the value here
            setup.nextFrame = elapsed + result.value
          }
          else if (typeof result.value === 'object') {
            if (result.value.mode === 'async') {
              this.animate(result.value.animation, elapsed, result.value.duration, result.value.params)
            }
            else if (result.value.mode === 'sync') {
              this.animate(result.value.animation, elapsed, result.value.duration, result.value.params)
              setup.nextFrame = elapsed + result.value.duration // Set the next frame
            }
          }
        }
        else {
          // Marked done
          setup.nextFrame = Number.POSITIVE_INFINITY
        }
      }
    })

    // Clean up Generationer that has finished.
    this.setups = this.setups.filter(setup => setup.nextFrame !== Number.POSITIVE_INFINITY)
    this.children.forEach(child => child.processSetups(elapsed))
  }

  use(...plugins: WidgetPlugin[]) {
    this.plugins.push(...plugins)
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

  /**
   * Calculate the range of the widget, based on the self coordinate.
   * To be noted that this method should be overridden.
   * @param _x
   * @param _y
   */
  calculateIn(_x: number, _y: number): boolean {
    return false
  }

  /**
   * Determine whether the point is in the widget, based on the parent coordinate.
   * To be noted that this method should not be overridden.
   * @param x
   * @param y
   */
  isIn(x: number, y: number): boolean {
    const { x: dx, y: dy } = this.coordinateParentToChild(x, y)
    return this.children.some(child => child.isIn(dx, dy)) || this.calculateIn(dx, dy)
  }

  /**
   * Calculate the range of the widget, based on the self coordinate.
   * To be noted that this method should be overridden.
   * @returns The range of the widget.
   */
  calculateRange(): WidgetRange {
    return [this.x, this.y, this.x, this.y]
  }

  /**
   * The range of the widget, taking into account the children, based on the parent coordinate.
   * To be noted that this method should not be overridden.
   * @returns The range of the widget.
   */
  get range(): WidgetRange {
    const calculatedRange = this.calculateRange()

    const range = [
      Math.min(...this.children.map(child => child.range[0]).concat(calculatedRange[0])),
      Math.min(...this.children.map(child => child.range[1]).concat(calculatedRange[1])),
      Math.max(...this.children.map(child => child.range[2]).concat(calculatedRange[2])),
      Math.max(...this.children.map(child => child.range[3]).concat(calculatedRange[3])),
    ]

    const { x: x1, y: y1 } = this.coordinateChildToParent(range[0], range[1])
    const { x: x2, y: y2 } = this.coordinateChildToParent(range[2], range[3])

    return [x1, y1, x2, y2]
  }

  // transform the coordinate of the widget from parent to child considering the reRotation (mind the rotation center), reScale, and translation (mind widget.x and widget.y)
  coordinateParentToChild(x: number, y: number): { x: number, y: number } {
    const centerX = this.centerX + this.x
    const centerY = this.centerY + this.y
    const relativeX = x - centerX
    const relativeY = y - centerY
    const distance = Math.sqrt(relativeX ** 2 + relativeY ** 2)
    const angle = Math.atan2(relativeY, relativeX)
    const newAngle = angle - this.style.rotation
    const newRelativeX = distance * Math.cos(newAngle)
    const newRelativeY = distance * Math.sin(newAngle)
    const newX = newRelativeX / this.style.scaleX + this.centerX
    const newY = newRelativeY / this.style.scaleY + this.centerY
    return { x: newX, y: newY }
  }

  // transform the coordinate of the widget from child to parent considering the rotation, scale, and translation
  coordinateChildToParent(x: number, y: number): { x: number, y: number } {
    const relativeX = x - this.centerX
    const relativeY = y - this.centerY
    const newRelativeX = relativeX * this.style.scaleX
    const newRelativeY = relativeY * this.style.scaleY
    const distance = Math.sqrt(newRelativeX ** 2 + newRelativeY ** 2)
    const angle = Math.atan2(newRelativeY, newRelativeX)
    const newAngle = angle + this.style.rotation
    const newX = distance * Math.cos(newAngle) + this.centerX + this.x
    const newY = distance * Math.sin(newAngle) + this.centerY + this.y
    return { x: newX, y: newY }
  }

  static getAbsoluteCoordinates(widget: Widget): { x: number, y: number } {
    function getCoordinates(
      widget: Widget,
      x: number,
      y: number,
    ): { x: number, y: number } {
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
  ): { x: number, y: number } {
    const { x: absoluteX, y: absoluteY } = Widget.getAbsoluteCoordinates(widget)
    const relativeX = x - absoluteX
    const relativeY = y - absoluteY

    return { x: relativeX, y: relativeY }
  }
}
