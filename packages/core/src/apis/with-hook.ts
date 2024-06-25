import type { Animate } from '../animation'
import { useAnimate } from '../animation'
import type { Widget } from '../widget'

export function withHook<T extends Widget, A>({
  before,
  animate,
  after,
}: {
  before?: Animate<T, A>
  animate: Animate<T, A>
  after?: Animate<T, A>
}) {
  let called = false
  return useAnimate<T, A>((ctx) => {
    if (!called) {
      if (before)
        before(ctx)
      called = true
    }
    animate(ctx)
    if (ctx.process >= 1) {
      if (after)
        after(ctx)
    }
  })
}
