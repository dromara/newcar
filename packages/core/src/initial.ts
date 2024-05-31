import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Widget } from './widget'
import type { AsyncWidget, AsyncWidgetResponse } from './asyncWidget'

/**
 * Initializing a widget and his children
 * @param widget The `Widget` object that need to initialize
 * @param ck
 * @param canvas
 */
export async function initial(
  widget: Widget | AsyncWidget,
  ck: CanvasKit,
  canvas: Canvas,
) {
  !widget._isAsyncWidget()
    ? (() => {
        widget.plugins.forEach(plugin => plugin.beforeInitializing(widget, ck))
        widget.init(ck)
        for (const instance of widget.animationInstances) {
          instance.animation.init?.call(instance, widget, instance.startAt, instance.duration, ck, instance.params)
        }
        widget.plugins.forEach(plugin => plugin.onInitializing(widget, ck))
      })()
    : await (async () => {
      const res = await widget.init(ck)
      if ((res as AsyncWidgetResponse).status === 'error') {
        console.warn(
          '[Newcar Warn] Failed to load async widget, please check if your network.',
        )
      }
    })()
  for (const child of widget.children) await initial(child, ck, canvas)
}
