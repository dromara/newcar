import type { Canvas, CanvasKit } from 'canvaskit-wasm'

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
  style: WidgetStyle // The style of the widget.
  isImplemented = false // If the widget is implemented by App.impl

  constructor(options?: WidgetOptions) {
    options ??= {}
    this.x = options.x ?? 0
    this.y = options.y ?? 0
    this.centerX = options.centerX ?? 0
    this.centerY = options.centerY ?? 0
    this.progress = options.progress ?? 1
    this.children = options.children ?? []
    if (this.style) {
      this.style.scaleX = options.style.scaleX ?? 1
      this.style.scaleY = options.style.scaleY ?? 1
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
   * Draw the object according to the style of the widget.
   * Called when the style is changed.
   * @param canvas The canvas object of CanvasKit-WASM.
   */
  draw(canvas: Canvas) {}

  /**
   * Update the object according to the style of the widget.
   * Called when the style is changed.
   * @param canvas The canvas object of CanvasKit-WASM.
   * @param propertyChanged The changed property of this widget
   */
  update(canvas: Canvas) {
    this.draw(canvas)
  }

  /**
   * Add children widgets for the widget.
   * @param children The added children.
   */
  add(...children: Widget[]) {
    for (const child of children) {
      this.children.push(child)
    }
  }
}
