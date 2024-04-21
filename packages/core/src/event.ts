import type { Widget } from "./widget"

export interface Event {
  operation: (widget: Widget, effect: (widget: Widget, ...arg: any[]) => any) => void
}

export function defineEvent(event: Event): Event {
  return event
}

export interface EventInstance {
  event: Event
  effect: (widget: Widget, ...args: []) => any
}