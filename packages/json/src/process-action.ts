import type { Widget } from '@newcar/core'
import type { ActionFormat } from './format'

export function processAction(widget: Widget, actionData: ActionFormat) {
  if (actionData.type === 'change') {
    (widget as Record<string, any>)[actionData.handle] = actionData.to
  }
  else if (actionData.type === 'call') {
    (widget as Record<string, any>)[actionData.handle](actionData.arguments)
  }
}
