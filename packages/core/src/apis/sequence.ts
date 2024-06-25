import type { Anim, AnimationContext } from '../animation'
import { depend } from '../animation'
import type { Widget } from '../widget'

export function sequence<T extends Widget>(...anims: Anim<T>[]) {
  return depend<() => boolean, AnimationContext<T>>((ctx) => {
    return () => {
      if (anims[0].build(ctx)()) {
        anims.shift()
        if (anims.length === 0) {
          return true
        }
      }

      return false
    }
  })
}
