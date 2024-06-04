import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

export function create() {
  return withProcess<Base>((ctx, process, _origin) => {
    ctx.widget.progress.value = process
  })
}
