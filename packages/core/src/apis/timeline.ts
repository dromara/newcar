import type { AnimationContext, WithDep } from '../animation'
import type { Widget } from '../widget'
import { delay } from './delay'
import { parallel } from './parallel'
import { sequence } from './sequence'

export function timeline<T extends Widget>(...lines: [
  number,
  number,
  WithDep<() => boolean, { duration: number } & AnimationContext<T>>,
][]) {
  return parallel(
    ...lines.map(([d, duration, a]) =>
      sequence(delay(d), a.withAttr({ duration }) as any),
    ),
  )
}
