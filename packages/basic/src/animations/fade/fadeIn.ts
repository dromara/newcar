import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function fadeIn() {
  return withProcess<Base>((ctx, process, _origin) => {
    ctx.widget.style.transparency.value = process
  })
}
