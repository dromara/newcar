import type { IEventArgs } from "./EventArgs";

export abstract class EventHandler<T extends IEventArgs> {
  /**
   * Run it when the event happen.
   */
  abstract on(eventArgs: T): void;
}
