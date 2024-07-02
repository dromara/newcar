import { defineEvent } from '@newcar/core'

export const keyDown = defineEvent({
  operation(widget, effect) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      effect(widget, event.key)
      event.preventDefault()
    })
  },
})
