import { changed } from './changed'
import type { Reactive } from './reactive'
import type { Ref } from './ref'
import { ref } from './ref'

export function bind<T, K extends keyof T>(r: Reactive<T>, k: K): Ref<T[K]> {
  const res = ref(r[k])
  changed(res, (n) => {
    r[k] = n.value
  })

  return res
}
