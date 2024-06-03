import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function move(x: number, y: number) {
  return withProcess<Base>((ctx, process) => {
    ctx.widget.x.value = process * x
    ctx.widget.y.value = process * y
  })
}
