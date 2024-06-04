import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function move(x: number, y: number) {
  return withProcess<Base>((ctx, process, origin) => {
    ctx.widget.x.value = origin.x.value += process * (x - origin.x.value)
    ctx.widget.y.value = origin.y.value += process * (y - origin.y.value)
  })
}
