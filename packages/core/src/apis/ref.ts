import type { Listener, Reactive } from './reactive'
import { _reactive } from './reactive'

export type Ref<T> = Reactive<{ value: T }>
export function ref<T>(value: T, listener?: Listener<{ value: T }>) {
  return _reactive({ value }, listener, 2)
}
