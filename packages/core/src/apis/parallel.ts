import type { Anim, AnimationContext } from '../animation'
import { depend } from '../animation'
import type { Widget } from '../widget'

export function parallel<T extends Widget>(...anims: Anim<T>[]) {
  return depend<() => boolean, AnimationContext<T>>((ctx) => {
    return () => {
      const res = anims.map(a => a.build(ctx)())
      anims = res
        .map((r, i) => [r, i])
        .filter(([r, _]) => !r)
        .map(([_, i]) => anims[i as any])

      return res.reduce((x, xs) => x || xs)
    }
  })
}
