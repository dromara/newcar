export interface Prop<T> {
  value: T
}

export interface PropertyWithChange<T> extends Prop<T> {
  $onPostChanged: (listener: Listener<T>) => void
  $onPreChanged: (listener: Listener<T>) => void
}

export type Listener<T> = (newValue: Prop<T>) => void

export function useProp<T>(value: T) {
  const data = { value }
  const postListeners: Listener<T>[] = []
  const preListeners: Listener<T>[] = []

  Object.defineProperty(data, '$onPostChanged', {
    value: (listener: Listener<T>) => {
      postListeners.push(listener)
    },
    writable: false,
    configurable: false,
  })
  Object.defineProperty(data, '$onPreChanged', {
    value: (listener: Listener<T>) => {
      preListeners.push(listener)
    },
    writable: false,
    configurable: false,
  })

  return new Proxy(data, {
    get(target, prop) {
      return (target as Record<string, any>)[prop as string]
    },
    set(target, prop, newValue) {
      for (const preListener of preListeners) {
        preListener(Object.seal(target))
      }
      (target as Record<string, any>)[prop as string] = newValue
      for (const postListener of postListeners) {
        postListener(Object.seal(target))
      }

      return true
    },
  })
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

export { useProp as def }
