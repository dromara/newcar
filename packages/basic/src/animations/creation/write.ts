import { useAnimate } from '@newcar/core'
import type { Text } from '../../widgets'

/**
 * Write a Text object on screen.
 */
export const write = useAnimate<Text, Record<string, never>>((ctx) => {
  ctx.widget.progress.value = ctx.process
  ctx.widget.style.interval = [1000 * ctx.process, 1000 * (1 - ctx.process)]
})
