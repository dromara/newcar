import type { Widget } from './widget'

/**
 * The event interface.
 */
export interface Event<T> {
  /**
   * The operation when set event.
   * @param widget The widget's self.
   * @param effect The effect function of this widget.
   * @param element The canvas element of this app.
   * @returns
   */
  operation: (
    widget: T,
    effect: (widget: Widget, ...arg: any[]) => any,
    element: HTMLCanvasElement,
  ) => void
}

export function defineEvent<T extends Widget>(event: Event<T>): Event<T> {
  return event
}

export interface EventInstance<T extends Widget> {
  /**
   * The event object.
   */
  event: Event<T>

  /**
   * The effected function.
   * @param widget the widget's self.
   * @param args The external arguments/
   */
  effect: (widget: Widget, ...args: []) => any
}
