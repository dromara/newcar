import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function roomOut() {
  return withProcess<Base>((ctx, process, _origin) => {
    ctx.widget.style.scaleX.value = 1 - process
    ctx.widget.style.scaleY.value = 1 - process
  })
}
