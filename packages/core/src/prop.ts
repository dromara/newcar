export interface Prop<T> {
  value: T
}

export interface PropertyWithChange<T> extends Prop<T> {
  $onPostChanged: (listener: Listener<T>) => void
  $onPreChanged: (listener: Listener<T>) => void
}

export type Listener<T> = (newValue: Prop<T>) => void

export function reactive<T>(value: T, listener?: Listener<T>) {
  if (typeof value !== 'object')
    return
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

export interface Ref<T> { value: T }
export function ref<T>(value: T, listener?: Listener<{ value: T }>) {
  return reactive({ value }, listener)
}

export function changed<T>(
  target: Prop<T>,
  listener: Listener<T> | {
    preChanged?: Listener<T>
    postChanged?: Listener<T>
  },
) {
  const withChanged = target as PropertyWithChange<T>

  if (typeof listener === 'function') {
    withChanged.$onPostChanged(listener)
  }
  else {
    if (listener.postChanged) {
      withChanged.$onPostChanged(listener.postChanged)
    }
    if (listener.preChanged) {
      withChanged.$onPreChanged(listener.preChanged)
    }
  }
}

export type ConvertToProp<T> = {
  [K in keyof T]: Prop<T[K]>
}
