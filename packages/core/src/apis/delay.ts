import { useAnimate } from '../animation'
import type { Widget } from '../widget'

export function delay<T extends Widget>(duration: number) {
  return useAnimate<T, unknown>((_) => { }).withAttr({ duration })
}
