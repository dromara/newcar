import type { Base } from '@newcar/core'
import { withProcess } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Circle } from '../../widgets'
import { createCircle } from '../../widgets'

export function focusOn(options?: {
  color?: Color
  transparency?: number
}) {
  options ??= {}
  let circle: Circle
  return withProcess<Base>({
    init(context) {
      circle = createCircle(300, {
        style: {
          color: options.color ?? Color.WHITE,
          transparency: options.transparency ?? 0.5,
        },
      })(context.ck)
      context.widget.add(circle)
    },
    animate(ctx, process) {
      circle.style.scaleX.value = 1 - process
      circle.style.scaleY.value = 1 - process
    },
  })
}
