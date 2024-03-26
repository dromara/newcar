import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Animation, AnimationInstance } from './animation'
import { isNull } from '@newcar/utils'

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
    transparency: 0,
  } // The style of the widget.
  isImplemented = false // If the widget is implemented by App.impl
  animationInstance: AnimationInstance[] = []

  constructor(options?: WidgetOptions) {
    options ??= {}
    this.x = options.x ?? 0
    this.y = options.y ?? 0
    this.centerX = options.centerX ?? 0
    this.centerY = options.centerY ?? 0
    this.progress = options.progress ?? 1
    this.children = options.children ?? []
    if (isNull(this.style)) {
      this.style.scaleX = options.style.scaleX ?? 1
      this.style.scaleY = options.style.scaleY ?? 1
      this.style.rotation = options.style.rotation ?? 0
      this.style.transparency = options.style.transparency ?? 0
    }
  }

  /**
   * The child-widgets of the widget.
   */
  children: Widget[] = []

  /**
   * The parts of a widget.
   * Differently with children, it is a part of the widget instead of a child of the widget.
   */
  parts: Widget[] = []

  last: Widget = this

  /**
   * Called when the widget is registered.
   * @param CanvasKit The CanvasKit namespace
   */
  init(ck: CanvasKit) {}

  /**
   * Preload the necessary items during drawing.
   * Called when the properties of the widget is changed.
   * In common, we use it to initializing Paint, Rect, Path, etc.
   * @param CanvasKit The namespace of CanvasKit-WASM.
   * @param propertyChanged The changed property of this widget
   */

  predraw(ck: CanvasKit, propertyChanged: string) {}

  /**
   * Draw the object according to the parameters of the widget.
   * Called when the parameters is changed.
   * @param canvas The canvas object of CanvasKit-WASM.
   */
  draw(canvas: Canvas) {}

  /**
   * Called when the parameters is changed.
   * @param ck The namespace of CanvasKit-WASM.
   */
  preupdate(ck: CanvasKit, propertyChanged?: string): this {
    this.predraw(ck, propertyChanged)
    console.log(propertyChanged)

    return this
  }

  /**
   * Update the object according to the style of the widget.
   * Called when the style is changed.
   * @param canvas The canvas object of CanvasKit-WASM.
   * @param propertyChanged The changed property of this widget
   */
  update(canvas: Canvas): this {
    canvas.translate(this.x, this.y);
    canvas.rotate(this.style.rotation, this.centerX, this.centerY);
    canvas.scale(this.style.scaleX, this.style.scaleY);

    this.draw(canvas);

    return this
  }

  /**
   * Add children widgets for the widget.
   * @param children The added children.
   */
  add(...children: Widget[]): this {
    for (const child of children) {
      this.children.push(child)
    }

    return this
  }

  animate(animation: Animation, during: number, startAt?: number): this {
    this.animationInstance.push({ startAt, during, animation })

    return this
  }
}
