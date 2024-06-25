export interface PropertyWithChange<T> {
  $onPostChanged: (listener: Listener<T>) => void
  $onPreChanged: (listener: Listener<T>) => void
}

export type Listener<T> = (newValue: Reactive<T>) => void

export const REACTIVE_TAG = Symbol('reactive')
export function _reactive<T>(value: T, listener?: Listener<T>, reactType: number = 1) {
  if (value === undefined)
    return
  if (typeof value !== 'object')
    return
  if (REACTIVE_TAG in (value as any))
    return value
  const postListeners: Listener<T>[] = listener ? [listener] : []
  const preListeners: Listener<T>[] = []

  Object.defineProperty(value, '$onPostChanged', {
    value: (listener: Listener<T>) => {
      postListeners.push(listener)
    },
    writable: false,
    configurable: false,
  })
  Object.defineProperty(value, '$onPreChanged', {
    value: (listener: Listener<T>) => {
      preListeners.push(listener)
    },
    writable: false,
    configurable: false,
  })
  Object.defineProperty(value, REACTIVE_TAG, {
    value: reactType,
    writable: false,
    configurable: false,
  })

  return new Proxy(value, {
    get(target, prop) {
      return (target as Record<string, any>)[prop as string]
    },
    set(target, prop, newValue) {
      for (const preListener of preListeners) {
        preListener(Object.seal(target) as any)
      }
      (target as Record<string, any>)[prop as string] = newValue
      for (const postListener of postListeners) {
        postListener(Object.seal(target) as any)
      }

      return true
    },
  })
}

export type Reactive<T> = T
export function reactive<T>(value: T, listener?: Listener<T>) {
  return _reactive(value, listener, 1)
}
