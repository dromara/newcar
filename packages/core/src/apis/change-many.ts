import { changed } from './changed'
import type { Listener, Reactive } from './reactive'

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
