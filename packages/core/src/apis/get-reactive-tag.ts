import type { Reactive } from './reactive'
import { REACTIVE_TAG } from './reactive'

export const getReactiveTag = <T>(r: Reactive<T>): undefined | number => (r as any)[REACTIVE_TAG]
