import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import { type BlendMode, deepClone, isUndefined } from '@newcar/utils'
import type { ConvertToProp } from './apis/types'
import type { Anim } from './animation'
import type { Event, EventInstance } from './event'
import { defineEvent } from './event'
import type { WidgetPlugin } from './plugin'
import type { Ref } from './apis/ref'
import { ref } from './apis/ref'
import { changed } from './apis/changed'
import type { Position } from './apis/physical'
import { rp } from './apis/physical'
import { RootWidget } from './scene'

export type WidgetRange = [number, number, number, number]
// export type WidgetInstance<T extends Widget> = T
export type SetupFunction<T extends Widget> = (widget: T) => Generator<number | Anim<T>, void, number | Anim<T>>
export type Layout = 'row' | 'column' | 'absolute' | 'mix'
export type Status = 'live' | 'dead'

export interface WidgetOptions {
  style?: WidgetStyle
  x?: number
  y?: number
  pos?: Position | [number, number]
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
  pos: Ref<Position>
  x: Ref<number> // The vector x of the widget.
  y: Ref<number> // The vector y of the widget.
  centerX: Ref<number> // The center vector x of the widget.
  centerY: Ref<number> // The center vector y of the widget.
  progress: Ref<number> // The progress/process of a widget.
  style: ConvertToProp<WidgetStyle> = {
    scaleX: ref(1),
    scaleY: ref(1),
    rotation: ref(0),
    transparency: ref(0.5),
  } // The style of the widget.

  display = ref(true)
  isImplemented = ref(false) // If the widget is implemented by App.impl
  animationInstances: Anim<Widget>[] = []
  eventInstances: EventInstance<Widget>[] = []
  updates: (<T extends this>(elapsed: number, widget: T) => void)[] = []
  setups: Array<{ generator: ReturnType<SetupFunction<Widget>>, nextFrame: number }> = []
  key = `widget-${0}-${performance.now()}-${Math.random()
    .toString(16)
    .slice(2)}`

  parent: Widget | null
  status: Status = 'live'
  initialized: boolean = false

  registeredEvents: Map<string, Event<Widget>> = new Map()

  constructor(options?: WidgetOptions) {
    options ??= {}
    this.x = ref(options.x ?? 0)
    this.y = ref(options.y ?? 0)
    this.pos = ref(isUndefined(options.pos)
      ? rp(this.x.value, this.y.value)
      : (Array.isArray(options.pos) ? rp(...options.pos) : options.pos),
    )
    this.centerX = ref(options.centerX ?? 0)
    this.centerY = ref(options.centerY ?? 0)
    this.progress = ref(options.progress ?? 1)
    this.children = options.children ?? []
    options.style ??= {}
    this.style.scaleX = ref(options.style.scaleX ?? 1)
    this.style.scaleY = ref(options.style.scaleY ?? 1)
    this.style.rotation = ref(options.style.rotation ?? 0)
    this.style.transparency = ref(options.style.transparency ?? 1)
    this.style.blendMode = ref(options.style.blendMode ?? 'srcOver')
    this.style.antiAlias = ref(options.style.antiAlias ?? true)
    this.style.layout = ref(options.style.layout ?? 'absolute')
    this.style.margin = ref(isUndefined(options.style.margin)
      ? [0, 0, 0, 0]
      : typeof options.style.margin === 'number'
        ? [options.style.margin, options.style.margin, options.style.margin, options.style.margin]
        : options.style.margin.length === 2
          ? [options.style.margin[0], options.style.margin[0], options.style.margin[1], options.style.margin[1]]
          : options.style.margin)
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
  init(_ck: CanvasKit) {
    if (this.parent instanceof RootWidget) {
      const [x, y] = this.pos.value.resolve(...this.parent.canvasSize)
      this.x.value = x
      this.y.value = y
    }
    else {
      [this.x.value, this.y.value] = this.pos.value.resolve(this.parent?.x.value ?? 0, this.parent?.y.value ?? 0)
    }

    changed(this.pos, (pos: Ref<Position>) => {
      if (this.parent instanceof RootWidget) {
        [this.x.value, this.y.value] = pos.value.resolve(...this.parent.canvasSize)
      }
      else {
        [this.x.value, this.y.value] = pos.value.resolve(this.parent.x.value, this.y.value)
      }
    })
  }

  /**
   * Draw the object according to the parameters of the widget.
   * Called when the parameters are changed.
   * @param _canvas The canvas object of CanvasKit-WASM.
   */
  draw(_canvas: Canvas) { }

  /**
   * Update the object according to the style of the widget.
   * Called when the style is changed.
   * @param elapsed The elapsed time.
   * @param ck The CanvasKit-WASM Namespace.
   * @param canvas The canvas object of CanvasKit-WASM.
   */
  update(
    elapsed: number,
    ck: CanvasKit,
    canvas: Canvas,
  ) {
    if (this.status === 'live') {
      if (!this.initialized) {
        this.init(ck)
        this.initialized = true
      }
      for (const updateFunc of this.updates)
        updateFunc(elapsed, this)
      this.runAnimation(elapsed, ck)
      this.processSetups(elapsed, ck)

      canvas.save()

      canvas.translate(this.x.value, this.y.value)
      canvas.rotate(this.style.rotation.value, this.centerX.value, this.centerY.value)
      canvas.scale(this.style.scaleX.value, this.style.scaleY.value)
      for (const plugin of this.plugins) {
        if (plugin.beforeDraw)
          plugin.beforeDraw(this, canvas)
      }
      if (this.display.value)
        this.draw(canvas)
      for (const plugin of this.plugins) {
        if (plugin.onDraw)
          plugin.onDraw(this, canvas)
      }
      for (const child of this.children) {
        child.update(elapsed, ck, canvas)
      }

      canvas.restore()
    }
  }

  /**
   * Add children widgets for the widget.
   * @param children The added children.
   */
  add(...children: any[]): this {
    // let index = 0
    for (const child of children) {
      child.parent = this
      child.isImplemented.value = true
      // child.status = 'live'
      this.children.push(child)
    }
    return this
  }

  animate(
    animation: Anim<any>,
  ): this {
    this.animationInstances.push(animation)

    return this
  }

  registerEvent(name: string): this {
    this.registeredEvents.set(name, defineEvent({
      operation(_widget, effect, _element) {
        this.effects.push(effect)
      },
      effects: [],
    }))
    return this
  }

  emitEvent(name: string, ...args: any[]): this {
    const event = this.registeredEvents.get(name)
    if (!event) {
      console.warn(`[Newcar Warn] The event "${name}" is not registered.`)
      return this
    }
    for (const effect of event.effects) {
      effect(this, ...args)
    }
    return this
  }

  on(event: Event<Widget> | string, effect: (widget: Widget, ...args: any[]) => any): this {
    if (typeof event === 'string') {
      if (!this.registeredEvents.has(event)) {
        console.warn(`[Newcar Warn] The event "${event}" is not registered.`)
        return this
      }
      event = this.registeredEvents.get(event)
    }
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

  // Run an animation with respect to `elapsed`, which is maintained by `App` class
  runAnimation(elapsed: number, ck: CanvasKit) {
    if (this.animationInstances.length === 0)
      return
    if (this.animationInstances[0].build(
      { ck, elapsed, widget: this },
    )()) {
      this.animationInstances.shift()
    }

    for (const update of this.updates) update(elapsed, this)

    for (const child of this.children) child.runAnimation(elapsed, ck)
  }

  /**
   * Set up an update function to call it when the widget is changed.
   * @param updateFunc The frame from having gone to current frame.
   */
  setUpdate(updateFunc: <T extends this>(elapsed: number, widget: T) => void): this {
    this.updates.push(updateFunc)

    return this
  }

  setup(setupFunc: SetupFunction<typeof this>): this {
    const generator = setupFunc(this)
    this.setups.push({ generator: generator as any, nextFrame: 0 })
    return this
  }

  // Process logic:
  // 1. `setup.nextFrame >= setup.nextFrame`
  // turned out that the current animation of this setup has not finished yet
  // 2. If `typeof result.value === 'number'`,
  // processor shall simply take this animation as a delay as long as `result.value`.
  // 3. If `typeof result.value === 'object'`, processor shall play this animation with respect to its playing mode
  //  - 'async': will not be considered into the playing process, until the condition in step 1 hold
  //  - 'sync': playing immediately
  // 4. Clean up
  //
  // Notice the processing of async mode here,
  // it will simply put the animation onto a playing sequence, without nextFrame basic,
  // compared with the processing of `sync` animation.
  // When entered next update process, `runAnimation` will run multiple async animations that overlapped on the timeline,
  // For example, if we have a `move` animation from 1 to 60, and a `scale` animation from 30 to 90, then they will be played at the same time from 30 to 90
  processSetups(elapsed: number, ck: CanvasKit) {
    this.setups.forEach((setup) => {
      if (elapsed >= setup.nextFrame) {
        // advance the setup
        const result = setup.generator.next()
        if (!result.done) {
          if (typeof result.value === 'number') {
            // simply put a delay as long as the value here
            setup.nextFrame = elapsed + result.value
          }
          else if (!isUndefined((result.value as Anim<Widget>).build)) {
            // (result.value as Anim<Widget>).build({
            //   elapsed, ck, widget: this
            // })()
            this.animationInstances.push(result.value as Anim<Widget>)
          }
        }
        else {
          // Marked done
          setup.nextFrame = Number.POSITIVE_INFINITY
        }
      }
    })

    // Clean up Generator that has finished.
    this.setups = this.setups.filter(setup => setup.nextFrame !== Number.POSITIVE_INFINITY)
    this.children.forEach(child => child.processSetups(elapsed, ck))
  }

  use(...plugins: WidgetPlugin[]) {
    this.plugins.push(...plugins)
  }

  _isAsyncWidget() {
    return false
  }

  show(): this {
    this.display.value = true
    return this
  }

  hide(): this {
    this.display.value = false
    return this
  }

  copy(): this {
    return deepClone(this)
  }

  /**
   * Calculate the range of the widget, based on the self-coordinate.
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
    return this.children.filter(child => child.status === 'live').some(child => child.isIn(dx, dy)) || this.calculateIn(dx, dy)
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * Calculate the range of the widget, based on the self-coordinate.
   * To be noted that this method should be overridden.
   * @returns The range of the widget.
   */
  calculateRange(): WidgetRange {
    throw new Error('Method not implemented.')
  }

  /**
   * The range of the widget, taking into account the children, based on the parent coordinate.
   * To be noted that this method should not be overridden.
   * @returns The range of the widget.
   */
  get range(): WidgetRange {
    let calculatedRange = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ]
    try {
      calculatedRange = this.calculateRange()
    }
    catch { }

    const range = [
      Math.min(...this.children.filter(child => child.status === 'live').map(child => child.range[0]).concat(calculatedRange[0])),
      Math.min(...this.children.filter(child => child.status === 'live').map(child => child.range[1]).concat(calculatedRange[1])),
      Math.max(...this.children.filter(child => child.status === 'live').map(child => child.range[2]).concat(calculatedRange[2])),
      Math.max(...this.children.filter(child => child.status === 'live').map(child => child.range[3]).concat(calculatedRange[3])),
    ]

    const { x: x1, y: y1 } = this.coordinateChildToParent(range[0], range[1])
    const { x: x2, y: y2 } = this.coordinateChildToParent(range[2], range[3])

    return [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)]
  }

  /**
   * The range of the widget, taking into account the children, based on the parent coordinate.
   * To be noted that this method should not be overridden.
   * @returns The range of the widget.
   */
  get singleRange(): WidgetRange {
    let calculatedRange = [
      0,
      0,
      0,
      0,
    ]
    try {
      calculatedRange = this.calculateRange()
    }
    catch { }

    const { x: x1, y: y1 } = this.coordinateChildToParent(calculatedRange[0], calculatedRange[1])
    const { x: x2, y: y2 } = this.coordinateChildToParent(calculatedRange[2], calculatedRange[3])

    return [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)]
  }

  // transform the coordinate of the widget from parent to child considering the reRotation (mind the rotation center), reScale, and translation (mind widget.x and widget.y)
  coordinateParentToChild(x: number, y: number): { x: number, y: number } {
    const centerX = this.centerX.value + this.x.value
    const centerY = this.centerY.value + this.y.value
    const relativeX = x - centerX
    const relativeY = y - centerY
    const distance = Math.sqrt(relativeX ** 2 + relativeY ** 2)
    const angle = Math.atan2(relativeY, relativeX)
    const newAngle = angle - this.style.rotation.value / 180 * Math.PI
    const newRelativeX = distance * Math.cos(newAngle)
    const newRelativeY = distance * Math.sin(newAngle)
    const newX = newRelativeX / this.style.scaleX.value + this.centerX.value
    const newY = newRelativeY / this.style.scaleY.value + this.centerY.value
    return { x: newX, y: newY }
  }

  // transform the coordinate of the widget from child to parent considering the rotation, scale, and translation
  coordinateChildToParent(x: number, y: number): { x: number, y: number } {
    const relativeX = x - this.centerX.value
    const relativeY = y - this.centerY.value
    const newRelativeX = relativeX * this.style.scaleX.value
    const newRelativeY = relativeY * this.style.scaleY.value
    const distance = Math.sqrt(newRelativeX ** 2 + newRelativeY ** 2)
    const angle = Math.atan2(newRelativeY, newRelativeX)
    const newAngle = angle + this.style.rotation.value / 180 * Math.PI
    const newX = distance * Math.cos(newAngle) + this.centerX.value + this.x.value
    const newY = distance * Math.sin(newAngle) + this.centerY.value + this.y.value
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
        absoluteX += parent.x.value
        absoluteY += parent.y.value
        parent = parent.parent
      }

      return { x: absoluteX, y: absoluteY }
    }

    return getCoordinates(widget, widget.x.value, widget.y.value)
  }

  static absoluteToRelative(
    widget: Widget,
    x: number,
    y: number,
  ): { x: number, y: number } {
    function getCoordinates(widget: Widget, x: number, y: number): { x: number, y: number } {
      if (!widget.parent)
        return widget.coordinateParentToChild(x, y)
      const { x: nX, y: nY } = getCoordinates(widget.parent, x, y)
      return widget.coordinateParentToChild(nX, nY)
    }

    const { x: relativeX, y: relativeY } = getCoordinates(widget, x, y)

    return { x: relativeX, y: relativeY }
  }

  kill(): this {
    this.status = 'dead'

    return this
  }

  resurrect(): this {
    this.status = 'live'

    return this
  }

  remove() {
    this.parent.children.splice(
      this.parent.children.findIndex(c => c.key === this.key),
      1,
    )
  }
}
