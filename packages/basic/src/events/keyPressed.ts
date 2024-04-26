import { defineEvent } from '@newcar/core'

export const keyPressed = defineEvent({
  operation(widget, effect) {
    document.addEventListener('keypress', (event: KeyboardEvent) => {
      effect(widget, event.key)
    })
  },
})
