import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Widget } from './widget'

// export const pre = (widget: Widget, ck: CanvasKit, canvas: Canvas, prop: string) => {
//   widget.predraw(CanvasKit, prop)
//   for (const child of widget.children) {
//     pre(child, CanvasKit, canvas, prop)
//   }
// }

// export const setWidgetPropsProxy = (widget: Widget, ck: CanvasKit) => {
//   console.log("set proxys!")
//   const proxy = new Proxy(widget, {
//     set(target, prop) {
//       target.predraw(CanvasKit, prop as string)
//       console.log('Change!')
//       return true
//     },
//   })
//   return proxy
// }

export const initial = (widget: Widget, ck: CanvasKit, canvas: Canvas) => {
  widget.init(ck)
  widget.draw(canvas)
  // setWidgetPropsProxy(widget, CanvasKit)
  for (const child of widget.children) {
    initial(child, ck, canvas)
  }
}
