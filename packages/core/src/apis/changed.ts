import { isUndefined } from '@newcar/utils'
import type { Listener, PropertyWithChange, Reactive } from './reactive'

export function changed<T>(
  target: Reactive<T>,
  listener: Listener<T> | {
    preChanged?: Listener<T>
    postChanged?: Listener<T>
  },
) {
  const withChanged = target as PropertyWithChange<T>

  if (!isUndefined(target)) {
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
}
