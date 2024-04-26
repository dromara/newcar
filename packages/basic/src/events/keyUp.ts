import { defineEvent } from '@newcar/core'

export const keyUp = defineEvent({
  operation(widget, effect) {
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      effect(widget, event.key)
    })
  },
})
