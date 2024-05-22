import type { Widget } from './widget'
import type { Animation } from './animation'

export type AnimateFunction<T extends Widget> = (animation: Animation<T>, duration: number, params?: Record<string, any>) => {
  animation: Animation<T>
  mode: 'async' | 'sync'
  duration: number
  params: Record<string, any>
  setAsync: () => ReturnType<AnimateFunction<T>>
  setSync: () => ReturnType<AnimateFunction<T>>
}

export function animate<T extends Widget>(animation: Animation<T>, duration: number, params?: Record<string, any>) {
  return {
    animation,
    duration,
    params: params ?? {},
    mode: 'sync',
    setAsync() {
      this.mode = 'async'
      return this
    },
    setSync() {
      this.mode = 'sync'
      return this
    },
  }
}
