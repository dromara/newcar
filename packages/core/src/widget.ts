import type { Canvas, CanvasKit } from 'canvaskit-wasm'

export class Widget {
  constructor() {}

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
   * Preload the necessary items during drawing.
   * Called when the widget is registered.
   * In common, we use it to initializing Paint, Rect, Path, etc.
   * @param ckNamespace The namespace of CanvasKit-WASM.
   */
  predraw(ckNamespace: CanvasKit) {}

  /**
   * Draw the object according to the style of the widget.
   * Called when the style is changed.
   * @param canvas The canvas object of CanvasKit-WASM.
   * @param propertyChanged The changed property of this widget
   */
  draw(canvas: Canvas, propertyChanged: string) {}
}
