export interface PropertyWithChange<T> {
  $onPostChanged: (listener: Listener<T>) => void
  $onPreChanged: (listener: Listener<T>) => void
}

export type Listener<T> = (newValue: Reactive<T>) => void

export const REACTIVE_TAG = Symbol('reactive')
function _reactive<T>(value: T, listener?: Listener<T>, reactType: number = 1) {
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

export type Ref<T> = Reactive<{ value: T }>
export function ref<T>(value: T, listener?: Listener<{ value: T }>) {
  return _reactive({ value }, listener, 2)
}

export function changed<T>(
  target: Reactive<T>,
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

export function changedMany<T extends [Reactive<any>]>(
  targets: T,
  listener: Listener<T>,
) {
  for (const [i, target] of targets.entries()) {
    changed(target, (v) => {
      const newValue = Array.of(...targets.entries()).map(([ix, nv]) => {
        if (ix === i)
          return v
        else return nv
      })

      listener(newValue as any)
    })
  }
}

export const getReactiveTag = <T>(r: Reactive<T>): undefined | number => (r as any)[REACTIVE_TAG]

export function normalize(obj: any) {
  if (typeof obj !== 'object')
    return obj

  const normalized: any = {}
  const keys = Object.keys(obj)

  for (const key of keys) {
    if (getReactiveTag(obj[key]) === 2) {
      normalized[key] = obj[key].value
    }
    else {
      normalized[key] = obj[key]
    }
  }
}

export function bind<T, K extends keyof T>(r: Reactive<T>, k: K): Ref<T[K]> {
  const res = ref(r[k])
  changed(res, (n) => {
    r[k] = n.value
  })

  return res
}

export type ConvertToProp<T> = {
  [K in keyof T]: T[K] extends object ? Reactive<T[K]> : Ref<T[K]>
}
