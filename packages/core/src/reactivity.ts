import type { Widget } from './widget'

export function reactive(widget: Widget) {
  const reactiveWidget = new Proxy(widget, {
    set(target, key, value) {
      (target as Record<string | symbol, any>)[key] = value
      ;(widget as Record<string | symbol, any>)[key] = value
      return true
    },
  })

  // Check if the value is an array
  if (Array.isArray(reactiveWidget)) {
    const reactiveArray = new Proxy(reactiveWidget, {
      set(target, key, value) {
        (target as Record<string | symbol, any>)[key] = value
        ;(widget as Record<string | symbol, any>)[key] = value
        return true
      },
    })
    return reactiveArray
  }

  return reactiveWidget
}
