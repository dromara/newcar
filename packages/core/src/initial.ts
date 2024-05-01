import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Widget } from './widget'
import type { AsyncWidget, AsyncWidgetResponse } from './asyncWidget'

export async function initial(
  widget: Widget | AsyncWidget,
  ck: CanvasKit,
  canvas: Canvas,
) {
  !widget._isAsyncWidget()
    ? (() => {
        widget.plugins.forEach(plugin => plugin.beforeInitializing(widget, ck))
        widget.init(ck)
        widget.plugins.forEach(plugin => plugin.onInitializing(widget, ck))
      })()
    : await (async () => {
      const res = await widget.init(ck)
      if ((res as AsyncWidgetResponse).status === 'error') {
        console.warn(
          '[Newcar Warn] Failed to laod async widget, please check if your network.',
        )
      }
    })()
  for (const child of widget.children) await initial(child, ck, canvas)
}
