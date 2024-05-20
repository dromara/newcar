import { defineAnimation } from '@newcar/core'
import type { Text } from '../widgets'

/**
 * Write a Text object on screen.
 */
export const write = defineAnimation<Text>({
  act(widget: Text, elapsed, process, _ck, _params) {
    widget.progress = process
    widget.style.interval = [1000 * process, 1000 * (1 - process)]
  },
})
