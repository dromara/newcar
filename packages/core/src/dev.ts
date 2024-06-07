export const errorHandler: HandlerList = {
  list: [],
  register(handler) {
    this.list.push(handler)
    return () => this.unregister(handler)
  },
  unregister(handler) {
    const index = this.list.indexOf(handler)
    if (index !== -1)
      this.list.splice(index, 1)
  },
}

interface HandlerCallback {
  source: string
  message: string
  error: Error | string
}
type ErrorHandler = (error: HandlerCallback) => void | boolean

interface HandlerList {
  register: (handler: ErrorHandler) => () => void
  unregister: (handler: ErrorHandler) => void
  list: ErrorHandler[]
}

function callHandler(error: HandlerCallback): boolean {
  let prevent = false
  for (const h of errorHandler.list) {
    if (h(error) === false)
      prevent = true
  }
  return prevent
}

export function newWarn(module: string, msg: string): void {
  const warn = `[newcar warn] ${module}: ${msg}`

  if (!callHandler({ source: module, message: msg, error: warn }))
    console.warn(warn)
}

export function newError(module: string, msg: string): void {
  const error = new Error(`[newcar error] ${module}: ${msg}`)

  if (!callHandler({ source: module, message: msg, error }))
    throw error
}
