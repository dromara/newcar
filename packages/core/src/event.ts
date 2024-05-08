import type { Widget } from './widget'

/**
 * The event interface.
 */
export interface Event {
  /**
   * The operation when set event.
   * @param widget The widget's self.
   * @param effect The effect function of this widget.
   * @param element The canvas element of this app.
   * @returns
   */
  operation: (
    widget: Widget,
    effect: (widget: Widget, ...arg: any[]) => any,
    element: HTMLCanvasElement,
  ) => void
}

export function defineEvent(event: Event): Event {
  return event
}

export interface EventInstance {
  /**
   * The event object.
   */
  event: Event

  /**
   * The effected function.
   * @param widget the widget's self.
   * @param args The external arguments/
   */
  effect: (widget: Widget, ...args: []) => any
}
