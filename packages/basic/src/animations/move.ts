import type { Ref, Widget } from '@newcar/core'
import { useAnimate } from '@newcar/core'

export function changeProperty<T extends Widget, A = Record<string, never>>(
  propsToChange: (widget: T) => Ref<number>[],
) {
  let called = false
  let a: {
    original: number[]
  }

  return useAnimate<T, A & {
    changed: Ref<number>[]
    original: number[]
    to: number[]
  }>((ctx) => {
    for (const index in ctx.changed) {
      ctx.changed[index].value += ctx.process * (ctx.to[index] - ctx.original[index])
    }
  })
    .with<{ original: number[] }>((ctx) => {
      if (!called) {
        a = { original: propsToChange(ctx.widget).map(x => x.value) }
        called = true
      }

      return a
    })
}

/**
 * Move a widget object, which change its `x` and `y` attribute.
 */
export const move = changeProperty<Widget>(w => [w.x, w.y])
