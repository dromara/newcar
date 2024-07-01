import type { Widget } from '@newcar/core'
import { sequence, withHook } from '@newcar/core'
import { scale as ncScale } from '../movement/scale'
import { rotate } from '../movement/rotate.ts'

export function wiggle() {
  return withHook<Widget, {
    amplitude?: number
    count?: number
    scale?: number
  }>({
    before(context) {
      context.widget.animate(
        sequence(
          ncScale().withAttr({
            duration: context.duration * 0.2,
            to: [context.scale ?? 1.5, context.scale ?? 1.5],
          }),
          ...Array.from({ length: context.count ?? 6 }, (_, index) => index + 1)
            .map((_, index) => {
              const toValue = index % 2 === 0 ? 45 : -45
              return rotate().withAttr({ duration: (0.8 / (context.count ?? 6)), to: toValue })
            }),
          ncScale().withAttr({
            duration: context.duration * 0.2,
            to: [1, 1],
          }),
        ),
      )
    },
    animate(_) {},
  })
}
