import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function rotate(rotation: number) {
  return withProcess<Base>((ctx, process, origin) => {
    ctx.widget.style.rotation.value
      = origin.style.rotation.value += process * (rotation - origin.style.rotation.value)
  })
}
