import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function roomIn() {
  return withProcess<Base>((ctx, process, _origin) => {
    ctx.widget.style.scaleX.value = process
    ctx.widget.style.scaleY.value = process
  })
}
