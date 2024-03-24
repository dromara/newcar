import { CanvasKit } from 'canvaskit-wasm'
import { Widget } from './widget'

export const pre = (widget: Widget, CanvasKit: CanvasKit, prop: string) => {
  widget.preUpdate(CanvasKit, prop)
  for (const child of widget.children) {
    pre(child, CanvasKit, prop)
  }
}

export const setWidgetPropsProxy = (widget: Widget, CanvasKit: CanvasKit) => {
  new Proxy(widget, {
    set(target, prop) {
      target.preUpdate(CanvasKit, prop as string)
      return true
    },
  })
}

export const initial = (widget: Widget, CanvasKit: CanvasKit) => {
  widget.init(CanvasKit)
  setWidgetPropsProxy(widget, CanvasKit)
  for (const child of widget.children) {
    initial(child, CanvasKit)
  }
}
