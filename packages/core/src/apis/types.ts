import type { Reactive } from './reactive'
import type { Ref } from './ref'

export type ArrayOrPrimitive = Record<number, any> | string | number | null | undefined | boolean | symbol
export type ConvertToProp<T> = {
  [K in keyof T]: T[K] extends ArrayOrPrimitive ? Ref<T[K]> : Reactive<T[K]>
}
