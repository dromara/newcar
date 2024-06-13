import { useAnimate } from '@newcar/core'
import type { Text } from '../../widgets'

/**
 * Write a Text object on screen.
 */
export function write() {
  return useAnimate<Text, Record<string, never>>((ctx) => {
    ctx.widget.progress.value = ctx.process
    ctx.widget.style.interval.value = [1000 * ctx.process, 1000 * (1 - ctx.process)]
  })
}
