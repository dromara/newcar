import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'

withProcess<Base>((ctx, process) => {
  ctx.widget.x.value = ctx.widget.x.value * process
})
