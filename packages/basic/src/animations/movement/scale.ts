import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function scale(x: number, y: number) {
  return withProcess<Base>((ctx, process, origin) => {
    ctx.widget.style.scaleX.value
      = origin.style.scaleX.value += process * (x - origin.style.scaleX.value)
    ctx.widget.style.scaleY.value
      = origin.style.scaleY.value += process * (y - origin.style.scaleY.value)
  })
}
