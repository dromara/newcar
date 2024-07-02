import { isUndefined } from '@newcar/utils'
import { useAnimate } from '../animation'
import type { MaybeArray } from '../utils'
import type { Widget } from '../widget'
import { normalize } from '../utils'
import type { Ref } from './ref'

export function changeProperty<T extends Widget>(
  propsToChange: (widget: T) => MaybeArray<Ref<number>>,
) {
  let called = false
  let a: {
    original: number[]
  }

  return useAnimate<T, {
    changed: Ref<number>[]
    original: number[]
    from?: MaybeArray<number>
    to: MaybeArray<number>
  }>((ctx) => {
    const from = !isUndefined(ctx.from) ? normalize(ctx.from) : ctx.original
    const rto = normalize(ctx.to)
    for (const index in ctx.changed) {
      ctx.changed[index].value = from[index] + ctx.process * (rto[index] - from[index])
    }
  })
    .with<{ original: number[], changed: Ref<number>[] }>((ctx) => {
      if (!called) {
        a = {
          original: normalize(propsToChange(ctx.widget)).map((x: Ref<number>) => x.value),
        }
        called = true
      }

      return Object.assign(a, { changed: normalize(propsToChange(ctx.widget)) })
    })
}
